import type { Episode, WisdomCard } from '../engine/types';
import { ep01 } from './episodes/ep01';

/**
 * The episode registry. Adding a new episode = write the file + add it here.
 * Nothing else in the engine or UI needs to change. Order is display order.
 */
export const episodes: Episode[] = [ep01];

export const episodeById: Record<string, Episode> = Object.fromEntries(
  episodes.map((e) => [e.id, e]),
);

export const allCards: WisdomCard[] = episodes.flatMap((e) => e.cards);

export const cardById: Record<string, WisdomCard> = Object.fromEntries(
  allCards.map((c) => [c.id, c]),
);

export const TOTAL_EPISODES = episodes.length;
export const TOTAL_CARDS = allCards.length;
