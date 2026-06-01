import { useEffect, useRef, useState } from 'react';
import type { Episode, Lang } from '../engine/types';
import { currentView } from '../engine/engine';
import { episodeById } from '../content';
import { useGame, type TranscriptItem } from '../state/gameContext';
import { loc, SPEAKER_LABEL, UI } from '../lib/i18n';
import { accentStyle } from '../lib/ui';
import { WisdomCardView } from './WisdomCardView';

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/** How long to dwell before revealing the next line — scales with length + speaker. */
function lineDelay(item: TranscriptItem, lang: Lang): number {
  const len = loc(item.text, lang).length;
  const perChar = lang === 'zh' ? 32 : 15;
  const base = item.speaker === 'narrator' || item.speaker === 'system' ? 320 : 420;
  return Math.min(1700, Math.max(480, base + len * perChar));
}

function Wave() {
  return (
    <span className="wave" aria-hidden>
      <i /><i /><i /><i /><i />
    </span>
  );
}

function Line({ item, lang }: { item: TranscriptItem; lang: Lang }) {
  const label = SPEAKER_LABEL[lang][item.speaker];
  return (
    <div className={`line ${item.speaker}`}>
      {label && (
        <div className="who">
          {label}
          {item.speaker === 'rocky' && <Wave />}
        </div>
      )}
      <div className="bubble">
        {loc(item.text, lang)}
        {item.stage && <span className="stage">{loc(item.stage, lang)}</span>}
      </div>
    </div>
  );
}

function EndingPanel({ ep, lang }: { ep: Episode; lang: Lang }) {
  const { progress } = useGame();
  const t = UI[lang];
  const earned = ep.cards.filter((c) => progress.unlockedCards.includes(c.id));
  return (
    <div className="ending fadein" style={accentStyle(ep.caller.accent)}>
      <div className="end-kicker">{t.callEnded} · {ep.caller.handle}</div>
      <div className="outcome">
        <span className="lbl">{t.after}</span>
        {loc(ep.caller.outcomeShort, lang)}
      </div>
      {earned.length > 0 && (
        <div className="earned">
          <h4>{t.earnedCards}</h4>
          {earned.map((c) => <WisdomCardView card={c} key={c.id} />)}
        </div>
      )}
    </div>
  );
}

export function InCall() {
  const { session, dispatch, lang } = useGame();
  const t = UI[lang];
  const scrollRef = useRef<HTMLDivElement>(null);
  const epRef = useRef<string | null>(null);
  const [revealed, setRevealed] = useState(0);

  const ep = session ? episodeById[session.episodeId] : null;
  const view = session && ep ? currentView(ep, session.state) : null;
  const transcript = session?.transcript ?? [];

  // Reset the reveal baseline when the call (episode) changes: fresh calls
  // animate from 0; a resumed call shows its transcript instantly.
  const episodeId = session?.episodeId;
  useEffect(() => {
    if (!session || epRef.current === session.episodeId) return;
    epRef.current = session.episodeId;
    setRevealed(session.resumed ? session.transcript.length : 0);
  }, [episodeId, session]);

  // Reveal new lines one at a time.
  useEffect(() => {
    if (revealed >= transcript.length) return;
    if (prefersReducedMotion()) { setRevealed(transcript.length); return; }
    const delay = lineDelay(transcript[revealed], lang);
    const id = window.setTimeout(() => setRevealed((r) => Math.min(r + 1, transcript.length)), delay);
    return () => clearTimeout(id);
  }, [revealed, transcript, lang]);

  // Keep the latest line in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [revealed, view?.kind]);

  if (!session || !ep || !view) return null;

  const fullyRevealed = revealed >= transcript.length;
  const shown = transcript.slice(0, revealed);
  const skip = () => { if (!fullyRevealed) setRevealed(transcript.length); };

  return (
    <div className="incall">
      <div className="scroll pad" ref={scrollRef} onClick={skip}>
        <div className="tx-area" aria-live="polite" aria-relevant="additions">
          {shown.map((item) => <Line item={item} key={item.key} lang={lang} />)}
          {fullyRevealed && view.kind === 'ending' && <EndingPanel ep={ep} lang={lang} />}
        </div>
      </div>

      <div className="dock">
        {!fullyRevealed && (
          <div className="continue-row">
            <button className="tap-hint" onClick={skip}>{lang === 'zh' ? '点击跳过 ▾' : 'tap to skip ▾'}</button>
          </div>
        )}

        {fullyRevealed && view.kind === 'scene' && (
          <div className="continue-row">
            <button className="btn" onClick={() => dispatch({ type: 'CONTINUE' })}>{t.continueBtn}</button>
          </div>
        )}

        {fullyRevealed && view.kind === 'choice' && (
          <div className="choices" style={accentStyle(ep.caller.accent)}>
            {view.prompt && <div className="choice-prompt">{loc(view.prompt, lang)}</div>}
            {view.options.map((o, i) => (
              <button
                className="choice"
                key={o.id}
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => dispatch({ type: 'CHOOSE', optionId: o.id })}
              >
                <span className="ci">{String.fromCharCode(65 + i)}</span>
                {loc(o.label, lang)}
              </button>
            ))}
          </div>
        )}

        {fullyRevealed && view.kind === 'ending' && (
          <div className="end-actions">
            <button className="btn" onClick={() => dispatch({ type: 'FINISH_CALL' })}>{t.backToArchive}</button>
          </div>
        )}
      </div>
    </div>
  );
}
