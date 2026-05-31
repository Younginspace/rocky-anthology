import { episodes, TOTAL_CARDS } from '../content';
import { useGame } from '../state/gameContext';
import { WisdomCardView } from './WisdomCardView';

export function CardCollection() {
  const { progress, dispatch } = useGame();
  const count = progress.unlockedCards.length;

  return (
    <div className="scroll">
      <div className="coll-head">
        <div className="arch-kicker">星语卡收藏 · WISDOM</div>
        <h1 className="arch-title">Rocky 说过的话</h1>
        <div className="coll-progress">已收集 {count} / {TOTAL_CARDS}</div>
      </div>

      <div className="pad" style={{ paddingTop: 8 }}>
        {count === 0 && (
          <div className="coll-empty">还没有解锁任何星语卡。<br />接通一通来电，陪 Rocky 聊一夜，就会收集到。</div>
        )}
        {episodes.map((ep) => {
          const anyUnlocked = ep.cards.some((c) => progress.unlockedCards.includes(c.id));
          if (!anyUnlocked) return null;
          return (
            <div key={ep.id} style={{ marginBottom: 22 }}>
              <h4 style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: '.1em', marginBottom: 12 }}>
                {String(ep.order).padStart(2, '0')} · {ep.title}
              </h4>
              {ep.cards.map((c) => (
                <WisdomCardView card={c} key={c.id} locked={!progress.unlockedCards.includes(c.id)} />
              ))}
            </div>
          );
        })}
      </div>

      <div className="pad center" style={{ paddingTop: 0 }}>
        <button className="btn ghost" onClick={() => dispatch({ type: 'GO', screen: 'archive' })}>← 返回通讯档案</button>
      </div>
    </div>
  );
}
