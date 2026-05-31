import type { Episode } from '../../engine/types';

/** ep03 ·《在别处》· 苏野 — 裸辞 gap-year，独自在异国旅行，追问意义。 */
export const ep03: Episode = {
  id: 'ep03',
  order: 3,
  title: '在别处',
  subtitle: '苏野 · 异国青旅的凌晨',
  theme: '当远方没能填满你以为它能填满的东西',
  caller: {
    id: 'su_ye',
    handle: 'SY-2210',
    realName: '苏野',
    age: 28,
    location: '某国海边小镇 · 青年旅舍上铺',
    tagline: '裸辞大半年，一个人走了很多地方',
    reason: '朋友圈的点赞很多。可凌晨躺在陌生的上铺，心里空得像漏了风。',
    outcomeShort: '他没急着回家，也没急着上路。他先下楼，跟那个总在修自行车的人，说了第一句话。',
    morningBeat: '苏野蹲在青旅院子里，帮那个当地人扶住自行车，递过去一把扳手——他们聊了起来。',
    accent: 'violet',
  },
  cards: [
    { id: 'card_sy_problem', episodeId: 'ep03', speaker: 'rocky', text: '你走很远。问题跟着你，到每一颗星球。问题不在地点。' },
    { id: 'card_sy_build', episodeId: 'ep03', speaker: 'rocky', text: '不是看了多少颗星。是和谁，一起，造了什么。' },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: '〔星际通讯线 · ERID↔地球〕今晚第 9 通来电', stage: '信号建立中…' },
        { speaker: 'narrator', text: '凌晨。陌生城市的青年旅舍，六人间，别人都睡了。' },
        { speaker: 'narrator', text: '今天发的那条动态，点赞已经九十多了。海，落日，一杯当地的酒。' },
        { speaker: 'narrator', text: '可你躺在上铺，盯着天花板，心里空得像漏了风。' },
        { speaker: 'narrator', text: '楼下院子里，那个总在修自行车、给大家做饭的本地小哥，灯还亮着。你来五天了，一句话没跟他说过。' },
        { speaker: 'narrator', text: '你戴上耳机，拨通了这条号称能打给外星人的线。' },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: '● 信号接通 · 延迟 4.2 秒', stage: '' },
        { speaker: 'rocky', text: '接通。一个人类。信号……从一个移动的位置来。你在路上，推测。' },
        { speaker: 'rocky', text: '有意思。我也曾经，离起点很远。我是 Rocky。' },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: '（一个真的跨过星际的人。你忽然不知从何说起。）',
      options: [
        {
          id: 'admit',
          label: '"我一个人在外面走了大半年了。挺好的。就是……今晚突然不知道是为了什么。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'flex',
          label: '"我在环游世界呢，挺爽的。随便聊聊。"',
          effects: [{ type: 'signal', delta: 2 }],
          next: 'rocky_listen',
        },
        {
          id: 'ask',
          label: '"你跨越了那么远……你后悔过离开家吗？"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: '后悔，问号。复杂。我离开 Erid，不是为了看风景。是我的星要死了，我去想办法。有目的的远行。' },
        { speaker: 'rocky', text: '你呢。你在移动。一直移动。我想知道：移动，在帮你修什么。' },
        { speaker: 'rocky', text: '说真的那个。不是动态里那个。' },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: '（"说真的那个。" 你喉咙紧了一下。）',
      options: [
        {
          id: 'escaping',
          label: '"我怕我不是在找什么。是在逃。逃掉那份把我熬空的工作，逃一段结束的感情，逃我自己。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'escaping', value: true }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_motion',
        },
        {
          id: 'empty',
          label: '"看了好多地方，照片很美，点赞很多。可一到夜里就特别空。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'empty', value: true }],
          next: 'rocky_motion',
        },
        {
          id: 'fear_return',
          label: '"我怕的是回去。怕回去之后，发现什么都没变。"',
          effects: [{ type: 'signal', delta: 8 }],
          next: 'rocky_motion',
        },
      ],
    },

    rocky_motion: {
      kind: 'scene',
      next: 'rocky_build',
      lines: [
        { speaker: 'rocky', text: '明白一点了。' },
        { speaker: 'rocky', text: '移动，是一种药。换地方，换风景，换人。一开始有效。痛，少一点。' },
        { speaker: 'rocky', text: '但药有剂量。用久了，同样的剂量，不再起效。你得加量——下一个国家，下一个海。还是空。' },
        { speaker: 'rocky', text: '这是故障模式。不是你坏了。是这个药，本来就治不了这个病。' },
        { speaker: 'rocky', text: '我不是说旅行不好。我是说——它修不了你以为它能修的那个东西。' },
      ],
    },

    rocky_build: {
      kind: 'scene',
      next: 'rocky_question',
      lines: [
        { speaker: 'rocky', text: '说个我的事。我整段旅途，最重要的，不是看了多少颗星。' },
        { speaker: 'rocky', text: '是我和格雷斯。两个物种，听不懂对方。我们从零，一个音一个音，造出了一种语言。', revealCardId: 'card_sy_build' },
        { speaker: 'rocky', text: '那才是我旅途里，真正发生过的事。不是距离。是我们一起，造出来的那个东西。' },
      ],
    },

    rocky_question: {
      kind: 'scene',
      next: 'q_connect',
      lines: [
        { speaker: 'rocky', text: '所以我问你一个数据。' },
        { speaker: 'rocky', text: '这大半年。你和谁，一起，做过一件真正难的事，问号。' },
        { speaker: 'rocky', text: '不是看。不是拍。是——和一个人，一起。' },
      ],
    },

    q_connect: {
      kind: 'choice',
      choiceId: 'q_connect',
      prompt: '（你想了很久。然后，你想起了楼下那盏灯。）',
      options: [
        {
          id: 'the_local',
          label: '"……青旅有个人，总在修车、做饭。我来五天了，一直没敢跟他说话。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }, { type: 'flag', key: 'local', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'no_one',
          label: '"没有。我都是一个人。路过，拍照，离开。从不停下。"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'alone', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'unsure',
          label: '"我不知道……算不算。"',
          effects: [{ type: 'signal', delta: 5 }],
          next: 'gate_grace',
        },
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
      next: 'rocky_problem',
      lines: [
        { speaker: 'rocky', text: '这个，格雷斯比我懂。他也被扔到了一个回不去的地方。' },
        { speaker: 'rocky', text: '格雷斯！一个地球人，在路上，不知道是找，还是逃。' },
        { speaker: 'grace', text: '嘿，我是格雷斯。我现在住在一颗不是地球的星球上。我本来可以回去的，飞船修好了。我选择留下。' },
        { speaker: 'grace', text: '说句你可能想听的：留下，和回去，都不是逃。地点本身，不分高下。' },
        { speaker: 'grace', text: '真正分高下的是——你到了一个地方，是去连接，还是去躲。我留在这儿，是因为这儿有我在乎的人，有我们一起在做的事。' },
        { speaker: 'grace', text: '楼下那个修车的人……我要是你，今晚就下楼。去吧。' },
        { speaker: 'rocky', text: '格雷斯总是这样。直接。好的直接。' },
      ],
    },

    rocky_solo: {
      kind: 'scene',
      next: 'rocky_problem',
      lines: [
        { speaker: 'rocky', text: '我不催你。我只说一个我学到的事。' },
        { speaker: 'rocky', text: '一个人能跨过最远的距离，不是星和星之间。是从"我自己"，到"我们"。那一步最难。' },
        { speaker: 'rocky', text: '那一步，换多少个国家，都迈不过去。要停下来，对着一个具体的人，才迈得过去。' },
      ],
    },

    rocky_problem: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: '还有一句，关于你为什么夜里空。', revealCardId: 'card_sy_problem' },
        { speaker: 'rocky', text: '你走了很远。但你那个问题，一直跟着你，到每一颗星球。' },
        { speaker: 'rocky', text: '问题不在地点。所以换地点，修不好。' },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: '（窗外有海浪声。楼下那盏灯，还亮着。）',
      options: [
        {
          id: 'stay_help',
          label: '"我想……在这儿多留几天。明天下楼，去帮那个修车的人做点什么。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }, { type: 'flag', key: 'stay', value: true }],
          next: 'end_main',
        },
        {
          id: 'send_msg',
          label: '"我想给一个一直没敢联系的人，发条消息。一句真的话。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }, { type: 'flag', key: 'msg', value: true }],
          next: 'end_main',
        },
        {
          id: 'commit',
          label: '"我会继续走。但这次，带一个具体的承诺，不只是路过。"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'agency', value: true }, { type: 'flag', key: 'commit', value: true }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'sy_end',
      lines: [
        { speaker: 'rocky', text: '好。' },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'stay' },
          lines: [
            { speaker: 'narrator', text: '你没有立刻挂电话。你看着楼下那盏灯，想着明天怎么开口。"嗨，我能搭把手吗？"——也许就这么简单。' },
          ],
        },
        {
          when: { type: 'flagSet', key: 'msg' },
          lines: [
            { speaker: 'narrator', text: '你打开对话框，那个你存了半年没敢点开的名字。这一次，你开始打字——这次没有删。' },
          ],
        },
        {
          when: { type: 'flagSet', key: 'commit' },
          lines: [
            { speaker: 'narrator', text: '你在备忘录里写下了下一站，以及一件具体要去做、要去给予的事。不再只是打卡。' },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: '好好好。意义，不在下一个地方。' },
            { speaker: 'rocky', text: '是你和谁，一起，造了什么。去造，软软的人类。线一直开着。' },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: '慢慢来。先停一下，比再走十个国家，难。也值。' },
            { speaker: 'narrator', text: '你摘下耳机。海浪声忽然清楚了。楼下，还有一盏灯亮着。' },
          ],
        },
      ],
    },
  },
};
