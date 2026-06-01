import { useEffect, useRef, useState } from 'react';
import type { Episode, LangMode } from '../engine/types';
import { currentView } from '../engine/engine';
import { episodeById } from '../content';
import { useGame, type TranscriptItem } from '../state/gameContext';
import { chromeLang, loc, SPEAKER_LABEL, UI } from '../lib/i18n';
import { accentStyle } from '../lib/ui';
import { Bi } from './Bi';
import { WisdomCardView } from './WisdomCardView';

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/** Dwell before revealing the next line — scales with the (primary) text length. */
function lineDelay(item: TranscriptItem, lang: LangMode): number {
  const cl = chromeLang(lang);
  const len = loc(item.text, cl).length;
  const perChar = cl === 'zh' ? 30 : 14;
  const base = item.speaker === 'narrator' || item.speaker === 'system' ? 320 : 420;
  // Bilingual mode shows two lines, so allow a touch more dwell.
  const mult = lang === 'both' ? 1.25 : 1;
  return Math.min(1500, Math.max(460, (base + len * perChar) * mult));
}

function Wave() {
  return (
    <span className="wave" aria-hidden>
      <i /><i /><i /><i /><i />
    </span>
  );
}

function Line({ item, lang }: { item: TranscriptItem; lang: LangMode }) {
  const label = SPEAKER_LABEL[chromeLang(lang)][item.speaker];
  return (
    <div className={`line ${item.speaker}`}>
      {label && (
        <div className="who">
          {label}
          {item.speaker === 'rocky' && <Wave />}
        </div>
      )}
      <div className="bubble">
        <Bi text={item.text} />
        {item.stage && <span className="stage">{loc(item.stage, chromeLang(lang))}</span>}
      </div>
    </div>
  );
}

function EndingPanel({ ep, lang }: { ep: Episode; lang: LangMode }) {
  const { progress } = useGame();
  const t = UI[chromeLang(lang)];
  const earned = ep.cards.filter((c) => progress.unlockedCards.includes(c.id));
  return (
    <div className="ending fadein" style={accentStyle(ep.caller.accent)}>
      <div className="end-kicker">{t.callEnded} · {ep.caller.handle}</div>
      <div className="outcome">
        <span className="lbl">{t.after}</span>
        <Bi text={ep.caller.outcomeShort} />
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
  const t = UI[chromeLang(lang)];
  const scrollRef = useRef<HTMLDivElement>(null);
  const epRef = useRef<string | null>(null);
  const [revealed, setRevealed] = useState(0);

  const ep = session ? episodeById[session.episodeId] : null;
  const view = session && ep ? currentView(ep, session.state) : null;
  const transcript = session?.transcript ?? [];

  const episodeId = session?.episodeId;
  useEffect(() => {
    if (!session || epRef.current === session.episodeId) return;
    epRef.current = session.episodeId;
    setRevealed(session.resumed ? session.transcript.length : 0);
  }, [episodeId, session]);

  useEffect(() => {
    if (revealed >= transcript.length) return;
    if (prefersReducedMotion()) { setRevealed(transcript.length); return; }
    const delay = lineDelay(transcript[revealed], lang);
    const id = window.setTimeout(() => setRevealed((r) => Math.min(r + 1, transcript.length)), delay);
    return () => clearTimeout(id);
  }, [revealed, transcript, lang]);

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
            <button className="tap-hint" onClick={skip}>{t.tapToSkip}</button>
          </div>
        )}

        {fullyRevealed && view.kind === 'scene' && (
          <div className="continue-row">
            <button className="btn" onClick={() => dispatch({ type: 'CONTINUE' })}>{t.continueBtn}</button>
          </div>
        )}

        {fullyRevealed && view.kind === 'choice' && (
          <div className="choices" style={accentStyle(ep.caller.accent)}>
            {view.prompt && <div className="choice-prompt"><Bi text={view.prompt} /></div>}
            {view.options.map((o, i) => (
              <button
                className="choice"
                key={o.id}
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => dispatch({ type: 'CHOOSE', optionId: o.id })}
              >
                <span className="ci">{String.fromCharCode(65 + i)}</span>
                <span className="choice-text"><Bi text={o.label} /></span>
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
