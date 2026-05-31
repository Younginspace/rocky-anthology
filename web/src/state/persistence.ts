import type { GameState } from '../engine/types';

/**
 * Versioned localStorage persistence. If the schema version changes or the
 * stored blob is corrupt, we fall back to a fresh state instead of crashing.
 */
const KEY = 'xct.save.v1';
const VERSION = 1;

export interface Progress {
  completedEpisodes: string[];
  unlockedCards: string[];
  montageSeen: boolean;
  bootSeen: boolean;
}

/** Plain transcript item (kept structural to avoid a gameStore↔persistence cycle). */
export interface SavedTranscriptItem {
  key: string;
  speaker: string;
  text: string;
  stage?: string;
}

export interface SavedSession {
  episodeId: string;
  state: GameState;
  transcript: SavedTranscriptItem[];
}

export interface SaveBlob {
  version: number;
  progress: Progress;
  /** The active in-call session, so a refresh resumes mid-conversation. */
  session: SavedSession | null;
}

export const emptyProgress = (): Progress => ({
  completedEpisodes: [],
  unlockedCards: [],
  montageSeen: false,
  bootSeen: false,
});

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === 'string');
}

/** Shape-validate a persisted session. Semantic checks (does the node exist?)
 *  happen in the store, which has the episode registry. */
function validateSession(s: unknown): SavedSession | null {
  if (!s || typeof s !== 'object') return null;
  const sess = s as Record<string, unknown>;
  const state = sess.state as Record<string, unknown> | undefined;
  if (typeof sess.episodeId !== 'string' || !state) return null;
  if (
    typeof state.nodeId !== 'string' ||
    typeof state.signal !== 'number' ||
    typeof state.episodeId !== 'string' ||
    !state.flags || typeof state.flags !== 'object' ||
    !isStringArray(state.unlockedCards) ||
    !isStringArray(state.appliedEffects) ||
    !isStringArray(state.history) ||
    (state.status !== 'active' && state.status !== 'ended')
  ) {
    return null;
  }
  const transcript = Array.isArray(sess.transcript)
    ? (sess.transcript as SavedTranscriptItem[]).filter(
        (t) => t && typeof t.key === 'string' && typeof t.text === 'string' && typeof t.speaker === 'string',
      )
    : [];
  return { episodeId: sess.episodeId, state: state as unknown as GameState, transcript };
}

export function load(): SaveBlob {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh();
    const parsed = JSON.parse(raw) as Partial<SaveBlob>;
    if (!parsed || parsed.version !== VERSION || !parsed.progress) return fresh();
    const p = parsed.progress;
    return {
      version: VERSION,
      progress: {
        completedEpisodes: isStringArray(p.completedEpisodes) ? p.completedEpisodes : [],
        unlockedCards: isStringArray(p.unlockedCards) ? p.unlockedCards : [],
        montageSeen: !!p.montageSeen,
        bootSeen: !!p.bootSeen,
      },
      session: validateSession(parsed.session),
    };
  } catch {
    return fresh();
  }
}

export function save(blob: SaveBlob): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(blob));
  } catch {
    /* storage full / disabled — game still works in-memory */
  }
}

export function wipe(): void {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}

function fresh(): SaveBlob {
  return { version: VERSION, progress: emptyProgress(), session: null };
}
