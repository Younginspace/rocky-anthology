import type { Episode } from '../engine/types';
import { useGame } from '../state/gameContext';
import { loc, UI } from '../lib/i18n';
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
  const { lang } = useGame();
  const t = UI[lang];
  const c = ep.caller;
  return (
    <div className="incoming scroll fadein" style={accentStyle(c.accent)}>
      <div className="incoming-inner">
        <div className="ring-pulse">
          <div className="halo" /><div className="halo" /><div className="halo" />
          <div className="core">{handleInitials(c.handle)}</div>
        </div>
        <div className="who-kicker">{t.incomingKicker}</div>
        <div className="who-name">{loc(c.realName, lang)}</div>
        <div className="who-line">{loc(c.tagline, lang)}</div>
        <div className="who-meta">{t.agePrefix}{c.age}{t.ageSuffix}{loc(c.location, lang)}</div>
        <p className="reason">{loc(c.reason, lang)}</p>
        <div className="actions">
          <button className="btn ghost" onClick={onDismiss}>{t.later}</button>
          <button className="btn" onClick={onAnswer}>{t.answer}</button>
        </div>
      </div>
    </div>
  );
}
