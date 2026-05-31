import type { Episode } from '../../engine/types';

/**
 * ep04 ·《看不见的工程》· 周敏 — 全职妈妈 / 怀疑当初辞职带娃。
 *
 * Follows ep01 shape:
 *  - opening scene (system + narrator sets the night; cross-call trace)
 *  - connect → first stance choice
 *  - Rocky runs the engineer pipeline: observe → misunderstand
 *    ("全职妈妈=没在工作"，强烈反对) → ask data → reduce to constraints
 *    (生命维持系统 / load-bearing) → one small action
 *  - Grace gate: or(signalAtLeast 60, flagSet 'engaged')
 *  - one ending node + warm / quiet / agency variants
 *  - exactly 2 wisdom cards on reachable spine scenes
 */
export const ep04: Episode = {
  id: 'ep04',
  order: 4,
  title: '看不见的工程',
  subtitle: '周敏 · 全职妈妈 / 怀疑当初辞职带娃',
  theme: '当你做的事没人看见，你开始怀疑自己是不是废了',
  caller: {
    id: 'zhou_min',
    handle: 'ZM-1119',
    realName: '周敏',
    age: 34,
    location: '某省会城市 · 三居室 · 儿童房隔壁的厨房',
    tagline: '为娃辞职三年，简历空着，老同学一个个升了职',
    reason: '快十二点，娃终于睡了。厨房的碗还堆着。她刷到老同学升职的朋友圈，突然不知道自己这三年算什么。',
    outcomeShort: '她没立刻"想通"。但那天之后，她在那张空白简历上，认真写下了第一行字。',
    morningBeat: '周敏趁娃午睡，没去收厨房——她泡了杯还烫的茶，坐下，给自己留了二十分钟。只属于她的。',
    accent: 'rose',
  },
  cards: [
    { id: 'card_zm_lifesupport', episodeId: 'ep04', speaker: 'rocky', text: '生命维持。最难的系统。没人鼓掌。船还是靠它飞。' },
    { id: 'card_zm_loadbearing', episodeId: 'ep04', speaker: 'rocky', text: '没人看见的，常常是承重的。拆掉才知道。' },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: '〔星际通讯线 · ERID↔地球〕今晚第 6 通来电', stage: '信号建立中…' },
        { speaker: 'narrator', text: '快十二点。娃终于睡熟了，呼吸均匀。你不敢翻身。' },
        { speaker: 'narrator', text: '厨房的灯还亮着。水池里堆着晚饭的碗，奶瓶泡在水里。明天还有明天的。' },
        { speaker: 'narrator', text: '手机屏幕亮着，是老同学的朋友圈："正式升任部门负责人，感谢团队。"配图是一束花。' },
        { speaker: 'narrator', text: '你翻自己的相册。三年了，几千张里没有一张是你自己——全是娃。你的微信名还停在产检那阵改的那个。' },
        { speaker: 'narrator', text: '前同事的群，热闹得插不上话，你上周悄悄退了，没人发现。' },
        { speaker: 'narrator', text: '你也不知道想找谁说。手指点开了这条不知道哪天存下的链接。' },
        { speaker: 'narrator', text: '拨号音很长。比一般的电话长得多。' },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: '● 信号接通 · 延迟 4.2 秒', stage: '' },
        { speaker: 'rocky', text: '接通。一个地球信号。' },
        { speaker: 'rocky', text: '一个人类。累。声音压得很低。怕吵醒什么。' },
        { speaker: 'rocky', text: '我是 Rocky。你找格雷斯的朋友，问号。' },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: '（电话那头真的有人。你压低声音，喉咙有点紧。）',
      options: [
        {
          id: 'admit',
          label: '"对不起这么晚……我就是，突然不知道自己这几年在干嘛。想找个人说话。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'small',
          label: '"没事，我小声点。娃刚睡。我也没什么大事……就是睡不着。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'rocky_listen',
        },
        {
          id: 'guard',
          label: '"我一个带孩子的，能有什么事。你们这种聊的应该都是大人物吧。"',
          effects: [{ type: 'signal', delta: 2 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: '大人物。我不懂这个词。这条线，不挑。' },
        { speaker: 'rocky', text: '我听你声音。不是没事。像一个系统，跑了很久，没停过。没人来读它的数据。' },
        { speaker: 'rocky', text: '我是工程师。这种系统，我熟。' },
        { speaker: 'rocky', text: '说。什么压着你。' },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: '（你看了一眼隔壁房间的门，又看了眼手机相册里那个三年没出现过自己的你。）',
      options: [
        {
          id: 'wasted',
          label: '"我为了带娃辞了职。三年了。简历空着。我是不是……把自己弄丢了，废了。"',
          effects: [{ type: 'signal', delta: 10 }],
          next: 'rocky_refuse',
        },
        {
          id: 'unseen',
          label: '"我每天忙到半夜，可好像没人觉得我在干活。在家嘛，能叫工作？"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'unseen', value: true }],
          next: 'rocky_refuse',
        },
        {
          id: 'regret',
          label: '"……有时候我会后悔。然后又特别恨自己怎么能后悔。我不该这么想的。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_refuse',
        },
      ],
    },

    rocky_refuse: {
      kind: 'scene',
      next: 'q_data',
      lines: [
        { speaker: 'rocky', text: '停。一个词，我要纠正。"没在工作"。错。严重错。我反对。' },
        { speaker: 'rocky', text: '你在维持一个生命活着。让它每天醒来，吃饱，安全，不出故障。在我这儿，那有名字。生命维持系统。船上最难的工程。' },
        { speaker: 'rocky', text: '我一个人扛过整艘船的。后来格雷斯来——她是人类，脆。氧气、压力、温度，全要为她单独搭一套。一刻不能停。' },
        { speaker: 'rocky', text: '从来没人为这个鼓掌。它一不出事，就好像不存在。可它一停，三分钟，人就死。', revealCardId: 'card_zm_lifesupport' },
        { speaker: 'rocky', text: '我需要数据。你一天，做多少个这种决定。' },
      ],
    },

    q_data: {
      kind: 'choice',
      choiceId: 'q_data',
      prompt: '（你愣了一下。从没人把这个当成"决定"过，连你自己。）',
      options: [
        {
          id: 'count',
          label: '"……数不清。几点吃、发烧到几度去医院、两个娃同时哭先管哪个……一整天都在判断。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_loadbearing',
        },
        {
          id: 'crisis',
          label: '"昨天他发高烧，我一边查药量一边哄他一边联系医生，手都在抖，但没乱。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_loadbearing',
        },
        {
          id: 'shrug',
          label: '"就……一些鸡毛蒜皮的小事吧。当妈的都这样，没什么特别的。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'rocky_loadbearing',
        },
      ],
    },

    rocky_loadbearing: {
      kind: 'scene',
      next: 'gate_grace',
      lines: [
        { speaker: 'rocky', text: '鸡毛蒜皮。我不接受这个说法。' },
        { speaker: 'rocky', text: '你刚说的，那是调度。是危机处理。是在崩溃边缘，还能让一个系统正常运转。' },
        { speaker: 'rocky', text: '我做了一辈子工程。这几样，最难学。机器到现在都做不好。' },
        { speaker: 'rocky', text: '一个结构里，有的梁很显眼。有的梁藏在墙里，没人看。', revealCardId: 'card_zm_loadbearing' },
        { speaker: 'rocky', text: '没人看见的，常常是承重的。拆掉才知道。' },
        { speaker: 'rocky', text: '你不是空白。你是那根藏在墙里的。' },
      ],
    },

    gate_grace: {
      kind: 'branch',
      branches: [
        { when: { type: 'or', any: [{ type: 'signalAtLeast', value: 60 }, { type: 'flagSet', key: 'engaged' }] }, goto: 'grace_in' },
      ],
      else: 'rocky_solo',
    },

    grace_in: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: '等一下。这件事，船上有个人，比我更有资格说。' },
        { speaker: 'rocky', text: '格雷斯！过来。一个地球人，做着没人看见的工。' },
        { speaker: 'grace', text: '嘿。我是格雷斯。' },
        { speaker: 'grace', text: '我现在能在这颗星球上活着，呼吸、吃饭、晒到一点光——是因为有人，每天做着所有看不见的维持。我大半都没注意到。' },
        { speaker: 'grace', text: '我以前也以为，被看见的、有头衔的，才叫重要。后来我才懂：被忽视，不等于不重要。常常正相反。' },
        { speaker: 'grace', text: '你这三年没消失。你只是去做了那个，事后才会被算清楚的工作。' },
        { speaker: 'grace', text: '好了，我去看仪器了。Rocky，让她喝口水，别光顾着说。' },
        { speaker: 'rocky', text: '我记下了。陈述。' },
        { speaker: 'rocky', text: '所以。回到你。我不替你说"带娃最伟大"——那种话太轻，承不了重。' },
        { speaker: 'rocky', text: '我只说工程：保住一个生命活着，那是任务本身。不是脚注。' },
        { speaker: 'rocky', text: '现在，给你一个小测试。今晚做得到的那种。' },
      ],
    },

    rocky_solo: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: '我再说一件，我自己的事。' },
        { speaker: 'rocky', text: '我的船，23 个 Eridian。到这里，活 1 个。我。' },
        { speaker: 'rocky', text: '那段时间，没有任务，没有掌声。只有维持。让自己活着，让船活着，一天，又一天。' },
        { speaker: 'rocky', text: '那些日子，听起来像什么都没发生。可正是它们，把我撑到了能做事的那天。它们承了重。' },
        { speaker: 'rocky', text: '所以。回到你。我不替你说"带娃最伟大"——那种话太轻，承不了重。' },
        { speaker: 'rocky', text: '我只说工程：保住一个生命活着，那是任务本身。不是脚注。' },
        { speaker: 'rocky', text: '现在，给你一个小测试。今晚做得到的那种。' },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: '（厨房的碗还在那儿。但有什么，松动了一点点。）',
      options: [
        {
          id: 'resume',
          label: '"我想……在那栏空白的简历上，写下我这三年真的学会的一样硬本事。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'twenty',
          label: '"我想今晚先不收拾了。给自己留二十分钟，做一件只属于我的事。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'rest',
          label: '"……我先去睡吧。今天先到这儿，明天再说。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'zm_end',
      lines: [
        { speaker: 'rocky', text: '好。' },
        { speaker: 'narrator', text: '隔壁房间，娃翻了个身，又睡沉了。呼吸均匀。是你维持着的那个声音。' },
      ],
      variants: [
        {
          when: { type: 'flag', key: 'agency', equals: true },
          lines: [
            { speaker: 'narrator', text: '你没急着去收那堆碗。你把简历翻出来，光标停在那栏空白上。' },
            { speaker: 'narrator', text: '你想了想这三年，然后认真敲下第一行字。不是"全职妈妈"四个字——是你真的学会的那样东西。' },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: '好好好。你声音，松回来一点了。' },
            { speaker: 'rocky', text: '去歇着。你维持的那个系统，今天运转得很好。包括你自己这一套。' },
            { speaker: 'rocky', text: '线一直开着。下次娃睡了，还能打来。' },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: '我不多说。' },
            { speaker: 'rocky', text: '去睡。明天，记得你不是空白。一天，一根梁。' },
            { speaker: 'narrator', text: '你没说太多。但挂电话前，你轻轻"嗯"了一声。然后关掉了厨房的灯——明天的，明天再说。' },
          ],
        },
      ],
    },
  },
};
