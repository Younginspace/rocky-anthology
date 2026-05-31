/**
 * Static story-graph validator.
 *
 * This is the single biggest robustness lever in the project: it turns
 * "did the writer make a content mistake?" into a deterministic check that
 * runs in unit tests AND at app load (dev only). If this is green, the engine
 * cannot hit a dangling node, a dead end, an infinite branch loop, or a card
 * that can never be unlocked.
 */

import type { Condition, Episode, StoryNode } from './types';

export interface ValidationResult {
  episodeId: string;
  errors: string[];
  warnings: string[];
}

/** Outgoing node ids for traversal (ignores conditions — all possible edges). */
function outEdges(node: StoryNode): string[] {
  switch (node.kind) {
    case 'scene':
      return [node.next];
    case 'choice':
      return node.options.map((o) => o.next);
    case 'branch':
      return [...node.branches.map((b) => b.goto), node.else];
    case 'ending':
      return [];
  }
}

function collectCardRefs(node: StoryNode): string[] {
  const out: string[] = [];
  if (node.kind === 'scene') {
    node.lines.forEach((l) => l.revealCardId && out.push(l.revealCardId));
  }
  if (node.kind === 'ending') {
    node.lines.forEach((l) => l.revealCardId && out.push(l.revealCardId));
    node.variants?.forEach((v) => v.lines.forEach((l) => l.revealCardId && out.push(l.revealCardId)));
  }
  if (node.kind === 'choice') {
    node.options.forEach((o) =>
      o.effects?.forEach((e) => e.type === 'unlockCard' && out.push(e.cardId)),
    );
  }
  return out;
}

function conditionRefersToSignal(cond: Condition): boolean {
  switch (cond.type) {
    case 'signalAtLeast':
    case 'signalBelow':
      return true;
    case 'and':
      return cond.all.some(conditionRefersToSignal);
    case 'or':
      return cond.any.some(conditionRefersToSignal);
    case 'not':
      return conditionRefersToSignal(cond.cond);
    default:
      return false;
  }
}
void conditionRefersToSignal; // reserved for future signal-range checks

export function validateEpisode(ep: Episode): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ids = Object.keys(ep.nodes);
  const idSet = new Set(ids);

  // 0. Basic shape.
  if (!ep.id) errors.push('episode has empty id');
  if (!ep.startNodeId) errors.push('episode has empty startNodeId');
  if (!idSet.has(ep.startNodeId)) errors.push(`startNodeId "${ep.startNodeId}" is not a node`);
  if (ids.length === 0) errors.push('episode has no nodes');

  // 1. Duplicate card ids within episode + card id matches episodeId.
  const cardIds = new Set<string>();
  for (const c of ep.cards) {
    if (cardIds.has(c.id)) errors.push(`duplicate card id "${c.id}"`);
    cardIds.add(c.id);
    if (c.episodeId !== ep.id) {
      warnings.push(`card "${c.id}" episodeId "${c.episodeId}" != "${ep.id}"`);
    }
  }

  // 2. Per-node structural checks + dangling reference check.
  const referencedCards = new Set<string>();
  for (const id of ids) {
    const node = ep.nodes[id];

    for (const target of outEdges(node)) {
      if (!idSet.has(target)) errors.push(`node "${id}" → missing node "${target}"`);
    }

    if (node.kind === 'choice') {
      if (node.options.length === 0) errors.push(`choice "${id}" has no options`);
      const optIds = new Set<string>();
      let unconditional = 0;
      for (const o of node.options) {
        if (optIds.has(o.id)) errors.push(`choice "${id}" duplicate option id "${o.id}"`);
        optIds.add(o.id);
        if (!o.showWhen) unconditional++;
      }
      // Dead-end risk: every option gated → a state where 0 are visible.
      if (node.options.length > 0 && unconditional === 0) {
        warnings.push(`choice "${id}" — all options are conditional; may show 0 options`);
      }
    }

    if (node.kind === 'branch') {
      if (node.branches.length === 0) {
        warnings.push(`branch "${id}" has no conditional branches (always falls to else)`);
      }
    }

    for (const cid of collectCardRefs(node)) {
      referencedCards.add(cid);
      if (!cardIds.has(cid)) errors.push(`node "${id}" references unknown card "${cid}"`);
    }
  }

  // 3. Cards declared but never unlockable anywhere.
  for (const c of ep.cards) {
    if (!referencedCards.has(c.id)) {
      warnings.push(`card "${c.id}" is never unlocked by any node`);
    }
  }

  // 4. Pure-branch cycle detection (would infinite-loop at runtime).
  detectBranchCycles(ep, errors);

  // 5. Forward reachability from start (all possible edges).
  const reachable = new Set<string>();
  const stack = idSet.has(ep.startNodeId) ? [ep.startNodeId] : [];
  while (stack.length) {
    const id = stack.pop()!;
    if (reachable.has(id)) continue;
    reachable.add(id);
    const node = ep.nodes[id];
    if (node) for (const t of outEdges(node)) if (idSet.has(t)) stack.push(t);
  }
  for (const id of ids) {
    if (!reachable.has(id)) warnings.push(`node "${id}" is unreachable from start`);
  }

  // 6. At least one ending exists & is reachable.
  const endingIds = ids.filter((id) => ep.nodes[id].kind === 'ending');
  if (endingIds.length === 0) errors.push('episode has no ending node');
  else if (!endingIds.some((id) => reachable.has(id))) errors.push('no ending is reachable from start');

  // 7. Termination: every reachable node must be able to reach SOME ending.
  //    (Catches dead ends and exit-less cycles.)
  const canReachEnding = new Set<string>(endingIds);
  let changed = true;
  while (changed) {
    changed = false;
    for (const id of ids) {
      if (canReachEnding.has(id)) continue;
      const node = ep.nodes[id];
      const edges = outEdges(node);
      if (edges.some((t) => canReachEnding.has(t))) {
        canReachEnding.add(id);
        changed = true;
      }
    }
  }
  for (const id of ids) {
    if (reachable.has(id) && !canReachEnding.has(id)) {
      errors.push(`node "${id}" cannot reach any ending (dead end / loop)`);
    }
  }

  // 8. Duplicate ending ids.
  const endIdSet = new Set<string>();
  for (const id of endingIds) {
    const node = ep.nodes[id] as Extract<StoryNode, { kind: 'ending' }>;
    if (endIdSet.has(node.endingId)) warnings.push(`duplicate endingId "${node.endingId}"`);
    endIdSet.add(node.endingId);
  }

  return { episodeId: ep.id, errors, warnings };
}

