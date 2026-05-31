import { describe, expect, it } from 'vitest';
import {
  SIGNAL_START,
  choose,
  continueScene,
  currentView,
  evalCondition,
  resolveNodeId,
  signalTier,
  startEpisode,
} from './engine';
import type { Episode, GameState } from './types';

const fixture: Episode = {
  id: 'fix',
  order: 0,
  title: 'fixture',
  theme: 't',
  caller: {
    id: 'fx', handle: 'FX', realName: 'x', age: 1, location: 'l',
    tagline: 't', reason: 'r', outcomeShort: 'o', morningBeat: 'm', accent: 'amber',
  },
  startNodeId: 'open',
  cards: [
    { id: 'card_a', text: 'A', speaker: 'rocky', episodeId: 'fix' },
    { id: 'card_b', text: 'B', speaker: 'grace', episodeId: 'fix' },
  ],
  nodes: {
    open: { kind: 'scene', lines: [{ speaker: 'narrator', text: 'ring' }], next: 'pick' },
    pick: {
      kind: 'choice',
      choiceId: 'pick',
      options: [
        { id: 'honest', label: 'honest', effects: [{ type: 'signal', delta: 30 }, { type: 'flag', key: 'open', value: true }], next: 'gate' },
        { id: 'guard', label: 'guarded', effects: [{ type: 'signal', delta: 2 }], next: 'gate' },
      ],
    },
    gate: {
      kind: 'branch',
      branches: [{ when: { type: 'signalAtLeast', value: 60 }, goto: 'grace_scene' }],
      else: 'rocky_scene',
    },
    grace_scene: {
      kind: 'scene',
      lines: [{ speaker: 'grace', text: 'grace speaks', revealCardId: 'card_b' }],
      next: 'finish',
    },
    rocky_scene: {
      kind: 'scene',
      lines: [{ speaker: 'rocky', text: 'rocky alone', revealCardId: 'card_a' }],
      next: 'finish',
    },
    finish: {
      kind: 'ending',
      endingId: 'end_main',
      lines: [{ speaker: 'narrator', text: 'base' }],
      variants: [
        { when: { type: 'flag', key: 'open', equals: true }, lines: [{ speaker: 'narrator', text: 'warm variant' }] },
        { when: { type: 'signalBelow', value: 60 }, lines: [{ speaker: 'narrator', text: 'quiet variant' }] },
      ],
    },
  },
};

describe('signalTier', () => {
  it('maps numbers to coarse tiers', () => {
    expect(signalTier(0)).toBe('faint');
    expect(signalTier(40)).toBe('steady');
    expect(signalTier(60)).toBe('clear');
    expect(signalTier(85)).toBe('locked');
  });
});

describe('evalCondition', () => {
  const s = (over: Partial<GameState> = {}): GameState => ({
    episodeId: 'fix', nodeId: 'open', signal: 50, flags: {}, unlockedCards: [],
    appliedEffects: [], history: [], status: 'active', ...over,
  });
  it('handles signal + flags + boolean ops', () => {
    expect(evalCondition({ type: 'signalAtLeast', value: 50 }, s())).toBe(true);
    expect(evalCondition({ type: 'signalBelow', value: 50 }, s())).toBe(false);
    expect(evalCondition({ type: 'flagSet', key: 'x' }, s({ flags: { x: 1 } }))).toBe(true);
    expect(evalCondition({ type: 'flag', key: 'x', equals: 2 }, s({ flags: { x: 2 } }))).toBe(true);
    expect(evalCondition({ type: 'and', all: [{ type: 'always' }, { type: 'signalAtLeast', value: 10 }] }, s())).toBe(true);
    expect(evalCondition({ type: 'or', any: [{ type: 'signalAtLeast', value: 99 }, { type: 'always' }] }, s())).toBe(true);
    expect(evalCondition({ type: 'not', cond: { type: 'always' } }, s())).toBe(false);
  });
});

describe('startEpisode', () => {
  it('starts at the start node with baseline signal', () => {
    const st = startEpisode(fixture);
    expect(st.nodeId).toBe('open');
    expect(st.signal).toBe(SIGNAL_START);
    expect(st.status).toBe('active');
  });
});

describe('traversal — honest path reaches Grace + warm ending', () => {
  it('routes through the branch to grace and unlocks card_b', () => {
    let st = startEpisode(fixture);
    expect(currentView(fixture, st).kind).toBe('scene');
    st = continueScene(fixture, st); // open → pick
    const view = currentView(fixture, st);
    expect(view.kind).toBe('choice');
    st = choose(fixture, st, 'honest'); // +30 signal, flag open; branch → grace_scene
    expect(st.signal).toBe(SIGNAL_START + 30);
    expect(st.nodeId).toBe('grace_scene');
    expect(st.unlockedCards).toContain('card_b'); // unlocked on entry
    st = continueScene(fixture, st); // → finish (ending)
    expect(st.status).toBe('ended');
    const ending = currentView(fixture, st);
    expect(ending.kind).toBe('ending');
    if (ending.kind === 'ending') {
      const texts = ending.lines.map((l) => l.text);
      expect(texts).toContain('base');
      expect(texts).toContain('warm variant');   // flag open === true
      expect(texts).not.toContain('quiet variant'); // signal >= 60
    }
  });
});

describe('traversal — guarded path stays with Rocky + quiet ending', () => {
  it('routes to rocky_scene and quiet variant', () => {
    let st = startEpisode(fixture);
    st = continueScene(fixture, st);
    st = choose(fixture, st, 'guard'); // +2 signal only
    expect(st.signal).toBe(SIGNAL_START + 2);
    expect(st.nodeId).toBe('rocky_scene');
    expect(st.unlockedCards).toContain('card_a');
    st = continueScene(fixture, st);
    const ending = currentView(fixture, st);
    if (ending.kind === 'ending') {
      const texts = ending.lines.map((l) => l.text);
      expect(texts).toContain('quiet variant');
      expect(texts).not.toContain('warm variant');
    }
  });
});

describe('idempotent effects', () => {
  it('re-applying the same choice does not double-count signal', () => {
    let st = startEpisode(fixture);
    st = continueScene(fixture, st);
    const once = choose(fixture, st, 'honest');
    // Simulate a replay of the same transition from the same node state.
    const twice = choose(fixture, { ...once, nodeId: 'pick' }, 'honest');
    expect(twice.signal).toBe(once.signal); // not +60
  });
});

describe('resolveNodeId', () => {
  it('follows branch nodes to a renderable node', () => {
    const st = { ...startEpisode(fixture), signal: 90 };
    expect(resolveNodeId(fixture, st, 'gate')).toBe('grace_scene');
    const lowSt = { ...startEpisode(fixture), signal: 10 };
    expect(resolveNodeId(fixture, lowSt, 'gate')).toBe('rocky_scene');
  });
});
