import type { WisdomCard } from '../engine/types';

export function WisdomCardView({ card, locked }: { card: WisdomCard; locked?: boolean }) {
  const by = card.speaker === 'grace' ? 'grace' : 'rocky';
  const byLabel = card.speaker === 'grace' ? '— 格雷斯' : '— Rocky';
  return (
    <div className={`wcard${locked ? ' locked' : ''}`}>
      <div className="wc-text">{locked ? '？？？（尚未解锁）' : card.text}</div>
      {!locked && <div className={`wc-by ${by}`}>{byLabel}</div>}
    </div>
  );
}
