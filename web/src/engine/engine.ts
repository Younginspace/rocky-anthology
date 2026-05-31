/**
 * 《星际长途》 narrative engine — pure interpreter.
 *
 * Every function here is pure and deterministic: no Math.random, no Date.now,
 * no DOM, no storage. Given the same (episode, state, input) it always returns
 * the same result, which makes the whole thing replayable and unit-testable.
 */

import type {
  Condition,
  CurrentView,
  Effect,
  Episode,
  FlagValue,
  GameState,
  Line,
  SignalTier,
  StoryNode,
} from './types';

export const SIGNAL_START = 42;
export const SIGNAL_MIN = 0;
export const SIGNAL_MAX = 100;

/** Coarse tier thresholds. Player sees the tier, never the number. */
export function signalTier(signal: number): SignalTier {
  if (signal >= 80) return 'locked';
  if (signal >= 58) return 'clear';
  if (signal >= 32) return 'steady';
  return 'faint';
}

export const SIGNAL_TIER_LABEL: Record<SignalTier, string> = {
  faint: '微弱',
  steady: '平稳',
  clear: '清晰',
  locked: '锁定',
};

function clampSignal(n: number): number {
  return Math.max(SIGNAL_MIN, Math.min(SIGNAL_MAX, n));
}

// ── Conditions ───────────────────────────────────────────────────────────

export function evalCondition(cond: Condition, state: GameState): boolean {
  switch (cond.type) {
    case 'always':
      return true;
    case 'signalAtLeast':
      return state.signal >= cond.value;
    case 'signalBelow':
      return state.signal < cond.value;
    case 'flagSet':
      return Object.prototype.hasOwnProperty.call(state.flags, cond.key);
    case 'flag':
      return state.flags[cond.key] === cond.equals;
    case 'and':
      return cond.all.every((c) => evalCondition(c, state));
    case 'or':
      return cond.any.some((c) => evalCondition(c, state));
    case 'not':
      return !evalCondition(cond.cond, state);
    default: {
      // Exhaustiveness guard.
      const _never: never = cond;
      void _never;
      return false;
    }
  }
}

// ── State init ───────────────────────────────────────────────────────────

export function startEpisode(episode: Episode): GameState {
  const base: GameState = {
    episodeId: episode.id,
    nodeId: episode.startNodeId,
    signal: SIGNAL_START,
    flags: {},
    unlockedCards: [],
    appliedEffects: [],
    history: [],
    status: 'active',
  };
  // Resolve through any leading branch nodes and unlock entry cards.
  return enterNode(episode, base, episode.startNodeId);
}

// ── Node resolution ──────────────────────────────────────────────────────

const MAX_HOPS = 64;

/**
 * Follow `branch` nodes (which auto-route by condition) until landing on a
 * renderable node (scene / choice / ending). Returns the resolved node id.
 * Throws if it can't resolve within MAX_HOPS (cycle / bad content) — the
 * validator is expected to prevent this in shipped content.
 */
export function resolveNodeId(episode: Episode, state: GameState, fromId: string): string {
  let id = fromId;
  for (let hops = 0; hops < MAX_HOPS; hops++) {
    const node = episode.nodes[id];
    if (!node) throw new EngineError(`Missing node "${id}" in episode "${episode.id}"`);
    if (node.kind !== 'branch') return id;
    id = routeBranch(node, state);
  }
  throw new EngineError(`Branch resolution exceeded ${MAX_HOPS} hops at "${fromId}" in "${episode.id}"`);
}

function routeBranch(
  node: Extract<StoryNode, { kind: 'branch' }>,
  state: GameState,
): string {
  for (const b of node.branches) {
    if (evalCondition(b.when, state)) return b.goto;
  }
  return node.else;
}

/**
 * Move into a node: resolve branches, record history, unlock any cards that
 * the node's lines carry (idempotent), and set ended status for endings.
 */
function enterNode(episode: Episode, state: GameState, targetId: string): GameState {
  const nodeId = resolveNodeId(episode, state, targetId);
  const node = episode.nodes[nodeId];

  const next: GameState = {
    ...state,
    nodeId,
    history: state.history[state.history.length - 1] === nodeId
      ? state.history
      : [...state.history, nodeId],
  };

  // Unlock cards referenced by lines of the node we just entered.
  const lineCards = collectLineCards(node);
  if (lineCards.length) {
    next.unlockedCards = unionCards(state.unlockedCards, lineCards);
  }

  if (node.kind === 'ending') {
    next.status = 'ended';
    next.endingId = node.endingId;
  }
  return next;
}

