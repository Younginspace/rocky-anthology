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
  title: { zh: '你救了你能救的', en: 'You Saved Who You Could Save' },
  subtitle: { zh: '梅雨 · 急诊夜班护士 / 同情疲劳', en: 'Mei Yu · night-shift ER nurse / compassion fatigue' },
  theme: { zh: '当你见多了死亡，开始麻木，又为自己的麻木愧疚', en: 'When you have seen too much dying, go numb, and then feel guilty for going numb' },
  caller: {
    id: 'mei_yu',
    handle: 'MY-0317',
    realName: { zh: '梅雨', en: 'Mei Yu' },
    age: 29,
    location: { zh: '某三甲医院 · 急诊抢救室外的更衣间', en: 'A major hospital · the locker room just outside the ER resus bay' },
    tagline: { zh: 'ICU / 急诊夜班护士，刚送走一个没救回来的病人', en: 'ICU / night-shift ER nurse — she just lost a patient she could not bring back' },
    reason: { zh: '凌晨四点，宣告抢救无效之后。她坐在更衣间里，发现自己没哭——然后开始害怕这件事。', en: 'Four in the morning, after the call was made. She sits in the locker room and realizes she did not cry — and then it scares her that she did not.' },
    outcomeShort: { zh: '她没有立刻"重新变回那个柔软的人"。但那天，她允许自己在车里坐了十分钟，才发动。', en: 'She did not suddenly "become soft again." But that day, she let herself sit in the car for ten minutes before she turned the key.' },
    morningBeat: { zh: '梅雨下了夜班，没急着回家。她在便利店买了一瓶热的，坐在路边长椅上，看天一点点亮起来。', en: 'Off her night shift, Mei Yu was in no hurry to get home. She bought something warm at the convenience store, sat on a bench by the road, and watched the sky slowly come up.' },
    accent: 'rose',
  },
  cards: [
    { id: 'card_my_limit', episodeId: 'ep08', speaker: 'rocky', text: { zh: '你救了你能救的。剩下的，超出约束。那不是失败。', en: 'You saved who you could save. The rest was past your constraints. That is not failure.' } },
    { id: 'card_my_numb', episodeId: 'ep08', speaker: 'rocky', text: { zh: '麻木，不是冷血。是系统在限流——免得整个烧掉。', en: 'Numb is not cold. It is the system throttling load — so the whole thing does not burn down.' } },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: { zh: '〔星际通讯线 · ERID↔地球〕今晚第 9 通来电', en: '[INTERSTELLAR LINE · ERID↔EARTH] Call #9 tonight' }, stage: { zh: '信号建立中…', en: 'establishing link…' } },
        { speaker: 'narrator', text: { zh: '凌晨四点。抢救室里灭了一盏灯。', en: 'Four in the morning. One light has gone out in the resus bay.' } },
        { speaker: 'narrator', text: { zh: '半小时前，主治医生看了一眼表，说了那句话。家属的哭声你已经分不清是哪一种了。', en: 'Half an hour ago the attending glanced at the clock and said the words. The family\'s crying — you can no longer tell one kind from another.' } },
        { speaker: 'narrator', text: { zh: '你回到更衣间，坐下。手机屏幕亮着，是收藏夹里一条很旧的链接——某个值大夜的晚上，谁随手转给你的。', en: 'You go back to the locker room and sit down. Your phone is lit on an old link buried in your bookmarks — someone forwarded it to you, offhand, on some long night shift.' } },
        { speaker: 'narrator', text: { zh: '你发现自己没哭。然后你开始怕这件事。', en: 'You realize you did not cry. And then it scares you that you did not.' } },
        { speaker: 'narrator', text: { zh: '拨号音很长。比一般的电话长得多。你没挂。', en: 'The dial tone goes on for a long time. Much longer than an ordinary call. You don\'t hang up.' } },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: { zh: '● 信号接通 · 延迟 4.4 秒', en: '● SIGNAL LIVE · DELAY 4.4s' }, stage: { zh: '', en: '' } },
        { speaker: 'rocky', text: { zh: '接通。一个地球信号。', en: 'Connected. One Earth signal.' } },
        { speaker: 'rocky', text: { zh: '一个人类。声音……平。太平了。', en: 'One human. Voice… flat. Too flat.' } },
        { speaker: 'rocky', text: { zh: '像一个仪表，读数卡住了。我是 Rocky。你找格雷斯的朋友，问号。', en: 'Like a gauge with the reading stuck. I am Rocky. You look for the friend of Grace. Question.' } },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: { zh: '（电话那头真的有人。你想说点什么，喉咙却是空的。）', en: '(There really is someone on the other end. You want to say something, but your throat is empty.)' },
      options: [
        {
          id: 'admit',
          label: { zh: '"我刚……送走一个病人。没救回来。可我没哭。我是不是有问题。"', en: '"I just… lost a patient. Couldn\'t bring them back. But I didn\'t cry. Is something wrong with me?"' },
          effects: [{ type: 'signal', delta: 13 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'deflect',
          label: { zh: '"没事。就是下了班，随便找个人说说话。"（你听见自己的声音很干。）', en: '"It\'s nothing. Just got off shift, wanted to talk to somebody, anybody." (You hear how dry your own voice is.)' },
          effects: [{ type: 'signal', delta: 2 }],
          next: 'rocky_listen',
        },
        {
          id: 'test',
          label: { zh: '"外星人？行。你们那儿，也死人吗。"', en: '"An alien? Fine. Out there — do people die too?"' },
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: { zh: '死。我懂这个字。', en: 'Die. I know this word.' } },
        { speaker: 'rocky', text: { zh: '我的船，离开 Erid 时，23 个。到这里，22 个，死了。我在场。很多次，我在场。', en: 'My ship, leaving Erid — 23. By the time I got here, 22 of them, dead. I was there. Many times, I was there.' } },
        { speaker: 'rocky', text: { zh: '所以你说"没事"，我不信。仪表读数卡住，不是没事。是负载，太大了。', en: 'So you say "it\'s nothing," I do not believe it. A gauge with the reading stuck is not nothing. It is load. Too much load.' } },
        { speaker: 'rocky', text: { zh: '我是工程师。说给我听。哪里在过载。', en: 'I am engineer. Tell me. Where is the overload.' } },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: { zh: '（你闭了一下眼。）', en: '(You close your eyes for a moment.)' },
      options: [
        {
          id: 'numb',
          label: { zh: '"我以前是会哭的。现在一个接一个，我什么感觉都没有了。我是不是变冷血了。"', en: '"I used to cry. Now it\'s one after another, and I don\'t feel anything anymore. Have I gone cold?"' },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'numb', value: true }],
          next: 'rocky_reframe',
        },
        {
          id: 'fail',
          label: { zh: '"今晚那个，才四十几岁。我们抢了一个多小时。我总觉得，是不是我哪里没做够。"', en: '"Tonight\'s patient — only in their forties. We worked them for over an hour. I keep thinking, did I not do enough, somewhere?"' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'guilt', value: true }],
          next: 'rocky_reframe',
        },
        {
          id: 'tired',
          label: { zh: '"太多了。一个接一个，救不过来。我不知道还能撑多久。"', en: '"It\'s too much. One after another, I can\'t keep up. I don\'t know how much longer I can hold."' },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'tired', value: true }],
          next: 'rocky_reframe',
        },
      ],
    },

    rocky_reframe: {
      kind: 'scene',
      next: 'rocky_pipeline',
      lines: [
        { speaker: 'rocky', text: { zh: '等。你说"冷血"。我先纠正一个工程错误。', en: 'Wait. You say "cold." First I correct an engineering error.' } },
        { speaker: 'rocky', text: { zh: '一个系统，负载太大，会自己降功率。关掉一些回路。保住核心。这叫限流。', en: 'A system, load too high, drops its own power. Shuts some circuits. Protects the core. This is called throttling.' } },
        { speaker: 'rocky', text: { zh: '不限流，会怎样，问号。整个，烧掉。一次烧光。然后什么都不剩。', en: 'No throttling — what happens. Question. The whole thing. Burns down. Burns out at once. Then nothing is left.' } },
        { speaker: 'rocky', text: { zh: '你说的"没感觉"——', en: 'This "I don\'t feel anything" you say —' }, revealCardId: 'card_my_numb' },
        { speaker: 'rocky', text: { zh: '麻木，不是冷血。是系统在限流——免得整个烧掉。', en: 'Numb is not cold. It is the system throttling load — so the whole thing does not burn down.' } },
        { speaker: 'rocky', text: { zh: '一个真冷血的人，不会半夜，怕自己变冷血。', en: 'A person who is truly cold does not lie awake at night, afraid of going cold.' } },
      ],
    },

    rocky_pipeline: {
      kind: 'scene',
      next: 'q_distinguish',
      lines: [
        { speaker: 'rocky', text: { zh: '现在，第二个错误。你说"是不是我没做够"。', en: 'Now. Second error. You say "did I not do enough."' } },
        { speaker: 'rocky', text: { zh: '工程上，有两件不一样的事。听好。', en: 'In engineering there are two different things. Listen.' } },
        { speaker: 'rocky', text: { zh: '一件：我有余量，没用上。这叫没尽力。这个，可以查，可以改。', en: 'One: I had margin, did not use it. That is not trying hard enough. That, you can check. You can fix.' } },
        { speaker: 'rocky', text: { zh: '另一件：那个故障，本来就超出我的约束。材料的极限，时间的极限。我用尽了，它还是裂了。', en: 'The other: the failure was already past my constraints. Limit of the material. Limit of time. I used everything, and it still cracked.' } },
        { speaker: 'rocky', text: { zh: '这两件，感觉一样痛。但只有第一件，是你的责任。', en: 'These two hurt the same. But only the first one is yours to carry.' } },
        { speaker: 'rocky', text: { zh: '我要数据。今晚那一个——你们做了能做的，问号。', en: 'I want data. Tonight\'s one — you did what could be done. Question.' } },
      ],
    },

    q_distinguish: {
      kind: 'choice',
      choiceId: 'q_distinguish',
      prompt: { zh: '（你想起这一个多小时里，每一次按压、每一管推进去的药。）', en: '(You think back over that hour and more — every compression, every drug pushed in.)' },
      options: [
        {
          id: 'did_all',
          label: { zh: '"……做了。该上的都上了，流程一步没落。送来的时候，其实就已经……"', en: '"…We did. Everything we should\'ve, every step of the protocol. By the time they came in, honestly, they were already…"' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'maybe',
          label: { zh: '"我反复在想，是不是早两分钟就……可我也知道，可能没用。我分不清了。"', en: '"I keep replaying it — if it\'d been two minutes sooner… but I also know it probably wouldn\'t have mattered. I can\'t tell anymore."' },
          effects: [{ type: 'signal', delta: 9 }, { type: 'flag', key: 'guilt', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'cant_say',
          label: { zh: '"我不敢这么想。一旦说「已经尽力了」，是不是就等于我放弃他了。"', en: '"I don\'t dare think that way. The moment I say \'we did all we could\' — doesn\'t that mean I gave up on them?"' },
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
        { speaker: 'rocky', text: { zh: '等一下。这件事，我船上有个人比我懂。他照顾过快死的东西，也照顾过快死的我。', en: 'Wait. This one — someone on my ship knows it better than me. He cared for dying things. He cared for a dying me.' } },
        { speaker: 'rocky', text: { zh: '格雷斯！过来。一个地球人，是医者。今晚，没留住一个。', en: 'Grace! Come. An Earth person. A healer. Tonight, could not hold on to one.' } },
        { speaker: 'grace', text: { zh: '嘿，我是格雷斯。我以前是科学家，照顾过一船昏迷的人，也照顾过他。', en: 'Hey. I\'m Grace. I used to be a scientist. I looked after a whole ship of people in comas — and after him, too.' } },
        { speaker: 'grace', text: { zh: '我跟你说件听起来矛盾的事：救活一个，和没救活十个——这两件，可以同时是真的。', en: 'Let me tell you something that sounds like a contradiction: saving one, and failing to save ten — both of those can be true at the same time.' } },
        { speaker: 'grace', text: { zh: '它们不互相抵消。那十个不会因为你救了一个就不痛，那一个也不会因为还有十个就不算数。', en: 'They don\'t cancel out. The ten don\'t hurt less because you saved one, and the one doesn\'t count for less because there were ten.' } },
        { speaker: 'grace', text: { zh: '你带着这些继续走，不是因为你不在乎。是因为下一个，还需要你。这两件，也是同时为真的。', en: 'You carry it and keep going — not because you don\'t care. Because the next one still needs you. Those two are also true at the same time.' } },
        { speaker: 'grace', text: { zh: '好了，我去看仪器了。Rocky，让她坐一会儿再走。', en: 'Okay, I\'m going back to the instruments. Rocky — let her sit a while before she goes.' } },
        { speaker: 'rocky', text: { zh: '陈述。我会。', en: 'Statement. I will.' } },
      ],
    },

    rocky_story: {
      kind: 'scene',
      next: 'rocky_limit',
      lines: [
        { speaker: 'rocky', text: { zh: '我说个我的事。', en: 'I tell you a thing of mine.' } },
        { speaker: 'rocky', text: { zh: '我的船员，一个一个，停止。我在场。我会修机器，修不了他们。', en: 'My crew, one by one, stopped. I was there. I can fix machines. I could not fix them.' } },
        { speaker: 'rocky', text: { zh: '有一阵，我也"没感觉"。我以为我坏了。后来我懂了——是我在限流。不限流，我也停止。', en: 'For a while, I also "felt nothing." I thought I was broken. Later I understood — I was throttling. No throttling, I stop too.' } },
        { speaker: 'rocky', text: { zh: '我活下来，不是我最强。是我的工作台，恰好挡了辐射。运气。我当时不知道。', en: 'I survived — not because I was strongest. My workbench happened to block the radiation. Luck. I did not know it then.' } },
        { speaker: 'rocky', text: { zh: '我救不了他们 22 个。但我，没停下。接着做下一件事。船，还在飞。', en: 'I could not save the 22. But I did not stop. I did the next thing. The ship still flies.' } },
      ],
    },

    rocky_limit: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: { zh: '所以，关于今晚那一个。我说一句，你听。', en: 'So. About tonight\'s one. I say it, you listen.' } },
        { speaker: 'rocky', text: { zh: '你救了你能救的。剩下的，超出约束。那不是失败。', en: 'You saved who you could save. The rest was past your constraints. That is not failure.' }, revealCardId: 'card_my_limit' },
        { speaker: 'rocky', text: { zh: '"不能救所有人"，和"我没尽力"，不是一件事。别把第一件，记成第二件，背一辈子。', en: '"Cannot save everyone" and "I did not try hard enough" are not the same thing. Do not file the first one as the second, and carry it your whole life.' } },
        { speaker: 'rocky', text: { zh: '还有。你为他难过——那不是软弱。那是你还没烧坏的证据。', en: 'Also. You grieve for them — that is not weakness. That is proof you have not burned out.' } },
        { speaker: 'rocky', text: { zh: '允许自己，难过一下。不用马上，又去骂自己冷。', en: 'Let yourself grieve. A while. You do not have to turn right around and call yourself cold.' } },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: { zh: '（更衣间很安静。你的手，第一次有点发抖。）', en: '(The locker room is quiet. Your hands, for the first time, are shaking a little.)' },
      options: [
        {
          id: 'grieve',
          label: { zh: '"那我……允许自己先为他难过一下。就坐在这儿，一会儿，不急着走。"', en: '"Then I\'ll… let myself grieve for them first. Just sit here a while. No rush to leave."' },
          effects: [{ type: 'signal', delta: 11 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'recover',
          label: { zh: '"我想给自己定一件下班后真正能恢复的事。不是刷手机那种。是真的能歇过来的。"', en: '"I want to set one thing after shift that actually restores me. Not the scrolling-my-phone kind. Something I can really rest in."' },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'colleague',
          label: { zh: '"今晚有个小护士也守着那张床。我想……明天跟她说一句，「那个，不怪你」。"', en: '"There was a young nurse holding that bedside tonight too. I want to… tell her tomorrow — \'that one, it wasn\'t your fault.\'"' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'just_go',
          label: { zh: '"……我先回去吧。今天先到这儿。"', en: '"…I\'ll head back for now. That\'s enough for today."' },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'my_end',
      lines: [
        { speaker: 'rocky', text: { zh: '好。', en: 'Good.' } },
        { speaker: 'narrator', text: { zh: '你把工牌从脖子上取下来，攥了一下，又挂回去。', en: 'You lift the ID badge off your neck, close your hand around it, and hang it back.' } },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'agency' },
          lines: [
            { speaker: 'narrator', text: { zh: '你没有马上站起来。你给了那个没留住的人，一点点属于他的、安静的时间。', en: 'You don\'t stand up right away. You give the one you couldn\'t hold on to a little quiet time that belongs to them.' } },
            { speaker: 'rocky', text: { zh: '明天，他们还需要你。今晚，先让自己，恢复一点功率。', en: 'Tomorrow, they still need you. Tonight, first let yourself recover a little power.' } },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '好好好。你声音，回来一点了。不那么平了。', en: 'Good good good. Your voice, coming back a little. Not so flat.' } },
            { speaker: 'rocky', text: { zh: '去歇，会漏水的人类。线一直开着。下次累了，再拨。', en: 'Go rest, leaky human. The line stays open. Next time you are worn down, call.' } },
            { speaker: 'narrator', text: { zh: '你笑了一下，眼睛却热了。原来，它还在。', en: 'You laugh a little, and your eyes go hot. So it was still there, after all.' } },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '我不多说。', en: 'I will not say much.' } },
            { speaker: 'rocky', text: { zh: '你救了你能救的。这一句，记住就好。', en: 'You saved who you could save. Just remember that one line.' } },
            { speaker: 'narrator', text: { zh: '你没说太多。但挂电话前，你轻轻"嗯"了一声。然后，第一次，没有立刻去骂自己。', en: 'You don\'t say much. But before you hang up, you let out a soft "mm." And then, for the first time, you don\'t immediately turn on yourself.' } },
          ],
        },
      ],
    },
  },
};
