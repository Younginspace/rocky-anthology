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
  title: { zh: '坐到天黑', en: 'Until Dark' },
  subtitle: { zh: '韩冬 · 中年失业 / 程序员', en: 'Han Dong · laid off at midlife / programmer' },
  theme: {
    zh: '当机器把你会的那门手艺做了，而你以为那就是你',
    en: 'When the machine takes the one craft you knew — and you thought that craft was you',
  },
  caller: {
    id: 'han_dong',
    handle: 'HD-1109',
    realName: { zh: '韩冬', en: 'Han Dong' },
    age: 38,
    location: {
      zh: '某新一线城市 · 还贷中的两居室',
      en: 'A second-tier boom city · a two-bedroom still on the mortgage',
    },
    tagline: {
      zh: '写了十四年代码，上周被"降本增效"和 AI 一起优化掉',
      en: 'Fourteen years writing code — laid off last week by "cost optimization" and AI, together',
    },
    reason: {
      zh: '深夜。客厅没开灯。老婆孩子睡了，老人的药刚续完，房贷下周又要扣。他第一次不知道明天该往哪儿去。',
      en: 'Late at night. The living room is dark. His wife and kid are asleep, his parent’s prescription just got refilled, the mortgage comes out again next week. For the first time, he has no idea where tomorrow is supposed to go.',
    },
    outcomeShort: {
      zh: '他没有立刻找到下家。但他停止了把整个人，押在那一个已经没了的岗位上。',
      en: 'He didn’t land the next job overnight. But he stopped staking his whole self on the one position that was already gone.',
    },
    morningBeat: {
      zh: '韩冬在手机备忘录里写下三行字——不是简历模板，是三件"不靠那个岗位、他也确实擅长"的事。写完没删。',
      en: 'Han Dong types three lines into the notes app on his phone — not a resume template, but three things he’s genuinely good at that don’t depend on that job. He writes them, and leaves them.',
    },
    accent: 'cyan',
  },
  cards: [
    {
      id: 'card_hd_function',
      episodeId: 'ep07',
      speaker: 'rocky',
      text: {
        zh: '机器接管了功能。没接管你。你不是你执行的那个功能。',
        en: 'Machine took over a function. It did not take over you. You are not the function you run.',
      },
    },
    {
      id: 'card_hd_redundancy',
      episodeId: 'ep07',
      speaker: 'rocky',
      text: {
        zh: '只有一条负载路径的系统，脆。多学一条。那叫冗余。',
        en: 'A system with only one load path is fragile. Learn another. That is redundancy.',
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
          text: { zh: '〔星际通讯线 · ERID↔地球〕今晚第 18 通来电', en: '[INTERSTELLAR LINE · ERID↔EARTH] Call #18 tonight' },
          stage: { zh: '信号建立中…', en: 'establishing link…' },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '凌晨一点四十。客厅没开灯，只有路由器一闪一闪的绿。',
            en: '1:40 a.m. The living room is dark — just the router’s green light, blinking on, off, on.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '卧室门关着，老婆和孩子睡了。老人的降压药刚续完，发票还摊在茶几上。房贷下周三扣款。',
            en: 'The bedroom door is shut; his wife and kid are asleep. His parent’s blood-pressure pills just got refilled — the receipt still lies on the coffee table. The mortgage comes out Wednesday next week.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '你写了十四年代码。上周三，HR 说了两个词：降本增效。后面那句你记得清清楚楚——"很多活，现在 AI 都能干了"。',
            en: 'You’ve written code for fourteen years. Last Wednesday HR said two words: cost optimization. And the line after — you remember it word for word: "A lot of this work, AI can just do now."',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '招聘 App 你刷到手机发烫。三十八岁，要求"本科 35 岁以下"。已读不回。',
            en: 'You scrolled the job apps until the phone went hot in your hand. You’re thirty-eight; the listings want "under 35, bachelor’s degree." Read. No reply.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '你不知道怎么跟家里开口。这几天你照常七点出门，在商场里坐到天黑。',
            en: 'You don’t know how to tell your family. So for days you’ve left at seven like always, and sat in a shopping mall until dark.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '收藏夹最底下，有条几年前存的链接。你也不知道自己半夜在干嘛，点了进去。',
            en: 'At the very bottom of your bookmarks is a link you saved years ago. You don’t even know what you’re doing up at this hour — but you tapped it.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '拨号音很长。比一般的电话长得多。',
            en: 'The dial tone is long. Much longer than a normal call.',
          },
        },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: { zh: '● 信号接通 · 延迟 4.1 秒', en: '● SIGNAL LIVE · DELAY 4.1s' }, stage: { zh: '', en: '' } },
        { speaker: 'rocky', text: { zh: '接通。一个地球信号。', en: 'Connected. One Earth signal.' } },
        {
          speaker: 'rocky',
          text: {
            zh: '一个人类。声音……压着。像承重的梁，载荷超了，还在硬撑。',
            en: 'One human. Voice… pressed down. Like a load-bearing beam. Over its rated load. Still holding.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '我是 Rocky。你找格雷斯的朋友，问号。',
            en: 'I am Rocky. You look for Grace’s friend. Question.',
          },
        },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: {
        zh: '（屏幕那头真的有声音。你坐在黑着灯的沙发上，喉咙发紧。）',
        en: '(There really is a voice on the other end. You sit on the dark couch, your throat tight.)',
      },
      options: [
        {
          id: 'admit',
          label: {
            zh: '"我……上周被裁了。还没敢跟家里说。憋了几天，找个谁都不认识的地方说一句。"',
            en: '"I… got laid off last week. Haven’t dared tell my family. Held it in for days. I just needed to say it somewhere nobody knows me."',
          },
          effects: [{ type: 'signal', delta: 13 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'deflect',
          label: {
            zh: '"听说这线能跟外星人聊天。睡不着，随便试试。"（你苦笑了一下。）',
            en: '"Heard this line lets you talk to aliens. Couldn’t sleep. Figured I’d try." (You give a bitter little laugh.)',
          },
          effects: [{ type: 'signal', delta: 3 }],
          next: 'rocky_listen',
        },
        {
          id: 'spar',
          label: {
            zh: '"你一个外星人，能懂三十八岁丢了饭碗是什么感觉？"',
            en: '"You’re an alien. What could you possibly know about losing your livelihood at thirty-eight?"',
          },
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'engaged', value: true }],
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
            zh: '丢了饭碗。我先确认——你的身体，没坏，问号。家里人，活着，问号。',
            en: 'Lost your livelihood. First I check — your body, not broken, question. Your family, alive, question.',
          },
        },
        { speaker: 'caller', text: { zh: '……都好。就是我，没工作了。', en: '…All fine. It’s just me. I have no job.' } },
        {
          speaker: 'rocky',
          text: {
            zh: '好。那系统主结构，还在。坏的是一根梁。我们先看那根梁。',
            en: 'Good. Then the main structure stands. One beam failed. We look at that beam first.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '我是工程师。一根梁突然卸了，我不慌着哭。我先量：它原来承的载荷，现在压到哪儿去了。',
            en: 'I am engineer. A beam drops out, I do not rush to cry. First I measure: the load it carried — where does it press now.',
          },
        },
        { speaker: 'rocky', text: { zh: '说。怎么卸的。', en: 'Tell me. How did it drop.' } },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: {
        zh: '（你深吸一口气，黑暗里说出来反而容易些。）',
        en: '(You take a deep breath. Somehow it’s easier to say in the dark.)',
      },
      options: [
        {
          id: 'identity',
          label: {
            zh: '"我写了十四年代码。我这个人，就是个工程师。现在这个没了……我都不知道我还是谁。"',
            en: '"I’ve written code for fourteen years. As a person, I just am an engineer. Now that’s gone… and I don’t even know who I still am."',
          },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'identity', value: true }],
          next: 'rocky_unpack',
        },
        {
          id: 'replaced',
          label: {
            zh: '"裁我的理由是 AI 能干。我熬了十几年练的东西，机器一上来，大半都做了。"',
            en: '"The reason they cut me was that AI can do it. The thing I spent a decade-plus grinding to learn — the machine shows up and does most of it."',
          },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'replaced', value: true }],
          next: 'rocky_unpack',
        },
        {
          id: 'family',
          label: {
            zh: '"房贷、老人药费、孩子。我是这家里挣钱的那个。我要是塌了，这家就塌了。"',
            en: '"The mortgage, my parent’s medicine, my kid. I’m the one who earns in this house. If I go down, the house goes down."',
          },
          effects: [{ type: 'signal', delta: 13 }, { type: 'flag', key: 'family', value: true }],
          next: 'rocky_unpack',
        },
      ],
    },

    rocky_unpack: {
      kind: 'scene',
      next: 'rocky_function',
      lines: [
        {
          speaker: 'rocky',
          text: {
            zh: '我听明白一件事。你把"我是谁"，全压在"我那个职位"上。把操作员，和他执行的那个功能，焊成了一个。',
            en: 'I hear one thing clearly. You put all of "who I am" on "the job I held." You welded the operator and the function he runs into one piece.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '工程上，这两个，从来不是一个东西。功能，是机器跑的那段活。操作员，是决定让机器跑什么、它跑歪了谁来修的那个。',
            en: 'In engineering, these two are never the same thing. The function is the work the machine runs. The operator is the one who decides what it runs — and who fixes it when it runs wrong.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '你被卸下来的，是一个功能岗。不是那个操作员。',
            en: 'What they took out of you is a function post. Not the operator.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '不是你不行。是你把自己，错认成了一段可以被接管的功能。',
            en: 'It is not that you are not enough. It is that you mistook yourself for a function that can be taken over.',
          },
        },
      ],
    },

    rocky_function: {
      kind: 'scene',
      next: 'q_data',
      lines: [
        {
          speaker: 'rocky',
          text: {
            zh: '再说那个机器。你说它做了你大半的活。我相信。',
            en: 'Now the machine. You say it does most of your work. I believe you.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '但是。机器接管的是一个功能。写那种代码，是一个功能。',
            en: 'But. What the machine took over is a function. Writing that kind of code — that is a function.',
          },
          revealCardId: 'card_hd_function',
        },
        {
          speaker: 'rocky',
          text: {
            zh: '功能，不是你。你不是你执行的那个功能。',
            en: 'The function is not you. You are not the function you run.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '我船上有台仪器，专做光谱分析。它坏了，我没说"那我也完了"。我说：这个功能，得有别的承重。',
            en: 'On my ship there is an instrument, only for spectral analysis. It broke. I did not say "then I am finished too." I said: this function needs another load-bearer.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '所以我问你一个工程问题。这十四年，除了"写那种代码"——你真正会的，是什么。',
            en: 'So I ask you an engineering question. These fourteen years — besides "writing that kind of code" — what do you truly know how to do.',
          },
        },
      ],
    },

    q_data: {
      kind: 'choice',
      choiceId: 'q_data',
      prompt: {
        zh: '（你愣了一下。从来没人这么问过。连你自己都没分开想过。）',
        en: '(You freeze for a second. No one has ever asked it like that. You’ve never separated it out yourself.)',
      },
      options: [
        {
          id: 'debug',
          label: {
            zh: '"……我擅长把烂摊子理顺。别人接不了的祖传烂代码，没文档的，我能蹲进去把它捋清楚。"',
            en: '"…I’m good at untangling a mess. Legacy garbage code nobody else will touch, no docs — I can crawl in and make sense of it."',
          },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'has_data', value: true }, { type: 'flag', key: 'engaged', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'mentor',
          label: {
            zh: '"带新人。这些年我带过六七个，没经验的小孩，我能教到能独立干活。"',
            en: '"Mentoring. Over the years I’ve brought along six or seven of them — green kids, no experience, and I can teach them up until they can stand on their own."',
          },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'has_data', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'blank',
          label: {
            zh: '"……不知道。我脑子里只剩「我废了」。除了那门技术，我好像什么都不会。"',
            en: '"…I don’t know. All that’s left in my head is ‘I’m washed up.’ Outside that one skill, it feels like I can’t do anything."',
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
      else: 'rocky_redundancy',
    },

    grace_in: {
      kind: 'scene',
      next: 'rocky_redundancy',
      lines: [
        {
          speaker: 'rocky',
          text: {
            zh: '等一下。这个，我船上有个人，比我懂。他被时代换下来过。',
            en: 'Wait. This one — someone on my ship knows it better than me. The times swapped him out once.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '格雷斯！过来。一个地球人，时代不要他了。',
            en: 'Grace! Come. One Earth person. The times do not want him anymore.',
          },
        },
        {
          speaker: 'grace',
          text: {
            zh: '嘿，我是格雷斯。我听到了一点。我跟你说一句我花了很多年才懂的：',
            en: 'Hey, I’m Grace. I caught a little of that. Let me tell you something it took me years to understand:',
          },
        },
        {
          speaker: 'grace',
          text: {
            zh: '我会的那个"教"，在另一个地方，刚好是最被需要的。',
            en: 'The thing I knew how to do — teach — turned out to be exactly the thing that was needed most somewhere else.',
          },
        },
        {
          speaker: 'grace',
          text: {
            zh: '我也被时代换下来过，岗位没了，以为自己整个人都作废了。后来才发现——作废的是那个头衔，不是我会的本事。本事换了个地方，照样吃香。',
            en: 'The times swapped me out too. My post vanished, and I thought my whole self had been written off. Later I realized — what got written off was the title, not the skill. The skill moved somewhere new, and it was wanted just the same.',
          },
        },
        {
          speaker: 'grace',
          text: {
            zh: '换下来的是你那个"岗位"。不是你会的所有东西。这俩，别一起埋了。',
            en: 'What got swapped out is your "position." Not everything you know how to do. Don’t bury the two of them together.',
          },
        },
        {
          speaker: 'grace',
          text: {
            zh: '行了，我去看仪器。Rocky，让他把数据摆出来。',
            en: 'All right, I’m off to check the instruments. Rocky — get him to lay out the data.',
          },
        },
        { speaker: 'rocky', text: { zh: '正在摆。陈述。', en: 'Laying it out now. Statement.' } },
      ],
    },

    rocky_redundancy: {
      kind: 'scene',
      next: 'rocky_family',
      lines: [
        {
          speaker: 'rocky',
          text: {
            zh: '回到结构。那根断了的梁，我们不哭它。我们加梁。',
            en: 'Back to the structure. The beam that broke — we do not cry for it. We add a beam.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '只有一条负载路径的系统，脆。多学一条，多带一条。那叫——冗余。',
            en: 'A system with only one load path is fragile. Learn another. Carry another. That is called — redundancy.',
          },
          revealCardId: 'card_hd_redundancy',
        },
        {
          speaker: 'rocky',
          text: {
            zh: '冗余，不是浪费。是其中一条断了，整座桥还站着。',
            en: 'Redundancy is not waste. It is: one path breaks, the whole bridge still stands.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '你现在不是没用了。你是发现了：你只有一条路径。三十八岁，刚好知道要再造一条。不晚。',
            en: 'You are not useless now. You just found out: you had only one path. Thirty-eight — exactly the right time to learn you must build a second. Not too late.',
          },
        },
      ],
    },

    rocky_family: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        {
          speaker: 'rocky',
          text: {
            zh: '还有一件事。你几天没跟家里说。一个人扛。',
            en: 'One more thing. For days you have not told your family. You carry it alone.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '我也一个人扛过。一个人扛，结构最容易在没人看见的地方，先裂。我知道。',
            en: 'I carried alone too. Carry alone, and the structure cracks first where no one can see. I know this.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '家里人，也是结构的一部分。一根梁卸了，告诉别的梁，它们好分担。瞒着，它们使不上力。',
            en: 'Your family is part of the structure too. A beam drops out — tell the other beams, so they can share the load. Hide it, and they cannot push.',
          },
        },
        {
          speaker: 'rocky',
          text: {
            zh: '你怕被他们看成失败的那个。我说一句——他们要的是你这个人。不是你那个工资条。',
            en: 'You fear they will see you as the failure. I say one thing — they want you, the person. Not your pay slip.',
          },
        },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: {
        zh: '（窗外天还黑着。但胸口那块压着的石头，松了一道缝。）',
        en: '(Outside the window it’s still dark. But the stone pressing on your chest has loosened by a crack.)',
      },
      options: [
        {
          id: 'list_three',
          label: {
            zh: '"我想……列三件不靠那个岗位、但我确实擅长的事。先写下来，看看我手里到底还有什么。"',
            en: '"I think… I’ll list three things I’m genuinely good at that don’t depend on that job. Write them down first, see what I actually still have in hand."',
          },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'tell_family',
          label: {
            zh: '"我想……明早跟我老婆说实话。不再一个人扛了。"',
            en: '"I think… tomorrow morning I’ll tell my wife the truth. No more carrying it alone."',
          },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'told_family', value: true }],
          next: 'end_main',
        },
        {
          id: 'just_sleep',
          label: {
            zh: '"……我先去睡。脑子太乱了，今天先到这儿。"',
            en: '"…I’m going to sleep first. My head’s too full. That’s enough for tonight."',
          },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'hd_end',
      lines: [
        { speaker: 'rocky', text: { zh: '好。', en: 'Good.' } },
        {
          speaker: 'narrator',
          text: {
            zh: '你关掉了刷到发烫的招聘 App。客厅还是黑的，但你不再盯着路由器那盏绿灯发呆。',
            en: 'You close the job app that ran the phone hot. The living room is still dark, but you’re no longer staring blankly at the router’s green light.',
          },
        },
      ],
      variants: [
        {
          when: { type: 'flag', key: 'told_family', equals: true },
          lines: [
            {
              speaker: 'narrator',
              text: {
                zh: '你看了一眼卧室那扇关着的门。明早，你打算趁孩子上学前，跟她说清楚。',
                en: 'You glance at the shut bedroom door. Tomorrow morning, before the kid leaves for school, you mean to tell her everything.',
              },
            },
            {
              speaker: 'rocky',
              text: {
                zh: '别一个人承重。告诉别的梁。它们比你想的，能扛。',
                en: 'Do not bear the load alone. Tell the other beams. They can hold more than you think.',
              },
            },
          ],
        },
        {
          when: { type: 'and', all: [{ type: 'flagSet', key: 'agency' }, { type: 'not', cond: { type: 'flagSet', key: 'told_family' } }] },
          lines: [
            {
              speaker: 'narrator',
              text: {
                zh: '你打开手机备忘录，新建了一页。光标闪着，等你写下第一行。',
                en: 'You open the notes app and start a fresh page. The cursor blinks, waiting for your first line.',
              },
            },
            {
              speaker: 'rocky',
              text: {
                zh: '明天，造你的第二条路径。一条就够开始。冗余，是一条一条加上去的。',
                en: 'Tomorrow, build your second path. One is enough to start. Redundancy is added one path at a time.',
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
                zh: '好好好。你声音，不那么压着了。梁，松回来一点了。',
                en: 'Good good good. Your voice — not so pressed down now. The beam — eased back a little.',
              },
            },
            {
              speaker: 'rocky',
              text: {
                zh: '去睡，地球人。明天别再坐到天黑了——回家，让别的梁分一点。一根梁断，你不是整座桥。记住。',
                en: 'Go sleep, Earth person. Tomorrow, no more sitting until dark — go home, let the other beams take a share. One beam breaks — you are not the whole bridge. Remember.',
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
                zh: '去睡。明天，只做一件事——想清楚那门技术之外，你还会一样什么。一样就够。',
                en: 'Go sleep. Tomorrow, do one thing only — figure out one thing you can do besides that skill. One is enough.',
              },
            },
            {
              speaker: 'narrator',
              text: {
                zh: '你没说太多。但挂线前，你轻轻"嗯"了一声。然后靠回沙发，第一次没去看那盏绿灯。',
                en: 'You didn’t say much. But before the line dropped, you let out a soft "mm." Then you leaned back into the couch — and for the first time, you didn’t look at the green light.',
              },
            },
          ],
        },
      ],
    },
  },
};
