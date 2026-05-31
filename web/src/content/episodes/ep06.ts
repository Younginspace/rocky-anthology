import type { Episode } from '../../engine/types';

/**
 * ep06 ·《失败的任务，不是失败的人》· 江帆 — 创业失败 / 愧疚连累他人。
 *
 * Follows the ep01 GOLD-STANDARD shape:
 *  - opening scene (system trace + narrator night) → connect → first stance choice
 *  - Rocky engineer pipeline (observe → misunderstand → ask data → constraints →
 *    one action) before any "wisdom"; he distinguishes 方案失败 from 你这个人
 *  - Grace gate: or(signalAtLeast 60, flagSet 'engaged') → grace_in, else → Rocky-only
 *  - reconverge → final 落地 choice (honest message / written lesson / sleep)
 *  - one ending node + warm / quiet / agency variants
 *  - 2 wisdom cards, revealed on reachable spine scenes
 */
export const ep06: Episode = {
  id: 'ep06',
  order: 6,
  title: '失败的任务，不是失败的人',
  subtitle: '江帆 · 创业失败 / 愧疚连累他人',
  theme: '当你的项目黄了，还把跟你的人一起拖了下去',
  caller: {
    id: 'jiang_fan',
    handle: 'JF-1119',
    realName: '江帆',
    age: 30,
    location: '某创业园区 · 退租到一半的办公室',
    tagline: '公司刚清算，欠着债，遣散了最后几个跟了三年的人',
    reason: '凌晨，他一个人坐在搬空一半的办公室里。投资人的消息没敢回，兄弟的工资还差两个月。他觉得自己是个骗子。',
    outcomeShort: '他没有立刻"东山再起"。但那天夜里，他给一个一直不敢面对的人，发出了一句不是辩解的话。',
    morningBeat: '江帆把那张写着"我学到的一件事"的便利贴，从屏幕边撕下来，折好，放进了钱包最里层。',
    accent: 'green',
  },
  cards: [
    { id: 'card_jf_mission', episodeId: 'ep06', speaker: 'rocky', text: '失败的任务，不是失败的工程师。下一个任务，需要你这次学到的。' },
    { id: 'card_jf_iterate', episodeId: 'ep06', speaker: 'grace', text: '错很多次。死过人。我们还是继续。不是不痛。是还有下一步。' },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: '〔星际通讯线 · ERID↔地球〕今晚第 31 通来电', stage: '信号建立中…' },
        { speaker: 'narrator', text: '凌晨三点。办公室搬空了一半。' },
        { speaker: 'narrator', text: '工位上还留着别人忘了拿的马克杯、一盆死掉的多肉。墙上"还有 30 天上线"的倒计时，没人撕了。' },
        { speaker: 'narrator', text: '手机里，投资人的消息你没敢回。兄弟的工资还差两个月。家里以为你"在忙"。' },
        { speaker: 'narrator', text: '你刷到一篇文章，标题是《那个救了两个文明的人》。配图是颗陌生的星。底下有行小字：这条线，谁都能拨。' },
        { speaker: 'narrator', text: '你也不知道在干嘛。手指就按下去了。拨号音很长，比一般的电话长得多。' },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: '● 信号接通 · 延迟 4.6 秒', stage: '' },
        { speaker: 'rocky', text: '接通。一个地球信号。' },
        { speaker: 'rocky', text: '一个人类。男的。呼吸……浅。像在憋着什么，不让它出来。' },
        { speaker: 'rocky', text: '我是 Rocky。你找格雷斯的朋友，问号。' },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: '（真的有人。三点钟的办公室里，只有你和这条延迟很长的线。）',
      options: [
        {
          id: 'admit_fraud',
          label: '"我……把公司搞黄了。我觉得我就是个骗子。骗了所有信我的人。"',
          effects: [{ type: 'signal', delta: 13 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'deflect_joke',
          label: '"听说能跟外星人聊天。反正我也睡不着，随便聊聊。"（你扯了下嘴角，没笑出来。）',
          effects: [{ type: 'signal', delta: 2 }],
          next: 'rocky_listen',
        },
        {
          id: 'test_credential',
          label: '"你真是那个 Rocky？救了俩文明那个？……那你肯定没失败过吧。"',
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: '没失败过。错。' },
        { speaker: 'rocky', text: '我的船，23 个 Eridian 出发。到地球那个任务，活 1 个。我。' },
        { speaker: 'rocky', text: '22 个，我没带回来。这是失败。很大的失败。' },
        { speaker: 'rocky', text: '现在。你呼吸浅，在憋。我是工程师，看见承压的结构，我先问：什么在压它。' },
        { speaker: 'rocky', text: '说。哪里坏了。' },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: '（"22 个"这三个字，让你愣了一下。你深吸一口气。）',
      options: [
        {
          id: 'failed_self',
          label: '"项目黄了。三年，烧光了钱，什么都没做成。我证明了我就是个废物。"',
          effects: [{ type: 'signal', delta: 9 }],
          next: 'rocky_separate',
        },
        {
          id: 'dragged_brothers',
          label: '"最难受的不是我自己。是跟着我的几个兄弟——他们信我，把青春压进来，工资我还欠着。"',
          effects: [{ type: 'signal', delta: 13 }, { type: 'flag', key: 'dragged', value: true }],
          next: 'rocky_separate',
        },
        {
          id: 'investor_family',
          label: '"投资人的钱、爸妈的养老钱，全没了。我不敢回任何人的消息。我害了所有信我的人。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'dragged', value: true }],
          next: 'rocky_separate',
        },
      ],
    },

    rocky_separate: {
      kind: 'scene',
      next: 'rocky_iterate',
      lines: [
        { speaker: 'rocky', text: '等。你说了两个东西。你以为是一个。' },
        { speaker: 'rocky', text: '一个："项目失败了。" 这是事实。方案没跑通。数据。' },
        { speaker: 'rocky', text: '另一个："所以我是废物。" 这不是事实。这是你从第一个，推出来的结论。' },
        { speaker: 'caller', text: '……可结果就是这样啊。东西没成，不就说明我不行？' },
        { speaker: 'rocky', text: '不。', revealCardId: 'card_jf_mission' },
        { speaker: 'rocky', text: '失败的任务，不是失败的工程师。这是两个不同的东西。你把它们焊死在一起了。' },
        { speaker: 'rocky', text: '焊错了。我帮你拆开。' },
      ],
    },

    rocky_iterate: {
      kind: 'scene',
      next: 'q_guilt',
      lines: [
        { speaker: 'rocky', text: '我们救两颗星，靠的是什么。说真的：靠一堆错的假设，一个一个被推翻。' },
        { speaker: 'rocky', text: 'Astrophage 怎么繁殖，我们猜错过。Taumoeba 能不能活，我们猜错过。错很多很多次。' },
        { speaker: 'rocky', text: '没有哪个假设，是一次对的。重要的，不是"对"。重要的，是还在迭代。' },
        { speaker: 'rocky', text: '一个被推翻的方案，是数据。不是判决书。' },
      ],
    },

    q_guilt: {
      kind: 'choice',
      choiceId: 'q_guilt',
      prompt: '（你沉默了一会儿。但有个东西还压在胸口，绕不过去。）',
      options: [
        {
          id: 'not_about_me',
          label: '"道理我懂。可那不是我一个人的赌。是别人的钱、别人的时间。我凭什么再试？"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'cant_face',
          label: '"我最怕的不是钱。是他们的脸。我不敢看，不敢回消息。我躲了一个月了。"',
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'avoiding', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'numb',
          label: '"……我不知道。我现在什么都感觉不到，又什么都压着。乱的。"',
          effects: [{ type: 'signal', delta: 5 }],
          next: 'gate_grace',
        },
      ],
    },

    rocky_load: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: '"我害了跟着我的人。" 这个，是真的负载。我不骗你说它轻。' },
        { speaker: 'rocky', text: '我也背着 22 个。每天。它不会变成零。' },
        { speaker: 'rocky', text: '但你现在背的，多了一块多余的。那块写着："所以我没资格再试。"' },
        { speaker: 'rocky', text: '这块，是焊错的逻辑。不是愧疚本身。是愧疚里，多长出来的一个错误结论。' },
        { speaker: 'rocky', text: '愧疚你留着。它让你下次更小心，对人更负责。多余那块，卸掉。它只让结构瘫，谁都救不了。' },
      ],
    },

    gate_grace: {
      kind: 'branch',
      branches: [
        { when: { type: 'or', any: [{ type: 'signalAtLeast', value: 60 }, { type: 'flagSet', key: 'engaged' }] }, goto: 'grace_in' },
      ],
      else: 'rocky_load',
    },

    grace_in: {
      kind: 'scene',
      next: 'rocky_load',
      lines: [
        { speaker: 'rocky', text: '等一下。这个，我船上有个人比我更懂。她跟我，一起死过人。' },
        { speaker: 'rocky', text: '格雷斯！过来。一个地球人，觉得自己连累了所有人。' },
        { speaker: 'grace', text: '嘿。我是格雷斯。' },
        { speaker: 'grace', text: '救那两颗星的过程里，我们错了无数次。试错的代价，不是钱。是命。真的有人，因为我们判断错了，没回来。' },
        { speaker: 'grace', text: '我也躺在床上想过：我有什么资格继续。是我害的。' },
        { speaker: 'grace', text: '我们还是继续了。不是因为不痛——到今天还痛。', revealCardId: 'card_jf_iterate' },
        { speaker: 'grace', text: '是因为，痛的人坐着不动，没有一个人会因此活过来。还有下一步要走，才走得下去。' },
        { speaker: 'grace', text: '好了，我去看仪器了。Rocky，把那块多余的重量帮他卸了。' },
        { speaker: 'rocky', text: '正在卸。陈述。' },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: '（窗外还黑着。胸口那块东西，没消失，但好像能挪动了。明天，你能先做一件什么？）',
      options: [
        {
          id: 'send_honest',
          label: '"有个人我一直不敢面对。我想给他发条消息——不是解释，就是承认，加一句谢谢。"',
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'agency', value: true }, { type: 'flag', key: 'reach_out', value: true }],
          next: 'end_main',
        },
        {
          id: 'write_lesson',
          label: '"我想写下来——这次失败里，我真的学到、下次用得上的一件事。就一件。"',
          effects: [{ type: 'signal', delta: 11 }, { type: 'flag', key: 'agency', value: true }, { type: 'flag', key: 'wrote_lesson', value: true }],
          next: 'end_main',
        },
        {
          id: 'just_rest',
          label: '"……我先睡吧。今天太长了。剩下的明天再说。"',
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'jf_end',
      lines: [
        { speaker: 'rocky', text: '好。' },
        { speaker: 'narrator', text: '你看了一眼墙上那行"还有 30 天上线"的倒计时。这一次，你站起来，把它撕了下来。' },
      ],
      variants: [
        {
          when: { type: 'flag', key: 'reach_out', equals: true },
          lines: [
            { speaker: 'narrator', text: '你点开那个躲了一个月的对话框。删掉了好几版辩解。最后只留下三行：对不起，工资我一定补上。这三年，谢谢你信我。' },
            { speaker: 'rocky', text: '诚实的信号，最难发。也最值。明天，按发送。' },
            { speaker: 'rocky', text: '失败的任务，不是失败的工程师。下一个任务，会需要你这次学到的。' },
          ],
        },
        {
          when: { type: 'flag', key: 'wrote_lesson', equals: true },
          lines: [
            { speaker: 'narrator', text: '你撕下一张便利贴，写下那一件事——不是后悔的事，是真的学会的事。然后贴在屏幕边上。' },
            { speaker: 'rocky', text: '把数据存好。下一个任务，会需要它。' },
            { speaker: 'rocky', text: '失败的任务，不是失败的工程师。你还在迭代。够了。' },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: '好好好。你呼吸，不那么浅了。憋着的东西，松了一点。' },
            { speaker: 'rocky', text: '去睡，朋友。22 个我背着，你的几个你背着。背得动的人，明天接着走。' },
            { speaker: 'rocky', text: '线一直开着。我在这头。' },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: '我不多说。' },
            { speaker: 'rocky', text: '今晚你只记住一件事就好：任务失败了，工程师还在。两个东西。别焊在一起。' },
            { speaker: 'narrator', text: '你没回太多。但挂线前，你对着那盆死掉的多肉，轻轻"嗯"了一声。然后关了灯。' },
          ],
        },
      ],
    },
  },
};
