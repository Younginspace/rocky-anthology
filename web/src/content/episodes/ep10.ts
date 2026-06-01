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
  title: { zh: '不表达，信息会死', en: 'Unsent, the Signal Dies' },
  subtitle: { zh: '夏鸣 · 独立音乐人 / 无人听', en: 'Xia Ming · indie musician / no one listening' },
  theme: {
    zh: '当你表达了很久，却好像没人在听',
    en: 'When you have been speaking for a long time, and no one seems to be listening',
  },
  caller: {
    id: 'xia_ming',
    handle: 'XM-0418',
    realName: { zh: '夏鸣', en: 'Xia Ming' },
    age: 25,
    location: {
      zh: '某城中村 · 隔音棉糊墙的出租屋',
      en: 'an urban-village block · a rented room with soundproofing foam stuck to the walls',
    },
    tagline: {
      zh: '做独立音乐三年，最新一首歌播放量两位数',
      en: 'Three years of indie music; his newest song has a play count in the double digits',
    },
    reason: {
      zh: '深夜又上传了一首歌。刷新了一晚上，播放量从 7 涨到 9。其中两次是他自己点的。',
      en: 'Late at night he uploaded another song. He refreshed all night; the play count crept from 7 to 9. Two of those were him.',
    },
    outcomeShort: {
      zh: '他没有立刻"被听见"。但他把下一首做完了，发出去了——而且这次，他亲手递给了一个人。',
      en: 'He was not suddenly "heard." But he finished the next song and sent it out — and this time he handed it, in person, to one specific person.',
    },
    morningBeat: {
      zh: '夏鸣把那首没人听的歌，单独发给了楼下那个总在凌晨修吉他的大叔。附了一句："你帮我听听这段，行吗。"',
      en: 'Xia Ming sent the song no one had listened to, just to the old guy downstairs who is always fixing guitars at 2 a.m. He added one line: "Give this part a listen for me, would you?"',
    },
    accent: 'violet',
  },
  cards: [
    {
      id: 'card_xm_signal',
      episodeId: 'ep10',
      speaker: 'rocky',
      text: {
        zh: '不表达，信息随你一起死。没人能再解码。',
        en: 'If you do not transmit, the information dies with you. No one can decode it again.',
      },
    },
    {
      id: 'card_xm_received',
      episodeId: 'ep10',
      speaker: 'grace',
      text: {
        zh: '射出去。不知道有没有人收。还是射。因为不射，一定死。',
        en: 'I fired it into space, no idea if anyone would catch it. I fired it anyway. Because un-fired, it dies for sure.',
      },
    },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        {
          speaker: 'system',
          text: { zh: '〔星际通讯线 · ERID↔地球〕今晚第 19 通来电', en: '[INTERSTELLAR LINE · ERID↔EARTH] Call #19 tonight' },
          stage: { zh: '信号建立中…', en: 'establishing link…' },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '凌晨一点四十。隔音棉糊在墙上，房间安静得能听见硬盘转。',
            en: '1:40 a.m. Soundproofing foam on the walls; the room is so quiet you can hear the hard drive spin.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '新歌昨天发出去了。你刷新后台。播放量：9。',
            en: 'The new song went out yesterday. You refresh the dashboard. Plays: 9.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '其中两次是你自己点的。你心里清楚。',
            en: 'Two of them were you. You know that.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '招聘 App 的页面还开着另一个标签。"音频后期""文案""都行"。明天去面，也许该认了。',
            en: 'A job app sits open in another tab. "Audio post." "Copywriting." "Anything works." You could interview tomorrow. Maybe it is time to face it.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '你不知道为什么，点开了收藏夹底下那个奇怪的链接。拨号音很长。',
            en: 'For no reason you can name, you tap the strange link buried at the bottom of your bookmarks. The dial tone goes on a long time.',
          },
        },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        {
          speaker: 'system',
          text: { zh: '● 信号接通 · 延迟 4.1 秒', en: '● SIGNAL LIVE · DELAY 4.1s' },
          stage: { zh: '', en: '' },
        },
        { speaker: 'rocky', text: { zh: '接通。地球信号。', en: 'Connected. Earth signal.' } },
        {
          speaker: 'rocky',
          text: {
            zh: '一个人类。声音……低。压着。像音量调到最小，怕吵醒谁。',
            en: 'One human. Voice… low. Held down. Like volume turned to minimum. Afraid to wake someone.',
          },
        },
        { speaker: 'rocky', text: { zh: '我是 Rocky。说。', en: 'I am Rocky. Speak.' } },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: {
        zh: '（电话那头真的有声音。一个不是人类的声音。你愣了一下。）',
        en: '(There really is a voice on the line. A voice that is not human. You freeze for a second.)',
      },
      options: [
        {
          id: 'admit',
          label: {
            zh: '"我做音乐。三年了。没人听。我……是不是该停了。"',
            en: '"I make music. Three years now. No one listens. Should I… should I stop?"',
          },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'deflect',
          label: {
            zh: '"没事。就随便打打。反正也没人在乎我说什么。"（你苦笑。）',
            en: '"It\'s nothing. Just dialing around. Nobody cares what I say anyway." (You smile, bitterly.)',
          },
          effects: [{ type: 'signal', delta: 2 }],
          next: 'rocky_listen',
        },
        {
          id: 'test',
          label: {
            zh: '"听说外星人靠声音说话？那你应该懂——一个声音发出去，没人收，是什么感觉。"',
            en: '"They say aliens talk through sound. Then you\'d know — what it feels like to send a sound out and have no one receive it."',
          },
          effects: [{ type: 'signal', delta: 7 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: { zh: '声音发出去，没人收。', en: 'A sound goes out. No one receives.' } },
        { speaker: 'rocky', text: { zh: '这个，我懂。懂懂懂。', en: 'This, I understand. Understand understand understand.' } },
        {
          speaker: 'rocky',
          text: {
            zh: '我们 Eridian，不分"说话"和"音乐"。声音就是话，话就是结构。我现在跟你讲的，对我，也是和弦。',
            en: 'We Eridian do not split "speech" from "music." Sound is language. Language is structure. What I say to you now, to me, is also a chord.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '所以你"做音乐"——对我，那不是娱乐。那是你在编码。你把一段你，压进声音里。',
            en: 'So you "make music" — to me, that is not entertainment. That is you encoding. You compress a piece of you into sound.',
          },
        },
        {
          speaker: 'rocky',
          text: { zh: '现在告诉我故障在哪。发生什么。', en: 'Now tell me where the fault is. What happened.' },
        },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: {
        zh: '（你没想到他这么说。你深吸一口气。）',
        en: '(You did not expect him to put it that way. You take a deep breath.)',
      },
      options: [
        {
          id: 'no_one',
          label: {
            zh: '"播放量个位数。我对着空气唱了三年。开始怀疑——这事到底有没有意义。"',
            en: '"Single-digit plays. I\'ve sung to empty air for three years. I\'m starting to doubt — whether any of it means anything."',
          },
          effects: [{ type: 'signal', delta: 8 }],
          next: 'rocky_unpack',
        },
        {
          id: 'pressure',
          label: {
            zh: '"房租、爸妈、同学都在赚钱。我再不找份正经工作，就真成笑话了。"',
            en: '"Rent. My parents. Classmates all earning money. If I don\'t get a real job soon, I\'m just a joke."',
          },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'pressure', value: true }],
          next: 'rocky_unpack',
        },
        {
          id: 'worthless',
          label: {
            zh: '"没人听，是不是就说明……我写的东西本来就不值得听。"',
            en: '"No one listens — doesn\'t that mean… what I write was never worth hearing in the first place?"',
          },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_unpack',
        },
      ],
    },

    rocky_unpack: {
      kind: 'scene',
      next: 'rocky_question',
      lines: [
        {
          speaker: 'rocky',
          text: { zh: '等。你把两件事，焊成一件了。我帮你拆开。', en: 'Wait. You welded two things into one. I take them apart for you.' },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '第一件：值不值得做。第二件：有多少人收到。你以为它们是同一根梁。不是。',
            en: 'First thing: is it worth doing. Second thing: how many people received it. You think they are one beam. They are not.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '先说第一件。你不表达——那段你，编码在你脑子里，没出来。',
            en: 'First thing first. If you do not express — that piece of you stays encoded inside your head. Never comes out.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '然后有一天，你停了。那段信息，随你一起死。没人能再解码。没有副本。',
            en: 'Then one day, you stop. That information dies with you. No one can decode it again. No copy.',
          },
          revealCardId: 'card_xm_signal',
        },
        {
          speaker: 'rocky',
          text: {
            zh: '我船上 23 个 Eridian。22 个，连同他们脑子里的东西，全没了。我懂"信息随人死"是什么。重量很大。',
            en: '23 Eridian on my ship. 22 of them — and everything inside their heads — all gone. I know what "information dies with the person" is. The weight is large.',
          },
        },
      ],
    },

    rocky_question: {
      kind: 'scene',
      next: 'q_why',
      lines: [
        {
          speaker: 'rocky',
          text: {
            zh: '所以"要不要继续表达"——这个，不是播放量决定的。是"那段你，要不要留下副本"决定的。',
            en: 'So "should you keep expressing" — that one is not decided by play count. It is decided by: do you keep a copy of that piece of you, or not.',
          },
        },
        {
          speaker: 'rocky',
          text: { zh: '但我是工程师。我不骗你。还有第二件事。', en: 'But I am an engineer. I do not lie to you. There is a second thing.' },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '传递，等于：发送，加，接收。只发，不收，传递没完成。',
            en: 'Transmission equals: send, plus, receive. Send only, no receive — transmission not complete.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '所以"被听见"，不是虚荣。那是工程目标。一个真的目标。',
            en: 'So "being heard" is not vanity. That is an engineering goal. A real goal.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '我问你一个数据。这三年，你最想让"哪一个人"，听见你哪一首。一个人。一首。',
            en: 'I ask you one data point. These three years — which one person did you most want to hear which one song. One person. One song.',
          },
        },
      ],
    },

    q_why: {
      kind: 'choice',
      choiceId: 'q_why',
      prompt: {
        zh: '（这个问题你没准备过。你脑子里第一个跳出来的，不是"所有人"。）',
        en: '(You were not ready for this question. The first thing that surfaces is not "everyone.")',
      },
      options: [
        {
          id: 'one_person',
          label: {
            zh: '"……楼下那个大叔。他总在凌晨修吉他。有一次他隔着墙跟我哼了一句，调还挺准。"',
            en: '"…The old guy downstairs. Always fixing guitars at 2 a.m. Once he hummed a line back at me through the wall — and his pitch was dead on."',
          },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'has_target', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'past_self',
          label: {
            zh: '"我那个高中同桌。是他第一个跟我说，你写的东西不一样。后来断联了。"',
            en: '"My deskmate from high school. He was the first to tell me what I wrote was different. We lost touch."',
          },
          effects: [{ type: 'signal', delta: 11 }, { type: 'flag', key: 'has_target', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'no_one_2',
          label: {
            zh: '"我不知道。我一直想着‘让更多人听’，从来没想过具体是谁。"',
            en: '"I don\'t know. I\'ve always been thinking \'reach more people\' — never once who, exactly."',
          },
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
        {
          speaker: 'rocky',
          text: {
            zh: '等一下。这个，我船上有个人，亲手干过。他比我会讲。',
            en: 'Wait. This one, someone on my ship did it with his own hands. He tells it better than me.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '格雷斯！过来。一个地球人，怕没人收他的信号。',
            en: 'Grace! Come. An Earth human. Afraid no one will receive his signal.',
          },
        },
        { speaker: 'grace', text: { zh: '嘿。我是格雷斯。', en: 'Hey. I\'m Grace.' } },
        {
          speaker: 'grace',
          text: {
            zh: '当年地球要完了，我手里有救命的数据。我把它编码，塞进甲虫飞船，射向地球。',
            en: 'Back when Earth was ending, I had data that could save it. I encoded it, packed it into a beetle ship, and fired it toward Earth.',
          },
        },
        {
          speaker: 'grace',
          text: {
            zh: '射出去那一刻，我根本不知道有没有人会收到。可能掉进海里，可能没人解得开，可能晚了。',
            en: 'The moment I fired it, I had no idea if anyone would ever catch it. Could fall in the ocean. Could be uncrackable. Could arrive too late.',
          },
        },
        { speaker: 'grace', text: { zh: '我还是射了。', en: 'I fired it anyway.' }, revealCardId: 'card_xm_received' },
        {
          speaker: 'grace',
          text: {
            zh: '因为不射，那段信息一定死。射出去，至少有一个"也许"。我赌那个也许。',
            en: 'Because un-fired, that information was a guaranteed death. Fired, there was at least one "maybe." I bet on the maybe.',
          },
        },
        {
          speaker: 'grace',
          text: {
            zh: '你那九次播放，有七个不是你。那七个，就是收到的人。别因为不是七万，就当它是零。',
            en: 'Of your nine plays, seven weren\'t you. Those seven are people who received it. Don\'t treat seven as zero just because it isn\'t seventy thousand.',
          },
        },
        {
          speaker: 'grace',
          text: {
            zh: '好了，我去喂海里那群幼体了。Rocky，别让他熬通宵。',
            en: 'Okay, I\'m off to feed the larvae in the sea. Rocky — don\'t let him pull an all-nighter.',
          },
        },
        { speaker: 'rocky', text: { zh: '我尽量。陈述。', en: 'I try. Statement.' } },
      ],
    },

    rocky_build: {
      kind: 'scene',
      next: 'rocky_close',
      lines: [
        {
          speaker: 'rocky',
          text: {
            zh: '我说个我和格雷斯的事。我们见面，没有共同的词。一个也没有。两种声音，互相是噪音。',
            en: 'I tell you a thing about me and Grace. We met. No shared words. Not one. Two kinds of sound. To each other, noise.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '我们就一个音、一个音地试。发一个，看对方收没收到，对得上，留下；对不上，扔。一点点，造出一种语言。',
            en: 'So we tried one note at a time. Send one. See if the other received. Matches, keep it. Does not match, throw away. Little by little, we built a language.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '那不是为了好听。是为了——我脑子里的东西，能到他脑子里。一段信息，活着穿过两个物种。',
            en: 'Not to sound nice. To do this — the thing in my head reaches his head. One piece of information, alive, crossing two species.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '你做的事，是一样的。你不是在求点赞。你是在造一条，能让"你"穿过去的线。',
            en: 'What you do is the same. You are not begging for likes. You are building a line that lets "you" cross over.',
          },
        },
      ],
    },

    rocky_close: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        {
          speaker: 'rocky',
          text: {
            zh: '所以你看。两件事，本来就该分开摆。"值不值得做"——你不表达，信息就死。这一头，永远值得。',
            en: 'So look. Two things. They were always meant to sit apart. "Worth doing" — if you do not express, the information dies. This end is always worth it.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '"有没有被收到"——这一头，是工程问题。工程问题，有下一步可以做。',
            en: '"Got received or not" — this end is an engineering problem. Engineering problems have a next step you can take.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '广播给一百万个空气，和，精准发给一个会回信号的人——后面这个，传递率高得多。别对着空气唱了，瞄准一个接收端。',
            en: 'Broadcast to a million empty rooms, versus, send precisely to one person who will signal back — the second has a much higher transmission rate. Stop singing to the air. Aim at one receiver.',
          },
        },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: {
        zh: '（窗外还黑着。但有什么东西，从"全或无"里松开了。）',
        en: '(It is still dark outside. But something has come loose from the "all or nothing.")',
      },
      options: [
        {
          id: 'hand_it',
          label: {
            zh: '"我想……把下一首做完，然后亲手发给那一个人。不挂网上。就给他。"',
            en: '"I want… to finish the next song, then hand it to that one person myself. Not online. Just to him."',
          },
          effects: [{ type: 'signal', delta: 11 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'finish_send',
          label: {
            zh: '"我想先把抽屉里那首没发完的做完，发出去。哪怕又只有九个人。先有副本。"',
            en: '"First I want to finish that unfinished song in the drawer and send it out. Even if it\'s only nine again. A copy first."',
          },
          effects: [{ type: 'signal', delta: 9 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'sleep',
          label: {
            zh: '"……我先睡。明天的事明天想。"',
            en: '"…I\'ll sleep first. Tomorrow\'s problems are for tomorrow."',
          },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'xm_end',
      lines: [
        { speaker: 'rocky', text: { zh: '好。', en: 'Good.' } },
        {
          speaker: 'narrator',
          text: {
            zh: '你看着后台那个数字。9。它没变。但你看它的眼神，变了。',
            en: 'You look at the number on the dashboard. 9. It hasn\'t changed. But the way you look at it has.',
          },
        },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'agency' },
          lines: [
            {
              speaker: 'narrator',
              text: {
                zh: '你新建了一个工程文件。命名的时候，光标闪了很久，然后你打下了那个人的名字。',
                en: 'You create a new project file. The cursor blinks for a long time in the name field — then you type that person\'s name.',
              },
            },
            {
              speaker: 'rocky',
              text: {
                zh: '明天，瞄准那一个人，把那段你发出去。发送，加接收，凑齐两半。',
                en: 'Tomorrow. Aim at that one person. Send that piece of you out. Send, plus receive — both halves.',
              },
            },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            {
              speaker: 'rocky',
              text: { zh: '好好好。你声音回来一点了。不那么压着了。', en: 'Good good good. Your voice came back a little. Not held down so hard.' },
            },
            {
              speaker: 'rocky',
              text: {
                zh: '记住。不表达，信息随你死。表达了，至少留个副本，给那个"也许"。',
                en: 'Remember. Do not express, information dies with you. Express, you keep at least a copy — for that "maybe."',
              },
            },
            {
              speaker: 'rocky',
              text: {
                zh: '去睡。漏水的太空团子。线一直开着。我在这头收信号。',
                en: 'Go sleep. Leaky little space blob. Line stays open. I receive signal on this end.',
              },
            },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '我不多说。', en: 'I do not say much.' } },
            {
              speaker: 'rocky',
              text: {
                zh: '一件事就好。别让脑子里那段东西，没出来就没了。',
                en: 'Just one thing. Do not let that piece in your head be gone before it ever came out.',
              },
            },
            {
              speaker: 'narrator',
              text: {
                zh: '你没说太多。挂电话前，你点开那首只有九次播放的歌，从头听了一遍。这次，听完了。',
                en: 'You didn\'t say much. Before hanging up, you opened the song with nine plays and listened from the top. This time, you listened to the end.',
              },
            },
          ],
        },
      ],
    },
  },
};
