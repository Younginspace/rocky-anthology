import type { Episode } from '../../engine/types';

/**
 * ep10 ·《不表达，信息会死》· 夏鸣 — 独立音乐人 / 自我表达 · 无人听。
 *
 * Follows the ep01 gold-standard shape:
 *  - opening scene (system + narrator + "今晚第 N 通来电" trace) → connect → first stance choice
 *  - Rocky runs the engineer pipeline (observe → misunderstand → ask data →
 *    reduce to constraints → one action) before any "wisdom"
 *  - Eridian canon: music = language = structure; expression is signal that
 *    dies undecoded if unsent. But transmission = send + RECEIVE, so being
 *    heard is an engineering goal, not vanity.
 *  - Grace gate: or(signalAtLeast 60, flagSet 'engaged') → grace_in else → rocky-only
 *  - one ending node + warm / quiet / agency variants
 *  - exactly 2 wisdom cards (rocky 'card_xm_signal', grace 'card_xm_received')
 */
export const ep10: Episode = {
  id: 'ep10',
  order: 10,
  title: '不表达，信息会死',
  subtitle: '夏鸣 · 独立音乐人 / 无人听',
  theme: '当你表达了很久，却好像没人在听',
  caller: {
    id: 'xia_ming',
    handle: 'XM-0418',
    realName: '夏鸣',
    age: 25,
    location: '某城中村 · 隔音棉糊墙的出租屋',
    tagline: '做独立音乐三年，最新一首歌播放量两位数',
    reason: '深夜又上传了一首歌。刷新了一晚上，播放量从 7 涨到 9。其中两次是他自己点的。',
    outcomeShort: '他没有立刻"被听见"。但他把下一首做完了，发出去了——而且这次，他亲手递给了一个人。',
    morningBeat: '夏鸣把那首没人听的歌，单独发给了楼下那个总在凌晨修吉他的大叔。附了一句："你帮我听听这段，行吗。"',
    accent: 'violet',
  },
  cards: [
    { id: 'card_xm_signal', episodeId: 'ep10', speaker: 'rocky', text: '不表达，信息随你一起死。没人能再解码。' },
    { id: 'card_xm_received', episodeId: 'ep10', speaker: 'grace', text: '射出去。不知道有没有人收。还是射。因为不射，一定死。' },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: '〔星际通讯线 · ERID↔地球〕今晚第 19 通来电', stage: '信号建立中…' },
        { speaker: 'narrator', text: '凌晨一点四十。隔音棉糊在墙上，房间安静得能听见硬盘转。' },
        { speaker: 'narrator', text: '新歌昨天发出去了。你刷新后台。播放量：9。' },
        { speaker: 'narrator', text: '其中两次是你自己点的。你心里清楚。' },
        { speaker: 'narrator', text: '招聘 App 的页面还开着另一个标签。"音频后期""文案""都行"。明天去面，也许该认了。' },
        { speaker: 'narrator', text: '你不知道为什么，点开了收藏夹底下那个奇怪的链接。拨号音很长。' },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: '● 信号接通 · 延迟 4.1 秒', stage: '' },
        { speaker: 'rocky', text: '接通。地球信号。' },
        { speaker: 'rocky', text: '一个人类。声音……低。压着。像音量调到最小，怕吵醒谁。' },
        { speaker: 'rocky', text: '我是 Rocky。说。' },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: '（电话那头真的有声音。一个不是人类的声音。你愣了一下。）',
      options: [
        {
          id: 'admit',
          label: '"我做音乐。三年了。没人听。我……是不是该停了。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'deflect',
          label: '"没事。就随便打打。反正也没人在乎我说什么。"（你苦笑。）',
          effects: [{ type: 'signal', delta: 2 }],
          next: 'rocky_listen',
        },
        {
          id: 'test',
          label: '"听说外星人靠声音说话？那你应该懂——一个声音发出去，没人收，是什么感觉。"',
          effects: [{ type: 'signal', delta: 7 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: '声音发出去，没人收。' },
        { speaker: 'rocky', text: '这个，我懂。懂懂懂。' },
        { speaker: 'rocky', text: '我们 Eridian，不分"说话"和"音乐"。声音就是话，话就是结构。我现在跟你讲的，对我，也是和弦。' },
        { speaker: 'rocky', text: '所以你"做音乐"——对我，那不是娱乐。那是你在编码。你把一段你，压进声音里。' },
        { speaker: 'rocky', text: '现在告诉我故障在哪。发生什么。' },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: '（你没想到他这么说。你深吸一口气。）',
      options: [
        {
          id: 'no_one',
          label: '"播放量个位数。我对着空气唱了三年。开始怀疑——这事到底有没有意义。"',
          effects: [{ type: 'signal', delta: 8 }],
          next: 'rocky_unpack',
        },
        {
          id: 'pressure',
          label: '"房租、爸妈、同学都在赚钱。我再不找份正经工作，就真成笑话了。"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'pressure', value: true }],
          next: 'rocky_unpack',
        },
        {
          id: 'worthless',
          label: '"没人听，是不是就说明……我写的东西本来就不值得听。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_unpack',
        },
      ],
    },

    rocky_unpack: {
      kind: 'scene',
      next: 'rocky_question',
      lines: [
        { speaker: 'rocky', text: '等。你把两件事，焊成一件了。我帮你拆开。' },
        { speaker: 'rocky', text: '第一件：值不值得做。第二件：有多少人收到。你以为它们是同一根梁。不是。' },
        { speaker: 'rocky', text: '先说第一件。你不表达——那段你，编码在你脑子里，没出来。' },
        { speaker: 'rocky', text: '然后有一天，你停了。那段信息，随你一起死。没人能再解码。没有副本。', revealCardId: 'card_xm_signal' },
        { speaker: 'rocky', text: '我船上 23 个 Eridian。22 个，连同他们脑子里的东西，全没了。我懂"信息随人死"是什么。重量很大。' },
      ],
    },

    rocky_question: {
      kind: 'scene',
      next: 'q_why',
      lines: [
        { speaker: 'rocky', text: '所以"要不要继续表达"——这个，不是播放量决定的。是"那段你，要不要留下副本"决定的。' },
        { speaker: 'rocky', text: '但我是工程师。我不骗你。还有第二件事。' },
        { speaker: 'rocky', text: '传递，等于：发送，加，接收。只发，不收，传递没完成。' },
        { speaker: 'rocky', text: '所以"被听见"，不是虚荣。那是工程目标。一个真的目标。' },
        { speaker: 'rocky', text: '我问你一个数据。这三年，你最想让"哪一个人"，听见你哪一首。一个人。一首。' },
      ],
    },

    q_why: {
      kind: 'choice',
      choiceId: 'q_why',
      prompt: '（这个问题你没准备过。你脑子里第一个跳出来的，不是"所有人"。）',
      options: [
        {
          id: 'one_person',
          label: '"……楼下那个大叔。他总在凌晨修吉他。有一次他隔着墙跟我哼了一句，调还挺准。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'has_target', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'past_self',
          label: '"我那个高中同桌。是他第一个跟我说，你写的东西不一样。后来断联了。"',
          effects: [{ type: 'signal', delta: 11 }, { type: 'flag', key: 'has_target', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'no_one_2',
          label: '"我不知道。我一直想着‘让更多人听’，从来没想过具体是谁。"',
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
      else: 'rocky_build',
    },

    grace_in: {
      kind: 'scene',
      next: 'rocky_close',
      lines: [
        { speaker: 'rocky', text: '等一下。这个，我船上有个人，亲手干过。她比我会讲。' },
        { speaker: 'rocky', text: '格雷斯！过来。一个地球人，怕没人收他的信号。' },
        { speaker: 'grace', text: '嘿。我是格雷斯。' },
        { speaker: 'grace', text: '当年地球要完了，我手里有救命的数据。我把它编码，塞进甲虫飞船，射向地球。' },
        { speaker: 'grace', text: '射出去那一刻，我根本不知道有没有人会收到。可能掉进海里，可能没人解得开，可能晚了。' },
        { speaker: 'grace', text: '我还是射了。', revealCardId: 'card_xm_received' },
        { speaker: 'grace', text: '因为不射，那段信息一定死。射出去，至少有一个"也许"。我赌那个也许。' },
        { speaker: 'grace', text: '你那九次播放，有七个不是你。那七个，就是收到的人。别因为不是七万，就当它是零。' },
        { speaker: 'grace', text: '好了，我去喂海里那群幼体了。Rocky，别让他熬通宵。' },
        { speaker: 'rocky', text: '我尽量。陈述。' },
      ],
    },

    rocky_build: {
      kind: 'scene',
      next: 'rocky_close',
      lines: [
        { speaker: 'rocky', text: '我说个我和格雷斯的事。' },
        { speaker: 'rocky', text: '我们见面，没有共同的词。一个也没有。两种声音，互相是噪音。' },
        { speaker: 'rocky', text: '我们就一个音、一个音地试。发一个，看对方收没收到，对得上，留下；对不上，扔。一点点，造出一种语言。' },
        { speaker: 'rocky', text: '那不是为了好听。是为了——我脑子里的东西，能到她脑子里。一段信息，活着穿过两个物种。' },
        { speaker: 'rocky', text: '你做的事，是一样的。你不是在求点赞。你是在造一条，能让"你"穿过去的线。' },
      ],
    },

    rocky_close: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: '所以你看。两件事，本来就该分开摆。' },
        { speaker: 'rocky', text: '"值不值得做"——你不表达，信息就死。这一头，永远值得。' },
        { speaker: 'rocky', text: '"有没有被收到"——这一头，是工程问题。工程问题，有下一步可以做。' },
        { speaker: 'rocky', text: '广播给一百万个空气，和，精准发给一个会回信号的人——后面这个，传递率高得多。' },
        { speaker: 'rocky', text: '别对着空气唱了。瞄准一个接收端。' },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: '（窗外还黑着。但有什么东西，从"全或无"里松开了。）',
      options: [
        {
          id: 'hand_it',
          label: '"我想……把下一首做完，然后亲手发给那一个人。不挂网上。就给他。"',
          effects: [{ type: 'signal', delta: 11 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'finish_send',
          label: '"我想先把抽屉里那首没发完的做完，发出去。哪怕又只有九个人。先有副本。"',
          effects: [{ type: 'signal', delta: 9 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'sleep',
          label: '"……我先睡。明天的事明天想。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'xm_end',
      lines: [
        { speaker: 'rocky', text: '好。' },
        { speaker: 'narrator', text: '你看着后台那个数字。9。它没变。但你看它的眼神，变了。' },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'agency' },
          lines: [
            { speaker: 'narrator', text: '你新建了一个工程文件。命名的时候，光标闪了很久，然后你打下了那个人的名字。' },
            { speaker: 'rocky', text: '明天，把那段你，发出去。瞄准一个人。让信息活着，落地。' },
            { speaker: 'rocky', text: '发送，加接收。这次，争取凑齐两半。' },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: '好好好。你声音回来一点了。不那么压着了。' },
            { speaker: 'rocky', text: '记住。不表达，信息随你死。表达了，至少留个副本，给那个"也许"。' },
            { speaker: 'rocky', text: '去睡。漏水的太空团子。线一直开着。我在这头收信号。' },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: '我不多说。' },
            { speaker: 'rocky', text: '一件事就好。别让脑子里那段东西，没出来就没了。' },
            { speaker: 'narrator', text: '你没说太多。挂电话前，你点开那首只有九次播放的歌，从头听了一遍。这次，听完了。' },
          ],
        },
      ],
    },
  },
};
