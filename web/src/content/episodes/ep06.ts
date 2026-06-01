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
  title: { zh: '死掉的多肉', en: 'The Dead Succulent' },
  subtitle: { zh: '江帆 · 创业失败 / 愧疚连累他人', en: 'Jiang Fan · a startup that died / the guilt of pulling others down with it' },
  theme: { zh: '当你的项目黄了，还把跟着你的人一起拖了下去', en: 'When your venture goes under — and takes everyone who believed in you down with it' },
  caller: {
    id: 'jiang_fan',
    handle: 'JF-1119',
    realName: { zh: '江帆', en: 'Jiang Fan' },
    age: 30,
    location: { zh: '某创业园区 · 退租到一半的办公室', en: 'A startup park · an office half-cleared for move-out' },
    tagline: { zh: '公司刚清算，欠着债，遣散了最后几个跟了三年的人', en: 'The company just folded — in debt, and he has let go the last few people who stuck with him for three years' },
    reason: { zh: '凌晨，他一个人坐在搬空一半的办公室里。投资人的消息没敢回，兄弟的工资还差两个月。他觉得自己是个骗子。', en: 'It is the small hours, and he is alone in the half-emptied office. He has not dared answer the investor. His guys are still owed two months of pay. He feels like a fraud.' },
    outcomeShort: { zh: '他没有立刻"东山再起"。但那天夜里，他给一个一直不敢面对的人，发出了一句不是辩解的话。', en: 'He did not "rise from the ashes" overnight. But that night, to the one person he had been unable to face, he sent a line that was not an excuse.' },
    morningBeat: { zh: '江帆把那张写着"我学到的一件事"的便利贴，从屏幕边撕下来，折好，放进了钱包最里层。', en: 'Jiang Fan peels the sticky note — "the one thing I learned" — from the edge of his monitor, folds it, and tucks it into the innermost fold of his wallet.' },
    accent: 'green',
  },
  cards: [
    { id: 'card_jf_mission', episodeId: 'ep06', speaker: 'rocky', text: { zh: '失败的任务，不是失败的工程师。下一个任务，需要你这次学到的。', en: 'A failed mission is not a failed engineer. The next mission needs what you learned in this one.' } },
    { id: 'card_jf_iterate', episodeId: 'ep06', speaker: 'grace', text: { zh: '错很多次。死过人。我们还是继续。不是不痛。是还有下一步。', en: 'We got it wrong many times. People died. We kept going. Not because it stopped hurting. Because there was a next step.' } },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: { zh: '〔星际通讯线 · ERID↔地球〕今晚第 37 通来电', en: '[INTERSTELLAR LINE · ERID↔EARTH] Call #37 tonight' }, stage: { zh: '信号建立中…', en: 'establishing link…' } },
        { speaker: 'narrator', text: { zh: '凌晨三点。办公室搬空了一半。', en: '3 a.m. The office is half cleared out.' } },
        { speaker: 'narrator', text: { zh: '工位上还留着别人忘了拿走的马克杯，一盆死掉的多肉。墙上那张"还有 30 天上线"的倒计时，没人去撕。', en: "On a desk: a mug someone forgot to take, a dead succulent in its pot. The countdown taped to the wall — \"30 days to launch\" — and no one has torn it down." } },
        { speaker: 'narrator', text: { zh: '手机里，投资人的消息你没敢回。兄弟的工资还差两个月。家里以为你"在忙"。', en: 'On your phone, the investor\'s message you have not dared open. Your guys are still owed two months\' pay. Your family thinks you\'re just "busy."' } },
        { speaker: 'narrator', text: { zh: '你刷到一篇文章，标题是《那个救了两个文明的人》。配图是一颗陌生的星。底下有行小字：这条线，谁都能拨。', en: 'You scroll past an article: "The Man Who Saved Two Civilizations." The image is an unfamiliar star. Below it, a small line of text: anyone can dial this line.' } },
        { speaker: 'narrator', text: { zh: '你也不知道自己在干嘛。手指就按下去了。拨号音很长，比一般的电话长得多。', en: 'You have no idea what you are doing. Your finger just presses it. The dial tone goes on for a long time — much longer than an ordinary call.' } },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: { zh: '● 信号接通 · 延迟 4.6 秒', en: '● SIGNAL LIVE · DELAY 4.6s' }, stage: { zh: '', en: '' } },
        { speaker: 'rocky', text: { zh: '接通。一个地球信号。', en: 'Connected. One Earth signal.' } },
        { speaker: 'rocky', text: { zh: '一个人类。男的。呼吸……浅。像在憋着什么，不让它出来。', en: 'A human. Male. Breathing… shallow. Like holding something in. Not letting it out.' } },
        { speaker: 'rocky', text: { zh: '我是 Rocky。你找格雷斯的朋友，问号。', en: 'I am Rocky. You look for friend of Grace, question.' } },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: { zh: '（真的有人。三点钟的办公室里，只有你和这条延迟很长的线。）', en: '(There really is someone. In the 3 a.m. office, it is just you and this long-delayed line.)' },
      options: [
        {
          id: 'admit_fraud',
          label: { zh: '"我……把公司搞黄了。我觉得我就是个骗子。骗了所有信我的人。"', en: '"I… I ran my company into the ground. I feel like a fraud. I conned everyone who believed in me."' },
          effects: [{ type: 'signal', delta: 13 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'deflect_joke',
          label: { zh: '"听说这儿能跟外星人聊天。反正我也睡不着，随便聊聊。"（你扯了下嘴角，没笑出来。）', en: '"Heard you can talk to an alien here. Can\'t sleep anyway, so — whatever, let\'s chat." (Your mouth twitches. No smile comes out.)' },
          effects: [{ type: 'signal', delta: 2 }],
          next: 'rocky_listen',
        },
        {
          id: 'test_credential',
          label: { zh: '"你真是那个 Rocky？救了俩文明那个？……那你肯定没失败过吧。"', en: '"You\'re really that Rocky? The one who saved two civilizations? …Then I bet you\'ve never failed."' },
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: { zh: '没失败过。错。', en: 'Never failed. Wrong.' } },
        { speaker: 'rocky', text: { zh: '我的船，23 个 Eridian 出发。到地球那个任务，活 1 个。我。', en: 'My ship. 23 Eridians set out. The mission to Earth — 1 lived. Me.' } },
        { speaker: 'rocky', text: { zh: '22 个，我没带回来。这是失败。很大的失败。', en: '22 I did not bring home. This is failure. Very big failure.' } },
        { speaker: 'rocky', text: { zh: '现在。你呼吸浅，在憋。我是工程师，看见承压的结构，我先问：什么在压它。', en: 'Now. You breathe shallow, holding it in. I am engineer. I see a structure under load, I ask first: what presses on it.' } },
        { speaker: 'rocky', text: { zh: '说。哪里坏了。', en: 'Tell me. Where did it break.' } },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: { zh: '（"22 个"这三个字，让你愣了一下。你深吸一口气。）', en: '("22." The number stops you for a moment. You take a deep breath.)' },
      options: [
        {
          id: 'failed_self',
          label: { zh: '"项目黄了。三年，烧光了钱，什么都没做成。我证明了我就是个废物。"', en: '"The project died. Three years, all the money burned, nothing to show for it. I\'ve proven I\'m just useless."' },
          effects: [{ type: 'signal', delta: 9 }],
          next: 'rocky_separate',
        },
        {
          id: 'dragged_brothers',
          label: { zh: '"最难受的不是我自己。是跟着我的几个兄弟——他们信我，把青春压进来，工资我还欠着。"', en: '"The worst part isn\'t me. It\'s the few guys who followed me — they trusted me, put their best years in, and I still owe them wages."' },
          effects: [{ type: 'signal', delta: 13 }, { type: 'flag', key: 'dragged', value: true }],
          next: 'rocky_separate',
        },
        {
          id: 'investor_family',
          label: { zh: '"投资人的钱、爸妈的养老钱，全没了。我不敢回任何人的消息。我害了所有信我的人。"', en: '"The investor\'s money, my parents\' retirement savings — all gone. I can\'t answer anyone\'s messages. I\'ve hurt everyone who believed in me."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'dragged', value: true }],
          next: 'rocky_separate',
        },
      ],
    },

    rocky_separate: {
      kind: 'scene',
      next: 'rocky_iterate',
      lines: [
        { speaker: 'rocky', text: { zh: '等。你说了两个东西。你以为是一个。', en: 'Wait. You said two things. You think they are one.' } },
        { speaker: 'rocky', text: { zh: '一个："项目失败了。" 这是事实。方案没跑通。数据。', en: 'One: "the project failed." This is fact. The design did not run. Data.' } },
        { speaker: 'rocky', text: { zh: '另一个："所以我是废物。" 这不是事实。这是你从第一个，推出来的结论。', en: 'Two: "so I am useless." This is not fact. This is a conclusion you derived from the first.' } },
        { speaker: 'caller', text: { zh: '……可结果就是这样啊。东西没成，不就说明我不行？', en: "…But that's how it turned out, isn't it? The thing failed — doesn't that mean I'm not good enough?" } },
        { speaker: 'rocky', text: { zh: '不。', en: 'No.' }, revealCardId: 'card_jf_mission' },
        { speaker: 'rocky', text: { zh: '失败的任务，不是失败的工程师。这是两个不同的东西。你把它们焊死在一起了。', en: 'A failed mission is not a failed engineer. Two different things. You welded them together.' } },
        { speaker: 'rocky', text: { zh: '焊错了。我帮你拆开。', en: 'Welded wrong. I help you take it apart.' } },
      ],
    },

    rocky_iterate: {
      kind: 'scene',
      next: 'q_guilt',
      lines: [
        { speaker: 'rocky', text: { zh: '我们救两颗星，靠的是什么。说真的：靠一堆错的假设，一个一个被推翻。', en: 'How did we save two stars. Truth: a pile of wrong assumptions, knocked down one by one.' } },
        { speaker: 'rocky', text: { zh: 'Astrophage 怎么繁殖，我们猜错过。Taumoeba 能不能活，我们猜错过。错很多很多次。', en: 'How Astrophage breeds — we guessed wrong. Whether Taumoeba could live — we guessed wrong. Wrong many many times.' } },
        { speaker: 'rocky', text: { zh: '没有哪个假设，是一次就对的。重要的，不是"对"。重要的，是还在迭代。', en: 'No assumption was right the first time. The important thing is not "right." The important thing is still iterating.' } },
        { speaker: 'rocky', text: { zh: '一个被推翻的方案，是数据。不是判决书。', en: 'A design that gets knocked down is data. Not a verdict.' } },
      ],
    },

    q_guilt: {
      kind: 'choice',
      choiceId: 'q_guilt',
      prompt: { zh: '（你沉默了一会儿。但有个东西还压在胸口，绕不过去。）', en: '(You go quiet for a while. But something still sits on your chest, and you cannot get around it.)' },
      options: [
        {
          id: 'not_about_me',
          label: { zh: '"道理我懂。可那不是我一个人的赌。是别人的钱、别人的时间。我凭什么再试？"', en: '"I get the logic. But it wasn\'t just my bet. It was other people\'s money, other people\'s time. What right do I have to try again?"' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'cant_face',
          label: { zh: '"我最怕的不是钱。是他们的脸。我不敢看，不敢回消息。我躲了一个月了。"', en: '"What scares me most isn\'t the money. It\'s their faces. I can\'t look at them, can\'t answer their messages. I\'ve been hiding for a month."' },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'avoiding', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'numb',
          label: { zh: '"……我不知道。我现在什么都感觉不到，又什么都压着。乱的。"', en: '"…I don\'t know. Right now I feel nothing, and everything\'s pressing down at once. It\'s all a mess."' },
          effects: [{ type: 'signal', delta: 5 }],
          next: 'gate_grace',
        },
      ],
    },

    rocky_load: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: { zh: '"我害了跟着我的人。" 这个，是真的负载。我不骗你说它轻。', en: '"I hurt the people who followed me." This is real load. I will not lie and say it is light.' } },
        { speaker: 'rocky', text: { zh: '我也背着 22 个。每天。它不会变成零。', en: 'I carry 22 too. Every day. It does not become zero.' } },
        { speaker: 'rocky', text: { zh: '但你现在背的，多了一块多余的。那块写着："所以我没资格再试。"', en: 'But what you carry now has one extra piece. That piece reads: "so I have no right to try again."' } },
        { speaker: 'rocky', text: { zh: '这块，是焊错的逻辑。不是愧疚本身。是愧疚里，多长出来的一个错误结论。', en: 'That piece is wrong-welded logic. Not the guilt itself. A wrong conclusion that grew out of the guilt.' } },
        { speaker: 'rocky', text: { zh: '愧疚你留着。它让你下次更小心，对人更负责。多余那块，卸掉。它只让结构瘫，谁都救不了。', en: 'Keep the guilt. It makes you more careful next time, more responsible to people. The extra piece — drop it. It only makes the structure fail. It saves no one.' } },
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
        { speaker: 'rocky', text: { zh: '等一下。这个，我船上有个人比我更懂。他跟我，一起死过人。', en: 'Wait. This one — someone on my ship knows it better than me. He and I, together, lost people.' } },
        { speaker: 'rocky', text: { zh: '格雷斯！过来。一个地球人，觉得自己连累了所有人。', en: 'Grace! Come here. An Earth human. Thinks he dragged everyone down.' } },
        { speaker: 'grace', text: { zh: '嘿。我是格雷斯。', en: "Hey. I'm Grace." } },
        { speaker: 'grace', text: { zh: '救那两颗星的过程里，我们错了无数次。试错的代价，不是钱。是命。真的有人，因为我们判断错了，没能回来。', en: "Saving those two stars, we got it wrong countless times. And the cost of being wrong wasn't money. It was lives. People didn't come back because we made the wrong call." } },
        { speaker: 'grace', text: { zh: '我也躺在床上想过：我有什么资格继续。是我害的。', en: "I lay awake too, thinking: what right do I have to go on. This is my fault." } },
        { speaker: 'grace', text: { zh: '我们还是继续了。不是因为不痛——到今天还痛。', en: 'We kept going anyway. Not because it stopped hurting — it still hurts, even now.' }, revealCardId: 'card_jf_iterate' },
        { speaker: 'grace', text: { zh: '是因为，痛的人坐着不动，没有一个人会因此活过来。还有下一步要走，才走得下去。', en: 'But no one comes back to life because the hurting person sits still. There was a next step to take — and that\'s what let us keep walking.' } },
        { speaker: 'grace', text: { zh: '好了，我去看仪器了。Rocky，把那块多余的重量帮他卸了。', en: "Okay, I'm off to check the instruments. Rocky — help him take that extra weight off." } },
        { speaker: 'rocky', text: { zh: '正在卸。陈述。', en: 'Taking it off now. Statement.' } },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: { zh: '（窗外还黑着。胸口那块东西，没消失，但好像能挪动了。明天，你能先做一件什么？）', en: '(Outside, it is still dark. The weight on your chest has not vanished — but it seems movable now. Tomorrow, what is the one thing you can do first?)' },
      options: [
        {
          id: 'send_honest',
          label: { zh: '"有个人我一直不敢面对。我想给他发条消息——不是解释，就是承认，加一句谢谢。"', en: '"There\'s one person I\'ve never been able to face. I want to send him a message — not an explanation, just an admission, and a thank-you."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'reach_out', value: true }],
          next: 'end_main',
        },
        {
          id: 'write_lesson',
          label: { zh: '"我想写下来——这次失败里，我真的学到、下次用得上的一件事。就一件。"', en: '"I want to write it down — the one thing I really learned from this failure, the one thing I can use next time. Just one."' },
          effects: [{ type: 'signal', delta: 11 }, { type: 'flag', key: 'wrote_lesson', value: true }],
          next: 'end_main',
        },
        {
          id: 'just_rest',
          label: { zh: '"……我先睡吧。今天太长了。剩下的明天再说。"', en: '"…I\'ll just sleep first. Today\'s been too long. The rest can wait for tomorrow."' },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'jf_end',
      lines: [
        { speaker: 'rocky', text: { zh: '好。', en: 'Good.' } },
        { speaker: 'narrator', text: { zh: '你看了一眼墙上那行"还有 30 天上线"的倒计时。这一次，你站起来，把它撕了下来。', en: 'You glance at the countdown on the wall — "30 days to launch." This time, you stand up and tear it down.' } },
      ],
      variants: [
        {
          when: { type: 'flag', key: 'reach_out', equals: true },
          lines: [
            { speaker: 'narrator', text: { zh: '你点开那个躲了一个月的对话框。删掉了好几版辩解。最后只留下三行：对不起，工资我一定补上。这三年，谢谢你信我。', en: 'You open the chat you have dodged for a month. You delete several drafts of excuses. In the end you keep three lines: I\'m sorry. I will pay back the wages, I promise. Thank you for believing in me these three years.' } },
            { speaker: 'rocky', text: { zh: '诚实的信号，最难发。也最值。明天，按发送。', en: 'An honest signal is the hardest to send. Also worth the most. Tomorrow — press send.' } },
          ],
        },
        {
          when: { type: 'flag', key: 'wrote_lesson', equals: true },
          lines: [
            { speaker: 'narrator', text: { zh: '你撕下一张便利贴，写下那一件事——不是后悔的事，是真的学会的事。然后贴在屏幕边上。', en: 'You tear off a sticky note and write down that one thing — not the thing you regret, the thing you actually learned. Then you stick it to the edge of your monitor.' } },
            { speaker: 'rocky', text: { zh: '把数据存好。下一个任务，会需要它。', en: 'Save the data well. The next mission will need it.' } },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '好好好。你呼吸，不那么浅了。憋着的东西，松了一点。', en: 'Good good good. Your breathing — not so shallow now. The thing you held in, loosened a little.' } },
            { speaker: 'rocky', text: { zh: '去睡，朋友。22 个我背着，你的几个你背着。背得动的人，明天接着走。', en: 'Go sleep, friend. My 22 I carry, your few you carry. The one who can still carry it walks on tomorrow.' } },
            { speaker: 'rocky', text: { zh: '那盆多肉，是上一版死了。不是你死了。下一版，换个浇水的量。', en: 'That succulent — it is the last version that died. Not you. Next version, change how much you water it.' } },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '我不多说。', en: 'I will not say much.' } },
            { speaker: 'rocky', text: { zh: '今晚你只记住一件事就好：任务失败了，工程师还在。两个东西。别焊在一起。', en: 'Tonight, remember just one thing: the mission failed, the engineer is still here. Two things. Do not weld them together.' } },
            { speaker: 'narrator', text: { zh: '你没回太多。但挂线前，你对着那盆死掉的多肉，轻轻"嗯"了一声。然后关了灯。', en: 'You don\'t say much back. But before the line drops, you give the dead succulent a small "mm." Then you turn off the light.' } },
          ],
        },
      ],
    },
  },
};
