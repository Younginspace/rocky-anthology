import { episodes } from '../content';
import { useGame } from '../state/gameContext';
import { chromeLang, loc, UI } from '../lib/i18n';
import { accentStyle } from '../lib/ui';
import { ART } from '../lib/art';
import { Bi } from './Bi';
import { SceneArt } from './SceneArt';

function renderLine(line: string, key: number) {
  const parts = line.split('{ERID}');
  return (
    <span key={key} style={{ display: 'block' }}>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <span className="erid">Erid</span>}
        </span>
      ))}
    </span>
  );
}

export function MorningMontage() {
  const { progress, dispatch, lang } = useGame();
  const cl = chromeLang(lang);
  const t = UI[cl];
  const done = episodes.filter((e) => progress.completedEpisodes.includes(e.id));

  return (
    <div className="scroll montage">
      <div className="m-pad">
        <SceneArt src={ART.eridSky} loop />
        <div className="m-kicker">{t.montageKicker}</div>
        <h1 className="m-title">{t.montageTitle}</h1>
        <p className="m-dawn">{t.montageDawn.split('\n').map((s, i) => <span key={i} style={{ display: 'block' }}>{s}</span>)}</p>

        {done.map((ep, i) => (
          <div className="m-beat" key={ep.id} style={{ animationDelay: `${i * 0.25 + 0.2}s`, ...accentStyle(ep.caller.accent) }}>
            <span className="m-dot" />
            <span style={{ flex: 1 }}>
              <span className="m-who">{loc(ep.caller.realName, cl)} · {loc(ep.caller.tagline, cl)}</span>
              <span className="m-text"><Bi text={ep.caller.morningBeat} /></span>
            </span>
          </div>
        ))}

        <p className="m-final">
          {t.montageFinal.split('\n').map((line, i) => renderLine(line, i))}
        </p>

        <div className="end-actions" style={{ paddingBottom: 40 }}>
          <button className="btn ghost" onClick={() => dispatch({ type: 'MONTAGE_DONE' })}>{t.montageBack}</button>
          <button className="btn" onClick={() => dispatch({ type: 'GO', screen: 'feedback' })}>{t.fbEntry} →</button>
        </div>
      </div>
    </div>
  );
}
