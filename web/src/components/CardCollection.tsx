import { episodes, TOTAL_CARDS } from '../content';
import { useGame } from '../state/gameContext';
import { loc, UI } from '../lib/i18n';
import { WisdomCardView } from './WisdomCardView';

export function CardCollection() {
  const { progress, dispatch, lang } = useGame();
  const t = UI[lang];
  const count = progress.unlockedCards.length;

  return (
    <div className="scroll">
      <div className="coll-head">
        <div className="arch-kicker">{t.cardsKicker}</div>
        <h1 className="arch-title">{t.cardsTitle}</h1>
        <div className="coll-progress">{t.collected} {count} / {TOTAL_CARDS}</div>
      </div>

      <div className="pad" style={{ paddingTop: 8 }}>
        {count === 0 && (
          <div className="coll-empty">{t.cardsEmpty.split('\n').map((s, i) => <div key={i}>{s}</div>)}</div>
        )}
        {episodes.map((ep) => {
          const anyUnlocked = ep.cards.some((c) => progress.unlockedCards.includes(c.id));
          if (!anyUnlocked) return null;
          return (
            <div key={ep.id} style={{ marginBottom: 22 }}>
              <h4 className="coll-ep">{String(ep.order).padStart(2, '0')} · {loc(ep.title, lang)}</h4>
              {ep.cards.map((c) => (
                <WisdomCardView card={c} key={c.id} locked={!progress.unlockedCards.includes(c.id)} />
              ))}
            </div>
          );
        })}
      </div>

      <div className="pad center" style={{ paddingTop: 0 }}>
        <button className="btn ghost" onClick={() => dispatch({ type: 'GO', screen: 'archive' })}>{t.backArchivePlain}</button>
      </div>
    </div>
  );
}
