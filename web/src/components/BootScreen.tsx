import { useGame } from '../state/gameContext';
import { UI } from '../lib/i18n';

export function BootScreen() {
  const { lang, dispatch } = useGame();
  const t = UI[lang];
  return (
    <div className="boot scroll">
      <div className="boot-inner">
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
        <div className="fadein" style={{ animationDelay: '2.7s', animationFillMode: 'both', marginTop: 34 }}>
          <button className="btn" onClick={() => dispatch({ type: 'BOOT_DONE' })}>
            {t.enterArchive} →
          </button>
        </div>
      </div>
    </div>
  );
}
