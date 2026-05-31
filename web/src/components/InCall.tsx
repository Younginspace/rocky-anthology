import { useEffect, useRef } from 'react';
import type { Episode } from '../engine/types';
import { currentView } from '../engine/engine';
import { episodeById } from '../content';
import { useGame, type TranscriptItem } from '../state/gameStore';
import { accentStyle, SPEAKER_LABEL } from '../lib/ui';
import { WisdomCardView } from './WisdomCardView';

function Line({ item }: { item: TranscriptItem }) {
  const label = SPEAKER_LABEL[item.speaker];
  return (
    <div className={`line ${item.speaker}`}>
      {label && <div className="who">{label}</div>}
      <div className="bubble">
        {item.text}
        {item.stage && <span className="stage">{item.stage}</span>}
      </div>
    </div>
  );
}

function EndingPanel({ ep }: { ep: Episode }) {
  const { progress } = useGame();
  const earned = ep.cards.filter((c) => progress.unlockedCards.includes(c.id));
  return (
    <div className="ending fadein" style={accentStyle(ep.caller.accent)}>
      <div className="end-kicker">通话结束 · {ep.caller.handle}</div>
      <div className="outcome">
        <span className="lbl">后来</span>
        {ep.caller.outcomeShort}
      </div>
      {earned.length > 0 && (
        <div className="earned">
          <h4>本通获得的星语卡</h4>
          {earned.map((c) => <WisdomCardView card={c} key={c.id} />)}
        </div>
      )}
    </div>
  );
}

export function InCall() {
  const { session, dispatch } = useGame();
  const scrollRef = useRef<HTMLDivElement>(null);

  const ep = session ? episodeById[session.episodeId] : null;
  const view = session && ep ? currentView(ep, session.state) : null;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [session?.transcript.length, view?.kind]);

  if (!session || !ep || !view) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <div className="scroll pad" ref={scrollRef}>
        <div className="tx-area" aria-live="polite" aria-relevant="additions">
          {session.transcript.map((item) => <Line item={item} key={item.key} />)}
          {view.kind === 'ending' && <EndingPanel ep={ep} />}
        </div>
      </div>

      <div className="dock">
        {view.kind === 'scene' && (
          <div className="continue-row">
            <button className="btn" onClick={() => dispatch({ type: 'CONTINUE' })}>继续 ▾</button>
          </div>
        )}

        {view.kind === 'choice' && (
          <div className="choices" style={accentStyle(ep.caller.accent)}>
            {view.prompt && <div className="choice-prompt">{view.prompt}</div>}
            {view.options.map((o, i) => (
              <button className="choice" key={o.id} onClick={() => dispatch({ type: 'CHOOSE', optionId: o.id })}>
                <span className="ci">{String.fromCharCode(65 + i)}</span>
                {o.label}
              </button>
            ))}
          </div>
        )}

        {view.kind === 'ending' && (
          <div className="end-actions">
            <button className="btn" onClick={() => dispatch({ type: 'FINISH_CALL' })}>返回通讯档案 →</button>
          </div>
        )}
      </div>
    </div>
  );
}
