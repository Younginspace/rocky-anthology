import type { Episode } from '../../engine/types';

/**
 * ep11 ·《小名》· 沈知 — 照顾患阿尔茨海默症父亲的子女。
 *
 * STRUCTURAL BREAK (deliberate de-同构): unlike the other ten, Rocky does NOT
 * hand over a fix-it action — because this system cannot be repaired. He says
 * so plainly. The "next step" here is not a fix but a presence: do one last
 * complete read, and accept that tonight nothing can be fixed — and that's ok.
 */
export const ep11: Episode = {
  id: 'ep11',
  order: 11,
  title: { zh: '小名', en: 'The Nickname' },
  subtitle: { zh: '沈知 · 父亲在一点点忘记', en: 'Shen Zhi · a father, forgetting' },
  theme: { zh: '当至亲的记忆，正在你面前一点点丢失', en: 'When someone you love is losing their memory, right in front of you' },
  caller: {
    id: 'shen_zhi',
    handle: 'SZ-1121',
    realName: { zh: '沈知', en: 'Shen Zhi' },
    age: 39,
    location: { zh: '父母的老房子 · 厨房', en: "Their parents' old apartment · the kitchen" },
    tagline: { zh: '陪着一个一点点忘记的父亲', en: 'Looking after a father who is, little by little, forgetting' },
    reason: {
      zh: '深夜，父亲又一次起床，问"你是谁"。可几分钟后，他叫出了你的小名。',
      en: 'Late at night, your father got up again and asked, "Who are you?" Then a few minutes later, he called you by your childhood nickname.',
    },
    outcomeShort: {
      zh: '他没有"想通"。但那天起，他不再急着纠正父亲——他把每一个今天，完整地陪完。',
      en: 'He did not "make peace" with it. But from that day on, he stopped rushing to correct his father — he stayed with each today, all the way through.',
    },
    morningBeat: {
      zh: '沈知给父亲剥了一个橘子。父亲又叫错了名字，他没纠正——应了那个名字，陪他在窗边坐了一上午。',
      en: 'Shen Zhi peels an orange for his father. His father gets the name wrong again; he does not correct it — he answers to the name, and sits with him by the window all morning.',
    },
    accent: 'rose',
  },
  cards: [
    {
      id: 'card_sz_decode',
      episodeId: 'ep11',
      speaker: 'rocky',
      text: {
        zh: '你父亲的备份，在你脑子里。原件在退化。你不是在挽留原件——你是在做最后一次，完整的读取。',
        en: "Your father's backup is in your head. The original is degrading. You are not saving the original — you are doing one last, complete read.",
      },
    },
    {
      id: 'card_sz_slow',
      episodeId: 'ep11',
      speaker: 'grace',
      text: {
        zh: '有的告别是慢的。慢，也是告别。陪着——就是在这场告别里，没有缺席。',
        en: 'Some goodbyes are slow. Slow is still a goodbye. Staying with it — that is being present for the goodbye, not absent from it.',
      },
    },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: { zh: '〔星际通讯线 · ERID↔地球〕今晚第 51 通来电', en: '[INTERSTELLAR LINE · ERID↔EARTH] Call #51 tonight' }, stage: { zh: '信号建立中…', en: 'establishing link…' } },
        { speaker: 'narrator', text: { zh: '凌晨三点。父母老房子的厨房，只开了油烟机的小灯。', en: '3 a.m. The kitchen of your parents’ old apartment, lit only by the little bulb over the stove.' } },
        { speaker: 'narrator', text: { zh: '半小时前，父亲又起床了，站在你面前，很客气地问："你是谁？"', en: 'Half an hour ago your father got up again, stood in front of you, and asked, very politely: "Who are you?"' } },
        { speaker: 'narrator', text: { zh: '你刚把他哄回床。临睡前，他忽然叫了你的小名——那个只有小时候，他才会叫的名字。', en: 'You just settled him back into bed. Right before he drifted off, he suddenly called you by your childhood nickname — the one only he ever used, when you were small.' } },
        { speaker: 'narrator', text: { zh: '你站在厨房，不知道是该高兴，还是该哭。', en: 'You stand in the kitchen, not sure whether to be glad or to cry.' } },
        { speaker: 'narrator', text: { zh: '你点开那个存了很久的链接。据说，那头是个见过很多告别的人。', en: 'You open a link you saved a long time ago. They say the one on the other end has seen a lot of goodbyes.' } },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: { zh: '● 信号接通 · 延迟 4.2 秒', en: '● SIGNAL LIVE · DELAY 4.2s' }, stage: { zh: '', en: '' } },
        { speaker: 'rocky', text: { zh: '接通。一个人类。声音很轻。怕吵醒谁，推测。', en: 'Connected. One human. Voice very soft. Afraid to wake someone, I estimate.' } },
        { speaker: 'rocky', text: { zh: '我是 Rocky。深夜。说。', en: 'I am Rocky. Deep night. Speak.' } },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: { zh: '（你压低了声音。）', en: '(You keep your voice down.)' },
      options: [
        {
          id: 'admit',
          label: { zh: '"我爸……病了。他在一点点忘事。今晚他问我是谁，可又叫得出我小名。"', en: '"My dad… he\'s sick. He\'s losing things, piece by piece. Tonight he asked who I was — but he could still say my nickname."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'deflect',
          label: { zh: '"没什么。就是半夜睡不着，找个人说说话。"', en: '"It\'s nothing. Just can\'t sleep, wanted someone to talk to."' },
          effects: [{ type: 'signal', delta: 3 }],
          next: 'rocky_listen',
        },
        {
          id: 'ask',
          label: { zh: '"你失去过同伴吗？我是说……眼看着，没办法的那种。"', en: '"Have you ever lost someone? I mean… watched it happen, with nothing you could do."' },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: { zh: '失去同伴。是。我船上 23 个。到这里，活 1 个。这个我懂。', en: 'Lost crew. Yes. My ship, 23. Here, 1 alive. This I understand.' } },
        { speaker: 'rocky', text: { zh: '但你说的，不一样。你父亲，还在。只是……在退。我先听。', en: 'But yours is different. Your father, still here. Only… receding. Let me listen first.' } },
        { speaker: 'rocky', text: { zh: '告诉我。最难的，是哪一下。', en: 'Tell me. The hardest part — which moment.' } },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: { zh: '（你想了想，喉咙发紧。）', en: '(You think for a moment. Your throat tightens.)' },
      options: [
        {
          id: 'erasing',
          label: { zh: '"他在一格一格地消失。我每天都在认一个，越来越陌生的人。"', en: '"He\'s disappearing one square at a time. Every day I\'m meeting a man who\'s a little more of a stranger."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_unpack',
        },
        {
          id: 'tired',
          label: { zh: '"我好累。每天纠正他、看着他怕、装作没事。我都不敢说我累。"', en: '"I\'m so tired. Correcting him, watching him be scared, pretending I\'m fine. I don\'t even dare say I\'m tired."' },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'tired', value: true }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_unpack',
        },
        {
          id: 'fear',
          label: { zh: '"我怕有一天，他彻底不认得我了。我怕那一天，比怕他走还怕。"', en: '"I\'m afraid of the day he won\'t know me at all. I fear that day more than I fear losing him."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'fear', value: true }],
          next: 'rocky_unpack',
        },
      ],
    },

    // The structural break: Rocky runs the engineer pipeline, then refuses to
    // pretend it's fixable. He says so. That honesty is the whole episode.
    rocky_unpack: {
      kind: 'scene',
      next: 'rocky_nofix',
      lines: [
        { speaker: 'rocky', text: { zh: '我按我的方式理解一下。你父亲，是一个存储。几十年的东西，存在里面。', en: 'Let me understand it my way. Your father is a store of memory. Decades of things, kept inside.' } },
        { speaker: 'rocky', text: { zh: '现在，存储在退化。一块一块，读不出来了。这个过程，叫……丢失。', en: 'Now the store is degrading. Block by block, it can no longer be read. This process is called… loss.' } },
      ],
    },

    rocky_nofix: {
      kind: 'scene',
      next: 'rocky_question',
      lines: [
        { speaker: 'rocky', text: { zh: '我是工程师。每次，我都想修。', en: 'I am engineer. Every time, I want to repair it.' } },
        { speaker: 'rocky', text: { zh: '这一个……我修不好。我看了。没有办法。我不骗你说有。', en: 'This one… I cannot repair. I looked. There is no way. I will not lie to you that there is.' } },
        { speaker: 'rocky', text: { zh: '坏。坏坏。这种坏，工程师也只能站着，看着。', en: 'Bad. Bad bad. This kind of bad — even an engineer can only stand, and watch.' } },
        { speaker: 'caller', text: { zh: '……所以你也没办法。', en: '…So even you can\'t do anything.' } },
        { speaker: 'rocky', text: { zh: '修，没办法。但还有一件，不是修，是别的。听。', en: 'To repair — no. But there is one thing that is not repair. Something else. Listen.' } },
      ],
    },

    rocky_question: {
      kind: 'scene',
      next: 'q_remember',
      lines: [
        { speaker: 'rocky', text: { zh: '原件在退。但每次他叫你小名，每次他想起一件事——那一下，还能读。', en: 'The original is fading. But every time he says your nickname, every time he remembers something — in that moment, it can still be read.' } },
        { speaker: 'rocky', text: { zh: '趁还能读。你想读什么，问号。', en: 'While it can still be read. What do you want to read. Question.' } },
      ],
    },

    q_remember: {
      kind: 'choice',
      choiceId: 'q_remember',
      prompt: { zh: '（你忽然想起了什么。）', en: '(Something comes back to you.)' },
      options: [
        {
          id: 'nickname',
          label: { zh: '"……那个小名。是我妈走那年，他开始叫的。别的都忘了，这个还在。"', en: '"…That nickname. He started using it the year my mom passed. He\'s forgotten everything else, but that one\'s still there."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'nickname', value: true }, { type: 'flag', key: 'engaged', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'hands',
          label: { zh: '"他修了一辈子东西。手还记得。给他一个螺丝刀，他就安静了。"', en: '"He fixed things his whole life. His hands still remember. Give him a screwdriver and he goes calm."' },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'blank',
          label: { zh: '"我不知道。我一直在害怕失去，没敢好好看他现在还剩什么。"', en: '"I don\'t know. I\'ve been so busy dreading the loss, I never dared look at what\'s still left of him."' },
          effects: [{ type: 'signal', delta: 8 }],
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
      next: 'rocky_decode',
      lines: [
        { speaker: 'rocky', text: { zh: '等。这个，格雷斯比我懂。他也告别过一整颗星球。', en: 'Wait. This — Grace understands better than me. He, too, said goodbye to a whole planet.' } },
        { speaker: 'rocky', text: { zh: '格雷斯！一个地球人，父亲在慢慢忘记他。', en: 'Grace! A human from Earth — his father is slowly forgetting him.' } },
        { speaker: 'grace', text: { zh: '嘿，我是格雷斯。我离开地球，就再没回去过。我没能跟任何人，好好告别。', en: "Hey, I'm Grace. I left Earth and never went back. I never got to say a proper goodbye to anyone." } },
        { speaker: 'grace', text: { zh: '你比我幸运——你的告别是慢的。慢得让人难熬，但它给了你时间。', en: 'You\'re luckier than I was — your goodbye is slow. Slow enough to be unbearable. But it gives you time.' } },
        { speaker: 'grace', text: { zh: '别把这段时间，全花在害怕"那一天"上。陪着，就是在这场告别里，没有缺席。', en: "Don't spend all that time bracing for \"the day.\" Staying with him — that's being present for the goodbye, not absent from it." } },
        { speaker: 'grace', text: { zh: '好了，我去看看仪器。沈知，他叫错你名字的时候，别急着纠正。应一声就好。', en: "Okay, I'll go check the instruments. Shen Zhi — when he gets your name wrong, don't rush to correct him. Just answer to it." } },
        { speaker: 'rocky', text: { zh: '格雷斯每次都这样。说完最重的，就走。', en: 'Grace always does this. Says the heaviest thing, then leaves.' } },
      ],
    },

    rocky_solo: {
      kind: 'scene',
      next: 'rocky_decode',
      lines: [
        { speaker: 'rocky', text: { zh: '我说个我学到的。失去 22 个同伴，我学到一件事。', en: 'I tell you something I learned. Losing 22 crew, I learned one thing.' } },
        { speaker: 'rocky', text: { zh: '我没法救他们。但我记得他们。记得，是活着的人，唯一能做的事。', en: 'I could not save them. But I remember them. Remembering is the one thing the living can do.' } },
        { speaker: 'rocky', text: { zh: '你父亲还在。趁还在，多记一点他。这个，比纠正他，重要。', en: 'Your father is still here. While he is, remember more of him. This matters more than correcting him.' } },
      ],
    },

    rocky_decode: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: { zh: '还有一句。换我工程师的说法。', en: 'One more thing. In my engineer words.' }, revealCardId: 'card_sz_decode' },
        { speaker: 'rocky', text: { zh: '你父亲的备份，在你脑子里。原件在退化。', en: "Your father's backup is in your head. The original is degrading." } },
        { speaker: 'rocky', text: { zh: '你不是在挽留原件——你做不到。你是在做最后一次，完整的读取。', en: 'You are not saving the original — you cannot. You are doing one last, complete read.' } },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: { zh: '（厨房很静。你听见卧室里，父亲均匀的呼吸。）', en: "(The kitchen is quiet. From the bedroom, you can hear your father's steady breathing.)" },
      options: [
        {
          id: 'stop_correcting',
          label: { zh: '"明天起，他叫我什么，我就应什么。我不纠正他了。"', en: '"From tomorrow, whatever he calls me, I\'ll answer to it. I\'ll stop correcting him."' },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }, { type: 'flag', key: 'answer', value: true }],
          next: 'end_main',
        },
        {
          id: 'record',
          label: { zh: '"我想把他还记得的事，录下来。趁还读得出。"', en: '"I want to record the things he still remembers. While they can still be read."' },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }, { type: 'flag', key: 'record', value: true }],
          next: 'end_main',
        },
        {
          id: 'just_be',
          label: { zh: '"今晚我什么都做不了。但我能在。我就……多陪他坐会儿。"', en: '"Tonight I can\'t do anything. But I can be here. I\'ll just… sit with him a while longer."' },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'agency', value: true }, { type: 'flag', key: 'beipresent', value: true }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'sz_end',
      lines: [
        { speaker: 'rocky', text: { zh: '好。', en: 'Good.' } },
        { speaker: 'rocky', text: { zh: '今晚，没有修好任何东西。陈述。', en: 'Tonight, nothing was repaired. Statement.' } },
        { speaker: 'rocky', text: { zh: '但你不再只是害怕了。你开始读了。那不是失败。那很重要。', en: "But you're no longer only afraid. You started reading. That is not failure. That matters." } },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'answer' },
          lines: [
            { speaker: 'narrator', text: { zh: '你轻轻推开卧室门。父亲睡着了，眉头是松的。明天他若再叫错名字，你想，你会笑着应下。', en: "You ease the bedroom door open. Your father is asleep, his brow soft. Tomorrow, if he gets your name wrong again — you think you'll smile, and answer to it." } },
          ],
        },
        {
          when: { type: 'flagSet', key: 'record' },
          lines: [
            { speaker: 'narrator', text: { zh: '你打开手机的录音。明天，趁他清醒的那阵，你想请他再讲一遍你小时候的事。', en: "You open the voice recorder on your phone. Tomorrow, in his clear hour, you want to ask him to tell you about your childhood, one more time." } },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '去陪他。读慢一点。读到的每一段，都存进你这台机器里。', en: 'Go be with him. Read slowly. Every passage you read, save into your machine — you.' } },
            { speaker: 'rocky', text: { zh: '等原件读不出了，备份还在。在你这儿。这条线，也还在。', en: "When the original can't be read anymore, the backup remains. With you. And this line — it remains too." } },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '我修不好它。但你今晚做的，是对的。', en: "I can't repair it. But what you did tonight is right." } },
            { speaker: 'narrator', text: { zh: '你没说太多。你走回卧室，在父亲床边的椅子上，轻轻坐下。', en: 'You don\'t say much. You walk back to the bedroom and sit down, gently, in the chair beside your father\'s bed.' } },
          ],
        },
      ],
    },
  },
};
