import { signalTier } from '../engine/engine';
import { episodeById } from '../content';
import { useGame } from '../state/gameStore';
import { SIGNAL_LABEL } from '../lib/ui';

export function Backdrop() {
  return (
    <>
      <div className="cosmos" aria-hidden />
      <div className="crt" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}

export function StatusBar() {
  const { screen, session } = useGame();
  const inCall = screen === 'incall' && session;
  const ep = session ? episodeById[session.episodeId] : null;
  const tier = session ? signalTier(session.state.signal) : null;

  return (
    <div className="statusbar" role="status">
      <div className="sb-left">
        <span className="dot" aria-hidden />
        <span className="sb-title">
          {inCall && ep ? `通话中 · ${ep.caller.handle}` : 'ERID ↔ 地球 · 星际通讯线'}
        </span>
      </div>
      <div className="sb-right">
        {tier ? (
          <>
            <span className="signal-label">{SIGNAL_LABEL[tier]}</span>
            <span className={`signal ${tier}`} aria-label={SIGNAL_LABEL[tier]}>
              <i /><i /><i /><i />
            </span>
          </>
        ) : (
          <span className="signal-label">延迟 4.2s</span>
        )}
      </div>
    </div>
  );
}
