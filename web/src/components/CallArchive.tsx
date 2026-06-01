import { useState } from 'react';
import type { Episode } from '../engine/types';
import { episodes, TOTAL_CARDS } from '../content';
import { useGame } from '../state/gameContext';
import { loc, UI } from '../lib/i18n';
import { accentStyle, handleInitials } from '../lib/ui';
import { IncomingCall } from './IncomingCall';

export function CallArchive() {
  const { progress, dispatch, lang } = useGame();
  const t = UI[lang];
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
        <div className="arch-kicker">{t.archiveKicker}</div>
        <h1 className="arch-title">{t.bootTitle}</h1>
        <p className="arch-desc">{t.archiveDesc}</p>
        <div className="arch-meta">
          <span><b>{doneCount}</b> / {episodes.length} {t.callsDone}</span>
          <span><b>{cardCount}</b> / {TOTAL_CARDS} {t.cardsLabel}</span>
          <button className="linkish" onClick={() => dispatch({ type: 'GO', screen: 'cards' })}>{t.openCards}</button>
          {allDone && (
            <button className="linkish" onClick={() => dispatch({ type: 'GO', screen: 'montage' })}>{t.openMontage}</button>
          )}
        </div>
      </div>

      <div className="calls">
        {episodes.map((ep) => {
          const done = completedSet.has(ep.id);
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
                <span className="ep-title">{loc(ep.title, lang)}</span>
                <span className="ep-sub">{loc(ep.caller.realName, lang)} · {loc(ep.caller.tagline, lang)}</span>
                <span className="ep-theme">{done ? `${t.afterPrefix}${loc(ep.caller.outcomeShort, lang)}` : loc(ep.theme, lang)}</span>
              </span>
              <span className="ep-status">
                <span className={`badge ${done ? 'done' : 'new'}`}>{done ? t.answered : t.missed}</span>
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
        <p className="fan-note">
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
