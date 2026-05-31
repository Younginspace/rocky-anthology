import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CurrentView, Episode, GameState, SpeakerId } from '../engine/types';
import { choose, continueScene, currentView, startEpisode } from '../engine/engine';
import { episodeById, episodes } from '../content';
import { load, save, wipe, type Progress } from './persistence';

export type Screen = 'boot' | 'archive' | 'incall' | 'cards' | 'montage';

export interface TranscriptItem {
  key: string;
  speaker: SpeakerId;
  text: string;
  stage?: string;
}

export interface Session {
  episodeId: string;
  state: GameState;
  transcript: TranscriptItem[];
}

export interface AppState {
  screen: Screen;
  progress: Progress;
  session: Session | null;
  /** Cards unlocked by the most recent step, surfaced as a toast. */
  pendingCards: string[];
}

type Action =
  | { type: 'BOOT_DONE' }
  | { type: 'GO'; screen: Screen }
  | { type: 'START'; episodeId: string }
  | { type: 'CONTINUE' }
  | { type: 'CHOOSE'; optionId: string }
  | { type: 'FINISH_CALL' }
  | { type: 'MONTAGE_DONE' }
  | { type: 'DISMISS_CARDS' }
  | { type: 'RESET' };

function linesForView(view: CurrentView): { speaker: SpeakerId; text: string; stage?: string }[] {
  if (view.kind === 'scene' || view.kind === 'ending') return view.lines;
  return [];
}

function appendNodeLines(transcript: TranscriptItem[], ep: Episode, st: GameState): TranscriptItem[] {
  const view = currentView(ep, st);
  const lines = linesForView(view);
  if (!lines.length) return transcript;
  const items = lines.map((l, i) => ({ key: `${st.nodeId}:${i}`, speaker: l.speaker, text: l.text, stage: l.stage }));
  return [...transcript, ...items];
}

function mergeProgress(p: Progress, ep: Episode, st: GameState): Progress {
  const cards = new Set(p.unlockedCards);
  st.unlockedCards.forEach((c) => cards.add(c));
  const completed = new Set(p.completedEpisodes);
  if (st.status === 'ended') completed.add(ep.id);
  return { ...p, unlockedCards: Array.from(cards), completedEpisodes: Array.from(completed) };
}

/** Advance the engine, accumulate transcript + cards, never crash. */
function step(
  state: AppState,
  run: (ep: Episode, gs: GameState) => GameState,
  preItems: TranscriptItem[] = [],
): AppState {
  if (!state.session) return state;
  const ep = episodeById[state.session.episodeId];
  if (!ep) return state;
  const before = state.session.state.unlockedCards;
  let next: GameState;
  try {
    next = run(ep, state.session.state);
  } catch (err) {
    console.error('[engine] step failed:', err);
    return state;
  }
  const transcript = appendNodeLines([...state.session.transcript, ...preItems], ep, next);
  const newly = next.unlockedCards.filter((c) => !before.includes(c));
  return {
    ...state,
    session: { episodeId: ep.id, state: next, transcript },
    progress: mergeProgress(state.progress, ep, next),
    pendingCards: newly.length ? [...state.pendingCards, ...newly] : state.pendingCards,
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'BOOT_DONE':
      return { ...state, screen: 'archive', progress: { ...state.progress, bootSeen: true } };

    case 'GO':
      return { ...state, screen: action.screen };

    case 'START': {
      const ep = episodeById[action.episodeId];
      if (!ep) return state;
      const gs = startEpisode(ep);
      const transcript = appendNodeLines([], ep, gs);
      return {
        ...state,
        screen: 'incall',
        session: { episodeId: ep.id, state: gs, transcript },
        progress: mergeProgress(state.progress, ep, gs),
        pendingCards: [],
      };
    }

    case 'CONTINUE':
      return step(state, (ep, gs) => continueScene(ep, gs));

    case 'CHOOSE': {
      if (!state.session) return state;
      const ep = episodeById[state.session.episodeId];
      if (!ep) return state;
      const node = ep.nodes[state.session.state.nodeId];
      let caller: TranscriptItem[] = [];
      if (node && node.kind === 'choice') {
        const opt = node.options.find((o) => o.id === action.optionId);
        if (opt) caller = [{ key: `${state.session.state.nodeId}#${opt.id}`, speaker: 'caller', text: opt.label }];
      }
      return step(state, (e, gs) => choose(e, gs, action.optionId), caller);
    }

    case 'FINISH_CALL': {
      const allDone = episodes.every((e) => state.progress.completedEpisodes.includes(e.id));
      const goMontage = allDone && !state.progress.montageSeen;
      return { ...state, screen: goMontage ? 'montage' : 'archive', session: null, pendingCards: [] };
    }

    case 'MONTAGE_DONE':
      return { ...state, screen: 'archive', progress: { ...state.progress, montageSeen: true } };

    case 'DISMISS_CARDS':
      return { ...state, pendingCards: [] };

    case 'RESET':
      wipe();
      return {
        screen: 'archive',
        progress: { completedEpisodes: [], unlockedCards: [], montageSeen: false, bootSeen: true },
        session: null,
        pendingCards: [],
      };

    default:
      return state;
  }
}

function init(): AppState {
  const blob = load();
  let screen: Screen = 'boot';
  let session: Session | null = null;
  if (blob.session) {
    const ep = episodeById[blob.session.episodeId];
    // Semantic guard: the episode AND the resumed node must still exist, else
    // a stale/old save would throw in currentView and soft-brick on every load.
    if (ep && ep.nodes[blob.session.state.nodeId]) {
      // Prefer the persisted full transcript; fall back to rebuilding from the
      // current node so the screen is never blank.
      const saved = blob.session.transcript as unknown as TranscriptItem[];
      const transcript = saved.length ? saved : appendNodeLines([], ep, blob.session.state);
      session = { episodeId: blob.session.episodeId, state: blob.session.state, transcript };
      screen = 'incall';
    }
  }
  if (!session && blob.progress.bootSeen) screen = 'archive';
  return { screen, progress: blob.progress, session, pendingCards: [] };
}

interface Store extends AppState {
  dispatch: React.Dispatch<Action>;
}

const Ctx = createContext<Store | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    // Persist progress + the full session (incl. transcript) so a refresh
    // resumes the conversation exactly where it was.
    save({
      version: 1,
      progress: state.progress,
      session: state.session
        ? { episodeId: state.session.episodeId, state: state.session.state, transcript: state.session.transcript }
        : null,
    });
  }, [state.progress, state.session]);

  const value = useMemo<Store>(() => ({ ...state, dispatch }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useGame(): Store {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
