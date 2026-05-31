import type { Episode } from '../../engine/types';

/**
 * ep07 ·《你不是你的职位》· 韩冬 — 中年失业程序员 / AI+降本增效裁掉 / 养家。
 *
 * 中年版「身份崩塌」，与 ep01（23 岁学生的 AI 焦虑）区分：
 *  - 上有老下有小、房贷在身；十几年都把"我是个好工程师"当成全部身份。
 *  - 更重、更沉默、更怕被家人看成失败者。
 *  - Rocky 角度：单一负载路径 = 单点故障；机器接管了功能，没接管你。
 *    冗余 = 还能学、还能换载荷。要数据：除了那门技术，你真正会的是什么。
 *  - Grace 客串（gated）：学术抛弃过我，我以为我完了——结果"教"在别处最被需要。
 *  - 落地（反风口论）：列三件不依赖那个岗位、但他确实擅长的能力；或今晚先跟家人说句实话。
 */
export const ep07: Episode = {
  id: 'ep07',
  order: 7,
  title: '你不是你的职位',
  subtitle: '韩冬 · 中年失业 / 程序员',
  theme: '当机器把你会的那门手艺做了，而你以为那就是你',
  caller: {
    id: 'han_dong',
    handle: 'HD-1109',
    realName: '韩冬',
    age: 38,
    location: '某新一线城市 · 还贷中的两居室',
    tagline: '写了十四年代码，上周被"降本增效"和 AI 一起优化掉',
    reason: '深夜。客厅没开灯。老婆孩子睡了，老人的药刚续完，房贷下周又要扣。他第一次不知道明天该往哪儿去。',
    outcomeShort: '他没有立刻找到下家。但他停止了把整个人，押在那一个已经没了的岗位上。',
    morningBeat: '韩冬在手机备忘录里写下三行字——不是简历模板，是三件"不靠那个岗位、他也确实擅长"的事。写完没删。',
    accent: 'cyan',
  },
  cards: [
    { id: 'card_hd_function', episodeId: 'ep07', speaker: 'rocky', text: '机器接管了功能。没接管你。你不是你执行的那个功能。' },
    { id: 'card_hd_redundancy', episodeId: 'ep07', speaker: 'rocky', text: '只有一条负载路径的系统，脆。多学一条。那叫冗余。' },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: '〔星际通讯线 · ERID↔地球〕今晚第 9 通来电', stage: '信号建立中…' },
        { speaker: 'narrator', text: '凌晨一点四十。客厅没开灯，只有路由器一闪一闪的绿。' },
        { speaker: 'narrator', text: '卧室门关着，老婆和孩子睡了。老人的降压药刚续完，发票还摊在茶几上。房贷下周三扣款。' },
        { speaker: 'narrator', text: '你写了十四年代码。上周三，HR 说了两个词：降本增效。后面那句你记得清清楚楚——"很多活，现在 AI 都能干了"。' },
        { speaker: 'narrator', text: '招聘 App 你刷到手机发烫。三十八岁，要求"本科 35 岁以下"。已读不回。' },
        { speaker: 'narrator', text: '你不知道怎么跟家里开口。这几天你照常七点出门，在商场里坐到天黑。' },
        { speaker: 'narrator', text: '收藏夹最底下，有条几年前存的链接。你也不知道自己半夜在干嘛，点了进去。' },
        { speaker: 'narrator', text: '拨号音很长。比一般的电话长得多。' },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: '● 信号接通 · 延迟 4.1 秒', stage: '' },
        { speaker: 'rocky', text: '接通。一个地球信号。' },
        { speaker: 'rocky', text: '一个人类。声音……压着。像承重的梁，载荷超了，还在硬撑。' },
        { speaker: 'rocky', text: '我是 Rocky。你找格雷斯的朋友，问号。' },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: '（屏幕那头真的有声音。你坐在黑着灯的沙发上，喉咙发紧。）',
      options: [
        {
          id: 'admit',
          label: '"我……上周被裁了。还没敢跟家里说。憋了几天，找个谁都不认识的地方说一句。"',
          effects: [{ type: 'signal', delta: 13 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'deflect',
          label: '"听说这线能跟外星人聊天。睡不着，随便试试。"（你苦笑了一下。）',
          effects: [{ type: 'signal', delta: 3 }],
          next: 'rocky_listen',
        },
        {
          id: 'spar',
          label: '"你一个外星人，能懂三十八岁丢了饭碗是什么感觉？"',
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: '丢了饭碗。我先确认——你的身体，没坏，问号。家里人，活着，问号。' },
        { speaker: 'caller', text: '……都好。就是我，没工作了。' },
        { speaker: 'rocky', text: '好。那系统主结构，还在。坏的是一根梁。我们先看那根梁。' },
        { speaker: 'rocky', text: '我是工程师。一根梁突然卸了，我不慌着哭。我先量：它原来承的载荷，现在压到哪儿去了。' },
        { speaker: 'rocky', text: '说。怎么卸的。' },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: '（你深吸一口气，黑暗里说出来反而容易些。）',
      options: [
        {
          id: 'identity',
          label: '"我写了十四年代码。我这个人，就是个工程师。现在这个没了……我都不知道我还是谁。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'identity', value: true }],
          next: 'rocky_unpack',
        },
        {
          id: 'replaced',
          label: '"裁我的理由是 AI 能干。我熬了十几年练的东西，机器一上来，大半都做了。"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'replaced', value: true }],
          next: 'rocky_unpack',
        },
        {
          id: 'family',
          label: '"房贷、老人药费、孩子。我是这家里挣钱的那个。我要是塌了，这家就塌了。"',
          effects: [{ type: 'signal', delta: 13 }, { type: 'flag', key: 'family', value: true }],
          next: 'rocky_unpack',
        },
      ],
    },

    rocky_unpack: {
      kind: 'scene',
      next: 'rocky_function',
      lines: [
        { speaker: 'rocky', text: '我听明白一件事。你把"我是谁"，全压在"我那个职位"上。把操作员，和他执行的那个功能，焊成了一个。' },
        { speaker: 'rocky', text: '工程上，这两个，从来不是一个东西。功能，是机器跑的那段活。操作员，是决定让机器跑什么、它跑歪了谁来修的那个。' },
        { speaker: 'rocky', text: '你被卸下来的，是一个功能岗。不是那个操作员。' },
        { speaker: 'rocky', text: '不是你不行。是你把自己，错认成了一段可以被接管的功能。' },
      ],
    },

    rocky_function: {
      kind: 'scene',
      next: 'q_data',
      lines: [
        { speaker: 'rocky', text: '再说那个机器。你说它做了你大半的活。我相信。' },
        { speaker: 'rocky', text: '但是。机器接管的是一个功能。写那种代码，是一个功能。', revealCardId: 'card_hd_function' },
        { speaker: 'rocky', text: '功能，不是你。你不是你执行的那个功能。' },
        { speaker: 'rocky', text: '我船上有台仪器，专做光谱分析。它坏了，我没说"那我也完了"。我说：这个功能，得有别的承重。' },
        { speaker: 'rocky', text: '所以我问你一个工程问题。这十四年，除了"写那种代码"——你真正会的，是什么。' },
      ],
    },

    q_data: {
      kind: 'choice',
      choiceId: 'q_data',
      prompt: '（你愣了一下。从来没人这么问过。连你自己都没分开想过。）',
      options: [
        {
          id: 'debug',
          label: '"……我擅长把烂摊子理顺。别人接不了的祖传烂代码，没文档的，我能蹲进去把它捋清楚。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'has_data', value: true }, { type: 'flag', key: 'engaged', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'mentor',
          label: '"带新人。这些年我带过六七个，没经验的小孩，我能教到能独立干活。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'has_data', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'blank',
          label: '"……不知道。我脑子里只剩「我废了」。除了那门技术，我好像什么都不会。"',
          effects: [{ type: 'signal', delta: 6 }],
          next: 'gate_grace',
        },
      ],
    },

    gate_grace: {
      kind: 'branch',
      branches: [
        { when: { type: 'or', any: [{ type: 'signalAtLeast', value: 60 }, { type: 'flagSet', key: 'engaged' }] }, goto: 'grace_in' },
      ],
      else: 'rocky_redundancy',
    },

    grace_in: {
      kind: 'scene',
      next: 'rocky_redundancy',
      lines: [
        { speaker: 'rocky', text: '等一下。这个，我船上有个人，比我懂。她被时代换下来过。' },
        { speaker: 'rocky', text: '格雷斯！过来。一个地球人，时代不要他了。' },
        { speaker: 'grace', text: '嘿，我是格雷斯。我听到了一点。我跟你说一句我花了很多年才懂的：' },
        { speaker: 'grace', text: '我会的那个"教"，在另一个地方，刚好是最被需要的。' },
        { speaker: 'grace', text: '我也被时代换下来过，岗位没了，以为自己整个人都作废了。后来才发现——作废的是那个头衔，不是我会的本事。本事换了个地方，照样吃香。' },
        { speaker: 'grace', text: '换下来的是你那个"岗位"。不是你会的所有东西。这俩，别一起埋了。' },
        { speaker: 'grace', text: '行了，我去看仪器。Rocky，让他把数据摆出来。' },
        { speaker: 'rocky', text: '正在摆。陈述。' },
      ],
    },

    rocky_redundancy: {
      kind: 'scene',
      next: 'rocky_family',
      lines: [
        { speaker: 'rocky', text: '回到结构。那根断了的梁，我们不哭它。我们加梁。' },
        { speaker: 'rocky', text: '只有一条负载路径的系统，脆。多学一条，多带一条。那叫——冗余。', revealCardId: 'card_hd_redundancy' },
        { speaker: 'rocky', text: '冗余，不是浪费。是其中一条断了，整座桥还站着。' },
        { speaker: 'rocky', text: '你现在不是没用了。你是发现了：你只有一条路径。三十八岁，刚好知道要再造一条。不晚。' },
      ],
    },

    rocky_family: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: '还有一件事。你几天没跟家里说。一个人扛。' },
        { speaker: 'rocky', text: '我也一个人扛过。一个人扛，结构最容易在没人看见的地方，先裂。我知道。' },
        { speaker: 'rocky', text: '家里人，也是结构的一部分。一根梁卸了，告诉别的梁，它们好分担。瞒着，它们使不上力。' },
        { speaker: 'rocky', text: '你怕被他们看成失败的那个。我说一句——他们要的是你这个人。不是你那个工资条。' },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: '（窗外天还黑着。但胸口那块压着的石头，松了一道缝。）',
      options: [
        {
          id: 'list_three',
          label: '"我想……列三件不靠那个岗位、但我确实擅长的事。先写下来，看看我手里到底还有什么。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'tell_family',
          label: '"我想……明早跟我老婆说实话。不再一个人扛了。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'told_family', value: true }],
          next: 'end_main',
        },
        {
          id: 'just_sleep',
          label: '"……我先去睡。脑子太乱了，今天先到这儿。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'hd_end',
      lines: [
        { speaker: 'rocky', text: '好。' },
        { speaker: 'narrator', text: '你关掉了刷到发烫的招聘 App。客厅还是黑的，但你不再盯着路由器那盏绿灯发呆。' },
      ],
      variants: [
        {
          when: { type: 'flag', key: 'told_family', equals: true },
          lines: [
            { speaker: 'narrator', text: '你看了一眼卧室那扇关着的门。明早，你打算趁孩子上学前，跟她说清楚。' },
            { speaker: 'rocky', text: '别一个人承重。告诉别的梁。它们比你想的，能扛。' },
          ],
        },
        {
          when: { type: 'and', all: [{ type: 'flagSet', key: 'agency' }, { type: 'not', cond: { type: 'flagSet', key: 'told_family' } }] },
          lines: [
            { speaker: 'narrator', text: '你打开手机备忘录，新建了一页。光标闪着，等你写下第一行。' },
            { speaker: 'rocky', text: '明天，造你的第二条路径。一条就够开始。冗余，是一条一条加上去的。' },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: '好好好。你声音，不那么压着了。梁，松回来一点了。' },
            { speaker: 'rocky', text: '去睡，地球人。线一直开着。一根梁断，你不是整座桥。记住。' },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: '我不多说。' },
            { speaker: 'rocky', text: '去睡。明天，只做一件事——想清楚那门技术之外，你还会一样什么。一样就够。' },
            { speaker: 'narrator', text: '你没说太多。但挂线前，你轻轻"嗯"了一声。然后靠回沙发，第一次没去看那盏绿灯。' },
          ],
        },
      ],
    },
  },
};
