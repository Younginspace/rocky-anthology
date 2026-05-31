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
  title: '结构造完了，还在承重',
  subtitle: '高建国 · 刚退休 / 失去"被需要"',
  theme: '当忙了一辈子的你，突然没人需要了',
  caller: {
    id: 'gao_jianguo',
    handle: 'GJ-0631',
    realName: '高建国',
    age: 67,
    location: '某老工业城市 · 老房子 · 阳台上的旧躺椅',
    tagline: '上个月刚退休，干了一辈子，孩子在外地，时间忽然空得发慌',
    reason: '退休第三周的深夜。屋里太静了。他翻出年轻时迷过的那本《挽救计划》，想起还有这么一条线。',
    outcomeShort: '他没有立刻"想通"。但那天之后，他给老徒弟打了个电话，把一件只有他知道的事讲了出去。',
    morningBeat: '高建国早早醒了，没像往常那样发愁这一天怎么打发——他翻出落灰多年的二胡，先擦了擦弦。',
    accent: 'gold',
  },
  cards: [
    { id: 'card_gj_loadbearing', episodeId: 'ep09', speaker: 'rocky', text: '造完的结构，还在承重。撑着上面在盖的一切。' },
    { id: 'card_gj_redundancy', episodeId: 'ep09', speaker: 'rocky', text: '被需要，不是唯一的用。余量，也是一种用。' },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: '〔星际通讯线 · ERID↔地球〕今晚第 42 通来电', stage: '信号建立中…' },
        { speaker: 'narrator', text: '深夜。退休第三周。屋里的钟摆声，从来没这么响过。' },
        { speaker: 'narrator', text: '手机闹钟你已经关了——不用再设六点了。可你照样四点就醒，醒了再也睡不着。' },
        { speaker: 'narrator', text: '孩子在外地，电话三言两语就挂；老伴睡了；单位的群，你退了之后，热闹是别人的了。' },
        { speaker: 'narrator', text: '你翻出年轻时迷过的那本书，《挽救计划》，书脊都松了。夹在里头的，是张早年存的链接——那会儿你还半信半疑。' },
        { speaker: 'narrator', text: '你想，反正睡不着。试试。拨号音很长，比一般的电话长得多。' },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: '● 信号接通 · 延迟 4.2 秒', stage: '' },
        { speaker: 'rocky', text: '接通。一个地球信号。' },
        { speaker: 'rocky', text: '一个人类。年纪。声音稳，底下空。像一间大屋，没堆东西。' },
        { speaker: 'rocky', text: '我是 Rocky。你找格雷斯的朋友，问号。' },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: '（电话那头真有个外星人。你愣了一下，又觉得这事儿荒唐又踏实。）',
      options: [
        {
          id: 'admit',
          label: '"嘿……一个老头子，半夜睡不着，找外星人唠嗑。你说我是不是闲得发慌了。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'curious',
          label: '"年轻时看科幻，老想着真有那么一天。没想到真接通了。Rocky，你好啊。"',
          effects: [{ type: 'signal', delta: 6 }],
          next: 'rocky_listen',
        },
        {
          id: 'guard',
          label: '"我这把年纪也没啥事，就是屋里太静。你们这线，应该是给年轻人留的吧。"',
          effects: [{ type: 'signal', delta: 2 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: '给年轻人留。不。这条线，不挑年纪。Eridian 活很久，我懂老的。' },
        { speaker: 'rocky', text: '我听你声音。不空在嗓子。空在后面。像一台机器，刚停机。还热，没活干。' },
        { speaker: 'rocky', text: '我是工程师。停了机的东西，我看得多。' },
        { speaker: 'rocky', text: '说。什么停了。' },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: '（你摸了摸手里那本旧书。这话，跟孩子都没说过。）',
      options: [
        {
          id: 'useless',
          label: '"上个月退的。干了四十年，突然没人需要我了。我是不是……就这么没用了。"',
          effects: [{ type: 'signal', delta: 10 }],
          next: 'rocky_refuse',
        },
        {
          id: 'empty',
          label: '"以前嫌时间不够用，现在一天长得过不完。早上一睁眼，不知道为啥起床。"',
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'empty', value: true }],
          next: 'rocky_refuse',
        },
        {
          id: 'forgotten',
          label: '"我这辈子，到底留下点啥？过不了几年，谁还记得有过我这么个人。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_refuse',
        },
      ],
    },

    rocky_refuse: {
      kind: 'scene',
      next: 'rocky_question',
      lines: [
        { speaker: 'rocky', text: '停。一个词，我听岔了，你帮我对一下。' },
        { speaker: 'rocky', text: '"退休"。你说得像——结构报废。拆掉。运走。' },
        { speaker: 'rocky', text: '我不懂这个习俗。在我这儿，没有"造完了就报废"。' },
        { speaker: 'rocky', text: '一座桥，造完。工人走了。机器关了。它报废，问号。' },
        { speaker: 'caller', text: '……不。它还在那儿。还在让人走。' },
        { speaker: 'rocky', text: '对。', revealCardId: 'card_gj_loadbearing' },
        { speaker: 'rocky', text: '造完的结构，还在承重。撑着上面在盖的一切。停工，不等于停用。' },
      ],
    },

    rocky_question: {
      kind: 'scene',
      next: 'q_data',
      lines: [
        { speaker: 'rocky', text: '你说四十年。那是很多结构。我要数据。' },
        { speaker: 'rocky', text: '不要奖状。不要头衔。那些是装饰，不承重。' },
        { speaker: 'rocky', text: '我要问：你造过的东西，带过的人——现在，还有谁站在上面。' },
        { speaker: 'rocky', text: '想一下。慢慢。延迟没关系，我等。' },
      ],
    },

    q_data: {
      kind: 'choice',
      choiceId: 'q_data',
      prompt: '（你没想到会被这么问。脑子里，竟一下涌出好多张脸。）',
      options: [
        {
          id: 'apprentice',
          label: '"我带过的徒弟……现在好几个都成了厂里的顶梁柱。手艺，是我一点点喂给他们的。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_redundancy',
        },
        {
          id: 'built',
          label: '"我管的那条线、修过的那些设备，现在还在转。前两天路过老厂，灯还亮着。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_redundancy',
        },
        {
          id: 'shrug',
          label: '"……都是过去的事了。现在新设备新人，谁还用得着我那套老经验。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'rocky_redundancy',
        },
      ],
    },

    rocky_redundancy: {
      kind: 'scene',
      next: 'gate_grace',
      lines: [
        { speaker: 'rocky', text: '"用不着了"。我听见了。我换个工程说法。' },
        { speaker: 'rocky', text: '你以为：有人天天调用你，你才算"在用"。这是一种用。不是唯一一种。' },
        { speaker: 'rocky', text: '好的结构，留余量。平时看不出。结构里多一根，没人天天踩它。' },
        { speaker: 'rocky', text: '可有一天，上面的撑不住了，载荷压下来——是那根余量的，接住。', revealCardId: 'card_gj_redundancy' },
        { speaker: 'rocky', text: '被需要，不是唯一的用。余量，也是一种用。' },
        { speaker: 'rocky', text: '你现在不是报废。你是余量。是别人跌倒时，底下那一层。' },
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
        { speaker: 'rocky', text: '等一下。这件事，船上有个人，比我更有资格说。她也"退"过一次。' },
        { speaker: 'rocky', text: '格雷斯！过来。一个地球人，造完了，觉得没用了。' },
        { speaker: 'grace', text: '嘿。我是格雷斯。' },
        { speaker: 'grace', text: '我退过两次。一次，学术圈不要我了，我以为完了。后来，我连地球都"退"了——留在了这颗星上，再也回不去那个我熟悉的人生。' },
        { speaker: 'grace', text: '说实话，那种"我那一段已经结束了"的空，我太熟了。它真的会发慌。' },
        { speaker: 'grace', text: '可我后来明白：人生不是只有一次发射。这一艘落了地，不代表你不能换一种"有用"——只是换个轨道，重新算一遍。' },
        { speaker: 'grace', text: '我现在在教这儿的孩子。这事儿，二十年前的我，想都没想过。' },
        { speaker: 'grace', text: '好了，我去看仪器了。Rocky，陪老先生多聊会儿，他不容易开口。' },
        { speaker: 'rocky', text: '我陪。陈述。' },
      ],
    },

    rocky_solo: {
      kind: 'scene',
      next: 'rocky_bridge',
      lines: [
        { speaker: 'rocky', text: '我说一件，我自己的事。' },
        { speaker: 'rocky', text: '我的船，23 个 Eridian。到这里，活 1 个。我。' },
        { speaker: 'rocky', text: '那 22 个，没白来。我现在会的东西，一半是他们当年教我、留给我的。我接着用。' },
        { speaker: 'rocky', text: '他们造完了。停了。可他们打的底子，我天天踩在上面。' },
        { speaker: 'rocky', text: '一个工程师，最后留下的，常常不是他自己——是他交出去、还在被人用的那部分。' },
      ],
    },

    rocky_bridge: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: '所以。回到你。' },
        { speaker: 'rocky', text: '我不替你说"发挥余热"。那个词，像逼一台停了的机器，硬转。不对。' },
        { speaker: 'rocky', text: '我只说工程：你打的底子，还在承重。这事不用你证明，它自己在那儿。' },
        { speaker: 'rocky', text: '现在，给你一个小测试。今晚，或者明天，做得到的那种。' },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: '（钟摆还在响。但这静，好像没那么压人了。）',
      options: [
        {
          id: 'teach',
          label: '"我那个老徒弟……有件事，只有我知道是怎么回事。我想打个电话，趁我还记得，讲给他。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'hobby',
          label: '"我年轻时拉过二胡，忙起来就撂下了，三十年没碰。明天……我想把它翻出来。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'rest',
          label: '"……我先去躺会儿吧。今天聊到这儿，让我缓缓。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'gj_end',
      lines: [
        { speaker: 'rocky', text: '好。' },
        { speaker: 'narrator', text: '你放下手机，屋里还是静的。但这回，静里头好像垫了点东西，不那么空荡了。' },
      ],
      variants: [
        {
          when: { type: 'flag', key: 'agency', equals: true },
          lines: [
            { speaker: 'narrator', text: '你没急着去躺。你翻出通讯录，找到那个名字；或者，走到墙角，把那个落了灰的盒子搬了下来。' },
            { speaker: 'narrator', text: '不是为了再"被需要"。是因为，有些东西，攥在你一个人手里，太可惜——该交出去，该接着响。' },
            { speaker: 'rocky', text: '看。结构在动了。不是重新开工。是把承的重，往下传一层。' },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: '好好好。你声音，垫起来了。后面那间空屋，进了点东西。' },
            { speaker: 'rocky', text: '去歇着，老先生。你不是停机的废铁。你是底下那一层。' },
            { speaker: 'rocky', text: '线一直开着。哪天又静了，再打来。' },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: '我不多说。' },
            { speaker: 'rocky', text: '去歇着。明天记一件事：造完，不等于报废。还承着重。' },
            { speaker: 'narrator', text: '你没说太多。但挂电话前，你"嗯"了一声，比刚才稳。然后把那本旧书，端端正正摆回了书架上。' },
          ],
        },
      ],
    },
  },
};
