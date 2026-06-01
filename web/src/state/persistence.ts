import type { GameState, LangMode, LocalizedText } from '../engine/types';

/**
 * Versioned localStorage persistence. If the schema version changes or the
 * stored blob is corrupt, we fall back to a fresh state instead of crashing.
 */
const KEY = 'xct.save.v1';
const VERSION = 1;
/** Display-mode preference lives under its own key so it can default to
 *  bilingual independently of the (older) save blob — returning players who
 *  never explicitly chose a mode get the bilingual default. */
const MODE_KEY = 'xct.mode.v1';

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
  text: LocalizedText;
  stage?: LocalizedText;
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

/** Display mode preference (own key; defaults to bilingual). */
export function loadMode(): LangMode {
  try {
    const v = localStorage.getItem(MODE_KEY);
    return v === 'zh' || v === 'en' || v === 'both' ? v : 'both';
  } catch {
    return 'both';
  }
}

export function saveMode(mode: LangMode): void {
  try { localStorage.setItem(MODE_KEY, mode); } catch { /* ignore */ }
}

/** Anonymous per-browser id ("random account"), persisted. Used to tag feedback. */
const UID_KEY = 'xct.uid';
function randomUid(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  } catch { /* fall through */ }
  return 'u-' + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
}
export function getUid(): string {
  try {
    let v = localStorage.getItem(UID_KEY);
    if (!v) { v = randomUid(); localStorage.setItem(UID_KEY, v); }
    return v;
  } catch {
    return randomUid();
  }
}
/** A short, friendly call-sign derived from the uid (e.g. "LISTENER-7F3A"). */
export function callSign(uid: string): string {
  const hex = uid.replace(/[^a-zA-Z0-9]/g, '').slice(-4).toUpperCase().padStart(4, '0');
  return `LISTENER-${hex}`;
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
        (t) => t && typeof t.key === 'string' && t.text != null && typeof t.speaker === 'string',
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
