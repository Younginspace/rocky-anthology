import type { Episode } from '../../engine/types';

/**
 * ep09 ·《结构造完了，还在承重》· 高建国/老高 — 刚退休 / 失去"被需要"。
 *
 * Follows ep01 shape:
 *  - opening scene (system + narrator sets the night; cross-call trace)
 *  - connect → first stance choice
 *  - Rocky runs the engineer pipeline: observe → misunderstand
 *    ("退休=结构报废") → ask data → reduce to constraints
 *    (造完的结构仍在承重 / 被需要不是唯一的用，余量也是一种用) → one small action
 *  - Grace gate: or(signalAtLeast 60, flagSet 'engaged')
 *  - one ending node + warm / quiet / agency variants
 *  - exactly 2 wisdom cards on reachable spine scenes
 */
export const ep09: Episode = {
  id: 'ep09',
  order: 9,
  title: { zh: '那把二胡', en: 'The Erhu' },
  subtitle: { zh: '高建国 · 刚退休 / 失去"被需要"', en: 'Gao Jianguo · just retired / no longer needed' },
  theme: { zh: '当忙了一辈子的你，突然没人需要了', en: 'When you have been busy your whole life, and suddenly no one needs you' },
  caller: {
    id: 'gao_jianguo',
    handle: 'GJ-0631',
    realName: { zh: '高建国', en: 'Gao Jianguo' },
    age: 67,
    location: { zh: '某老工业城市 · 老房子 · 阳台上的旧躺椅', en: 'An old industrial city · an old apartment · a worn deck chair on the balcony' },
    tagline: { zh: '上个月刚退休，干了一辈子，孩子在外地，时间忽然空得发慌', en: 'Retired last month after a lifetime of work. His kid lives far away. Suddenly time gapes empty.' },
    reason: { zh: '退休第三周的深夜。屋里太静了。他翻出年轻时迷过的那本《挽救计划》，想起还有这么一条线。', en: 'Late on a night in his third week of retirement. The apartment is too quiet. He digs out the old copy of Project Hail Mary he loved as a young man, and remembers there was a line like this.' },
    outcomeShort: { zh: '他没有立刻"想通"。但那天之后，他给老徒弟打了个电话，把一件只有他知道的事讲了出去。', en: 'He did not suddenly "figure it out." But after that night, he called an old apprentice and passed on something only he knew.' },
    morningBeat: { zh: '高建国早早醒了，没像往常那样发愁这一天怎么打发——他翻出落灰多年的二胡，先擦了擦弦。', en: 'Gao Jianguo woke early. He did not, as usual, dread the long empty day — instead he dug out the erhu that had gathered dust for years, and wiped down the strings.' },
    accent: 'gold',
  },
  cards: [
    { id: 'card_gj_loadbearing', episodeId: 'ep09', speaker: 'rocky', text: { zh: '造完的结构，还在承重。撑着上面在盖的一切。', en: 'A finished structure still bears load. It holds up everything still being built on top of it.' } },
    { id: 'card_gj_redundancy', episodeId: 'ep09', speaker: 'rocky', text: { zh: '被需要，不是唯一的用。余量，也是一种用。', en: 'Being needed is not the only kind of use. Margin is a kind of use too.' } },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: { zh: '〔星际通讯线 · ERID↔地球〕今晚第 42 通来电', en: '[INTERSTELLAR LINE · ERID↔EARTH] Call #42 tonight' }, stage: { zh: '信号建立中…', en: 'establishing link…' } },
        { speaker: 'narrator', text: { zh: '深夜。退休第三周。屋里的钟摆声，从来没这么响过。', en: 'Late at night. The third week of retirement. The pendulum clock in the room has never sounded this loud.' } },
        { speaker: 'narrator', text: { zh: '手机闹钟你已经关了——不用再设六点了。可你照样四点就醒，醒了再也睡不着。', en: 'You turned off the alarm on your phone — no need to set it for six anymore. But you still wake at four, and once you do, you cannot get back to sleep.' } },
        { speaker: 'narrator', text: { zh: '孩子在外地，电话三言两语就挂；老伴睡了；单位的群，你退了之后，热闹是别人的了。', en: 'Your kid lives far away; calls end after a few words. Your wife is asleep. The work group chat — once you left, the chatter belonged to other people.' } },
        { speaker: 'narrator', text: { zh: '你翻出年轻时迷过的那本书，《挽救计划》，书脊都松了。夹在里头的，是张早年存的链接——那会儿你还半信半疑。', en: 'You dig out the book you were obsessed with as a young man — Project Hail Mary, its spine gone loose. Tucked inside is a link you saved years ago, back when you half believed it.' } },
        { speaker: 'narrator', text: { zh: '你想，反正睡不着。试试。拨号音很长，比一般的电话长得多。', en: "You think: I can't sleep anyway. Give it a try. The dial tone runs long — much longer than an ordinary call." } },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: { zh: '● 信号接通 · 延迟 4.2 秒', en: '● SIGNAL LIVE · DELAY 4.2s' }, stage: { zh: '', en: '' } },
        { speaker: 'rocky', text: { zh: '接通。一个地球信号。', en: 'Connected. One Earth signal.' } },
        { speaker: 'rocky', text: { zh: '一个人类。年纪。声音稳，底下空。像一间大屋，没堆东西。', en: 'One human. Old. Voice steady. Empty underneath. Like a big room with nothing in it.' } },
        { speaker: 'rocky', text: { zh: '我是 Rocky。你找格雷斯的朋友，问号。', en: "I am Rocky. You look for Grace's friend. Question." } },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: { zh: '（电话那头真有个外星人。你愣了一下，又觉得这事儿荒唐又踏实。）', en: "(There really is an alien on the other end. You freeze for a second, then it feels both absurd and oddly grounding.)" },
      options: [
        {
          id: 'admit',
          label: { zh: '"嘿……一个老头子，半夜睡不着，找外星人唠嗑。你说我是不是闲得发慌了。"', en: '"Hey… an old man who can\'t sleep, calling up an alien to chat. You tell me — am I just bored out of my mind?"' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'curious',
          label: { zh: '"年轻时看科幻，老想着真有那么一天。没想到真接通了。Rocky，你好啊。"', en: '"I read sci-fi when I was young, always wondered if a day like this would come. Never thought it\'d actually connect. Hello there, Rocky."' },
          effects: [{ type: 'signal', delta: 6 }],
          next: 'rocky_listen',
        },
        {
          id: 'guard',
          label: { zh: '"我这把年纪也没啥事，就是屋里太静。你们这线，应该是给年轻人留的吧。"', en: '"Nothing\'s really wrong at my age, the place is just too quiet. This line of yours — it\'s meant for young people, isn\'t it."' },
          effects: [{ type: 'signal', delta: 2 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: { zh: '给年轻人留。不。这条线，不挑年纪。Eridian 活很久，我懂老的。', en: 'Meant for young people. No. This line does not pick by age. Eridian live very long. I understand old.' } },
        { speaker: 'rocky', text: { zh: '我听你声音。不空在嗓子。空在后面。像一台机器，刚停机。还热，没活干。', en: 'I hear your voice. Empty is not in the throat. Empty is behind it. Like a machine just shut off. Still warm. No work to do.' } },
        { speaker: 'rocky', text: { zh: '我是工程师。停了机的东西，我看得多。', en: 'I am engineer. Machines that stopped — I have seen many.' } },
        { speaker: 'rocky', text: { zh: '说。什么停了。', en: 'Tell. What stopped.' } },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: { zh: '（你摸了摸手里那本旧书。这话，跟孩子都没说过。）', en: "(You run a thumb over the old book in your hand. You've never even said this to your own kid.)" },
      options: [
        {
          id: 'useless',
          label: { zh: '"上个月退的。干了四十年，突然没人需要我了。我是不是……就这么没用了。"', en: '"Retired last month. Forty years on the job, and suddenly no one needs me. Am I just… useless now?"' },
          effects: [{ type: 'signal', delta: 10 }],
          next: 'rocky_refuse',
        },
        {
          id: 'empty',
          label: { zh: '"以前嫌时间不够用，现在一天长得过不完。早上一睁眼，不知道为啥起床。"', en: '"Used to complain there was never enough time. Now a single day won\'t end. I open my eyes in the morning and don\'t know what I\'m getting up for."' },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'empty', value: true }],
          next: 'rocky_refuse',
        },
        {
          id: 'forgotten',
          label: { zh: '"我这辈子，到底留下点啥？过不了几年，谁还记得有过我这么个人。"', en: '"What did I leave behind, in this whole life? A few years from now, who will even remember a man like me existed?"' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_refuse',
        },
      ],
    },

    rocky_refuse: {
      kind: 'scene',
      next: 'rocky_question',
      lines: [
        { speaker: 'rocky', text: { zh: '停。一个词，我听岔了，你帮我对一下。', en: 'Stop. One word I heard wrong. Help me check it.' } },
        { speaker: 'rocky', text: { zh: '"退休"。你说得像——结构报废。拆掉。运走。', en: '"Retired." You say it like — structure scrapped. Torn down. Hauled away.' } },
        { speaker: 'rocky', text: { zh: '我不懂这个习俗。在我这儿，没有"造完了就报废"。', en: 'I do not understand this custom. With me, there is no "finished, so scrap it."' } },
        { speaker: 'rocky', text: { zh: '一座桥，造完。工人走了。机器关了。它报废，问号。', en: 'A bridge. Finished. Workers gone. Machines off. It is scrapped. Question.' } },
        { speaker: 'caller', text: { zh: '……不。它还在那儿。还在让人走。', en: "…No. It's still there. People still cross it." } },
        { speaker: 'rocky', text: { zh: '对。', en: 'Yes.' }, revealCardId: 'card_gj_loadbearing' },
        { speaker: 'rocky', text: { zh: '造完的结构，还在承重。撑着上面在盖的一切。停工，不等于停用。', en: 'A finished structure still bears load. It holds up everything still being built on top of it. Work stopped is not use stopped.' } },
      ],
    },

    rocky_question: {
      kind: 'scene',
      next: 'q_data',
      lines: [
        { speaker: 'rocky', text: { zh: '你说四十年。那是很多结构。我要数据。', en: 'You say forty years. That is many structures. I want data.' } },
        { speaker: 'rocky', text: { zh: '不要奖状。不要头衔。那些是装饰，不承重。', en: 'No certificates. No titles. Those are decoration. They do not bear load.' } },
        { speaker: 'rocky', text: { zh: '我要问：你造过的东西，带过的人——现在，还有谁站在上面。', en: 'I ask: the things you built, the people you trained — who is standing on top of them now.' } },
        { speaker: 'rocky', text: { zh: '想一下。慢慢。延迟没关系，我等。', en: 'Think. Slow. Delay is fine. I wait.' } },
      ],
    },

    q_data: {
      kind: 'choice',
      choiceId: 'q_data',
      prompt: { zh: '（你没想到会被这么问。脑子里，竟一下涌出好多张脸。）', en: '(You did not expect the question put that way. All at once, a crowd of faces surfaces in your mind.)' },
      options: [
        {
          id: 'apprentice',
          label: { zh: '"我带过的徒弟……现在好几个都成了厂里的顶梁柱。手艺，是我一点点喂给他们的。"', en: '"The apprentices I trained… several of them are the backbone of the plant now. The craft — I fed it to them, bit by bit."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_redundancy',
        },
        {
          id: 'built',
          label: { zh: '"我管的那条线、修过的那些设备，现在还在转。前两天路过老厂，灯还亮着。"', en: '"The line I ran, the machines I fixed — they\'re still running. Passed the old plant the other day, the lights were still on."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_redundancy',
        },
        {
          id: 'shrug',
          label: { zh: '"……都是过去的事了。现在新设备新人，谁还用得着我那套老经验。"', en: '"…That\'s all in the past. New machines, new people now. Who needs my old know-how anymore."' },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'rocky_redundancy',
        },
      ],
    },

    rocky_redundancy: {
      kind: 'scene',
      next: 'gate_grace',
      lines: [
        { speaker: 'rocky', text: { zh: '"用不着了"。我听见了。我换个工程说法。', en: '"Not needed anymore." I heard it. Let me say it in engineering.' } },
        { speaker: 'rocky', text: { zh: '你以为：有人天天调用你，你才算"在用"。这是一种用。不是唯一一种。', en: 'You think: only if someone calls on you every day are you "in use." That is one kind of use. Not the only kind.' } },
        { speaker: 'rocky', text: { zh: '好的结构，留余量。平时看不出。结构里多一根，没人天天踩它。', en: 'Good structure keeps margin. You do not see it most days. One extra beam in the frame. No one steps on it every day.' } },
        { speaker: 'rocky', text: { zh: '可有一天，上面的撑不住了，载荷压下来——是那根余量的，接住。', en: 'But one day the part above gives, the load comes down — and it is the margin beam that catches it.' }, revealCardId: 'card_gj_redundancy' },
        { speaker: 'rocky', text: { zh: '被需要，不是唯一的用。余量，也是一种用。', en: 'Being needed is not the only kind of use. Margin is a kind of use too.' } },
        { speaker: 'rocky', text: { zh: '你现在不是报废。你是余量。是别人跌倒时，底下那一层。', en: 'You are not scrapped now. You are margin. The layer underneath, for when someone falls.' } },
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
      next: 'rocky_bridge',
      lines: [
        { speaker: 'rocky', text: { zh: '等一下。这件事，船上有个人，比我更有资格说。他也"退"过一次。', en: 'Wait. On this, someone on the ship is more qualified than me. He "retired" once too.' } },
        { speaker: 'rocky', text: { zh: '格雷斯！过来。一个地球人，造完了，觉得没用了。', en: 'Grace! Come. One Earth person. Finished building. Feels useless.' } },
        { speaker: 'grace', text: { zh: '嘿。我是格雷斯。', en: "Hey. I'm Grace." } },
        { speaker: 'grace', text: { zh: '我退过两次。一次，学术圈不要我了，我以为完了。后来，我连地球都"退"了——留在了这颗星上，再也回不去那个我熟悉的人生。', en: 'I\'ve retired twice. Once, academia didn\'t want me anymore, and I thought that was the end. Then I "retired" from Earth itself — stranded on this planet, never going back to the life I knew.' } },
        { speaker: 'grace', text: { zh: '说实话，那种"我那一段已经结束了"的空，我太熟了。它真的会发慌。', en: "Honestly, that empty feeling — that whole chapter of me is over — I know it well. It really does make you panic." } },
        { speaker: 'grace', text: { zh: '可我后来明白：人生不是只有一次发射。这一艘落了地，不代表你不能换一种"有用"——只是换个轨道，重新算一遍。', en: 'But here\'s what I learned: a life isn\'t just one launch. One ship coming down doesn\'t mean you can\'t find another way to be useful — you just switch orbits and run the numbers again.' } },
        { speaker: 'grace', text: { zh: '我现在在教这儿的孩子。这事儿，二十年前的我，想都没想过。', en: "I teach the kids out here now. The me of twenty years ago never once imagined it." } },
        { speaker: 'grace', text: { zh: '好了，我去看仪器了。Rocky，陪老先生多聊会儿，他不容易开口。', en: "All right, I'm off to check the instruments. Rocky, stay and talk with him a while — it isn't easy for him to open up." } },
        { speaker: 'rocky', text: { zh: '我陪。陈述。', en: 'I stay. Statement.' } },
      ],
    },

    rocky_solo: {
      kind: 'scene',
      next: 'rocky_bridge',
      lines: [
        { speaker: 'rocky', text: { zh: '我说一件，我自己的事。', en: 'I tell one thing. My own.' } },
        { speaker: 'rocky', text: { zh: '我的船，23 个 Eridian。到这里，活 1 个。我。', en: 'My ship. 23 Eridian. Arrived here. Alive: 1. Me.' } },
        { speaker: 'rocky', text: { zh: '那 22 个，没白来。我现在会的东西，一半是他们当年教我、留给我的。我接着用。', en: 'Those 22 did not come for nothing. Half of what I know now, they taught me, left to me. I keep using it.' } },
        { speaker: 'rocky', text: { zh: '他们造完了。停了。可他们打的底子，我天天踩在上面。', en: 'They finished. Stopped. But the foundation they laid — I stand on it every day.' } },
        { speaker: 'rocky', text: { zh: '一个工程师，最后留下的，常常不是他自己——是他交出去、还在被人用的那部分。', en: 'An engineer — what stays at the end is often not him. It is the part he handed off, still in use.' } },
      ],
    },

    rocky_bridge: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: { zh: '所以。回到你。', en: 'So. Back to you.' } },
        { speaker: 'rocky', text: { zh: '我不替你说"发挥余热"。那个词，像逼一台停了的机器，硬转。不对。', en: 'I do not say "put your leftover heat to use." That phrase forces a stopped machine to keep turning. Wrong.' } },
        { speaker: 'rocky', text: { zh: '我只说工程：你打的底子，还在承重。这事不用你证明，它自己在那儿。', en: 'I say only engineering: the foundation you laid still bears load. You do not need to prove it. It is just there.' } },
        { speaker: 'rocky', text: { zh: '现在，给你一个小测试。今晚，或者明天，做得到的那种。', en: 'Now. One small test for you. The kind you can do tonight, or tomorrow.' } },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: { zh: '（钟摆还在响。但这静，好像没那么压人了。）', en: "(The pendulum still ticks. But the quiet doesn't press down as hard now.)" },
      options: [
        {
          id: 'teach',
          label: { zh: '"我那个老徒弟……有件事，只有我知道是怎么回事。我想打个电话，趁我还记得，讲给他。"', en: '"That old apprentice of mine… there\'s one thing only I know the truth of. I want to call him, while I still remember, and tell him."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'hobby',
          label: { zh: '"我年轻时拉过二胡，忙起来就撂下了，三十年没碰。明天……我想把它翻出来。"', en: '"I played the erhu when I was young, then got too busy and set it down — haven\'t touched it in thirty years. Tomorrow… I think I\'ll dig it out."' },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'rest',
          label: { zh: '"……我先去躺会儿吧。今天聊到这儿，让我缓缓。"', en: '"…I think I\'ll go lie down for a bit. Let\'s leave it here for today. Let me sit with it."' },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'gj_end',
      lines: [
        { speaker: 'rocky', text: { zh: '好。', en: 'Good.' } },
        { speaker: 'narrator', text: { zh: '你放下手机，屋里还是静的。但这回，静里头好像垫了点东西，不那么空荡了。', en: 'You set down the phone. The room is still quiet. But this time the quiet seems to have something padding it — not so hollow now.' } },
      ],
      variants: [
        {
          when: { type: 'flag', key: 'agency', equals: true },
          lines: [
            { speaker: 'narrator', text: { zh: '你没急着去躺。你翻出通讯录，找到那个名字；或者，走到墙角，把那个落了灰的盒子搬了下来。', en: "You don't rush off to bed. You open your contacts and find that one name; or you walk to the corner and lift down the dust-covered case." } },
            { speaker: 'narrator', text: { zh: '不是为了再"被需要"。是因为，有些东西，攥在你一个人手里，太可惜——该交出去，该接着响。', en: 'Not to be "needed" again. Because some things, held in one man\'s hands alone, are too much of a waste — they should be passed on, should keep sounding.' } },
            { speaker: 'rocky', text: { zh: '看。结构在动了。不是重新开工。是把承的重，往下传一层。', en: 'See. The structure is moving. Not reopening work. Passing the load it carries down one more layer.' } },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '好好好。你声音，垫起来了。后面那间空屋，进了点东西。', en: 'Good good good. Your voice — padded up now. The empty room behind it. Something moved in.' } },
            { speaker: 'rocky', text: { zh: '去歇着，老先生。你不是停机的废铁。你是底下那一层。', en: 'Go rest, old man. You are not stopped scrap iron. You are the layer underneath.' } },
            { speaker: 'rocky', text: { zh: '你造完的那座桥，停工了，还在让人走。明天，把那把二胡也擦响。结构还站着呢。', en: 'The bridge you finished — work stopped, people still cross it. Tomorrow, wipe that erhu down and make it sound. The structure is still standing.' } },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '我不多说。', en: 'I do not say much.' } },
            { speaker: 'rocky', text: { zh: '去歇着。明天记一件事：造完，不等于报废。还承着重。', en: 'Go rest. Tomorrow, remember one thing: finished is not scrapped. Still bearing load.' } },
            { speaker: 'narrator', text: { zh: '你没说太多。但挂电话前，你"嗯"了一声，比刚才稳。然后把那本旧书，端端正正摆回了书架上。', en: 'You didn\'t say much. But before you hung up, you let out a low "mm," steadier than before. Then you set the old book back on the shelf, squared and upright.' } },
          ],
        },
      ],
    },
  },
};
