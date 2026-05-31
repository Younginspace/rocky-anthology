import type { Episode } from '../../engine/types';

/**
 * ep01 ·《二战的夜》· 林晚 — 考研二战+考公 / AI 焦虑。
 *
 * GOLD-STANDARD TEMPLATE. New episodes copy this shape:
 *  - opening scene (narrator sets the night) → connect → first choice (stance)
 *  - Rocky runs the engineer pipeline (observe → misunderstand → ask data →
 *    reduce to constraints → one action) before any "wisdom"
 *  - 2–3 choice points; branches reconverge
 *  - a Grace gate: or(signalAtLeast 60, flagSet 'engaged')
 *  - one ending node + layered variants (warm / quiet / agency)
 *  - exactly 2 wisdom cards, revealed on spine scenes
 */
export const ep01: Episode = {
  id: 'ep01',
  order: 1,
  title: '二战的夜',
  subtitle: '林晚 · 考研二战 / 考公',
  theme: '当你怕自己的努力会被机器取代',
  caller: {
    id: 'lin_wan',
    handle: 'LW-0207',
    realName: '林晚',
    age: 23,
    location: '某二线城市 · 城中村出租屋',
    tagline: '二战考研 + 考公，一战已经失败过一次',
    reason: '凌晨两点，又一次模考崩了。她刷到一条新闻——AI 又能做某件她正在学的事了。',
    outcomeShort: '她没有立刻"想通"。但那天之后，她重新做题是为了弄懂，不是为了打败谁。',
    morningBeat: '林晚翻开旧笔记，找出那道她曾经熬夜推出来的题——这次，她想用自己的话再讲一遍。',
    accent: 'amber',
  },
  cards: [
    { id: 'card_lw_caring', episodeId: 'ep01', speaker: 'rocky', text: '没用的东西，不会半夜怕。会怕，说明在乎。在乎是稀缺材料。' },
    { id: 'card_lw_choose', episodeId: 'ep01', speaker: 'rocky', text: '机器做你的题。机器不想做你的题。"想"，机器没有。你有。' },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: '〔星际通讯线 · ERID↔地球〕今晚第 14 通来电', stage: '信号建立中…' },
        { speaker: 'narrator', text: '凌晨两点零七分。出租屋的灯没开。' },
        { speaker: 'narrator', text: '模考的分数还亮在屏幕上。手机里另一条推送刚弹出来：又一个 AI，又能做一件你正在学的事了。' },
        { speaker: 'narrator', text: '朋友圈最上面那条："上岸啦！"配九张图。' },
        { speaker: 'narrator', text: '你点开收藏夹最底下那个链接。当年高三读《挽救计划》时存的。你也不知道自己在干嘛。' },
        { speaker: 'narrator', text: '拨号音很长。比一般的电话长得多。' },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: '● 信号接通 · 延迟 4.2 秒', stage: '' },
        { speaker: 'rocky', text: '接通。一个地球信号。' },
        { speaker: 'rocky', text: '一个人类。软软的。声音……紧。' },
        { speaker: 'rocky', text: '我是 Rocky。你找格雷斯的朋友，问号。' },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: '（电话那头真的有人。你张了张嘴。）',
      options: [
        {
          id: 'admit_lost',
          label: '"我……其实也不知道为什么打来。就是，有点撑不住了。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'deflect',
          label: '"听说这儿能跟外星人聊天，来试试呗。"（你笑了一下，没什么力气。）',
          effects: [{ type: 'signal', delta: 2 }],
          next: 'rocky_listen',
        },
        {
          id: 'test',
          label: '"你真是那个 Rocky？证明一下。"',
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: '证明。好。我体温 96 度。我有一个妻。我从零，和格雷斯，造出一种语言。够，问号。' },
        { speaker: 'rocky', text: '现在。你声音紧。像材料，应力到极限。快裂的那种。' },
        { speaker: 'rocky', text: '我是工程师。看见快裂的东西，我想知道：什么在压它。' },
        { speaker: 'rocky', text: '发生什么。说。' },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: '（你深吸一口气。）',
      options: [
        {
          id: 'replaced',
          label: '"我学的这些，AI 现在都能做了。我考上又怎样，我是不是……本来就没用。"',
          effects: [{ type: 'signal', delta: 8 }],
          next: 'rocky_refuse',
        },
        {
          id: 'compare',
          label: '"别人都上岸了，朋友圈一个接一个。就我还在原地，二战了还在原地。"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'compare', value: true }],
          next: 'rocky_refuse',
        },
        {
          id: 'money',
          label: '"我妈为了让我二战，把接的私活都推了。我要是再考不上……我怕辜负她。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'money', value: true }],
          next: 'rocky_refuse',
        },
      ],
    },

    rocky_refuse: {
      kind: 'scene',
      next: 'rocky_question',
      lines: [
        { speaker: 'rocky', text: '等。你想我说："AI 比不上人类"。我们辩论。你赢，你舒服五分钟。' },
        { speaker: 'rocky', text: '不。我不辩论。辩论不修东西。' },
        { speaker: 'rocky', text: '我问你一个工程问题。那个会做你的题的机器——它会"选"要解决哪个问题，问号。' },
        { speaker: 'caller', text: '……不会。问题是人给它的。' },
        { speaker: 'rocky', text: '对。', revealCardId: 'card_lw_choose' },
        { speaker: 'rocky', text: '机器做你的题。机器不"想"做你的题。"想"，机器没有。你有。挑问题的，没被取代。' },
      ],
    },

    rocky_question: {
      kind: 'scene',
      next: 'q_remember',
      lines: [
        { speaker: 'rocky', text: '所以我问的不是"你考不考得上"。' },
        { speaker: 'rocky', text: '我问：在恐惧替你挑问题之前——你自己挑的，是哪个问题。' },
        { speaker: 'rocky', text: '想一下。慢慢。延迟没关系，我等。' },
      ],
    },

    q_remember: {
      kind: 'choice',
      choiceId: 'q_remember',
      prompt: '（你愣住了。这个问题很久没人问过你，连你自己都没问过。）',
      options: [
        {
          id: 'loved',
          label: '"……我以前是真的喜欢过。大一有道题，我熬到天亮才推出来，开心得睡不着。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'loved_it', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'forgot',
          label: '"不记得了。现在脑子里只剩排名、分数线、还差多少分。"',
          effects: [{ type: 'signal', delta: 6 }],
          next: 'gate_grace',
        },
        {
          id: 'angry',
          label: '"挑问题？我现在连选择的资格都快没了，还谈什么挑。"',
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'gate_grace',
        },
      ],
    },

    gate_grace: {
      kind: 'branch',
      branches: [
        { when: { type: 'or', any: [{ type: 'signalAtLeast', value: 60 }, { type: 'flagSet', key: 'engaged' }] }, goto: 'grace_in' },
      ],
      else: 'rocky_story',
    },

    grace_in: {
      kind: 'scene',
      next: 'rocky_caring',
      lines: [
        { speaker: 'rocky', text: '等一下。这个问题，我船上有个人比我会答。' },
        { speaker: 'rocky', text: '格雷斯！过来。一个地球人，怕自己没用。' },
        { speaker: 'grace', text: '嘿。我是格雷斯。' },
        { speaker: 'grace', text: '我以前是科学家。后来论文被推翻，学术圈把我扫地出门，我去当了中学老师。所有人都觉得我废了，包括我自己。' },
        { speaker: 'grace', text: '结果你知道吗——我这辈子最重要的工作，是在我以为自己最没用的那几年里，攒下来的。教书攒的。' },
        { speaker: 'grace', text: '"有没有用"这件事，常常要很久以后才结算。别用今晚两点钟的汇率，去卖掉你自己。' },
        { speaker: 'grace', text: '好了，我去看仪器了。Rocky，对她好点。' },
        { speaker: 'rocky', text: '我一直好。陈述。' },
      ],
    },

    rocky_story: {
      kind: 'scene',
      next: 'rocky_caring',
      lines: [
        { speaker: 'rocky', text: '我说个我的事。' },
        { speaker: 'rocky', text: '我的船，23 个 Eridian。到这里，活 1 个。我。' },
        { speaker: 'rocky', text: '我活下来，不是因为我最强。是我的工作台，恰好靠近燃料，挡了辐射。我当时不知道。' },
        { speaker: 'rocky', text: '能力，运气，还活着，还在做事。四个一起，我才在这儿。' },
        { speaker: 'rocky', text: '没有谁，是因为"够格"才活下来的。活着的人，接着做下一件事。就这样。' },
      ],
    },

    rocky_caring: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: '还有一件事，关于你。' },
        { speaker: 'rocky', text: '一个真没用的东西，不会半夜两点，怕成这样。', revealCardId: 'card_lw_caring' },
        { speaker: 'rocky', text: '你会怕，说明你在乎。在乎，是稀缺材料。机器没有。' },
        { speaker: 'rocky', text: '别把稀缺材料，当垃圾扔了。' },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: '（窗外天还黑着。但有什么东西，松动了一点点。）',
      options: [
        {
          id: 'rewrite',
          label: '"我想……把那道我曾经喜欢的题，用我自己的话，重新讲一遍。不为考试。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'line',
          label: '"我想给自己划条线。哪些事交给 AI，哪些我自己来。我来决定。"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'sleep',
          label: '"……我先睡吧。今天先到这儿。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'lw_end',
      lines: [
        { speaker: 'rocky', text: '好。' },
        { speaker: 'narrator', text: '你关掉了那个还亮着分数的页面。也关掉了刷了一晚的招聘 App。' },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'agency' },
          lines: [
            { speaker: 'narrator', text: '你翻出大一的旧笔记本，一页页找。找那道你曾经熬到天亮的题。' },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: '好好好。你声音，不那么紧了。材料松回来了。' },
            { speaker: 'rocky', text: '去睡，漏水的太空团子。我在这头。线一直开着。' },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: '我不多说。' },
            { speaker: 'rocky', text: '去睡。明天，弄懂一个问题就好。一个。' },
            { speaker: 'narrator', text: '你没说太多。但挂电话前，你轻轻"嗯"了一声。然后关了灯。' },
          ],
        },
      ],
    },
  },
};
