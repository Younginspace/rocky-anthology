import type { CallerProfile } from '../engine/types';

export const ACCENT_VAR: Record<CallerProfile['accent'], string> = {
  amber: 'var(--acc-amber)',
  cyan: 'var(--acc-cyan)',
  violet: 'var(--acc-violet)',
  rose: 'var(--acc-rose)',
  green: 'var(--acc-green)',
  gold: 'var(--acc-gold)',
};

export function accentStyle(accent: CallerProfile['accent']): React.CSSProperties {
  return { ['--accentc' as string]: ACCENT_VAR[accent] };
}

/** Avatar text — the handle prefix (e.g. "LW-0207" → "LW"). */
export function handleInitials(handle: string): string {
  return handle.split('-')[0]?.slice(0, 3) || '??';
}
