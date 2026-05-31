import { episodes } from '../content';
import { useGame } from '../state/gameStore';
import { accentStyle } from '../lib/ui';

export function MorningMontage() {
  const { progress, dispatch } = useGame();
  const done = episodes.filter((e) => progress.completedEpisodes.includes(e.id));

  return (
    <div className="scroll montage">
      <div className="m-pad">
        <div className="m-kicker">第二天清晨 · THE MORNING AFTER</div>
        <h1 className="m-title">天亮了</h1>
        <p className="m-dawn">那一夜，这条线接了很多通电话。<br />天亮以后，地球的另一头，他们各自醒来——</p>

        {done.map((ep, i) => (
          <div className="m-beat" key={ep.id} style={{ animationDelay: `${i * 0.25 + 0.2}s`, ...accentStyle(ep.caller.accent) }}>
            <span className="m-dot" />
            <span style={{ flex: 1 }}>
              <span className="m-who">{ep.caller.realName} · {ep.caller.tagline}</span>
              <span className="m-text">{ep.caller.morningBeat}</span>
            </span>
          </div>
        ))}

        <p className="m-final">
          而在很远很远的地方，那颗叫 <span className="erid">Erid</span> 的星球上，<br />
          Rocky 看着通讯记录上一条条并排的信号，安静了一会儿。<br />
          “好。好好。”他说。“都还在。”<br />
          格雷斯在旁边笑了笑：“线，继续开着吧。”
        </p>

        <div className="end-actions" style={{ paddingBottom: 40 }}>
          <button className="btn" onClick={() => dispatch({ type: 'MONTAGE_DONE' })}>回到通讯档案 →</button>
        </div>
      </div>
    </div>
  );
}