function collectLineCards(node: StoryNode): string[] {
  const out: string[] = [];
  const pull = (lines: Line[]) => {
    for (const l of lines) if (l.revealCardId) out.push(l.revealCardId);
  };
  if (node.kind === 'scene') pull(node.lines);
  if (node.kind === 'ending') {
    pull(node.lines);
    node.variants?.forEach((v) => pull(v.lines));
  }
  return out;
}

function unionCards(existing: string[], add: string[]): string[] {
  const set = new Set(existing);
  let changed = false;
  for (const c of add) if (!set.has(c)) { set.add(c); changed = true; }
  return changed ? Array.from(set) : existing;
}

// ── View ─────────────────────────────────────────────────────────────────

/** Compute what the UI should render for the current state. */
export function currentView(episode: Episode, state: GameState): CurrentView {
  const node = episode.nodes[state.nodeId];
  if (!node) throw new EngineError(`Missing node "${state.nodeId}" in "${episode.id}"`);

  switch (node.kind) {
    case 'scene':
      return { kind: 'scene', nodeId: state.nodeId, lines: node.lines, canContinue: true };

    case 'choice': {
      const options = node.options
        .filter((o) => !o.showWhen || evalCondition(o.showWhen, state))
        .map((o) => ({ id: o.id, label: o.label }));
      return { kind: 'choice', nodeId: state.nodeId, prompt: node.prompt, options };
    }

    case 'ending': {
      const lines: Line[] = [...node.lines];
      node.variants?.forEach((v) => {
        if (evalCondition(v.when, state)) lines.push(...v.lines);
      });
      return { kind: 'ending', nodeId: state.nodeId, endingId: node.endingId, lines };
    }

    case 'branch':
      // Should never be the current node — enterNode resolves through branches.
      throw new EngineError(`currentView landed on a branch node "${state.nodeId}"`);

    default: {
      const _never: never = node;
      void _never;
      throw new EngineError('Unknown node kind');
    }
  }
}

// ── Transitions ──────────────────────────────────────────────────────────

/** Advance from a `scene` node to its next node. */
export function continueScene(episode: Episode, state: GameState): GameState {
  const node = episode.nodes[state.nodeId];
  if (!node || node.kind !== 'scene') {
    throw new EngineError(`continueScene called on non-scene node "${state.nodeId}"`);
  }
  return enterNode(episode, state, node.next);
}

/** Choose an option at a `choice` node. Applies effects exactly once. */
export function choose(episode: Episode, state: GameState, optionId: string): GameState {
  const node = episode.nodes[state.nodeId];
  if (!node || node.kind !== 'choice') {
    throw new EngineError(`choose called on non-choice node "${state.nodeId}"`);
  }
  const option = node.options.find((o) => o.id === optionId);
  if (!option) throw new EngineError(`Unknown option "${optionId}" at "${state.nodeId}"`);
  if (option.showWhen && !evalCondition(option.showWhen, state)) {
    throw new EngineError(`Hidden option "${optionId}" chosen at "${state.nodeId}"`);
  }

  const effectKey = `${state.nodeId}#${optionId}`;
  let working = state;
  if (option.effects && !state.appliedEffects.includes(effectKey)) {
    working = applyEffects(state, option.effects);
    working = { ...working, appliedEffects: [...working.appliedEffects, effectKey] };
  }
  return enterNode(episode, working, option.next);
}

function applyEffects(state: GameState, effects: Effect[]): GameState {
  let signal = state.signal;
  let flags = state.flags;
  let cards = state.unlockedCards;
  for (const e of effects) {
    if (e.type === 'signal') {
      signal = clampSignal(signal + e.delta);
    } else if (e.type === 'flag') {
      flags = { ...flags, [e.key]: e.value };
    } else if (e.type === 'unlockCard') {
      cards = unionCards(cards, [e.cardId]);
    }
  }
  return { ...state, signal, flags, unlockedCards: cards };
}

// ── Error type ─────────────────────────────────────────────────────────────

export class EngineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EngineError';
  }
}

// Re-export for convenience.
export type { FlagValue };
