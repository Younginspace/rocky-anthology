/**
 * 《星际长途》 narrative engine — type contract.
 *
 * Content (episodes) is pure typed data conforming to these types. The engine
 * (engine.ts) interprets it deterministically. The UI never reaches into
 * content directly — it renders whatever `currentView()` returns.
 *
 * Design rules baked into the types (see docs/specs design v2 + codex review):
 *  - Signal/flag mutations happen ONLY on choice transitions (never on passive
 *    line rendering) → no double-apply on refresh/backtrack.
 *  - Card unlocks are naturally idempotent (a Set add), so lines may carry them.
 *  - Stable string ids everywhere (nodeId, choiceId, cardId) for save/test.
 *  - No Math.random / Date.now anywhere in the engine.
 */

export type SpeakerId = 'rocky' | 'grace' | 'caller' | 'narrator' | 'system';

export type FlagValue = boolean | number | string;

export type Lang = 'zh' | 'en';

/**
 * A piece of player-facing text. During the zh→bilingual migration this is a
 * union: legacy plain strings still compile, and `loc()` resolves either form.
 * New content uses the { zh, en } form.
 */
export type LocalizedText = string | { zh: string; en: string };

/** A single beat of text from one speaker. */
export interface Line {
  speaker: SpeakerId;
  text: LocalizedText;
  /** Unlock this card the moment this line is reached (idempotent). */
  revealCardId?: string;
  /** Optional stage direction shown in muted italics (e.g. "[通讯延迟 4 秒]"). */
  stage?: LocalizedText;
}

/** A choice the player (as the caller) can make. */
export interface ChoiceOption {
  /** Stable within the choice node. Used for save/history/tests. */
  id: string;
  /** What the caller says / thinks — shown to the player. */
  label: LocalizedText;
  /** Applied exactly once when this option is chosen (idempotent guard). */
  effects?: Effect[];
  /** Next node id. */
  next: string;
  /** If present and false, the option is hidden. */
  showWhen?: Condition;
}

export type Effect =
  | { type: 'signal'; delta: number }
  | { type: 'flag'; key: string; value: FlagValue }
  | { type: 'unlockCard'; cardId: string };

export type Condition =
  | { type: 'signalAtLeast'; value: number }
  | { type: 'signalBelow'; value: number }
  | { type: 'flag'; key: string; equals: FlagValue }
  | { type: 'flagSet'; key: string }
  | { type: 'and'; all: Condition[] }
  | { type: 'or'; any: Condition[] }
  | { type: 'not'; cond: Condition }
  | { type: 'always' };

/** A paragraph appended to an ending when its condition matches. */
export interface EndingVariant {
  when: Condition;
  lines: Line[];
}

export type StoryNode =
  /** A block of sequential lines; UI reveals them one at a time. */
  | { kind: 'scene'; lines: Line[]; next: string }
  /** Player picks an option. */
  | { kind: 'choice'; choiceId: string; prompt?: LocalizedText; options: ChoiceOption[] }
  /** Engine auto-routes by condition (no UI). */
  | { kind: 'branch'; branches: Array<{ when: Condition; goto: string }>; else: string }
  /** Terminal node. base lines + any matching variant paragraphs. */
  | {
      kind: 'ending';
      endingId: string;
      lines: Line[];
      variants?: EndingVariant[];
    };

export interface WisdomCard {
  id: string;
  /** The line itself. */
  text: LocalizedText;
  speaker: SpeakerId;
  episodeId: string;
}

export interface CallerProfile {
  id: string;
  /** Comms handle / codename, e.g. "LW-0207". */
  handle: string;
  realName: LocalizedText;
  age: number;
  /** Where they're calling from. */
  location: LocalizedText;
  /** One-line who-they-are, shown on the incoming-call card. */
  tagline: LocalizedText;
  /** The "why they called" framing line(s) for the dial-in screen. */
  reason: LocalizedText;
  /** Revealed in the archive after completion: where they ended up. */
  outcomeShort: LocalizedText;
  /** One line for the "morning after" montage. */
  morningBeat: LocalizedText;
  /** Visual accent color key for this caller. */
  accent: 'amber' | 'cyan' | 'violet' | 'rose' | 'green' | 'gold';
}

export interface Episode {
  id: string;
  /** Episode number for ordering / display. */
  order: number;
  title: LocalizedText;
  subtitle?: LocalizedText;
  caller: CallerProfile;
  /** One-sentence theme, for the archive. */
  theme: LocalizedText;
  startNodeId: string;
  nodes: Record<string, StoryNode>;
  cards: WisdomCard[];
}

// ── Runtime state ──────────────────────────────────────────────────────────

export interface GameState {
  episodeId: string;
  /** Current node being viewed. */
  nodeId: string;
  /** Hidden 0..100 connection value. Never shown as a number to the player. */
  signal: number;
  flags: Record<string, FlagValue>;
  unlockedCards: string[];
  /** Keys `${nodeId}#${optionId}` whose effects were already applied. */
  appliedEffects: string[];
  /** Node ids visited, in order (for back-stepping / debugging). */
  history: string[];
  status: 'active' | 'ended';
  endingId?: string;
}

/** Coarse, player-facing signal label — never a number. */
export type SignalTier = 'faint' | 'steady' | 'clear' | 'locked';

/** What the UI should render right now. */
export type CurrentView =
  | { kind: 'scene'; nodeId: string; lines: Line[]; canContinue: true }
  | {
      kind: 'choice';
      nodeId: string;
      prompt?: LocalizedText;
      options: Array<{ id: string; label: LocalizedText }>;
    }
  | { kind: 'ending'; nodeId: string; endingId: string; lines: Line[] };
