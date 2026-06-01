import { useEffect } from 'react';
import { cardById } from '../content';
import { useGame } from '../state/gameContext';
import { loc, UI } from '../lib/i18n';

/** Transient "wisdom unlocked" toast for newly unlocked cards. */
export function CardToast() {
  const { pendingCards, dispatch, lang } = useGame();
  const t = UI[lang];

  useEffect(() => {
    if (pendingCards.length === 0) return;
    const timer = setTimeout(() => dispatch({ type: 'DISMISS_CARDS' }), 4200);
    return () => clearTimeout(timer);
  }, [pendingCards, dispatch]);

  if (pendingCards.length === 0) return null;

  return (
    <div className="toast-wrap">
      {pendingCards.map((id) => {
        const card = cardById[id];
        if (!card) return null;
        return (
          <div className="toast" key={id} role="status">
            <div className="tk">{t.cardUnlocked}</div>
            <div className="tt">{loc(card.text, lang)}</div>
          </div>
        );
      })}
    </div>
  );
}
