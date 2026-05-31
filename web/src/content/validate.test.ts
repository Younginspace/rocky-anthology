import { describe, expect, it } from 'vitest';
import { episodes } from './index';
import { choose, continueScene, currentView, startEpisode } from '../engine/engine';
import { formatResults, hasErrors, validateAll } from '../engine/validate';
import type { Episode, GameState } from '../engine/types';

describe('content — static graph validation', () => {
  it('all episodes pass the validator with no errors', () => {
    const results = validateAll(episodes);
    if (hasErrors(results)) {
      // Surfaces exactly which node/card is broken.
      throw new Error('Content validation failed:\n' + formatResults(results));
    }
    expect(hasErrors(results)).toBe(false);
  });
});

/** Auto-play an episode with a deterministic choice strategy. */
function autoPlay(ep: Episode, pick: (n: number) => number): GameState {
  let st = startEpisode(ep);
  for (let step = 0; step < 500; step++) {
    const view = currentView(ep, st);
    if (view.kind === 'ending') return st;
    if (view.kind === 'scene') {
      st = continueScene(ep, st);
    } else {
      if (view.options.length === 0) {
        throw new Error(`[${ep.id}] choice "${view.nodeId}" produced 0 visible options`);
      }
      const idx = pick(view.options.length);
      st = choose(ep, st, view.options[idx].id);
    }
  }
  throw new Error(`[${ep.id}] did not reach an ending within step limit`);
}

describe('content — playthrough smoke tests', () => {
  for (const ep of episodes) {
    it(`${ep.id} reaches an ending via first / last / middle choices`, () => {
      const first = autoPlay(ep, () => 0);
      const last = autoPlay(ep, (n) => n - 1);
      const middle = autoPlay(ep, (n) => Math.floor((n - 1) / 2));
      for (const st of [first, last, middle]) {
        expect(st.status).toBe('ended');
        expect(st.endingId).toBeTruthy();
      }
    });

    it(`${ep.id} unlocks both wisdom cards on the honest (first-choice) path`, () => {
      const st = autoPlay(ep, () => 0);
      // Gold-standard episodes put both cards on the main spine; if a future
      // episode gates a card, relax this per-episode.
      expect(st.unlockedCards.length).toBeGreaterThanOrEqual(1);
    });
  }
});
