import { useEffect } from 'react';
import { cardById } from '../content';
import { useGame } from '../state/gameContext';

/** Transient "星语卡解锁" toast for newly unlocked cards. */
export function CardToast() {
  const { pendingCards, dispatch } = useGame();

  useEffect(() => {
    if (pendingCards.length === 0) return;
    const t = setTimeout(() => dispatch({ type: 'DISMISS_CARDS' }), 4200);
    return () => clearTimeout(t);
  }, [pendingCards, dispatch]);

  if (pendingCards.length === 0) return null;

  return (
    <div className="toast-wrap">
      {pendingCards.map((id) => {
        const card = cardById[id];
        if (!card) return null;
        return (
          <div className="toast" key={id} role="status">
            <div className="tk">★ 星语卡解锁</div>
            <div className="tt">{card.text}</div>
          </div>
        );
      })}
    </div>
  );
}
