import type { WisdomCard } from '../engine/types';
import { useGame } from '../state/gameContext';
import { chromeLang, UI } from '../lib/i18n';
import { Bi } from './Bi';

export function WisdomCardView({ card, locked }: { card: WisdomCard; locked?: boolean }) {
  const { lang } = useGame();
  const t = UI[chromeLang(lang)];
  const by = card.speaker === 'grace' ? 'grace' : 'rocky';
  const byLabel = card.speaker === 'grace' ? t.byGrace : t.byRocky;
  return (
    <div className={`wcard${locked ? ' locked' : ''}`}>
      <div className="wc-text">{locked ? t.cardLocked : <Bi text={card.text} />}</div>
      {!locked && <div className={`wc-by ${by}`}>{byLabel}</div>}
    </div>
  );
}
