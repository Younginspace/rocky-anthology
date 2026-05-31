import type { Episode } from '../../engine/types';

/** ep02 ·《发射前夜》· 陈乐 — 高考前夜。 */
export const ep02: Episode = {
  id: 'ep02',
  order: 2,
  title: '发射前夜',
  subtitle: '陈乐 · 高考前一晚',
  theme: '当一场考试好像要决定你的一生',
  caller: {
    id: 'chen_le',
    handle: 'CL-0606',
    realName: '陈乐',
    age: 18,
    location: '某县城 · 自己的小房间',
    tagline: '明天就要高考，怎么也睡不着',
    reason: '倒计时撕到了最后一张。桌上一杯凉掉的牛奶，抽屉里压着准考证。',
    outcomeShort: '第二天他照常走进了考场。考得怎样不重要——他是带着睡够的脑子去的。',
    morningBeat: '陈乐把准考证和两支削好的笔放进透明袋，深吸一口气，走进了考场。',
    accent: 'cyan',
  },
  cards: [
    { id: 'card_cl_spof', episodeId: 'ep02', speaker: 'rocky', text: '一个测试定一生。坏设计。单点故障。我不喜欢。' },
    { id: 'card_cl_rest', episodeId: 'ep02', speaker: 'rocky', text: '发射前最后一件事，是睡。然后发射。' },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: '〔星际通讯线 · ERID↔地球〕今晚第 31 通来电', stage: '信号建立中…' },
        { speaker: 'narrator', text: '凌晨一点。墙上的倒计时，撕到了最后一张："1"。' },
        { speaker: 'narrator', text: '桌上那杯牛奶，妈妈睡前热的，现在凉透了。抽屉里压着准考证。' },
        { speaker: 'narrator', text: '傍晚你假装睡着，听见爸妈在客厅压低声音算这几年补习的钱，还有那句——"万一考不好怎么办"。' },
        { speaker: 'narrator', text: '你给妈打了一条消息，删了。又打，又删。' },
        { speaker: 'narrator', text: '同学说有个网站能跟外星人打电话。你想，反正也睡不着。' },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: '● 信号接通 · 延迟 4.2 秒', stage: '' },
        { speaker: 'rocky', text: '接通。一个很年轻的人类。' },
        { speaker: 'rocky', text: '声音……抖。手也抖，推测。深夜。地球。' },
        { speaker: 'rocky', text: '我是 Rocky。说。' },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: '（电话那头是个……外星人？你忽然有点想哭。）',
      options: [
        {
          id: 'scared',
          label: '"我明天要高考。一场很重要的考试。我睡不着。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'casual',
          label: '"没事，同学说这儿好玩，随便打打。"',
          effects: [{ type: 'signal', delta: 2 }],
          next: 'rocky_listen',
        },
        {
          id: 'curious',
          label: '"你们外星人……也要考试吗？"',
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'rocky_spof',
      lines: [
        { speaker: 'rocky', text: '考试。等。我理解一下。' },
        { speaker: 'rocky', text: '一次测试。一天。然后……决定你之后很多年，问号。' },
        { speaker: 'caller', text: '差不多……是这样。大家都说，一考定终身。' },
        { speaker: 'rocky', text: '不喜欢。' },
      ],
    },

    rocky_spof: {
      kind: 'scene',
      next: 'q_fear',
      lines: [
        { speaker: 'rocky', text: '我是工程师。听好。', revealCardId: 'card_cl_spof' },
        { speaker: 'rocky', text: '一个系统，把一整条命，压在一个点上。那个点坏了，全塌。' },
        { speaker: 'rocky', text: '这叫单点故障。坏设计。真实的好系统，不这么造。' },
        { speaker: 'rocky', text: '设计它的人类，错了。不是你错了。' },
        { speaker: 'rocky', text: '但。现在改不了设计。明天还要发射。所以——你真正怕的，是什么。' },
      ],
    },

    q_fear: {
      kind: 'choice',
      choiceId: 'q_fear',
      prompt: '（他问得很直。你盯着那杯凉牛奶。）',
      options: [
        {
          id: 'parents',
          label: '"我怕考砸了，对不起我爸妈。他们为我花了太多。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'parents', value: true }],
          next: 'rocky_launch',
        },
        {
          id: 'worth',
          label: '"我怕……如果我不够优秀，是不是就不值得了。我还是不是我。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'worth', value: true }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_launch',
        },
        {
          id: 'noise',
          label: '"我也说不清。脑子就是停不下来，越想越睡不着。"',
          effects: [{ type: 'signal', delta: 6 }],
          next: 'rocky_launch',
        },
      ],
    },

    rocky_launch: {
      kind: 'scene',
      next: 'q_msg',
      lines: [
        { speaker: 'rocky', text: '我懂这个。重大发射前。我也抖过。' },
        { speaker: 'rocky', text: '发射前一晚，你能做的准备，都做完了。剩下的，是执行，加上你控制不了的变量。' },
        { speaker: 'rocky', text: '数字会有。数字也重要。我不骗你说不重要。' },
        { speaker: 'rocky', text: '但数字是一个数据点。不是整个系统。你，是系统。系统比一个数据点，活得久。' },
      ],
    },

    q_msg: {
      kind: 'choice',
      choiceId: 'q_msg',
      prompt: '（你想起那条删了又打的消息。）',
      options: [
        {
          id: 'send_truth',
          label: '"其实……我想跟我妈说：我也很怕，但我尽力了。我一直没敢发。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }, { type: 'flag', key: 'msg', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'hide',
          label: '"算了。说了她更担心。我自己扛。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'gate_grace',
        },
      ],
    },

    gate_grace: {
      kind: 'branch',
      branches: [
        { when: { type: 'or', any: [{ type: 'signalAtLeast', value: 60 }, { type: 'flagSet', key: 'engaged' }] }, goto: 'grace_in' },
      ],
      else: 'rocky_alone',
    },

    grace_in: {
      kind: 'scene',
      next: 'rocky_checklist',
      lines: [
        { speaker: 'rocky', text: '等。这个，船上有个人比我懂。他以前是老师。' },
        { speaker: 'rocky', text: '格雷斯！一个地球小孩，明天大考。' },
        { speaker: 'grace', text: '嘿，我是格雷斯。我以前在地球教初中。送过好多届学生进考场。' },
        { speaker: 'grace', text: '跟你说个真话：那个分数，几年后你大概率想不起来具体是多少。我教过的孩子，没一个记得清。' },
        { speaker: 'grace', text: '但"你今晚怎么对待这个害怕的自己"——这个会留下来。会变成你以后扛事的方式。' },
        { speaker: 'grace', text: '所以别跟自己打架了。明天好好考，今晚好好睡。去吧。' },
        { speaker: 'rocky', text: '格雷斯说得好。我记下来了。' },
      ],
    },

    rocky_alone: {
      kind: 'scene',
      next: 'rocky_checklist',
      lines: [
        { speaker: 'rocky', text: '说个尺度的事。' },
        { speaker: 'rocky', text: '我的船，23 个。死了 22 个。不公平。宇宙不按谁能控制的曲线，打分。' },
        { speaker: 'rocky', text: '我没法选那个结果。我只能选：活下来的，接着做下一件事。' },
        { speaker: 'rocky', text: '你明天也一样。考题你控制不了。能控制的，是带一个睡够的脑子，去做你会做的那些。' },
      ],
    },

    rocky_checklist: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: '现在，发射前检查单。', revealCardId: 'card_cl_rest' },
        { speaker: 'rocky', text: '铅笔，削好。准考证，放门口。闹钟，定两个。去考场的路，想一遍。' },
        { speaker: 'rocky', text: '然后——最后一件事，是睡。' },
        { speaker: 'rocky', text: '你睡。人类不睡，不能正常运转。这是工程事实。' },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: '（窗外很静。你的呼吸，慢下来了一点。）',
      options: [
        {
          id: 'checklist',
          label: '"……好。我去把笔和准考证收好，定好闹钟。"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'send_now',
          label: '"我现在就给我妈发那条消息。趁我还有勇气。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }, { type: 'flag', key: 'msg', value: true }],
          next: 'end_main',
        },
        {
          id: 'milk',
          label: '"我把这杯牛奶喝了……就睡。"',
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'cl_end',
      lines: [
        { speaker: 'rocky', text: '好。' },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'msg' },
          lines: [
            { speaker: 'narrator', text: '你按下了发送。"妈，我有点怕，但我尽力了。明天我会好好考。"' },
            { speaker: 'narrator', text: '三秒后，对话框跳出一行字："傻孩子，睡吧，妈在。"' },
          ],
        },
        {
          when: { type: 'flagSet', key: 'agency' },
          lines: [
            { speaker: 'narrator', text: '你削好了两支笔，把准考证放进透明袋，端起那杯凉牛奶，一口喝完。' },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: '好好好。声音不抖了。准备好了。' },
            { speaker: 'rocky', text: '去睡，漏水的太空团子。明天，发射。我在这头，听着。' },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: '去睡。明天，一道题一道题做。' },
            { speaker: 'narrator', text: '你没说太多，轻轻关了灯。黑暗里，倒计时那张"1"，也看不见了。' },
          ],
        },
      ],
    },
  },
};