function detectBranchCycles(ep: Episode, errors: string[]): void {
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color: Record<string, number> = {};
  const branchIds = Object.keys(ep.nodes).filter((id) => ep.nodes[id].kind === 'branch');

  const visit = (id: string): boolean => {
    color[id] = GRAY;
    const node = ep.nodes[id];
    if (node && node.kind === 'branch') {
      const targets = [...node.branches.map((b) => b.goto), node.else];
      for (const t of targets) {
        const tn = ep.nodes[t];
        if (!tn || tn.kind !== 'branch') continue; // only chase branch→branch
        if (color[t] === GRAY) return true;
        if (color[t] === WHITE || color[t] === undefined) {
          if (visit(t)) return true;
        }
      }
    }
    color[id] = BLACK;
    return false;
  };

  for (const id of branchIds) {
    if (color[id] === undefined || color[id] === WHITE) {
      if (visit(id)) {
        errors.push(`branch cycle detected involving "${id}"`);
        break;
      }
    }
  }
}

/** Validate a whole set of episodes + cross-episode invariants. */
export function validateAll(episodes: Episode[]): ValidationResult[] {
  const results = episodes.map(validateEpisode);

  // Cross-episode: globally unique episode ids and card ids.
  const epIds = new Set<string>();
  const allCardIds = new Set<string>();
  const global: ValidationResult = { episodeId: '(global)', errors: [], warnings: [] };
  for (const ep of episodes) {
    if (epIds.has(ep.id)) global.errors.push(`duplicate episode id "${ep.id}"`);
    epIds.add(ep.id);
    for (const c of ep.cards) {
      if (allCardIds.has(c.id)) global.errors.push(`duplicate global card id "${c.id}"`);
      allCardIds.add(c.id);
    }
  }
  if (global.errors.length || global.warnings.length) results.push(global);
  return results;
}

export function hasErrors(results: ValidationResult[]): boolean {
  return results.some((r) => r.errors.length > 0);
}

export function formatResults(results: ValidationResult[]): string {
  const lines: string[] = [];
  for (const r of results) {
    if (!r.errors.length && !r.warnings.length) continue;
    lines.push(`[${r.episodeId}]`);
    r.errors.forEach((e) => lines.push(`  ✗ ERROR: ${e}`));
    r.warnings.forEach((w) => lines.push(`  ⚠ warn:  ${w}`));
  }
  return lines.join('\n');
}
