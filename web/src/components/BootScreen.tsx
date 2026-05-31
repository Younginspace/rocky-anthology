import { useGame } from '../state/gameStore';

const BOOT_LINES: Array<[string, string]> = [
  ['ERID 深空通讯阵列', '在线'],
  ['校准星际延迟补偿', '4.2s'],
  ['建立 ERID ↔ 地球 量子链路', '完成'],
  ['格雷斯架设的开放通讯线', '已就绪'],
];

export function BootScreen() {
  const { dispatch } = useGame();
  return (
    <div className="boot scroll">
      <div className="boot-log">
        {BOOT_LINES.map(([label, status], i) => (
          <div className="row" key={label} style={{ animationDelay: `${i * 0.4 + 0.1}s` }}>
            <span>›</span>
            <span style={{ flex: 1 }}>{label}</span>
            <span className="ok">[ {status} ]</span>
          </div>
        ))}
      </div>
      <div className="boot-title fadein" style={{ animationDelay: '1.8s', animationFillMode: 'both' }}>星际长途</div>
      <div className="boot-sub fadein" style={{ animationDelay: '2.1s', animationFillMode: 'both' }}>Long Distance, Across the Stars</div>
      <div className="boot-tag fadein" style={{ animationDelay: '2.4s', animationFillMode: 'both' }}>
        《挽救计划》二创 · 你将拨通住在 Erid 星的外星工程师 Rocky。
        电话这头，是地球上一个个普通人的深夜。
      </div>
      <div className="fadein" style={{ animationDelay: '2.7s', animationFillMode: 'both', marginTop: 30 }}>
        <button className="btn" onClick={() => dispatch({ type: 'BOOT_DONE' })}>
          进入通讯档案 →
        </button>
      </div>
    </div>
  );
}
