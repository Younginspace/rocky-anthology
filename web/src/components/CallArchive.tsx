import { useState } from 'react';
import type { Episode } from '../engine/types';
import { episodes, episodeById, TOTAL_CARDS } from '../content';
import { useGame } from '../state/gameContext';
import { chromeLang, loc, UI } from '../lib/i18n';
import { accentStyle, handleInitials } from '../lib/ui';
import { ART, episodeScene } from '../lib/art';
import { IncomingCall } from './IncomingCall';

export function CallArchive() {
  const { progress, dispatch, lang, session } = useGame();
  const cl = chromeLang(lang);
  const t = UI[cl];
  const [incoming, setIncoming] = useState<Episode | null>(null);
  const [showAbout, setShowAbout] = useState(false);

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

  // An active in-call session that the player navigated away from.
  const activeEp = session && !completedSet.has(session.episodeId) ? episodeById[session.episodeId] : null;

  return (
    <div className="scroll">
      <div className="arch-head">
        {/* Hero: watercolor still of Rocky listening for the call.
            TODO: swap this <img> for a <video> once the sd2 hero clip is ready. */}
        <div className="arch-hero">
          <img className="fadein" src={ART.rockyListen} alt="Rocky" />
        </div>
        <div className="arch-kicker">{t.archiveKicker}</div>
        <h1 className="arch-title">{t.bootTitle}</h1>
        <p className="arch-desc">{t.archiveDesc}</p>
        <div className="arch-meta">
          <span><b>{doneCount}</b> / {episodes.length} {t.callsDone}</span>
          <span><b>{cardCount}</b> / {TOTAL_CARDS} {t.cardsLabel}</span>
          <button className="linkish" onClick={() => dispatch({ type: 'GO', screen: 'cards' })}>{t.openCards}</button>
          <button className="linkish" onClick={() => dispatch({ type: 'GO', screen: 'feedback' })}>{t.fbEntry} →</button>
          {allDone && (
            <button className="linkish" onClick={() => dispatch({ type: 'GO', screen: 'montage' })}>{t.openMontage}</button>
          )}
        </div>
        {activeEp && (
          <button className="resume-bar" style={accentStyle(activeEp.caller.accent)} onClick={() => dispatch({ type: 'GO', screen: 'incall' })}>
            <span className="resume-dot" />
            ▸ {t.resumeCall} · {loc(activeEp.caller.realName, cl)}
          </button>
        )}
      </div>

      <div className="calls">
        {episodes.map((ep) => {
          const done = completedSet.has(ep.id);
          const active = activeEp?.id === ep.id;
          return (
            <button
              className="call"
              key={ep.id}
              style={accentStyle(ep.caller.accent)}
              onClick={() => (active ? dispatch({ type: 'GO', screen: 'incall' }) : setIncoming(ep))}
            >
              <span className="idx">{String(ep.order).padStart(2, '0')}</span>
              <span className="avatar img" style={{ backgroundImage: `url(${episodeScene(ep.id)})` }}>{handleInitials(ep.caller.handle)}</span>
              <span className="body">
                <span className="ep-title">{loc(ep.title, cl)}</span>
                <span className="ep-sub">{loc(ep.caller.realName, cl)} · {loc(ep.caller.tagline, cl)}</span>
                <span className="ep-theme">{done ? `${t.afterPrefix}${loc(ep.caller.outcomeShort, cl)}` : loc(ep.theme, cl)}</span>
              </span>
              <span className="ep-status">
                <span className={`badge ${active ? 'active' : done ? 'done' : 'new'}`}>
                  {active ? t.inCallBadge : done ? t.answered : t.missed}
                </span>
                <span className="cards-mini">
                  {ep.cards.map((c) => (
                    <i key={c.id} className={progress.unlockedCards.includes(c.id) ? 'on' : ''} aria-hidden />
                  ))}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="pad center" style={{ paddingTop: 8 }}>
        <button className="linkish" onClick={() => setShowAbout((v) => !v)}>{t.aboutToggle}</button>
        <button className="linkish" style={{ marginLeft: 16 }} onClick={() => dispatch({ type: 'GO', screen: 'boot' })}>{t.replayIntro}</button>
        {showAbout && <p className="fan-note" style={{ marginTop: 12 }}>{t.aboutBody}</p>}
        <p className="fan-note" style={{ marginTop: 18 }}>
          {t.fanNote}{' '}
          <a className="linkish" href="https://rocky.savemoss.com" target="_blank" rel="noreferrer">rocky.savemoss.com</a>{t.fanNote2}
        </p>
        {doneCount > 0 && (
          <button
            className="linkish"
            style={{ marginTop: 14 }}
            onClick={() => { if (confirm(t.confirmClear)) dispatch({ type: 'RESET' }); }}
          >
            {t.clearProgress}
          </button>
        )}
      </div>
    </div>
  );
}
