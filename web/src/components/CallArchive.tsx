import { useState } from 'react';
import type { Episode } from '../engine/types';
import { episodes, TOTAL_CARDS } from '../content';
import { useGame } from '../state/gameContext';
import { accentStyle, handleInitials } from '../lib/ui';
import { IncomingCall } from './IncomingCall';

export function CallArchive() {
  const { progress, dispatch } = useGame();
  const [incoming, setIncoming] = useState<Episode | null>(null);

  if (incoming) {
    return (
      <IncomingCall
        ep={incoming}
        onAnswer={() => dispatch({ type: 'START', episodeId: incoming.id })}
        onDismiss={() => setIncoming(null)}
      />
    );
  }

  const completedSet = new Set(progress.completedEpisodes);
  const doneCount = episodes.filter((e) => completedSet.has(e.id)).length;
  const cardCount = progress.unlockedCards.length;
  const allDone = episodes.every((e) => completedSet.has(e.id));

  return (
    <div className="scroll">
      <div className="arch-head">
        <div className="arch-kicker">通讯档案 · COMMS ARCHIVE</div>
        <h1 className="arch-title">星际长途</h1>
        <p className="arch-desc">
          每一通来电，是地球上一个普通人的深夜。接听，代入 ta，陪 ta 和 Rocky 聊完这一夜。
        </p>
        <div className="arch-meta">
          <span><b>{doneCount}</b> / {episodes.length} 通话完成</span>
          <span><b>{cardCount}</b> / {TOTAL_CARDS} 星语卡</span>
          <button className="linkish" onClick={() => dispatch({ type: 'GO', screen: 'cards' })}>星语卡收藏 →</button>
          {allDone && (
            <button className="linkish" onClick={() => dispatch({ type: 'GO', screen: 'montage' })}>第二天清晨 →</button>
          )}
        </div>
      </div>

      <div className="calls">
        {episodes.map((ep) => {
          const done = progress.completedEpisodes.includes(ep.id);
          return (
            <button
              className="call"
              key={ep.id}
              style={accentStyle(ep.caller.accent)}
              onClick={() => setIncoming(ep)}
            >
              <span className="idx">{String(ep.order).padStart(2, '0')}</span>
              <span className="avatar">{handleInitials(ep.caller.handle)}</span>
              <span className="body">
                <span className="ep-title">{ep.title}</span>
                <span className="ep-sub">{ep.caller.realName} · {ep.caller.tagline}</span>
                <span className="ep-theme">{done ? `后来：${ep.caller.outcomeShort}` : ep.theme}</span>
              </span>
              <span className="ep-status">
                <span className={`badge ${done ? 'done' : 'new'}`}>{done ? '已通话' : '未接'}</span>
                <span className="cards-mini">
                  {ep.cards.map((c, i) => (
                    <i key={c.id} className={progress.unlockedCards.includes(c.id) ? 'on' : ''} aria-hidden data-i={i} />
                  ))}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="pad center" style={{ paddingTop: 8 }}>
        <p style={{ color: 'var(--text-faint)', fontSize: 11.5, lineHeight: 1.9 }}>
          灵感来自《挽救计划》(Project Hail Mary)。这是一个粉丝二创故事，与真实的{' '}
          <a className="linkish" href="https://rocky.savemoss.com" target="_blank" rel="noreferrer">rocky.savemoss.com</a>{' '}
          遥相呼应。
        </p>
        {doneCount > 0 && (
          <button
            className="linkish"
            style={{ marginTop: 14 }}
            onClick={() => { if (confirm('确定要清除所有进度吗？')) dispatch({ type: 'RESET' }); }}
          >
            清除进度
          </button>
        )}
      </div>
    </div>
  );
}
