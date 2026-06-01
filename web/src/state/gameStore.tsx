import { useEffect, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CurrentView, Episode, GameState, LocalizedText, SpeakerId } from '../engine/types';
import { choose, continueScene, currentView, startEpisode } from '../engine/engine';
import { cardById, episodeById, episodes } from '../content';
import { load, loadMode, save, saveMode, type Progress } from './persistence';
import { GameCtx, type Action, type AppState, type Screen, type Session, type Store, type TranscriptItem } from './gameContext';

function linesForView(view: CurrentView): { speaker: SpeakerId; text: LocalizedText; stage?: LocalizedText }[] {
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
  } catch {
    // Engine guards + the validator should prevent this; degrade gracefully
    // by staying on the current state rather than crashing. (Reducer stays pure.)
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
      // Leaving an active call to the archive: mark the session "resumed" so
      // re-entering shows the existing transcript instantly (no re-animation).
      if (action.screen === 'archive' && state.session) {
        return { ...state, screen: 'archive', session: { ...state.session, resumed: true } };
      }
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

    case 'SET_LANG':
      return { ...state, lang: action.lang };

    case 'RESET':
      // Pure: return fresh state. The persistence effect writes the empty blob,
      // which is equivalent to wiping. (No side effects inside the reducer.)
      return {
        screen: 'archive',
        progress: { completedEpisodes: [], unlockedCards: [], montageSeen: false, bootSeen: true },
        session: null,
        pendingCards: [],
        lang: state.lang,
      };

    default:
      return state;
  }
}

function init(): AppState {
  const blob = load();

  // Normalize persisted progress against the live registry: drop unknown ids
  // and de-dupe, so a corrupted same-version save can't inflate counts or
  // wedge the "all episodes done?" check.
  const knownEpisodes = new Set(episodes.map((e) => e.id));
  const progress: Progress = {
    ...blob.progress,
    completedEpisodes: Array.from(new Set(blob.progress.completedEpisodes.filter((id) => knownEpisodes.has(id)))),
    unlockedCards: Array.from(new Set(blob.progress.unlockedCards.filter((id) => id in cardById))),
  };

  let screen: Screen = 'boot';
  let session: Session | null = null;
  if (blob.session) {
    const ep = episodeById[blob.session.episodeId];
    const st = blob.session.state;
    const node = ep?.nodes[st.nodeId];
    // Resume only if everything lines up: episode exists, the node exists and is
    // renderable (not a branch), and the state's own episodeId matches. Anything
    // else (stale/corrupt save) falls through to a fresh archive instead of
    // throwing in currentView and tripping the error boundary on every load.
    if (ep && node && node.kind !== 'branch' && st.episodeId === blob.session.episodeId) {
      const saved = blob.session.transcript as unknown as TranscriptItem[];
      const transcript = saved.length ? saved : appendNodeLines([], ep, st);
      session = { episodeId: blob.session.episodeId, state: st, transcript, resumed: true };
      screen = 'incall';
    }
  }
  if (!session && progress.bootSeen) screen = 'archive';
  return { screen, progress, session, pendingCards: [], lang: loadMode() };
}

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

  // Persist the display-mode preference under its own key.
  useEffect(() => { saveMode(state.lang); }, [state.lang]);

  const value = useMemo<Store>(() => ({ ...state, dispatch }), [state]);
  return <GameCtx.Provider value={value}>{children}</GameCtx.Provider>;
}
