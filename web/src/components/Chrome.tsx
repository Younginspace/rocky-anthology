import { useEffect, useRef, useState } from 'react';
import { signalTier } from '../engine/engine';
import { episodeById } from '../content';
import { useGame } from '../state/gameContext';
import { chromeLang, MODE_LABEL, nextMode, SIGNAL_LABEL, UI } from '../lib/i18n';

export function Backdrop() {
  return (
    <>
      <div className="cosmos" aria-hidden />
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}

export function StatusBar() {
  const { screen, session, lang, dispatch } = useGame();
  const t = UI[chromeLang(lang)];
  const inCall = screen === 'incall' && session;
  const ep = session ? episodeById[session.episodeId] : null;
  const signal = session?.state.signal ?? null;
  const tier = signal != null ? signalTier(signal) : null;
  const showHome = screen !== 'boot' && screen !== 'archive';

  // Pulse the signal bars when the connection strengthens — a quiet "that landed".
  const prevSignal = useRef<number | null>(null);
  const [bump, setBump] = useState(false);
  useEffect(() => {
    const prev = prevSignal.current;
    prevSignal.current = signal;
    if (prev == null || signal == null || signal <= prev) return;
    setBump(true);
    const id = setTimeout(() => setBump(false), 720);
    return () => clearTimeout(id);
  }, [signal]);

  return (
    <div className="statusbar" role="status">
      <div className="sb-left">
        {showHome ? (
          <button className="home-btn" onClick={() => dispatch({ type: 'GO', screen: 'archive' })} aria-label={t.home}>
            ‹ {t.home}
          </button>
        ) : (
          <span className="dot" aria-hidden />
        )}
        <span className="sb-title">
          {inCall && ep ? `${t.inCall} · ${ep.caller.handle}` : t.lineName}
        </span>
      </div>
      <div className="sb-right">
        {tier ? (
          <>
            <span className={`signal-label${bump ? ' bump' : ''}`}>{SIGNAL_LABEL[chromeLang(lang)][tier]}</span>
            <span className={`signal ${tier}${bump ? ' bump' : ''}`} aria-label={SIGNAL_LABEL[chromeLang(lang)][tier]}>
              <i /><i /><i /><i />
            </span>
          </>
        ) : (
          <span className="signal-label">{t.delay}</span>
        )}
        <button
          className="lang-toggle"
          onClick={() => dispatch({ type: 'SET_LANG', lang: nextMode(lang) })}
          aria-label={t.langToggleAria}
        >
          {MODE_LABEL[lang]}
        </button>
      </div>
    </div>
  );
}
