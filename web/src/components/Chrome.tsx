import { signalTier } from '../engine/engine';
import { episodeById } from '../content';
import { useGame } from '../state/gameContext';
import { SIGNAL_LABEL, UI } from '../lib/i18n';

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
  const t = UI[lang];
  const inCall = screen === 'incall' && session;
  const ep = session ? episodeById[session.episodeId] : null;
  const tier = session ? signalTier(session.state.signal) : null;

  return (
    <div className="statusbar" role="status">
      <div className="sb-left">
        <span className="dot" aria-hidden />
        <span className="sb-title">
          {inCall && ep ? `${t.inCall} · ${ep.caller.handle}` : t.lineName}
        </span>
      </div>
      <div className="sb-right">
        {tier ? (
          <>
            <span className="signal-label">{SIGNAL_LABEL[lang][tier]}</span>
            <span className={`signal ${tier}`} aria-label={SIGNAL_LABEL[lang][tier]}>
              <i /><i /><i /><i />
            </span>
          </>
        ) : (
          <span className="signal-label">{t.delay}</span>
        )}
        <button
          className="lang-toggle"
          onClick={() => dispatch({ type: 'SET_LANG', lang: lang === 'zh' ? 'en' : 'zh' })}
          aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}
        >
          {lang === 'zh' ? 'EN' : '中'}
        </button>
      </div>
    </div>
  );
}
