import { createContext, useContext } from 'react';
import type { GameState, SpeakerId } from '../engine/types';
import type { Progress } from './persistence';

/**
 * Context, hook, and shared state types live here — separate from gameStore.tsx
 * (which exports the GameProvider component). Keeping hooks/context out of the
 * component module keeps React Fast Refresh boundaries clean.
 */

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

export type Action =
  | { type: 'BOOT_DONE' }
  | { type: 'GO'; screen: Screen }
  | { type: 'START'; episodeId: string }
  | { type: 'CONTINUE' }
  | { type: 'CHOOSE'; optionId: string }
  | { type: 'FINISH_CALL' }
  | { type: 'MONTAGE_DONE' }
  | { type: 'DISMISS_CARDS' }
  | { type: 'RESET' };

export interface Store extends AppState {
  dispatch: React.Dispatch<Action>;
}

export const GameCtx = createContext<Store | null>(null);

export function useGame(): Store {
  const ctx = useContext(GameCtx);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
