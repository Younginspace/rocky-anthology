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

export interface SaveBlob {
  version: number;
  progress: Progress;
  /** The active in-call session, so a refresh resumes mid-conversation. */
  session: { episodeId: string; state: GameState } | null;
}

export const emptyProgress = (): Progress => ({
  completedEpisodes: [],
  unlockedCards: [],
  montageSeen: false,
  bootSeen: false,
});

export function load(): SaveBlob {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh();
    const parsed = JSON.parse(raw) as Partial<SaveBlob>;
    if (!parsed || parsed.version !== VERSION || !parsed.progress) return fresh();
    // Defensive normalisation.
    const p = parsed.progress;
    return {
      version: VERSION,
      progress: {
        completedEpisodes: Array.isArray(p.completedEpisodes) ? p.completedEpisodes : [],
        unlockedCards: Array.isArray(p.unlockedCards) ? p.unlockedCards : [],
        montageSeen: !!p.montageSeen,
        bootSeen: !!p.bootSeen,
      },
      session: parsed.session ?? null,
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
