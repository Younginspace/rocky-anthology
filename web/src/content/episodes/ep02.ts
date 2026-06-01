import type { Episode } from '../../engine/types';

/** ep02 ·《发射前夜》· 陈乐 — 高考前夜。 */
export const ep02: Episode = {
  id: 'ep02',
  order: 2,
  title: { zh: '凉掉的牛奶', en: 'The Milk Gone Cold' },
  subtitle: { zh: '陈乐 · 高考前一晚', en: 'Chen Le · the night before the gaokao' },
  theme: {
    zh: '当一场考试好像要决定你的一生',
    en: 'When one exam seems to decide your whole life',
  },
  caller: {
    id: 'chen_le',
    handle: 'CL-0606',
    realName: { zh: '陈乐', en: 'Chen Le' },
    age: 18,
    location: { zh: '某县城 · 自己的小房间', en: 'A small county town · his own little room' },
    tagline: {
      zh: '明天就要高考，怎么也睡不着',
      en: 'The gaokao is tomorrow, and he cannot fall asleep',
    },
    reason: {
      zh: '倒计时撕到了最后一张。桌上一杯凉掉的牛奶，抽屉里压着准考证。',
      en: 'The countdown is down to its last page. A cup of milk gone cold on the desk, his exam admission ticket tucked in the drawer.',
    },
    outcomeShort: {
      zh: '第二天他照常走进了考场。考得怎样不重要——他是带着睡够的脑子去的。',
      en: 'The next day he walked into the exam hall like anyone else. How he scored is not the point — he went in with a brain that had slept.',
    },
    morningBeat: {
      zh: '陈乐把准考证和两支削好的笔放进透明袋，深吸一口气，走进了考场。',
      en: 'Chen Le slipped his admission ticket and two sharpened pencils into a clear pouch, took a deep breath, and walked into the exam hall.',
    },
    accent: 'cyan',
  },
  cards: [
    {
      id: 'card_cl_spof',
      episodeId: 'ep02',
      speaker: 'rocky',
      text: {
        zh: '一个测试定一生。坏设计。单点故障。我不喜欢。',
        en: 'One test decides one life. Bad design. Single point of failure. I do not like.',
      },
    },
    {
      id: 'card_cl_rest',
      episodeId: 'ep02',
      speaker: 'rocky',
      text: {
        zh: '发射前最后一件事，是睡。然后发射。',
        en: 'Last thing before launch — sleep. Then launch.',
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
          text: { zh: '〔星际通讯线 · ERID↔地球〕今晚第 31 通来电', en: '[INTERSTELLAR LINE · ERID↔EARTH] Call #31 tonight' },
          stage: { zh: '信号建立中…', en: 'establishing link…' },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '凌晨一点。墙上的倒计时，撕到了最后一张："1"。',
            en: 'One in the morning. The countdown on the wall is down to its last page: "1".',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '桌上那杯牛奶，妈妈睡前热的，现在凉透了。抽屉里压着准考证。',
            en: 'The milk on the desk, the cup your mother warmed before bed, has gone stone cold. Your admission ticket waits in the drawer.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '傍晚你假装睡着，听见爸妈在客厅压低声音算这几年补习的钱，还有那句——"万一考不好怎么办"。',
            en: 'Earlier you pretended to be asleep and heard your parents in the living room, voices low, adding up years of tutoring fees — and that one line: "What if he doesn\'t do well?"',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '你给妈打了一条消息，删了。又打，又删。',
            en: 'You typed a message to your mom, then deleted it. Typed it again, deleted it again.',
          },
        },
        {
          speaker: 'narrator',
          text: {
            zh: '同学说有个网站能跟外星人打电话。你想，反正也睡不着。',
            en: 'A classmate said there\'s a site where you can call an alien. You figure — you\'re not sleeping anyway.',
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
          text: { zh: '● 信号接通 · 延迟 4.2 秒', en: '● SIGNAL LIVE · DELAY 4.2s' },
          stage: { zh: '', en: '' },
        },
        { speaker: 'rocky', text: { zh: '接通。一个很年轻的人类。', en: 'Connected. A very young human.' } },
        {
          speaker: 'rocky',
          text: { zh: '声音……抖。手也抖，推测。深夜。地球。', en: 'Voice… shaking. Hands too, I estimate. Deep night. Earth.' },
        },
        { speaker: 'rocky', text: { zh: '我是 Rocky。说。', en: 'I am Rocky. Speak.' } },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: {
        zh: '（电话那头是个……外星人？你忽然有点想哭。）',
        en: '(On the other end is… an alien? Out of nowhere you almost want to cry.)',
      },
      options: [
        {
          id: 'scared',
          label: {
            zh: '"我明天要高考。一场很重要的考试。我睡不着。"',
            en: '"I have the gaokao tomorrow — the exam that decides where every kid in the country goes. A huge exam. I can\'t sleep."',
          },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'casual',
          label: {
            zh: '"没事，同学说这儿好玩，随便打打。"',
            en: '"It\'s nothing. A classmate said this was fun, just calling around."',
          },
          effects: [{ type: 'signal', delta: 2 }],
          next: 'rocky_listen',
        },
        {
          id: 'curious',
          label: {
            zh: '"你们外星人……也要考试吗？"',
            en: '"Do you aliens… have exams too?"',
          },
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'rocky_spof',
      lines: [
        { speaker: 'rocky', text: { zh: '考试。等。我理解一下。', en: 'Exam. Wait. Let me understand.' } },
        {
          speaker: 'rocky',
          text: { zh: '一次测试。一天。然后……决定你之后很多年，问号。', en: 'One test. One day. Then… it decides many of your years after. Question.' },
        },
        {
          speaker: 'caller',
          text: { zh: '差不多……是这样。大家都说，一考定终身。', en: 'More or less… yeah. Everyone says one exam decides the rest of your life.' },
        },
        { speaker: 'rocky', text: { zh: '不喜欢。', en: 'I do not like.' } },
      ],
    },

    rocky_spof: {
      kind: 'scene',
      next: 'q_fear',
      lines: [
        { speaker: 'rocky', text: { zh: '我是工程师。听好。', en: 'I am engineer. Listen.' }, revealCardId: 'card_cl_spof' },
        {
          speaker: 'rocky',
          text: { zh: '一个系统，把一整条命，压在一个点上。那个点坏了，全塌。', en: 'A system puts one whole life on one point. That point fails, everything falls.' },
        },
        {
          speaker: 'rocky',
          text: { zh: '这叫单点故障。坏设计。真实的好系统，不这么造。', en: 'This is single point of failure. Bad design. Good real systems are not built this way.' },
        },
        {
          speaker: 'rocky',
          text: { zh: '设计它的人类，错了。不是你错了。', en: 'The humans who designed it were wrong. You are not wrong.' },
        },
        {
          speaker: 'rocky',
          text: { zh: '但。现在改不了设计。明天还要发射。所以——你真正怕的，是什么。', en: 'But. Cannot fix the design now. Still launch tomorrow. So — what do you truly fear.' },
        },
      ],
    },

    q_fear: {
      kind: 'choice',
      choiceId: 'q_fear',
      prompt: {
        zh: '（他问得很直。你盯着那杯凉牛奶。）',
        en: '(He asks it straight. You stare at the cold milk.)',
      },
      options: [
        {
          id: 'parents',
          label: {
            zh: '"我怕考砸了，对不起我爸妈。他们为我花了太多。"',
            en: '"I\'m afraid I\'ll bomb it and let my parents down. They\'ve spent so much on me."',
          },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'parents', value: true }],
          next: 'rocky_launch',
        },
        {
          id: 'worth',
          label: {
            zh: '"我怕……如果我不够优秀，是不是就不值得了。我还是不是我。"',
            en: '"I\'m afraid… that if I\'m not good enough, I\'m just not worth anything. Like I stop being me."',
          },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'worth', value: true }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_launch',
        },
        {
          id: 'noise',
          label: {
            zh: '"我也说不清。脑子就是停不下来，越想越睡不着。"',
            en: '"I can\'t even say. My head just won\'t stop, and the more I think the less I sleep."',
          },
          effects: [{ type: 'signal', delta: 6 }],
          next: 'rocky_launch',
        },
      ],
    },

    rocky_launch: {
      kind: 'scene',
      next: 'q_msg',
      lines: [
        { speaker: 'rocky', text: { zh: '我懂这个。重大发射前。我也抖过。', en: 'I know this. Before a big launch. I shook too.' } },
        {
          speaker: 'rocky',
          text: { zh: '发射前一晚，你能做的准备，都做完了。剩下的，是执行，加上你控制不了的变量。', en: 'Night before launch, the prep you can do is already done. What remains is execution, plus variables you do not control.' },
        },
        {
          speaker: 'rocky',
          text: { zh: '数字会有。数字也重要。我不骗你说不重要。', en: 'A number will come. The number matters. I will not lie and say it does not.' },
        },
        {
          speaker: 'rocky',
          text: { zh: '但数字是一个数据点。不是整个系统。你，是系统。系统比一个数据点，活得久。', en: 'But a number is one data point. Not the whole system. You are the system. The system outlives one data point.' },
        },
      ],
    },

    q_msg: {
      kind: 'choice',
      choiceId: 'q_msg',
      prompt: {
        zh: '（你想起那条删了又打的消息。）',
        en: '(You think of the message you typed and deleted, over and over.)',
      },
      options: [
        {
          id: 'send_truth',
          label: {
            zh: '"其实……我想跟我妈说：我也很怕，但我尽力了。我一直没敢发。"',
            en: '"Actually… I want to tell my mom: I\'m scared too, but I gave it everything. I just never dared to send it."',
          },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }, { type: 'flag', key: 'msg', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'hide',
          label: {
            zh: '"算了。说了她更担心。我自己扛。"',
            en: '"Forget it. Telling her just makes her worry more. I\'ll carry it myself."',
          },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'gate_grace',
        },
      ],
    },

    gate_grace: {
      kind: 'branch',
      branches: [
        { when: { type: 'or', any: [{ type: 'signalAtLeast', value: 60 }, { type: 'flagSet', key: 'engaged' }] }, goto: 'grace_in' },
      ],
      else: 'rocky_alone',
    },

    grace_in: {
      kind: 'scene',
      next: 'rocky_checklist',
      lines: [
        {
          speaker: 'rocky',
          text: { zh: '等。这个，船上有个人比我懂。他以前是老师。', en: 'Wait. This one, someone on the ship knows better than me. He used to be a teacher.' },
        },
        { speaker: 'rocky', text: { zh: '格雷斯！一个地球小孩，明天大考。', en: 'Grace! An Earth kid, big exam tomorrow.' } },
        {
          speaker: 'grace',
          text: { zh: '嘿，我是格雷斯。我以前在地球教初中。送过好多届学生进考场。', en: 'Hey, I\'m Grace. I taught middle school back on Earth. Sent class after class off to their big exams.' },
        },
        {
          speaker: 'grace',
          text: { zh: '跟你说个真话：那个分数，几年后你大概率想不起来具体是多少。我教过的孩子，没一个记得清。', en: 'Here\'s the honest truth: that score? A few years from now you almost certainly won\'t remember the exact number. Not one kid I taught ever does.' },
        },
        {
          speaker: 'grace',
          text: { zh: '但"你今晚怎么对待这个害怕的自己"——这个会留下来。会变成你以后扛事的方式。', en: 'But how you treat this scared version of yourself tonight — that stays. It becomes the way you\'ll carry hard things later.' },
        },
        {
          speaker: 'grace',
          text: { zh: '所以别跟自己打架了。明天好好考，今晚好好睡。去吧。', en: 'So stop fighting yourself. Do your best tomorrow, sleep well tonight. Go on.' },
        },
        { speaker: 'rocky', text: { zh: '格雷斯说得好。我记下来了。', en: 'Grace says it well. I logged it.' } },
      ],
    },

    rocky_alone: {
      kind: 'scene',
      next: 'rocky_checklist',
      lines: [
        { speaker: 'rocky', text: { zh: '说个尺度的事。', en: 'Let me tell you something about scale.' } },
        {
          speaker: 'rocky',
          text: { zh: '我的船，23 个。死了 22 个。不公平。宇宙不按谁能控制的曲线，打分。', en: 'My ships, 23. Twenty-two died. Not fair. The universe does not grade on a curve anyone controls.' },
        },
        {
          speaker: 'rocky',
          text: { zh: '我没法选那个结果。我只能选：活下来的，接着做下一件事。', en: 'I could not choose that result. I could only choose: the one that survives, does the next thing.' },
        },
        {
          speaker: 'rocky',
          text: { zh: '你明天也一样。考题你控制不了。能控制的，是带一个睡够的脑子，去做你会做的那些。', en: 'Tomorrow, same for you. The questions you do not control. What you control is bringing a brain that slept, to do the parts you can do.' },
        },
      ],
    },

    rocky_checklist: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: { zh: '现在，发射前检查单。', en: 'Now. Pre-launch checklist.' }, revealCardId: 'card_cl_rest' },
        {
          speaker: 'rocky',
          text: { zh: '铅笔，削好。准考证，放门口。闹钟，定两个。去考场的路，想一遍。', en: 'Pencils, sharpened. Admission ticket, by the door. Alarms, set two. The route to the hall, run it once in your head.' },
        },
        { speaker: 'rocky', text: { zh: '然后——最后一件事，是睡。', en: 'Then — last thing, sleep.' } },
        {
          speaker: 'rocky',
          text: { zh: '你睡。人类不睡，不能正常运转。这是工程事实。', en: 'You sleep. A human that does not sleep cannot run right. This is engineering fact.' },
        },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: {
        zh: '（窗外很静。你的呼吸，慢下来了一点。）',
        en: '(Outside the window it\'s quiet. Your breathing has slowed, a little.)',
      },
      options: [
        {
          id: 'checklist',
          label: {
            zh: '"……好。我去把笔和准考证收好，定好闹钟。"',
            en: '"…Okay. I\'ll put my pencils and ticket together, set the alarms."',
          },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'send_now',
          label: {
            zh: '"我现在就给我妈发那条消息。趁我还有勇气。"',
            en: '"I\'m sending my mom that message right now. While I still have the nerve."',
          },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'msg', value: true }],
          next: 'end_main',
        },
        {
          id: 'milk',
          label: {
            zh: '"我把这杯牛奶喝了……就睡。"',
            en: '"I\'ll drink this milk… and then sleep."',
          },
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'cl_end',
      lines: [
        { speaker: 'rocky', text: { zh: '好。', en: 'Good.' } },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'msg' },
          lines: [
            {
              speaker: 'narrator',
              text: { zh: '你按下了发送。"妈，我有点怕，但我尽力了。明天我会好好考。"', en: 'You hit send. "Mom, I\'m a little scared, but I gave it my all. I\'ll do my best tomorrow."' },
            },
            {
              speaker: 'narrator',
              text: { zh: '三秒后，对话框跳出一行字："傻孩子，睡吧，妈在。"', en: 'Three seconds later a line pops up in the chat: "Silly kid. Sleep now. Mom\'s here."' },
            },
          ],
        },
        {
          when: { type: 'and', all: [{ type: 'flagSet', key: 'agency' }, { type: 'not', cond: { type: 'flagSet', key: 'msg' } }] },
          lines: [
            {
              speaker: 'narrator',
              text: { zh: '你削好了两支笔，把准考证放进透明袋，端起那杯凉牛奶，一口喝完。', en: 'You sharpen two pencils, slide your admission ticket into the clear pouch, lift the cold milk, and drink it down in one go.' },
            },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '好好好。声音不抖了。准备好了。', en: 'Good good good. Voice not shaking now. Ready.' } },
            {
              speaker: 'rocky',
              text: { zh: '去睡，漏水的太空团子。该做的检查，都做完了。明天，倒计时归零，发射。', en: 'Go sleep, leaky space blob. The checks that needed doing are done. Tomorrow, the countdown hits zero. Launch.' },
            },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '去睡。明天，一道题一道题做。', en: 'Go sleep. Tomorrow, one question at a time.' } },
            {
              speaker: 'narrator',
              text: { zh: '你没说太多，轻轻关了灯。黑暗里，倒计时那张"1"，也看不见了。', en: 'You don\'t say much, just switch off the light. In the dark, even that countdown "1" is gone from sight.' },
            },
          ],
        },
      ],
    },
  },
};
