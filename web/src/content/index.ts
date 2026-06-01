import type { Episode, WisdomCard } from '../engine/types';
import { ep01 } from './episodes/ep01';
import { ep02 } from './episodes/ep02';
import { ep03 } from './episodes/ep03';
import { ep04 } from './episodes/ep04';
import { ep05 } from './episodes/ep05';
import { ep06 } from './episodes/ep06';
import { ep07 } from './episodes/ep07';
import { ep08 } from './episodes/ep08';
import { ep09 } from './episodes/ep09';
import { ep10 } from './episodes/ep10';
import { ep11 } from './episodes/ep11';

/**
 * The episode registry. Adding a new episode = write the file + add it here.
 * Nothing else in the engine or UI needs to change. Sorted by `order`.
 */
export const episodes: Episode[] = [ep01, ep02, ep03, ep04, ep05, ep06, ep07, ep08, ep09, ep10, ep11].sort(
  (a, b) => a.order - b.order,
);

export const episodeById: Record<string, Episode> = Object.fromEntries(
  episodes.map((e) => [e.id, e]),
);

export const allCards: WisdomCard[] = episodes.flatMap((e) => e.cards);

export const cardById: Record<string, WisdomCard> = Object.fromEntries(
  allCards.map((c) => [c.id, c]),
);

export const TOTAL_EPISODES = episodes.length;
export const TOTAL_CARDS = allCards.length;
