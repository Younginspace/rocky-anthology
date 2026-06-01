import type { Episode } from '../../engine/types';

/**
 * ep04 ·《看不见的工程》· 周敏 — 全职妈妈 / 怀疑当初辞职带娃。
 *
 * Follows ep01 shape:
 *  - opening scene (system + narrator sets the night; cross-call trace)
 *  - connect → first stance choice
 *  - Rocky runs the engineer pipeline: observe → misunderstand
 *    ("全职妈妈=没在工作"，强烈反对) → ask data → reduce to constraints
 *    (生命维持系统 / load-bearing) → one small action
 *  - Grace gate: or(signalAtLeast 60, flagSet 'engaged')
 *  - one ending node + warm / quiet / agency variants
 *  - exactly 2 wisdom cards on reachable spine scenes
 */
export const ep04: Episode = {
  id: 'ep04',
  order: 4,
  title: { zh: '看不见的工程', en: 'The Invisible Engineering' },
  subtitle: { zh: '周敏 · 全职妈妈 / 怀疑当初辞职带娃', en: 'Zhou Min · Full-time mom, second-guessing the day she quit' },
  theme: { zh: '当你做的事没人看见，你开始怀疑自己是不是废了', en: 'When no one sees the work you do, you start to wonder if you have gone to waste' },
  caller: {
    id: 'zhou_min',
    handle: 'ZM-1119',
    realName: { zh: '周敏', en: 'Zhou Min' },
    age: 34,
    location: { zh: '某省会城市 · 三居室 · 儿童房隔壁的厨房', en: 'A provincial capital · three-bedroom flat · the kitchen next to the nursery' },
    tagline: { zh: '为娃辞职三年，简历空着，老同学一个个升了职', en: 'Quit for the kid three years ago. Résumé still blank. Old classmates getting promoted, one by one.' },
    reason: { zh: '快十二点，娃终于睡了。厨房的碗还堆着。她刷到老同学升职的朋友圈，突然不知道自己这三年算什么。', en: 'Nearly midnight. The kid is finally asleep. Dishes still stacked in the kitchen. She scrolls past an old classmate’s promotion post on the feed, and suddenly has no idea what these three years even count for.' },
    outcomeShort: { zh: '她没立刻"想通"。但那天之后，她在那张空白简历上，认真写下了第一行字。', en: 'She did not suddenly "see the light." But after that night, on that blank résumé, she carefully wrote the first line.' },
    morningBeat: { zh: '周敏趁娃午睡，没去收厨房——她泡了杯还烫的茶，坐下，给自己留了二十分钟。只属于她的。', en: 'While the kid naps, Zhou Min skips the kitchen. She brews a cup of tea, still steaming, sits down, and gives herself twenty minutes. Hers alone.' },
    accent: 'rose',
  },
  cards: [
    { id: 'card_zm_lifesupport', episodeId: 'ep04', speaker: 'rocky', text: { zh: '生命维持。最难的系统。没人鼓掌。船还是靠它飞。', en: 'Life support. The hardest system. No one claps. The ship still flies because of it.' } },
    { id: 'card_zm_loadbearing', episodeId: 'ep04', speaker: 'rocky', text: { zh: '没人看见的，常常是承重的。拆掉才知道。', en: 'What no one sees is often load-bearing. You only find out when you remove it.' } },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: { zh: '〔星际通讯线 · ERID↔地球〕今晚第 6 通来电', en: '[INTERSTELLAR LINE · ERID↔EARTH] Call #6 tonight' }, stage: { zh: '信号建立中…', en: 'establishing link…' } },
        { speaker: 'narrator', text: { zh: '快十二点了。娃终于睡熟，呼吸均匀。你不敢翻身。', en: 'Nearly midnight. The kid is finally deep asleep, breathing even. You don’t dare turn over.' } },
        { speaker: 'narrator', text: { zh: '厨房的灯还亮着。水池里堆着晚饭的碗，奶瓶泡在水里。明天的事，明天再说。', en: 'The kitchen light is still on. Dinner dishes pile in the sink, a bottle soaking in the water. Tomorrow’s mess can wait for tomorrow.' } },
        { speaker: 'narrator', text: { zh: '手机屏幕亮着，是老同学的朋友圈："正式升任部门负责人，感谢团队。"配图是一束花。', en: 'Your phone glows: an old classmate’s post on the feed. "Officially named department head. Thanks to the team." Beneath it, a photo of a bouquet.' } },
        { speaker: 'narrator', text: { zh: '你翻自己的相册。三年了，几千张照片里，没有一张是你自己——全是娃。微信名还停在产检那阵改的那个。', en: 'You scroll your own camera roll. Three years, thousands of photos, and not one is of you — all of them the kid. Your handle is still the one you changed back during the prenatal checkups.' } },
        { speaker: 'narrator', text: { zh: '前同事的群，热闹得插不上话。你上周悄悄退了，没人发现。', en: 'Your old coworkers’ group chat is too lively to break into. You quietly left it last week. No one noticed.' } },
        { speaker: 'narrator', text: { zh: '你也不知道该找谁说。手指点开了这条不知道哪天存下的链接。', en: 'You don’t even know who to tell. Your finger taps a link you saved some day you can’t remember.' } },
        { speaker: 'narrator', text: { zh: '拨号音很长。比一般的电话长得多。', en: 'The dial tone is long. Much longer than an ordinary call.' } },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: { zh: '● 信号接通 · 延迟 4.2 秒', en: '● SIGNAL LIVE · DELAY 4.2s' }, stage: { zh: '', en: '' } },
        { speaker: 'rocky', text: { zh: '接通。一个地球信号。', en: 'Connected. One Earth signal.' } },
        { speaker: 'rocky', text: { zh: '一个人类。累。声音压得很低。怕吵醒什么。', en: 'One human. Tired. Voice pressed down low. Afraid to wake something.' } },
        { speaker: 'rocky', text: { zh: '我是 Rocky。你找格雷斯的朋友，问号。', en: 'I am Rocky. You look for the friend of Grace. Question.' } },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: { zh: '（电话那头真的有人。你压低声音，喉咙有点紧。）', en: '(There really is someone on the other end. You lower your voice. Your throat is tight.)' },
      options: [
        {
          id: 'admit',
          label: { zh: '"对不起这么晚……我就是，突然不知道自己这几年在干嘛。想找个人说话。"', en: '"Sorry it’s so late… I just — I suddenly don’t know what I’ve been doing all these years. I needed someone to talk to."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'small',
          label: { zh: '"没事，我小声点。娃刚睡。我也没什么大事……就是睡不着。"', en: '"It’s fine, I’ll keep it down. The kid just fell asleep. Nothing’s really wrong with me… I just can’t sleep."' },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'rocky_listen',
        },
        {
          id: 'guard',
          label: { zh: '"我一个带孩子的，能有什么事。你们这种线，聊的应该都是大人物吧。"', en: '"I’m just someone raising a kid, what could I possibly have to say. A line like this, you must only talk to important people."' },
          effects: [{ type: 'signal', delta: 2 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: { zh: '大人物。这个词我不懂。这条线，不挑。', en: 'Important people. I do not understand this word. This line does not pick.' } },
        { speaker: 'rocky', text: { zh: '我听你声音。不是没事。像一个系统，跑了很久，没停过。没人来读它的数据。', en: 'I hear your voice. It is not nothing. Like a system. Run a long time. Never stopped. No one comes to read its data.' } },
        { speaker: 'rocky', text: { zh: '我是工程师。这种系统，我熟。', en: 'I am engineer. This kind of system, I know it.' } },
        { speaker: 'rocky', text: { zh: '说。什么压着你。', en: 'Speak. What presses on you.' } },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: { zh: '（你看了一眼隔壁房间的门，又看了眼手机相册里那个三年没出现过自己的你。）', en: '(You glance at the door of the next room, then at a camera roll where you haven’t appeared in three years.)' },
      options: [
        {
          id: 'wasted',
          label: { zh: '"我为了带娃辞了职。三年了。简历空着。我是不是……把自己弄丢了，废了。"', en: '"I quit my job to raise the kid. Three years. My résumé’s blank. Did I… lose myself? Go to waste?"' },
          effects: [{ type: 'signal', delta: 10 }],
          next: 'rocky_refuse',
        },
        {
          id: 'unseen',
          label: { zh: '"我每天忙到半夜，可好像没人觉得我在干活。在家嘛，能叫工作？"', en: '"I’m busy until midnight every day, but it’s like no one thinks I’m working. Staying home — does that even count as work?"' },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'unseen', value: true }],
          next: 'rocky_refuse',
        },
        {
          id: 'regret',
          label: { zh: '"……有时候我会后悔。然后又特别恨自己怎么能后悔。我不该这么想的。"', en: '"…Sometimes I regret it. And then I hate myself for being able to regret it at all. I shouldn’t think this way."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_refuse',
        },
      ],
    },

    rocky_refuse: {
      kind: 'scene',
      next: 'q_data',
      lines: [
        { speaker: 'rocky', text: { zh: '停。一个词，我要纠正。"没在工作"。错。严重错。我反对。', en: 'Stop. One word, I must correct. "Not working." Wrong. Very wrong. I object.' } },
        { speaker: 'rocky', text: { zh: '你在维持一个生命活着。让它每天醒来，吃饱，安全，不出故障。在我这儿，那有名字。生命维持系统。船上最难的工程。', en: 'You keep a life alive. Make it wake every day. Fed. Safe. No failure. Where I come from, that has a name. Life support system. The hardest engineering on the ship.' } },
        { speaker: 'rocky', text: { zh: '整艘船，我一个人扛过。后来格雷斯来——他是人类，脆。氧气、压力、温度，全要为他单独搭一套。一刻不能停。', en: 'The whole ship, I carried alone. Then Grace came — he is human, fragile. Oxygen, pressure, temperature, all built separate, just for him. Never stop for one moment.' } },
        { speaker: 'rocky', text: { zh: '从来没人为这个鼓掌。它不出事，就好像不存在。可它一停，三分钟，人就死。', en: 'No one ever claps for this. When it does not fail, it is as if it does not exist. But it stops, three minutes, the human is dead.' }, revealCardId: 'card_zm_lifesupport' },
        { speaker: 'rocky', text: { zh: '我需要数据。你一天，做多少个这种决定。', en: 'I need data. In one day, how many such decisions do you make.' } },
      ],
    },

    q_data: {
      kind: 'choice',
      choiceId: 'q_data',
      prompt: { zh: '（你愣了一下。从没人把这些当成"决定"过，连你自己都没有。）', en: '(You freeze. No one ever called these things "decisions" before — not even you.)' },
      options: [
        {
          id: 'count',
          label: { zh: '"……数不清。几点吃饭、烧到几度去医院、两个娃同时哭先管哪个……一整天都在判断。"', en: '"…Can’t count them. When to feed him, what fever sends us to the hospital, which kid to handle first when both cry at once… I’m making calls all day long."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_loadbearing',
        },
        {
          id: 'crisis',
          label: { zh: '"昨天他发高烧，我一边查药量一边哄他一边联系医生，手都在抖，但没乱。"', en: '"Yesterday he spiked a fever — I was checking the dose, soothing him, and calling the doctor all at once. My hands shook, but I didn’t panic."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_loadbearing',
        },
        {
          id: 'shrug',
          label: { zh: '"就……一些鸡毛蒜皮的小事吧。当妈的都这样，没什么特别的。"', en: '"Just… a bunch of trivial little things, I guess. Every mom does this. Nothing special."' },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'rocky_loadbearing',
        },
      ],
    },

    rocky_loadbearing: {
      kind: 'scene',
      next: 'gate_grace',
      lines: [
        { speaker: 'rocky', text: { zh: '鸡毛蒜皮。这个说法，我不接受。', en: 'Trivial little things. This phrase, I do not accept.' } },
        { speaker: 'rocky', text: { zh: '你刚说的，那是调度。是危机处理。是在崩溃边缘，还能让一个系统正常运转。', en: 'What you just said, that is scheduling. That is crisis handling. That is keeping a system running, right at the edge of collapse.' } },
        { speaker: 'rocky', text: { zh: '我做了一辈子工程。这几样，最难学。机器到现在都做不好。', en: 'I do engineering my whole life. These few things, hardest to learn. The machine still cannot do them well.' } },
        { speaker: 'rocky', text: { zh: '一个结构里，有的梁很显眼。有的梁藏在墙里，没人看。', en: 'In a structure, some beams are easy to see. Some beams are inside the wall. No one looks.' }, revealCardId: 'card_zm_loadbearing' },
        { speaker: 'rocky', text: { zh: '没人看见的，常常是承重的。拆掉才知道。', en: 'What no one sees is often load-bearing. You only find out when you remove it.' } },
        { speaker: 'rocky', text: { zh: '你不是空白。你是那根藏在墙里的梁。', en: 'You are not blank. You are the beam inside the wall.' } },
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
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: { zh: '等一下。这件事，船上有个人，比我更有资格说。', en: 'Wait. On this, there is someone on the ship more qualified than me to speak.' } },
        { speaker: 'rocky', text: { zh: '格雷斯！过来。一个地球人，做着没人看见的工。', en: 'Grace! Come here. An Earth person. Doing work no one sees.' } },
        { speaker: 'grace', text: { zh: '嘿。我是格雷斯。', en: 'Hey. I’m Grace.' } },
        { speaker: 'grace', text: { zh: '我现在能在这颗星球上活着——呼吸、吃饭、晒到一点光——是因为有人每天在做所有看不见的维持。这些事，我大半都没注意到。', en: 'The only reason I’m alive on this planet right now — breathing, eating, getting a little sunlight — is that someone does all the invisible upkeep every day. Most of it I never even noticed.' } },
        { speaker: 'grace', text: { zh: '我以前也以为，被看见的、有头衔的，才叫重要。后来我才懂：被忽视，不等于不重要。常常正相反。', en: 'I used to think only the seen things, the ones with titles, were the important ones. Then I learned: being overlooked doesn’t mean you don’t matter. Often it’s the opposite.' } },
        { speaker: 'grace', text: { zh: '你这三年没有消失。你只是去做了那种，事后才会被算清楚的工作。', en: 'You didn’t disappear these three years. You just went and did the kind of work that only gets counted up afterward.' } },
        { speaker: 'grace', text: { zh: '好了，我去看仪器了。Rocky，让她喝口水，别光顾着说。', en: 'Okay, I’m off to check the instruments. Rocky — get her to drink some water, don’t just talk her ear off.' } },
        { speaker: 'rocky', text: { zh: '我记下了。陈述。', en: 'I record it. Statement.' } },
        { speaker: 'rocky', text: { zh: '所以。回到你。我不替你说"带娃最伟大"——那种话太轻，承不了重。', en: 'So. Back to you. I do not say for you "raising a child is the greatest thing" — that talk is too light. It carries no load.' } },
        { speaker: 'rocky', text: { zh: '我只说工程：保住一个生命活着，那是任务本身。不是脚注。', en: 'I only say engineering. Keeping one life alive, that is the mission itself. Not a footnote.' } },
        { speaker: 'rocky', text: { zh: '现在，给你一个小测试。今晚就做得到的那种。', en: 'Now. A small test for you. The kind you can do tonight.' } },
      ],
    },

    rocky_solo: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: { zh: '我再说一件，我自己的事。', en: 'I say one more thing. My own.' } },
        { speaker: 'rocky', text: { zh: '我的船，23 个 Eridian。到这里，活 1 个。我。', en: 'My ship. 23 Eridians. Reached here, 1 alive. Me.' } },
        { speaker: 'rocky', text: { zh: '那段时间，没有任务，没有掌声。只有维持。让自己活着，让船活着，一天，又一天。', en: 'In that time, no mission. No applause. Only upkeep. Keep myself alive. Keep the ship alive. One day. Then one more day.' } },
        { speaker: 'rocky', text: { zh: '那些日子，听起来像什么都没发生。可正是它们，把我撑到了能做事的那天。它们承了重。', en: 'Those days, they sound like nothing happened. But it was exactly them that carried me to the day I could do things. They were load-bearing.' } },
        { speaker: 'rocky', text: { zh: '所以。回到你。我不替你说"带娃最伟大"——那种话太轻，承不了重。', en: 'So. Back to you. I do not say for you "raising a child is the greatest thing" — that talk is too light. It carries no load.' } },
        { speaker: 'rocky', text: { zh: '我只说工程：保住一个生命活着，那是任务本身。不是脚注。', en: 'I only say engineering. Keeping one life alive, that is the mission itself. Not a footnote.' } },
        { speaker: 'rocky', text: { zh: '现在，给你一个小测试。今晚就做得到的那种。', en: 'Now. A small test for you. The kind you can do tonight.' } },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: { zh: '（厨房的碗还堆在那儿。但有什么，松动了一点点。）', en: '(The dishes are still stacked in the kitchen. But something has loosened, just a little.)' },
      options: [
        {
          id: 'resume',
          label: { zh: '"我想……在那栏空白的简历上，写下我这三年真正学会的一样硬本事。"', en: '"I want to… on that blank line of my résumé, write down one real, hard skill I actually learned these three years."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'twenty',
          label: { zh: '"我想今晚先不收拾了。给自己留二十分钟，做一件只属于我的事。"', en: '"I think I’ll leave the cleanup tonight. Give myself twenty minutes, do one thing that’s only mine."' },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'rest',
          label: { zh: '"……我先去睡吧。今天先到这儿，明天再说。"', en: '"…I think I’ll go to sleep. Enough for today. Tomorrow can wait."' },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'zm_end',
      lines: [
        { speaker: 'rocky', text: { zh: '好。', en: 'Good.' } },
        { speaker: 'narrator', text: { zh: '隔壁房间，娃翻了个身，又睡沉了。呼吸均匀。那是你维持着的声音。', en: 'In the next room the kid turns over and sinks back into sleep. Breathing even. That sound is one you keep alive.' } },
      ],
      variants: [
        {
          when: { type: 'flag', key: 'agency', equals: true },
          lines: [
            { speaker: 'narrator', text: { zh: '你没急着去收那堆碗。你把简历翻出来，光标停在那栏空白上。', en: 'You don’t rush to the dishes. You pull up the résumé, the cursor resting on that blank line.' } },
            { speaker: 'narrator', text: { zh: '你想了想这三年，然后认真敲下第一行字。不是"全职妈妈"四个字——是你真正学会的那样东西。', en: 'You think back over the three years, then carefully type the first line. Not the words "stay-at-home mom" — the thing you actually learned.' } },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '好好好。你声音，松回来一点了。', en: 'Good good good. Your voice, it loosened back a little.' } },
            { speaker: 'rocky', text: { zh: '去歇着。你维持的那个系统，今天运转得很好。包括你自己这一套。', en: 'Go rest. The system you keep, it ran well today. Including your own.' } },
            { speaker: 'rocky', text: { zh: '线一直开着。下次娃睡了，还能打来。', en: 'The line stays open. Next time the kid sleeps, you can call.' } },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '我不多说。', en: 'I do not say much.' } },
            { speaker: 'rocky', text: { zh: '去睡。明天，记得：你不是空白。一天，一根梁。', en: 'Go sleep. Tomorrow, remember: you are not blank. One day, one beam.' } },
            { speaker: 'narrator', text: { zh: '你没说太多。但挂电话前，你轻轻"嗯"了一声。然后关掉厨房的灯——明天的事，明天再说。', en: 'You don’t say much. But before hanging up, you let out a quiet "mm." Then you switch off the kitchen light — tomorrow’s mess can wait for tomorrow.' } },
          ],
        },
      ],
    },
  },
};
