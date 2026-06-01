import { episodes } from '../content';
import { useGame } from '../state/gameContext';
import { loc, UI } from '../lib/i18n';
import { accentStyle } from '../lib/ui';

function renderLine(line: string, key: number) {
  // Replace the {ERID} token with a highlighted span.
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
  const t = UI[lang];
  const done = episodes.filter((e) => progress.completedEpisodes.includes(e.id));

  return (
    <div className="scroll montage">
      <div className="m-pad">
        <div className="m-kicker">{t.montageKicker}</div>
        <h1 className="m-title">{t.montageTitle}</h1>
        <p className="m-dawn">{t.montageDawn.split('\n').map((s, i) => <span key={i} style={{ display: 'block' }}>{s}</span>)}</p>

        {done.map((ep, i) => (
          <div className="m-beat" key={ep.id} style={{ animationDelay: `${i * 0.25 + 0.2}s`, ...accentStyle(ep.caller.accent) }}>
            <span className="m-dot" />
            <span style={{ flex: 1 }}>
              <span className="m-who">{loc(ep.caller.realName, lang)} · {loc(ep.caller.tagline, lang)}</span>
              <span className="m-text">{loc(ep.caller.morningBeat, lang)}</span>
            </span>
          </div>
        ))}

        <p className="m-final">
          {t.montageFinal.split('\n').map((line, i) => renderLine(line, i))}
        </p>

        <div className="end-actions" style={{ paddingBottom: 40 }}>
          <button className="btn" onClick={() => dispatch({ type: 'MONTAGE_DONE' })}>{t.montageBack}</button>
        </div>
      </div>
    </div>
  );
}
