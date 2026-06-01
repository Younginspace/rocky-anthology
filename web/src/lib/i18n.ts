import type { Lang, LocalizedText, SignalTier, SpeakerId } from '../engine/types';

/** Resolve a LocalizedText (legacy string or { zh, en }) for the active language. */
export function loc(text: LocalizedText | undefined, lang: Lang): string {
  if (text == null) return '';
  if (typeof text === 'string') return text;
  return text[lang] ?? text.zh ?? text.en ?? '';
}

export const SPEAKER_LABEL: Record<Lang, Record<SpeakerId, string>> = {
  zh: { rocky: 'ROCKY', grace: 'GRACE', caller: '我', narrator: '', system: '' },
  en: { rocky: 'ROCKY', grace: 'GRACE', caller: 'YOU', narrator: '', system: '' },
};

export const SIGNAL_LABEL: Record<Lang, Record<SignalTier, string>> = {
  zh: { faint: '信号微弱', steady: '信号平稳', clear: '信号清晰', locked: '信号锁定' },
  en: { faint: 'SIGNAL FAINT', steady: 'SIGNAL STEADY', clear: 'SIGNAL CLEAR', locked: 'SIGNAL LOCKED' },
};

/** UI chrome strings (everything that isn't story content). */
export const UI = {
  zh: {
    lineName: 'ERID ↔ 地球 · 星际通讯线',
    delay: '延迟 4.2s',
    inCall: '通话中',
    // boot
    bootTitle: '星际长途',
    bootSub: 'Long Distance, Across the Stars',
    bootTag: '《挽救计划》二创 · 你将拨通住在 Erid 星的外星工程师 Rocky。电话这头，是地球上一个个普通人的深夜。',
    bootLines: [
      ['ERID 深空通讯阵列', '在线'],
      ['校准星际延迟补偿', '4.2s'],
      ['建立 ERID ↔ 地球 量子链路', '完成'],
      ['格雷斯架设的开放通讯线', '已就绪'],
    ] as Array<[string, string]>,
    enterArchive: '进入通讯档案',
    // archive
    archiveKicker: '通讯档案 · COMMS ARCHIVE',
    archiveDesc: '每一通来电，是地球上一个普通人的深夜。接听，代入 ta，陪 ta 和 Rocky 聊完这一夜。',
    callsDone: '通话完成',
    cardsLabel: '星语卡',
    openCards: '星语卡收藏 →',
    openMontage: '第二天清晨 →',
    answered: '已通话',
    missed: '未接',
    afterPrefix: '后来：',
    fanNote: '灵感来自《挽救计划》(Project Hail Mary)。这是一个粉丝二创故事，与真实的',
    fanNote2: '遥相呼应。',
    clearProgress: '清除进度',
    confirmClear: '确定要清除所有进度吗？',
    // incoming
    incomingKicker: '来电接入 · INCOMING',
    ageSuffix: ' 岁 · ',
    later: '稍后',
    answer: '接听 ●',
    // in-call
    continueBtn: '继续 ▾',
    callEnded: '通话结束',
    after: '后来',
    earnedCards: '本通获得的星语卡',
    backToArchive: '返回通讯档案 →',
    // cards
    cardsKicker: '星语卡收藏 · WISDOM',
    cardsTitle: 'Rocky 说过的话',
    collected: '已收集',
    cardsEmpty: '还没有解锁任何星语卡。\n接通一通来电，陪 Rocky 聊一夜，就会收集到。',
    backArchivePlain: '← 返回通讯档案',
    cardLocked: '？？？（尚未解锁）',
    byRocky: '— Rocky',
    byGrace: '— 格雷斯',
    // montage
    montageKicker: '第二天清晨 · THE MORNING AFTER',
    montageTitle: '天亮了',
    montageDawn: '那一夜，这条线接了很多通电话。\n天亮以后，地球的另一头，他们各自醒来——',
    montageFinal: '而在很远很远的地方，那颗叫 {ERID} 的星球上，\nRocky 看着通讯记录上一条条并排的信号，安静了一会儿。\n“好。好好。”他说。“都还在。”\n格雷斯在旁边笑了笑：“线，继续开着吧。”',
    montageBack: '回到通讯档案 →',
    // toast
    cardUnlocked: '★ 星语卡解锁',
    // error
    errTitle: '通讯中断',
    errBody: '链路出现异常。先试试重新接入；若反复失败，可清除本地存档后重启。',
    errReconnect: '重新接入 ↻',
    errWipe: '清除存档并重启',
  },
  en: {
    lineName: 'ERID ↔ EARTH · INTERSTELLAR LINE',
    delay: 'DELAY 4.2s',
    inCall: 'IN CALL',
    bootTitle: 'Long Distance',
    bootSub: '星际长途 · Across the Stars',
    bootTag: 'A Project Hail Mary fan story. You dial up Rocky — the Eridian engineer living on Erid. On this end of the line: ordinary people on Earth, awake too late.',
    bootLines: [
      ['ERID deep-space comms array', 'ONLINE'],
      ['Calibrating interstellar delay', '4.2s'],
      ['Establishing ERID ↔ EARTH link', 'DONE'],
      ["Grace's open line", 'READY'],
    ] as Array<[string, string]>,
    enterArchive: 'Enter the archive',
    archiveKicker: 'COMMS ARCHIVE',
    archiveDesc: 'Every call is one ordinary person on Earth, late at night. Pick up, step into them, and stay on the line with Rocky.',
    callsDone: 'calls answered',
    cardsLabel: 'wisdom cards',
    openCards: 'Wisdom cards →',
    openMontage: 'The morning after →',
    answered: 'ANSWERED',
    missed: 'MISSED',
    afterPrefix: 'After: ',
    fanNote: 'Inspired by Project Hail Mary. A fan story, echoing the real',
    fanNote2: '.',
    clearProgress: 'Clear progress',
    confirmClear: 'Clear all progress?',
    incomingKicker: 'INCOMING',
    ageSuffix: ' · ',
    later: 'Later',
    answer: 'Answer ●',
    continueBtn: 'Continue ▾',
    callEnded: 'CALL ENDED',
    after: 'After',
    earnedCards: 'Wisdom unlocked this call',
    backToArchive: 'Back to archive →',
    cardsKicker: 'WISDOM',
    cardsTitle: 'What Rocky said',
    collected: 'Collected',
    cardsEmpty: 'No wisdom cards yet.\nAnswer a call and stay on the line with Rocky — you’ll collect them.',
    backArchivePlain: '← Back to archive',
    cardLocked: '??? (locked)',
    byRocky: '— Rocky',
    byGrace: '— Grace',
    montageKicker: 'THE MORNING AFTER',
    montageTitle: 'Morning',
    montageDawn: 'That night, the line took many calls.\nWhen morning came, across the Earth, each of them woke up —',
    montageFinal: 'And very far away, on a planet called {ERID},\nRocky looks at the signals logged side by side, and goes quiet for a moment.\n“Good. Good good,” he says. “All still here.”\nGrace smiles beside him: “Leave the line open.”',
    montageBack: 'Back to archive →',
    cardUnlocked: '★ WISDOM UNLOCKED',
    errTitle: 'Transmission lost',
    errBody: 'The link hit an error. Try reconnecting first; if it keeps failing, clear local save and restart.',
    errReconnect: 'Reconnect ↻',
    errWipe: 'Clear save & restart',
  },
} as const;

export type UIStrings = (typeof UI)['zh'];
