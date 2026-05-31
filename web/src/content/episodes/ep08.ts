import type { Episode } from '../../engine/types';

/**
 * ep08 ·《你救了你能救的》· 梅雨 — 急诊/ICU 夜班护士 / 同情疲劳 · 直面死亡。
 *
 * Follows the ep01 gold-standard shape:
 *  - opening scene (system + narrator + "今晚第 N 通来电") — she's just off a shift,
 *    just lost a patient
 *  - connect → first stance-choice
 *  - Rocky runs the engineer pipeline (observe → misunderstand → ask data →
 *    reduce to constraints/failure-mode → one action) before any "wisdom"
 *  - Grace gate: or(signalAtLeast 60, flagSet 'engaged') → grace_in else Rocky-only
 *  - branches reconverge → 落地 choice → one ending + warm/quiet/agency variants
 *  - exactly 2 wisdom cards, revealed on spine scenes
 *
 * Rocky angle: he watched 22 crewmates die, helpless. 麻木 = 过载时的限流保护，
 * not coldness. 区分"我没尽力"和"它本就超出约束"。No therapy words from Rocky.
 * Treat the dead patient with restraint — no melodrama.
 */
export const ep08: Episode = {
  id: 'ep08',
  order: 8,
  title: '你救了你能救的',
  subtitle: '梅雨 · 急诊夜班护士 / 同情疲劳',
  theme: '当你见多了死亡，开始麻木，又为自己的麻木愧疚',
  caller: {
    id: 'mei_yu',
    handle: 'MY-0317',
    realName: '梅雨',
    age: 29,
    location: '某三甲医院 · 急诊抢救室外的更衣间',
    tagline: 'ICU / 急诊夜班护士，刚送走一个没救回来的病人',
    reason: '凌晨四点，抢救宣告无效之后。她坐在更衣间，发现自己没哭，然后开始怕这件事。',
    outcomeShort: '她没有立刻"重新变得柔软"。但那天，她允许自己在车里坐了十分钟，才发动。',
    morningBeat: '梅雨下了夜班，没急着回家。她在便利店买了一瓶热的，坐在路边长椅上，看天一点点亮。',
    accent: 'rose',
  },
  cards: [
    { id: 'card_my_limit', episodeId: 'ep08', speaker: 'rocky', text: '你救了你能救的。剩下的，超出约束。那不是失败。' },
    { id: 'card_my_numb', episodeId: 'ep08', speaker: 'rocky', text: '麻木，不是冷血。是系统在限流。免得整个烧掉。' },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: '〔星际通讯线 · ERID↔地球〕今晚第 9 通来电', stage: '信号建立中…' },
        { speaker: 'narrator', text: '凌晨四点。抢救室的灯灭了一盏。' },
        { speaker: 'narrator', text: '半小时前，主治医生看了一眼表，说了那句话。家属的哭声你已经记不清是哪一种了。' },
        { speaker: 'narrator', text: '你回到更衣间，坐下。手机屏幕亮着，是收藏夹里一条很旧的链接——值大夜的时候，谁随手转给你的。' },
        { speaker: 'narrator', text: '你发现自己没哭。然后你开始怕这件事。' },
        { speaker: 'narrator', text: '拨号音很长。比一般的电话长得多。你没挂。' },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: '● 信号接通 · 延迟 4.4 秒', stage: '' },
        { speaker: 'rocky', text: '接通。一个地球信号。' },
        { speaker: 'rocky', text: '一个人类。声音……平。太平。' },
        { speaker: 'rocky', text: '像一个仪表，读数卡住了。我是 Rocky。你找格雷斯的朋友，问号。' },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: '（电话那头真的有人。你想说点什么，喉咙却是空的。）',
      options: [
        {
          id: 'admit',
          label: '"我刚……送走一个病人。没救回来。可我没哭。我是不是有问题。"',
          effects: [{ type: 'signal', delta: 13 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'deflect',
          label: '"没事。就是下了班，随便找个人说说话。"（你听见自己的声音很干。）',
          effects: [{ type: 'signal', delta: 2 }],
          next: 'rocky_listen',
        },
        {
          id: 'test',
          label: '"外星人？行。你们那儿，也死人吗。"',
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: '死人。我懂这个字。' },
        { speaker: 'rocky', text: '我的船，离开 Erid 时，23 个。到这里，22 个，死了。我在场。很多次在场。' },
        { speaker: 'rocky', text: '所以你说"没事"，我不信。仪表读数卡住，不是没事。是负载，太大了。' },
        { speaker: 'rocky', text: '我是工程师。说给我听。哪里在过载。' },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: '（你闭了一下眼。）',
      options: [
        {
          id: 'numb',
          label: '"我以前会哭的。现在一个接一个，我什么感觉都没有了。我是不是变冷血了。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'numb', value: true }],
          next: 'rocky_reframe',
        },
        {
          id: 'fail',
          label: '"今晚那个，才四十几岁。我们抢了一个多小时。我总觉得，是不是我哪里没做够。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'guilt', value: true }],
          next: 'rocky_reframe',
        },
        {
          id: 'tired',
          label: '"太多了。一个接一个，救不过来。我不知道还能撑多久。"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'tired', value: true }],
          next: 'rocky_reframe',
        },
      ],
    },

    rocky_reframe: {
      kind: 'scene',
      next: 'rocky_pipeline',
      lines: [
        { speaker: 'rocky', text: '等。你说"冷血"。我先纠正一个工程错误。' },
        { speaker: 'rocky', text: '一个系统，负载太大，会自己降功率。关掉一些回路。保住核心。这叫限流。' },
        { speaker: 'rocky', text: '不限流，会怎样，问号。整个，烧掉。一次烧光。然后什么都不剩。' },
        { speaker: 'rocky', text: '你说的"没感觉"——', revealCardId: 'card_my_numb' },
        { speaker: 'rocky', text: '麻木，不是冷血。是系统在限流。免得整个烧掉。' },
        { speaker: 'rocky', text: '一个真冷血的人，不会半夜，怕自己变冷血。' },
      ],
    },

    rocky_pipeline: {
      kind: 'scene',
      next: 'q_distinguish',
      lines: [
        { speaker: 'rocky', text: '现在，第二个错误。你说"是不是我没做够"。' },
        { speaker: 'rocky', text: '工程上，有两件不一样的事。听好。' },
        { speaker: 'rocky', text: '一件：我有余量，没用上。这叫没尽力。这个，可以查，可以改。' },
        { speaker: 'rocky', text: '另一件：那个故障，本来就超出我的约束。材料的极限，时间的极限。我用尽了，它还是裂了。' },
        { speaker: 'rocky', text: '这两件，感觉一样痛。但只有第一件，是你的责任。' },
        { speaker: 'rocky', text: '我要数据。今晚那一个——你们做了，能做的，问号。' },
      ],
    },

    q_distinguish: {
      kind: 'choice',
      choiceId: 'q_distinguish',
      prompt: '（你想起这一个多小时里，每一次按压、每一管推进去的药。）',
      options: [
        {
          id: 'did_all',
          label: '"……做了。该上的都上了，流程一步没落。送来的时候，其实就已经……"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'maybe',
          label: '"我反复在想，是不是早两分钟就……可我也知道，可能没用。我分不清了。"',
          effects: [{ type: 'signal', delta: 9 }, { type: 'flag', key: 'guilt', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'cant_say',
          label: '"我不敢这么想。一旦说「已经尽力了」，是不是就等于我放弃他了。"',
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
      next: 'rocky_limit',
      lines: [
        { speaker: 'rocky', text: '等一下。这件事，我船上有个人，比我懂。她照顾过快死的东西。也照顾过快死的我。' },
        { speaker: 'rocky', text: '格雷斯！过来。一个地球人，是医者。今晚，没留住一个。' },
        { speaker: 'grace', text: '嘿，我是格雷斯。我以前是科学家，照顾过一船昏迷的人，也照顾过他。' },
        { speaker: 'grace', text: '我跟你说件听起来矛盾的事：救活一个，和没救活十个——这两件，可以同时是真的。' },
        { speaker: 'grace', text: '它们不抵消。那十个不会因为你救了一个就不痛，那一个也不会因为有十个就不算数。' },
        { speaker: 'grace', text: '你带着它继续，不是因为你不在乎。是因为，下一个，还需要你。这两件，也是同时真的。' },
        { speaker: 'grace', text: '好了，我去看仪器了。Rocky，让她坐一会儿再走。' },
        { speaker: 'rocky', text: '陈述。我会。' },
      ],
    },

    rocky_story: {
      kind: 'scene',
      next: 'rocky_limit',
      lines: [
        { speaker: 'rocky', text: '我说个我的事。' },
        { speaker: 'rocky', text: '我的船员，一个一个，停止。我在场。我会修机器，修不了他们。' },
        { speaker: 'rocky', text: '有一阵，我也"没感觉"。我以为我坏了。后来我懂了——是我在限流。不限流，我也停止。' },
        { speaker: 'rocky', text: '我活下来，不是我最强。是我的工作台，恰好挡了辐射。运气。我当时不知道。' },
        { speaker: 'rocky', text: '我救不了他们 22 个。但我，没停下。接着做下一件事。船，还在飞。' },
      ],
    },

    rocky_limit: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: '所以，关于今晚那一个。我说一句，你听。' },
        { speaker: 'rocky', text: '你救了你能救的。剩下的，超出约束。那不是失败。', revealCardId: 'card_my_limit' },
        { speaker: 'rocky', text: '"不能救所有人"，和"我没尽力"，不是一件事。别把第一件，记成第二件，背一辈子。' },
        { speaker: 'rocky', text: '还有。你为他难过——那不是软弱。那是你还没烧坏的证据。' },
        { speaker: 'rocky', text: '允许自己，难过一下。不用马上，又去骂自己冷。' },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: '（更衣间很安静。你的手，第一次有点发抖。）',
      options: [
        {
          id: 'grieve',
          label: '"那我……允许自己，先为他难过一下。就坐在这儿，一会儿，不急着走。"',
          effects: [{ type: 'signal', delta: 11 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'recover',
          label: '"我想给自己定一件下班后真正能恢复的事。不是刷手机那种。是真的能歇过来的。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'colleague',
          label: '"今晚有个小护士也守着那张床。我想……明天跟她说一句，「那个，不怪你」。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'just_go',
          label: '"……我先回去吧。今天先到这儿。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'my_end',
      lines: [
        { speaker: 'rocky', text: '好。' },
        { speaker: 'narrator', text: '你把工牌从脖子上取下来，攥了一下，又挂回去。' },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'agency' },
          lines: [
            { speaker: 'narrator', text: '你没有马上站起来。你给了那个没留住的人，一点点属于他的、安静的时间。' },
            { speaker: 'rocky', text: '明天，他们还需要你。今晚，先让自己，恢复一点功率。' },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: '好好好。你声音，回来一点了。不那么平了。' },
            { speaker: 'rocky', text: '去歇，会漏水的人类。线一直开着。下次累了，再拨。' },
            { speaker: 'narrator', text: '你笑了一下，眼睛却热了。原来还在的。' },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: '我不多说。' },
            { speaker: 'rocky', text: '你救了你能救的。这一句，记住就好。' },
            { speaker: 'narrator', text: '你没说太多。但挂电话前，你轻轻"嗯"了一声。然后，第一次，没有立刻去骂自己。' },
          ],
        },
      ],
    },
  },
};
