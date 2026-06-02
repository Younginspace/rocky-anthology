import { useGame } from '../state/gameContext';
import { chromeLang, UI } from '../lib/i18n';
import { ART } from '../lib/art';

const reduceMotion = typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function BootScreen() {
  const { lang, dispatch } = useGame();
  const t = UI[chromeLang(lang)];
  return (
    <div className="boot scroll">
      <div className="boot-inner">
        {reduceMotion ? (
          <img className="boot-cover fadein" src={ART.cover} alt="" style={{ animationDelay: '0.1s', animationFillMode: 'both' }} />
        ) : (
          <video
            className="boot-cover fadein"
            src={ART.openingVideo}
            poster={ART.rockyListen}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          />
        )}
        <div className="boot-log">
          {t.bootLines.map(([label, status], i) => (
            <div className="row" key={label} style={{ animationDelay: `${i * 0.4 + 0.1}s` }}>
              <span>›</span>
              <span style={{ flex: 1 }}>{label}</span>
              <span className="ok">[ {status} ]</span>
            </div>
          ))}
        </div>
        <h1 className="boot-title fadein" style={{ animationDelay: '1.8s', animationFillMode: 'both' }}>{t.bootTitle}</h1>
        <div className="boot-sub fadein" style={{ animationDelay: '2.1s', animationFillMode: 'both' }}>{t.bootSub}</div>
        <p className="boot-tag fadein" style={{ animationDelay: '2.4s', animationFillMode: 'both' }}>{t.bootTag}</p>
        <div className="fadein" style={{ animationDelay: '2.7s', animationFillMode: 'both', marginTop: 22 }}>
          <button className="btn" onClick={() => dispatch({ type: 'BOOT_DONE' })}>
            {t.enterArchive} →
          </button>
        </div>
      </div>
    </div>
  );
}
