import type { Episode } from '../../engine/types';

/**
 * ep05 ·《知识怎么活过一代人》· 顾岚 — 中学老师 / 倦怠。
 *
 * THE GRACE-HEAVY EPISODE. Grace (himself a teacher) gets the main course:
 * a rich three-way Rocky + Grace + 顾岚 conversation. The gate is easy to
 * pass on purpose — every first stance routes toward `engaged`.
 *
 * Shape (copies ep01):
 *  - opening scene (system + narrator + 今晚第 N 通来电) → connect → stance choice
 *  - Rocky runs the engineer pipeline (observe → misunderstand → ask data →
 *    constraints → one action) before any "wisdom"
 *  - gate_grace: or(signalAtLeast 60, flagSet 'engaged') → grace_in (4–6 Grace
 *    lines), else → shorter Rocky-only path that STILL says Grace taught him
 *  - reconverge → 落地 choice (agency flag) → one ending + variants
 *  - exactly 2 wisdom cards on reachable spine scenes
 */
export const ep05: Episode = {
  id: 'ep05',
  order: 5,
  title: '知识怎么活过一代人',
  subtitle: '顾岚 · 中学老师 / 倦怠',
  theme: '当你怀疑自己教的东西到底有没有用',
  caller: {
    id: 'gu_lan',
    handle: 'GL-0901',
    realName: '顾岚',
    age: 41,
    location: '某县城中学 · 教师宿舍',
    tagline: '教了快二十年书，热情快被磨光了',
    reason: '深夜，又改完一摞卷子。她盯着满分和零分中间那一长串数字，突然不知道这些到底改变了什么。',
    outcomeShort: '她没有立刻找回热情。但第二天，她对一个总坐最后一排的孩子，做了一件不为分数的小事。',
    morningBeat: '顾岚走进教室，没急着讲题。她叫了那个总坐最后一排的孩子的名字——这次，她记得这个名字背后的事。',
    accent: 'gold',
  },
  cards: [
    { id: 'card_gl_survive', episodeId: 'ep05', speaker: 'rocky', text: '知识不会自己活。要有人，交给下一个人。老师，是知识的飞船。' },
    { id: 'card_gl_unmeasured', episodeId: 'ep05', speaker: 'grace', text: '你救的那个，测不出来。但他还在。够了。' },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: '〔星际通讯线 · ERID↔地球〕今晚第 31 通来电', stage: '信号建立中…' },
        { speaker: 'narrator', text: '晚上十一点四十。教师宿舍的台灯下，一摞卷子刚批完。' },
        { speaker: 'narrator', text: '红笔水快干了。最高分九十七，最低分三十一，中间是一长串你已经看了快二十年的数字。' },
        { speaker: 'narrator', text: '今天教研会上，主任又说"现在谁还当老师啊"，说得像在安慰你，又像在提醒你。' },
        { speaker: 'narrator', text: '你点开那个存了很久的链接——据说能拨通一个外星人。你也说不清自己想问什么。' },
        { speaker: 'narrator', text: '拨号音很长。比一般的电话长得多。' },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: '● 信号接通 · 延迟 4.2 秒', stage: '' },
        { speaker: 'rocky', text: '接通。一个地球信号。' },
        { speaker: 'rocky', text: '一个人类。声音……累。累很久那种。' },
        { speaker: 'rocky', text: '我是 Rocky。你找格雷斯的朋友，问号。' },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: '（电话那头真的有人。你一时不知道从哪说起。）',
      options: [
        {
          id: 'admit',
          label: '"我是个老师。教了快二十年。今晚……突然不知道自己教的这些，到底有没有用。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'wry',
          label: '"听说这条线能找格雷斯。我同行听说他也教书，我想跟个同行聊聊。"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'guard',
          label: '"也没什么大事。就是改卷子改到有点麻木，随便打来试试。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: '老师。等。这个词我熟。' },
        { speaker: 'rocky', text: '我会的人类的东西，都是一个老师教的。一个。格雷斯。我后面说他。' },
        { speaker: 'rocky', text: '现在你。声音累，但没断。像一台机器，跑太久，没坏，只是想停。' },
        { speaker: 'rocky', text: '我是工程师。机器想停，我先问：哪个部件在磨。说。' },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: '（你叹了口气，像把一口憋了很久的气吐出来。）',
      options: [
        {
          id: 'measure',
          label: '"分数之外，我到底改变了什么？我教的东西，考完就忘，我量不出来自己有没有用。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_misunderstand',
        },
        {
          id: 'machine',
          label: '"学生被刷成了做题机器，我也被刷成了讲题机器。这还叫教书吗。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_misunderstand',
        },
        {
          id: 'burnout',
          label: '"刚入行时我是真的热爱。现在那股劲，被一年一年磨没了。"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_misunderstand',
        },
      ],
    },

    rocky_misunderstand: {
      kind: 'scene',
      next: 'rocky_pipeline',
      lines: [
        { speaker: 'rocky', text: '等。我先理解"老师"。我按字面理解，可能错。你纠正我。' },
        { speaker: 'rocky', text: '老师，就是：你脑子里有东西。学生脑子里没有。你把东西，搬过去。' },
        { speaker: 'caller', text: '……差不多吧。但搬过去，他们考完就还回来了，忘光。' },
        { speaker: 'rocky', text: '不。搬过去，你脑子里那份没少。两边都有了。这不是搬。这是……复制。备份。' },
        { speaker: 'rocky', text: '工程里，备份有个名字。冗余。一份坏了，另一份还在。' },
      ],
    },

    rocky_pipeline: {
      kind: 'scene',
      next: 'rocky_survive',
      lines: [
        { speaker: 'rocky', text: '我要更多数据。问号。' },
        { speaker: 'rocky', text: 'Eridian 也教。必须教。一个 Eridian 死了，他脑子里的东西，不写下来，没人接——就跟着他一起没了。永远。' },
        { speaker: 'rocky', text: '我们没有你们的纸。我们靠声音，一代，传给下一代。传错一点，下一代造的桥，塌。' },
        { speaker: 'rocky', text: '所以对我们，"教"，不是搬运。是让知识，活过一个会死的人。' },
      ],
    },

    rocky_survive: {
      kind: 'scene',
      next: 'gate_grace',
      lines: [
        { speaker: 'rocky', text: '你问，分数之外改变了什么。我换个问法。' },
        { speaker: 'rocky', text: '一个人会死。他脑子里的东西，本来跟他一起死。', revealCardId: 'card_gl_survive' },
        { speaker: 'rocky', text: '知识不会自己活。要有人，把它，交给下一个人。' },
        { speaker: 'rocky', text: '老师，是知识的飞船。坐满了人，飞过一代人的死。' },
        { speaker: 'rocky', text: '你飞了快二十年。这个，分数那栏，量不出来。' },
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
      next: 'grace_talk',
      lines: [
        { speaker: 'rocky', text: '等。这个，他比我会答。他自己就是老师。' },
        { speaker: 'rocky', text: '格雷斯！过来。一个地球老师，教了二十年，问值不值。' },
        { speaker: 'grace', text: '嘿，我是格雷斯。二十年……比我久。我也教书。' },
        { speaker: 'caller', text: '听说你以前是科学家。怎么会跑去……教书？' },
        { speaker: 'grace', text: '说来不好听。我论文被推翻，学术圈待不下去了，灰头土脸。能去的地方只剩一所中学。' },
        { speaker: 'grace', text: '我那时候觉得，这是退而求其次。降级。我一个搞分子生物的，去给十六岁的孩子讲细胞，憋屈。' },
      ],
    },

    grace_talk: {
      kind: 'scene',
      next: 'q_to_grace',
      lines: [
        { speaker: 'grace', text: '结果你猜怎么着。后来人类要派人去救命，挑来挑去，挑中我。不是因为我论文写得好——是因为我能把难得要死的东西，讲给一屋子听不懂的人，让他们听懂。' },
        { speaker: 'grace', text: '那本事，是当老师练出来的。不是实验室。' },
        { speaker: 'grace', text: '我以为教书是退而求其次。后来才发现，那是我这辈子做过最重要的事。' },
        { speaker: 'rocky', text: '现在他教 Eridian 小孩。我也算他半个学生。陈述。' },
        { speaker: 'grace', text: '别提了，你比那帮小孩还难教。' },
      ],
    },

    q_to_grace: {
      kind: 'choice',
      choiceId: 'q_to_grace',
      prompt: '（你握紧了手机。这个人，好像真的懂。）',
      options: [
        {
          id: 'still_doubt',
          label: '"可你救了两颗星球。我呢？我连一个学生改成什么样了都看不见。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'grace_unmeasured',
        },
        {
          id: 'regret',
          label: '"你后悔过吗？放下做学问，去教那些……以后多半也用不上的东西。"',
          effects: [{ type: 'signal', delta: 10 }],
          next: 'grace_unmeasured',
        },
        {
          id: 'tired',
          label: '"你也会累吗？累到怀疑自己讲的每句话有没有人在听。"',
          effects: [{ type: 'signal', delta: 10 }],
          next: 'grace_unmeasured',
        },
      ],
    },

    grace_unmeasured: {
      kind: 'scene',
      next: 'rocky_unmeasured',
      lines: [
        { speaker: 'grace', text: '我累过。也怀疑过。教室里二十张脸，十九张在神游，你讲到喉咙哑——值不值，没人发奖状告诉你。' },
        { speaker: 'grace', text: '但我教过一个孩子。家里乱，眼神是死的，所有人放弃他了。我没干什么惊天动地的，就是有一阵子，每天多问他一句话，记得他的名字。' },
        { speaker: 'grace', text: '很多年后我才知道，他没走上那条最坏的路。不是我救的——是他自己活下来了。我只是，那阵子在场。' },
        { speaker: 'grace', text: '你救的那个，测不出来。但他还在。够了。', revealCardId: 'card_gl_unmeasured' },
        { speaker: 'grace', text: '好了，我去看穹顶的水循环了。顾老师，你这一行，是地球上最重要的工程之一。别让今晚的累，骗你忘了这个。' },
      ],
    },

    rocky_unmeasured: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: '他走了。他每次都这样，说完最重的一句，跑去看水。' },
        { speaker: 'rocky', text: '我补一句工程的。' },
        { speaker: 'rocky', text: '你量不出一个学生被你改了多少。正常。你装进他脑子里的那份备份，要很多年后，原件出事了，才被调用。' },
        { speaker: 'rocky', text: '那时候你可能都不在场。但那艘飞船，照样飞过你的死。别熄火。你还在送人过河。' },
      ],
    },

    rocky_solo: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: '我说回格雷斯。我说过，我会的人类东西，都是他教的。一个老师。' },
        { speaker: 'rocky', text: '他以前是科学家，丢了前途，去当中学老师，觉得自己废了。后来人类挑他来救命，挑中的，正是他当老师练出的那个本事——把难的东西，讲给听不懂的人。' },
        { speaker: 'rocky', text: '他说，他以为教书是退而求其次。后来发现，是他做过最重要的事。' },
        { speaker: 'rocky', text: '你量不出一个学生被你改了多少。正常。你存进他脑子里的那份备份，要很多年后才被调用——那时候你可能都不在场。' },
        { speaker: 'rocky', text: '但那艘飞船，照样飞过你的死。别熄火。你还在送人过河。' },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: '（窗外很静。那摞卷子还在桌上。但你看它的眼神，好像不太一样了。）',
      options: [
        {
          id: 'name',
          label: '"我们班有个总坐最后一排的孩子。我连他名字背后的事都没问过。明天，我想真的问一次。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'listen',
          label: '"明天上课，我想认真听一个学生把话讲完。不打断，不为赶进度。就这一次。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'rest',
          label: '"……我先睡吧。卷子明天再说。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'gl_end',
      lines: [
        { speaker: 'rocky', text: '好。' },
        { speaker: 'narrator', text: '你拧上了那支快干的红笔，把卷子摞齐，没再去看那串分数。' },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'agency' },
          lines: [
            { speaker: 'narrator', text: '你想起那个孩子坐在最后一排的样子，想起你其实一直知道他叫什么，只是从没好好叫过。' },
            { speaker: 'rocky', text: '明天那件量不出来的小事，也是修桥。只是桥，是个孩子。' },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: '好好好。你声音，不那么累了。机器没停，只是上了点油。' },
            { speaker: 'rocky', text: '去睡，知识的飞船。线一直开着。格雷斯说，欢迎下次再来开同行会。' },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: '我不多说。' },
            { speaker: 'rocky', text: '去睡。明天，对一个孩子好一点点，就够了。一个。' },
            { speaker: 'narrator', text: '你没说太多。但挂电话前，你轻轻"嗯"了一声，然后关了台灯。' },
          ],
        },
      ],
    },
  },
};
