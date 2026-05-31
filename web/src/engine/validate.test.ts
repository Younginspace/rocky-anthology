import { describe, expect, it } from 'vitest';
import { validateEpisode } from './validate';
import type { Episode } from './types';

const baseCaller = {
  id: 'x', handle: 'X', realName: 'x', age: 1, location: 'l',
  tagline: 't', reason: 'r', outcomeShort: 'o', morningBeat: 'm', accent: 'amber' as const,
};

function ep(partial: Partial<Episode> & Pick<Episode, 'nodes' | 'startNodeId'>): Episode {
  return {
    id: 'e', order: 0, title: 't', theme: 't', caller: baseCaller, cards: [],
    ...partial,
  };
}

describe('validateEpisode', () => {
  it('passes a well-formed episode', () => {
    const e = ep({
      startNodeId: 'a',
      cards: [{ id: 'c1', text: 'x', speaker: 'rocky', episodeId: 'e' }],
      nodes: {
        a: { kind: 'scene', lines: [{ speaker: 'rocky', text: 'hi', revealCardId: 'c1' }], next: 'b' },
        b: { kind: 'ending', endingId: 'end', lines: [{ speaker: 'narrator', text: 'bye' }] },
      },
    });
    const r = validateEpisode(e);
    expect(r.errors).toEqual([]);
  });

  it('catches dangling node references', () => {
    const e = ep({
      startNodeId: 'a',
      nodes: {
        a: { kind: 'scene', lines: [{ speaker: 'rocky', text: 'hi' }], next: 'nope' },
      },
    });
    const r = validateEpisode(e);
    expect(r.errors.some((x) => x.includes('missing node "nope"'))).toBe(true);
  });

  it('catches missing card references', () => {
    const e = ep({
      startNodeId: 'a',
      nodes: {
        a: { kind: 'scene', lines: [{ speaker: 'rocky', text: 'hi', revealCardId: 'ghost' }], next: 'b' },
        b: { kind: 'ending', endingId: 'end', lines: [] },
      },
    });
    const r = validateEpisode(e);
    expect(r.errors.some((x) => x.includes('unknown card "ghost"'))).toBe(true);
  });

  it('catches an episode with no ending', () => {
    const e = ep({
      startNodeId: 'a',
      nodes: {
        a: { kind: 'scene', lines: [{ speaker: 'rocky', text: 'hi' }], next: 'a' },
      },
    });
    const r = validateEpisode(e);
    expect(r.errors.some((x) => x.includes('no ending'))).toBe(true);
  });

  it('catches a dead-end loop that cannot reach an ending', () => {
    const e = ep({
      startNodeId: 'a',
      nodes: {
        a: { kind: 'scene', lines: [{ speaker: 'rocky', text: '1' }], next: 'b' },
        b: { kind: 'scene', lines: [{ speaker: 'rocky', text: '2' }], next: 'a' },
        c: { kind: 'ending', endingId: 'end', lines: [] }, // unreachable ending
      },
    });
    const r = validateEpisode(e);
    expect(r.errors.some((x) => x.includes('cannot reach any ending'))).toBe(true);
  });

  it('catches a pure-branch cycle', () => {
    const e = ep({
      startNodeId: 'a',
      nodes: {
        a: { kind: 'branch', branches: [], else: 'b' },
        b: { kind: 'branch', branches: [], else: 'a' },
        z: { kind: 'ending', endingId: 'end', lines: [] },
      },
    });
    const r = validateEpisode(e);
    expect(r.errors.some((x) => x.includes('branch cycle'))).toBe(true);
  });

  it('warns when all options are conditional', () => {
    const e = ep({
      startNodeId: 'a',
      nodes: {
        a: {
          kind: 'choice', choiceId: 'a',
          options: [{ id: 'o1', label: 'x', next: 'b', showWhen: { type: 'flagSet', key: 'q' } }],
        },
        b: { kind: 'ending', endingId: 'end', lines: [] },
      },
    });
    const r = validateEpisode(e);
    expect(r.warnings.some((x) => x.includes('may show 0 options'))).toBe(true);
  });
});
