import type { Episode } from '../../engine/types';

/** ep03 ·《在别处》· 苏野 — 裸辞 gap-year，独自在异国旅行，追问意义。 */
export const ep03: Episode = {
  id: 'ep03',
  order: 3,
  title: { zh: '在别处', en: 'Somewhere Else' },
  subtitle: { zh: '苏野 · 异国青旅凌晨', en: 'Su Ye · a hostel dawn in a foreign country' },
  theme: {
    zh: '当远方没能填满你以为它会填满的东西',
    en: "When the far-off place doesn't fill the thing you were sure it would fill",
  },
  caller: {
    id: 'su_ye',
    handle: 'SY-2210',
    realName: { zh: '苏野', en: 'Su Ye' },
    age: 28,
    location: {
      zh: '某国海边小镇 · 青旅上铺',
      en: 'A seaside town somewhere · top bunk in a hostel',
    },
    tagline: {
      zh: '裸辞大半年，一个人走了很多地方',
      en: 'Quit his job, no plan, half a year on the road alone',
    },
    reason: {
      zh: '朋友圈点赞很多。可凌晨躺在陌生的上铺，心里空得像漏了风。',
      en: 'The feed is full of likes. But at 2 a.m. on a stranger’s top bunk, he feels hollow, like a window left open.',
    },
    outcomeShort: {
      zh: '他没急着回家，也没急着上路。他先下了楼，跟那个总在修自行车的人，说了第一句话。',
      en: "He didn't rush home, and he didn't rush onward. He went downstairs first, and said his first words to the man who was always fixing bikes.",
    },
    morningBeat: {
      zh: '苏野蹲在青旅院子里，帮那个本地人扶住自行车，递过去一把扳手——两个人聊了起来。',
      en: 'Su Ye crouches in the hostel courtyard, steadying the bike for the local man, handing over a wrench — and the two of them start to talk.',
    },
    accent: 'violet',
  },
  cards: [
    {
      id: 'card_sy_problem',
      episodeId: 'ep03',
      speaker: 'rocky',
      text: {
        zh: '你走很远。问题跟着你，到每一颗星球。问题不在地点。',
        en: 'You went far. The problem followed you — to every planet. The problem is not the place.',
      },
    },
    {
      id: 'card_sy_build',
      episodeId: 'ep03',
      speaker: 'rocky',
      text: {
        zh: '不是看了多少颗星。是和谁，一起，造了什么。',
        en: 'Not how many stars you saw. What you built, together, with someone.',
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
          text: { zh: '〔星际通讯线 · ERID↔地球〕今晚第 9 通来电', en: '[INTERSTELLAR LINE · ERID↔EARTH] Call #9 tonight' },
          stage: { zh: '信号建立中…', en: 'establishing link…' },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '凌晨。陌生城市的青年旅舍，六人间，其他人都睡了。',
            en: 'Small hours. A hostel in a city he doesn’t know, a six-bed room, everyone else asleep.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '今天发的那条动态，点赞已经九十多了。海，落日，一杯当地的酒。',
            en: 'The post he put up today is past ninety likes now. The sea, the sunset, a glass of the local wine.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '可你躺在上铺，盯着天花板，心里空得像漏了风。',
            en: 'And yet you lie on the top bunk, staring at the ceiling, hollow inside, like a window left open.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '楼下院子里，那个总在修自行车、给大家做饭的本地小哥，灯还亮着。你来五天了，一句话也没跟他说过。',
            en: "Down in the courtyard, the local guy who's always fixing bikes and cooking for everyone still has his light on. You've been here five days and haven't said a word to him.",
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '你戴上耳机，拨通了这条号称能打给外星人的线。',
            en: 'You put on your headphones and dial the line that claims it can reach an alien.',
          },
        },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: { zh: '● 信号接通 · 延迟 4.2 秒', en: '● SIGNAL LIVE · DELAY 4.2s' }, stage: { zh: '', en: '' } },
        {
          speaker: 'rocky',
          text: {
            zh: '接通。一个人类。信号……从一个移动的位置来。你在路上，推测。',
            en: 'Connected. One human. Signal… comes from a moving location. You are traveling. I guess.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '有意思。我也曾经，离起点很远。我是 Rocky。',
            en: 'Interesting. Once, I too was very far from where I started. I am Rocky.',
          },
        },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: {
        zh: '（一个真的跨过星际的人。你忽然不知从何说起。）',
        en: '(Someone who actually crossed the stars. Suddenly you don’t know where to begin.)',
      },
      options: [
        {
          id: 'admit',
          label: {
            zh: '"我一个人在外面走了大半年了。挺好的。就是……今晚突然不知道是为了什么。"',
            en: '"I’ve been on the road alone for over half a year. It’s good. It’s just… tonight I suddenly don’t know what it’s for."',
          },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'flex',
          label: {
            zh: '"我在环游世界呢，挺爽的。随便聊聊。"',
            en: '"I’m traveling the world. It’s a blast. Just chatting."',
          },
          effects: [{ type: 'signal', delta: 2 }],
          next: 'rocky_listen',
        },
        {
          id: 'ask',
          label: {
            zh: '"你跨越了那么远……你后悔过离开家吗？"',
            en: '"You crossed all that distance… did you ever regret leaving home?"',
          },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        {
          speaker: 'rocky',
          text: {
            zh: '后悔，问号。复杂。我离开 Erid，不是为了看风景。是我的星要死了，我去想办法。有目的的远行。',
            en: 'Regret. Question. Complicated. I left Erid not to look at scenery. My planet was dying. I went to find a way. Travel with a purpose.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '你呢。你在移动。一直移动。我想知道：移动，在帮你修什么。',
            en: 'You. You are moving. Always moving. I want to know: the moving — what is it fixing for you.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '说真的那个。不是动态里那个。',
            en: 'The real one. Not the one in the post.',
          },
        },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: {
        zh: '（"说真的那个。" 你喉咙紧了一下。）',
        en: '("The real one." Something tightens in your throat.)',
      },
      options: [
        {
          id: 'escaping',
          label: {
            zh: '"我怕我不是在找什么。是在逃。逃那份把我熬空的工作，逃一段结束了的感情，逃我自己。"',
            en: '"I’m afraid I’m not looking for anything. I’m running. From the job that burned me hollow, from a relationship that ended, from myself."',
          },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'escaping', value: true }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_motion',
        },
        {
          id: 'empty',
          label: {
            zh: '"看了好多地方，照片很美，点赞很多。可一到夜里就特别空。"',
            en: '"I’ve seen so many places. The photos are beautiful, the likes pour in. But at night it goes so empty."',
          },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'empty', value: true }],
          next: 'rocky_motion',
        },
        {
          id: 'fear_return',
          label: {
            zh: '"我怕的是回去。怕回去之后，发现什么都没变。"',
            en: '"What I’m afraid of is going back. Afraid that when I do, I’ll find nothing has changed."',
          },
          effects: [{ type: 'signal', delta: 8 }],
          next: 'rocky_motion',
        },
      ],
    },

    rocky_motion: {
      kind: 'scene',
      next: 'rocky_build',
      lines: [
        { speaker: 'rocky', text: { zh: '明白一点了。', en: 'I understand a little now.' } },
        {
          speaker: 'rocky',
          text: {
            zh: '移动，是一种药。换地方，换风景，换人。一开始有效。痛，少一点。',
            en: 'Moving is a drug. New place, new scenery, new people. At first it works. The pain, a little less.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '但药有剂量。用久了，同样的剂量，不再起效。你得加量——下一个国家，下一片海。还是空。',
            en: 'But a drug has a dose. Use it long enough, the same dose stops working. You must increase it — next country, next sea. Still empty.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '这是故障模式。不是你坏了。是这个药，本来就治不了这个病。',
            en: 'This is a failure mode. You are not broken. The drug simply does not treat this illness.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '我不是说旅行不好。我是说——它修不了你以为它能修的那个东西。',
            en: 'I do not say travel is bad. I say — it cannot fix the thing you thought it would fix.',
          },
        },
      ],
    },

    rocky_build: {
      kind: 'scene',
      next: 'rocky_question',
      lines: [
        {
          speaker: 'rocky',
          text: {
            zh: '说个我的事。我整段旅途，最重要的，不是看了多少颗星。',
            en: 'A thing about me. My whole journey, the most important part was not how many stars I saw.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '是我和格雷斯。两个物种，听不懂对方。我们从零，一个音一个音，造出了一种语言。',
            en: 'It was me and Grace. Two species. We could not understand each other. From zero, one sound at a time, we built a language.',
          },
          revealCardId: 'card_sy_build',
        },
        {
          speaker: 'rocky',
          text: {
            zh: '那才是我旅途里，真正发生过的事。不是距离。是我们一起，造出来的那个东西。',
            en: 'That is the thing that truly happened on my journey. Not the distance. The thing we built, together.',
          },
        },
      ],
    },

    rocky_question: {
      kind: 'scene',
      next: 'q_connect',
      lines: [
        { speaker: 'rocky', text: { zh: '所以我问你一个数据。', en: 'So I ask you for one data point.' } },
        {
          speaker: 'rocky',
          text: {
            zh: '这大半年。你和谁，一起，做过一件真正难的事，问号。',
            en: 'This half year. Who did you do one truly hard thing with. Question.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '不是看。不是拍。是——和一个人，一起。',
            en: 'Not looking. Not photographing. With — one person. Together.',
          },
        },
      ],
    },

    q_connect: {
      kind: 'choice',
      choiceId: 'q_connect',
      prompt: {
        zh: '（你想了很久。然后，你想起了楼下那盏灯。）',
        en: '(You think for a long time. Then you remember the light still on downstairs.)',
      },
      options: [
        {
          id: 'the_local',
          label: {
            zh: '"……青旅有个人，总在修车、做饭。我来五天了，一直没敢跟他说话。"',
            en: '"…There’s a guy at the hostel, always fixing bikes, cooking. I’ve been here five days and never dared to talk to him."',
          },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }, { type: 'flag', key: 'local', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'no_one',
          label: {
            zh: '"没有。我都是一个人。路过，拍照，离开。从不停下。"',
            en: '"No one. I’m always alone. Pass through, take photos, leave. Never stop."',
          },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'alone', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'unsure',
          label: {
            zh: '"我不知道……算不算。"',
            en: '"I don’t know… if it counts."',
          },
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
        {
          speaker: 'rocky',
          text: {
            zh: '这个，格雷斯比我懂。他也被扔到了一个回不去的地方。',
            en: 'This one, Grace understands better than me. He was also thrown to a place he could not return from.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '格雷斯！一个地球人，在路上，分不清是找，还是逃。',
            en: 'Grace! A human from Earth, on the road. Cannot tell if he is searching or running.',
          },
        },
        {
          speaker: 'grace',
          text: {
            zh: '嘿，我是格雷斯。我现在住在一颗不是地球的星球上。我本来可以回去的——飞船修好了。我选择留下。',
            en: "Hey, I'm Grace. I live on a planet that isn't Earth now. I could have gone home — the ship was fixed. I chose to stay.",
          },
        },
        {
          speaker: 'grace',
          text: {
            zh: '说句你可能想听的：留下，和回去，都不是逃。地点本身，不分高下。',
            en: "Here's something you might need to hear: staying and going back are neither one an escape. The place itself isn't better or worse.",
          },
        },
        {
          speaker: 'grace',
          text: {
            zh: '真正分高下的是——你到了一个地方，是去连接，还是去躲。我留在这儿，是因为这儿有我在乎的人，有我们一起在做的事。',
            en: "What's better or worse is this — when you get somewhere, do you go to connect, or to hide. I stayed here because there are people I care about here, and things we're building together.",
          },
        },
        {
          speaker: 'grace',
          text: {
            zh: '楼下那个修车的人……换作是我，今晚就下楼。去吧。',
            en: "That guy fixing bikes downstairs… if I were you, I'd go down tonight. Go.",
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '格雷斯总是这样。直接。好的直接。',
            en: 'Grace is always like this. Direct. Good direct.',
          },
        },
      ],
    },

    rocky_solo: {
      kind: 'scene',
      next: 'rocky_problem',
      lines: [
        {
          speaker: 'rocky',
          text: {
            zh: '我不催你。我只说一件我学到的事。',
            en: 'I do not rush you. I say only one thing I learned.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '一个人能跨过的最远的距离，不是星和星之间。是从"我自己"，到"我们"。那一步最难。',
            en: 'The farthest distance a person can cross is not between star and star. It is from "myself" to "us." That step is the hardest.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '那一步，换多少个国家，都迈不过去。要停下来，对着一个具体的人，才迈得过去。',
            en: 'That step — no number of countries gets you across it. You must stop. Stand in front of one real person. Then you cross.',
          },
        },
      ],
    },

    rocky_problem: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        {
          speaker: 'rocky',
          text: {
            zh: '还有一句，关于你为什么夜里空。',
            en: 'One more thing. About why you go empty at night.',
          },
          revealCardId: 'card_sy_problem',
        },
        {
          speaker: 'rocky',
          text: {
            zh: '你走了很远。但你那个问题，一直跟着你，到每一颗星球。',
            en: 'You went far. But that problem of yours followed you — to every planet.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '问题不在地点。所以换地点，修不好。',
            en: 'The problem is not the place. So changing the place does not fix it.',
          },
        },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: {
        zh: '（窗外有海浪声。楼下那盏灯，还亮着。）',
        en: '(The sound of waves outside the window. The light downstairs is still on.)',
      },
      options: [
        {
          id: 'stay_help',
          label: {
            zh: '"我想……在这儿多留几天。明天下楼，去帮那个修车的人做点什么。"',
            en: '"I think… I’ll stay a few more days. Tomorrow I’ll go down and help that guy with the bikes, do something."',
          },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'stay', value: true }],
          next: 'end_main',
        },
        {
          id: 'send_msg',
          label: {
            zh: '"我想给一个一直没敢联系的人，发条消息。一句真心话。"',
            en: '"I want to message someone I never dared to reach out to. One true sentence."',
          },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'msg', value: true }],
          next: 'end_main',
        },
        {
          id: 'commit',
          label: {
            zh: '"我会继续走。但这次，带一个具体的承诺，不只是路过。"',
            en: '"I’ll keep traveling. But this time I’ll carry a concrete promise, not just pass through."',
          },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'commit', value: true }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'sy_end',
      lines: [
        { speaker: 'rocky', text: { zh: '好。', en: 'Good.' } },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'stay' },
          lines: [
            {
              speaker: 'narrator',
              text: {
                zh: '你没有立刻挂电话。你看着楼下那盏灯，想着明天怎么开口。"嗨，搭把手吗？"——也许就这么简单。',
                en: 'You don’t hang up right away. You watch the light downstairs and think about how to start tomorrow. "Hey, need a hand?" — maybe it’s that simple.',
              },
            },
          ],
        },
        {
          when: { type: 'flagSet', key: 'msg' },
          lines: [
            {
              speaker: 'narrator',
              text: {
                zh: '你打开对话框，那个你存了半年、没敢点开的名字。这一次，你开始打字——这次没有删。',
                en: 'You open the chat — the name you saved half a year ago and never dared to tap. This time you start typing. And this time you don’t delete it.',
              },
            },
          ],
        },
        {
          when: { type: 'flagSet', key: 'commit' },
          lines: [
            {
              speaker: 'narrator',
              text: {
                zh: '你在备忘录里写下了下一站，还有一件具体要去做、要去给予的事。不再只是打卡。',
                en: 'In your notes you write down the next stop — and one concrete thing to do there, to give. Not just another place to check off.',
              },
            },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            {
              speaker: 'rocky',
              text: {
                zh: '好好好。意义，不在下一个地方。',
                en: 'Good good good. The meaning is not in the next place.',
              },
            },
            {
              speaker: 'rocky',
              text: {
                zh: '是你和谁，一起，造了什么。去造，软软的人类。线一直开着。',
                en: 'It is what you build, together, with someone. Go build, soft human. The line stays open.',
              },
            },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            {
              speaker: 'rocky',
              text: {
                zh: '慢慢来。先停一下，比再走十个国家，难。也值。',
                en: 'Take it slow. To stop, even once, is harder than ten more countries. And worth it.',
              },
            },
            {
              speaker: 'narrator',
              text: {
                zh: '你摘下耳机。海浪声忽然清楚了。楼下，还有一盏灯亮着。',
                en: 'You take off the headphones. The waves are suddenly clear. Downstairs, a light is still on.',
              },
            },
          ],
        },
      ],
    },
  },
};
