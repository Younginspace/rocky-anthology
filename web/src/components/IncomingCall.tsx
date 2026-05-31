import type { Episode } from '../engine/types';
import { accentStyle, handleInitials } from '../lib/ui';

export function IncomingCall({
  ep,
  onAnswer,
  onDismiss,
}: {
  ep: Episode;
  onAnswer: () => void;
  onDismiss: () => void;
}) {
  const c = ep.caller;
  return (
    <div className="incoming scroll fadein" style={accentStyle(c.accent)}>
      <div className="ring-pulse">
        <div className="halo" /><div className="halo" /><div className="halo" />
        <div className="core">{handleInitials(c.handle)}</div>
      </div>
      <div className="who-kicker">来电接入 · INCOMING</div>
      <div className="who-name">{c.realName}</div>
      <div className="who-line">{c.tagline}</div>
      <div className="who-meta">{c.age} 岁 · {c.location}</div>
      <p className="reason">{c.reason}</p>
      <div className="actions">
        <button className="btn ghost" onClick={onDismiss}>稍后</button>
        <button className="btn" onClick={onAnswer}>接听 ●</button>
      </div>
    </div>
  );
}
