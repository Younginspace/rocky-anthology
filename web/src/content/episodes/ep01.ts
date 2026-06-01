import type { Episode } from '../../engine/types';

/**
 * ep01 ·《二战的夜》· 林晚 — 考研二战+考公 / AI 焦虑。
 *
 * GOLD-STANDARD TEMPLATE. New episodes copy this shape:
 *  - opening scene (narrator sets the night) → connect → first choice (stance)
 *  - Rocky runs the engineer pipeline (observe → misunderstand → ask data →
 *    reduce to constraints → one action) before any "wisdom"
 *  - 2–3 choice points; branches reconverge
 *  - a Grace gate: or(signalAtLeast 60, flagSet 'engaged')
 *  - one ending node + layered variants (warm / quiet / agency)
 *  - exactly 2 wisdom cards, revealed on spine scenes
 */
export const ep01: Episode = {
  id: 'ep01',
  order: 1,
  title: { zh: '两点钟的汇率', en: 'The 2 A.M. Rate' },
  subtitle: { zh: '林晚 · 考研二战 / 考公', en: 'Lin Wan · second run at the grad-school exam' },
  theme: { zh: '当你怕自己的努力会被机器取代', en: 'When you fear a machine will replace everything you worked for' },
  caller: {
    id: 'lin_wan',
    handle: 'LW-0207',
    realName: { zh: '林晚', en: 'Lin Wan' },
    age: 23,
    location: { zh: '某二线城市 · 城中村出租屋', en: 'A second-tier city · a rented room in the urban-village blocks' },
    tagline: { zh: '二战考研 + 考公，一战已经失败过一次', en: 'Second run at the grad-school exam, plus the civil-service track — she failed the first time' },
    reason: { zh: '凌晨两点，又一次模考崩了。她刷到一条新闻——AI 又能做某件她正在学的事了。', en: 'Two in the morning, another mock exam in pieces. Then a headline slides past: another AI can now do something she is still trying to learn.' },
    outcomeShort: { zh: '她没有立刻"想通"。但那天之后，她重新做题是为了弄懂，不是为了打败谁。', en: 'She did not suddenly "figure it all out." But after that night, she went back to the problems to understand them — not to beat anyone.' },
    morningBeat: { zh: '林晚翻开旧笔记，找出那道她曾经熬夜推出来的题——这次，她想用自己的话再讲一遍。', en: 'Lin Wan opens her old notebook and finds the problem she once stayed up all night to crack — this time, she wants to explain it again, in her own words.' },
    accent: 'amber',
  },
  cards: [
    { id: 'card_lw_caring', episodeId: 'ep01', speaker: 'rocky', text: { zh: '没用的东西，不会半夜怕。会怕，说明在乎。在乎是稀缺材料。', en: 'A truly useless thing does not lie awake at 2 a.m., afraid. You are afraid — so you care. Caring is a scarce material.' } },
    { id: 'card_lw_choose', episodeId: 'ep01', speaker: 'rocky', text: { zh: '机器做你的题。机器不想做你的题。"想"，机器没有。你有。', en: 'Machine does your problem. Machine does not WANT to do your problem. "Want" — machine has none. You have it.' } },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: { zh: '〔星际通讯线 · ERID↔地球〕今晚第 14 通来电', en: '[INTERSTELLAR LINE · ERID↔EARTH] Call #14 tonight' }, stage: { zh: '信号建立中…', en: 'establishing link…' } },
        { speaker: 'narrator', text: { zh: '凌晨两点零七分。出租屋的灯没开。', en: '2:07 a.m. The light in the rented room is off.' } },
        { speaker: 'narrator', text: { zh: '模考的分数还亮在屏幕上。手机里另一条推送刚弹出来：又一个 AI，又能做一件你正在学的事了。', en: 'The mock-exam score is still glowing on the screen. Another notification just surfaced on your phone: another AI can now do one more thing you are still trying to learn.' } },
        { speaker: 'narrator', text: { zh: '朋友圈最上面那条："上岸啦！"配九张图。', en: 'At the top of the feed: "Made it!" — with nine photos.' } },
        { speaker: 'narrator', text: { zh: '你点开收藏夹最底下那个链接。当年高三读《挽救计划》时存的。你也不知道自己在干嘛。', en: 'You open the link at the very bottom of your bookmarks. You saved it back in your last year of high school, while reading Project Hail Mary. You have no idea what you are doing.' } },
        { speaker: 'narrator', text: { zh: '拨号音很长。比一般的电话长得多。', en: 'The dial tone goes on for a long time. Much longer than an ordinary call.' } },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: { zh: '● 信号接通 · 延迟 4.2 秒', en: '● SIGNAL LIVE · DELAY 4.2s' }, stage: { zh: '', en: '' } },
        { speaker: 'rocky', text: { zh: '接通。一个地球信号。', en: 'Connected. One Earth signal.' } },
        { speaker: 'rocky', text: { zh: '一个人类。软软的。声音……紧。', en: 'One human. Soft. Voice… tight.' } },
        { speaker: 'rocky', text: { zh: '我是 Rocky。你找格雷斯的朋友，问号。', en: 'I am Rocky. You look for the friend of Grace. Question.' } },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: { zh: '（电话那头真的有人。你张了张嘴。）', en: '(There really is someone on the other end. You open your mouth.)' },
      options: [
        {
          id: 'admit_lost',
          label: { zh: '"我……其实也不知道为什么打来。就是，有点撑不住了。"', en: '"I… honestly don\'t even know why I called. I just — I can\'t really hold it together right now."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'deflect',
          label: { zh: '"听说这儿能跟外星人聊天，来试试呗。"（你笑了一下，没什么力气。）', en: '"Heard you can chat with an alien on this line. Figured I\'d give it a shot." (You manage a small, tired laugh.)' },
          effects: [{ type: 'signal', delta: 2 }],
          next: 'rocky_listen',
        },
        {
          id: 'test',
          label: { zh: '"你真是那个 Rocky？证明一下。"', en: '"You\'re really that Rocky? Prove it."' },
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: { zh: '证明。好。我体温 96 度。我有一个妻。我从零，和格雷斯，造出一种语言。够，问号。', en: 'Prove. Good. My body runs 96 degrees. I have a wife. From zero, with Grace, I built a language. Enough. Question.' } },
        { speaker: 'rocky', text: { zh: '现在。你声音紧。像材料，应力到极限。快裂的那种。', en: 'Now. Your voice is tight. Like material, stress at the limit. The kind about to crack.' } },
        { speaker: 'rocky', text: { zh: '我是工程师。看见快裂的东西，我想知道：什么在压它。', en: 'I am engineer. I see a thing about to crack, I want to know: what is the load on it.' } },
        { speaker: 'rocky', text: { zh: '发生什么。说。', en: 'What happened. Tell me.' } },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: { zh: '（你深吸一口气。）', en: '(You take a deep breath.)' },
      options: [
        {
          id: 'replaced',
          label: { zh: '"我学的这些，AI 现在都能做了。我考上又怎样，我是不是……本来就没用。"', en: '"Everything I\'m studying — AI can do it now. So what if I pass? Maybe I was… useless to begin with."' },
          effects: [{ type: 'signal', delta: 8 }],
          next: 'rocky_refuse',
        },
        {
          id: 'compare',
          label: { zh: '"别人都上岸了，朋友圈一个接一个。就我还在原地，二战了还在原地。"', en: '"Everyone else made it — one after another on the feed. Only I\'m still stuck. Second run, and still stuck in the same place."' },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'compare', value: true }],
          next: 'rocky_refuse',
        },
        {
          id: 'money',
          label: { zh: '"我妈为了让我二战，把接的私活都推了。我要是再考不上……我怕辜负她。"', en: '"My mom turned down side jobs so I could try again. If I fail one more time… I\'m scared I\'ll let her down."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'money', value: true }],
          next: 'rocky_refuse',
        },
      ],
    },

    rocky_refuse: {
      kind: 'scene',
      next: 'rocky_question',
      lines: [
        { speaker: 'rocky', text: { zh: '等。你想我说："AI 比不上人类"。我们辩论。你赢，你舒服五分钟。', en: 'Wait. You want me to say: "AI cannot match a human." We debate. You win. You feel good five minutes.' } },
        { speaker: 'rocky', text: { zh: '不。我不辩论。辩论不修东西。', en: 'No. I do not debate. Debate fixes nothing.' } },
        { speaker: 'rocky', text: { zh: '我问你一个工程问题。那个会做你的题的机器——它会"选"要解决哪个问题，问号。', en: 'I ask you an engineering question. The machine that does your problem — does it CHOOSE which problem to solve. Question.' } },
        { speaker: 'caller', text: { zh: '……不会。问题是人给它的。', en: '…No. A person gives it the problem.' } },
        { speaker: 'rocky', text: { zh: '对。', en: 'Correct.' }, revealCardId: 'card_lw_choose' },
        { speaker: 'rocky', text: { zh: '机器做你的题。机器不"想"做你的题。"想"，机器没有。你有。挑问题的，没被取代。', en: 'Machine does your problem. Machine does not WANT to do your problem. "Want" — machine has none. You have it. The one who picks the problem is not replaced.' } },
      ],
    },

    rocky_question: {
      kind: 'scene',
      next: 'q_remember',
      lines: [
        { speaker: 'rocky', text: { zh: '所以我问的不是"你考不考得上"。', en: 'So I do not ask "will you pass the exam."' } },
        { speaker: 'rocky', text: { zh: '我问：在恐惧替你挑问题之前——你自己挑的，是哪个问题。', en: 'I ask: before fear picks the problem for you — which problem did YOU pick.' } },
        { speaker: 'rocky', text: { zh: '想一下。慢慢。延迟没关系，我等。', en: 'Think. Slow. The delay is fine. I wait.' } },
      ],
    },

    q_remember: {
      kind: 'choice',
      choiceId: 'q_remember',
      prompt: { zh: '（你愣住了。这个问题很久没人问过你，连你自己都没问过。）', en: '(You freeze. No one has asked you this in a long time — not even you.)' },
      options: [
        {
          id: 'loved',
          label: { zh: '"……我以前是真的喜欢过。大一有道题，我熬到天亮才推出来，开心得睡不着。"', en: '"…I really did love it once. Freshman year, there was this problem — I worked it till dawn to crack it, and I was too happy to sleep."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'loved_it', value: true }],
          next: 'gate_grace',
        },
        {
          id: 'forgot',
          label: { zh: '"不记得了。现在脑子里只剩排名、分数线、还差多少分。"', en: '"I don\'t remember. All that\'s left in my head now is rankings, cutoff scores, how many points I\'m short."' },
          effects: [{ type: 'signal', delta: 6 }],
          next: 'gate_grace',
        },
        {
          id: 'angry',
          label: { zh: '"挑问题？我现在连选择的资格都快没了，还谈什么挑。"', en: '"Pick a problem? I\'m about to lose the right to choose anything — what\'s there to pick?"' },
          effects: [{ type: 'signal', delta: 6 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'gate_grace',
        },
      ],
    },

    gate_grace: {
      kind: 'branch',
      branches: [
        { when: { type: 'or', any: [{ type: 'signalAtLeast', value: 60 }, { type: 'flagSet', key: 'engaged' }] }, goto: 'grace_in' },
      ],
      else: 'rocky_story',
    },

    grace_in: {
      kind: 'scene',
      next: 'rocky_caring',
      lines: [
        { speaker: 'rocky', text: { zh: '等一下。这个问题，我船上有个人比我会答。', en: 'Wait. This question, someone on my ship answers better than me.' } },
        { speaker: 'rocky', text: { zh: '格雷斯！过来。一个地球人，怕自己没用。', en: 'Grace! Come. An Earth person. Afraid she is useless.' } },
        { speaker: 'grace', text: { zh: '嘿。我是格雷斯。', en: 'Hey. I\'m Grace.' } },
        { speaker: 'grace', text: { zh: '我以前是科学家。后来论文被推翻，学术圈把我扫地出门，我去当了中学老师。所有人都觉得我废了，包括我自己。', en: 'I used to be a scientist. Then my paper got torn apart, academia swept me out the door, and I ended up teaching high school. Everyone figured I was finished — including me.' } },
        { speaker: 'grace', text: { zh: '结果你知道吗——我这辈子最重要的工作，是在我以为自己最没用的那几年里，攒下来的。教书攒的。', en: 'And you know what? The most important work of my whole life came out of exactly those years I thought I was worthless. I built it teaching.' } },
        { speaker: 'grace', text: { zh: '"有没有用"这件事，常常要很久以后才结算。别用今晚两点钟的汇率，去卖掉你自己。', en: 'Whether something turns out to matter — that usually doesn\'t settle until much later. Don\'t sell yourself off at the exchange rate of two in the morning.' } },
        { speaker: 'grace', text: { zh: '好了，我去看仪器了。Rocky，对她好点。', en: 'All right, I\'m back to the instruments. Rocky — be good to her.' } },
        { speaker: 'rocky', text: { zh: '我一直好。陈述。', en: 'I am always good. Statement.' } },
      ],
    },

    rocky_story: {
      kind: 'scene',
      next: 'rocky_caring',
      lines: [
        { speaker: 'rocky', text: { zh: '我说个我的事。', en: 'I tell you a thing about me.' } },
        { speaker: 'rocky', text: { zh: '我的船，23 个 Eridian。到这里，活 1 个。我。', en: 'My ship. 23 Eridians. Arrive here, 1 alive. Me.' } },
        { speaker: 'rocky', text: { zh: '我活下来，不是因为我最强。是我的工作台，恰好靠近燃料，挡了辐射。我当时不知道。', en: 'I lived, not because I am strongest. My workbench happened to sit near the fuel. It blocked the radiation. I did not know at the time.' } },
        { speaker: 'rocky', text: { zh: '能力，运气，还活着，还在做事。四个一起，我才在这儿。', en: 'Skill. Luck. Still alive. Still working. Four together — that is why I am here.' } },
        { speaker: 'rocky', text: { zh: '没有谁，是因为"够格"才活下来的。活着的人，接着做下一件事。就这样。', en: 'No one lived because they "deserved" it. The ones alive do the next thing. That is all.' } },
      ],
    },

    rocky_caring: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: { zh: '还有一件事，关于你。', en: 'One more thing. About you.' } },
        { speaker: 'rocky', text: { zh: '一个真没用的东西，不会半夜两点，怕成这样。', en: 'A truly useless thing does not sit at 2 a.m., afraid like this.' }, revealCardId: 'card_lw_caring' },
        { speaker: 'rocky', text: { zh: '你会怕，说明你在乎。在乎，是稀缺材料。机器没有。', en: 'You are afraid — so you care. Caring is a scarce material. Machine has none.' } },
        { speaker: 'rocky', text: { zh: '别把稀缺材料，当垃圾扔了。', en: 'Do not throw scarce material out with the trash.' } },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: { zh: '（窗外天还黑着。但有什么东西，松动了一点点。）', en: '(Outside, the sky is still dark. But something has loosened, just a little.)' },
      options: [
        {
          id: 'rewrite',
          label: { zh: '"我想……把那道我曾经喜欢的题，用我自己的话，重新讲一遍。不为考试。"', en: '"I want to… take that problem I used to love, and explain it again in my own words. Not for the exam."' },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'line',
          label: { zh: '"我想给自己划条线。哪些事交给 AI，哪些我自己来。我来决定。"', en: '"I want to draw a line for myself. What I hand to the AI, and what I do myself. I decide."' },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'sleep',
          label: { zh: '"……我先睡吧。今天先到这儿。"', en: '"…I think I\'ll sleep now. That\'s enough for tonight."' },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'lw_end',
      lines: [
        { speaker: 'rocky', text: { zh: '好。', en: 'Good.' } },
        { speaker: 'narrator', text: { zh: '你关掉了那个还亮着分数的页面。也关掉了刷了一晚的招聘 App。', en: 'You close the page still glowing with that score. You also close the job app you scrolled all night.' } },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'agency' },
          lines: [
            { speaker: 'narrator', text: { zh: '你翻出大一的旧笔记本，一页页找。找那道你曾经熬到天亮的题。', en: 'You dig out your freshman-year notebook and turn the pages, one by one — looking for the problem you once stayed up till dawn to solve.' } },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '好好好。你声音，不那么紧了。材料松回来了。', en: 'Good good good. Your voice — not so tight now. Material relaxed back.' } },
            { speaker: 'rocky', text: { zh: '去睡，漏水的太空团子。我在这头。线一直开着。', en: 'Go sleep, leaky space blob. I am on this end. Line stays open.' } },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '我不多说。', en: 'I do not say much.' } },
            { speaker: 'rocky', text: { zh: '去睡。明天，弄懂一个问题就好。一个。', en: 'Go sleep. Tomorrow, understand one problem. One.' } },
            { speaker: 'narrator', text: { zh: '你没说太多。但挂电话前，你轻轻"嗯"了一声。然后关了灯。', en: 'You don\'t say much. But before you hang up, you let out a soft "mm." Then you turn off the light.' } },
          ],
        },
      ],
    },
  },
};
