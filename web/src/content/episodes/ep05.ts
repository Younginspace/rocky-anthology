import type { Episode } from '../../engine/types';

/**
 * ep05 ·《知识怎么活过一代人》· 顾岚 — 中学老师 / 倦怠。
 *
 * THE GRACE-HEAVY EPISODE. Grace (himself a teacher) gets the main course:
 * a rich three-way Rocky + Grace + 顾岚 conversation. The gate is easy to
 * pass on purpose — every first stance routes toward `engaged`.
 *
 * Shape (copies ep01):
 *  - opening scene (system + narrator + 今晚第 N 通来电) → connect → stance choice
 *  - Rocky runs the engineer pipeline (observe → misunderstand → ask data →
 *    constraints → one action) before any "wisdom"
 *  - gate_grace: or(signalAtLeast 60, flagSet 'engaged') → grace_in (4–6 Grace
 *    lines), else → shorter Rocky-only path that STILL says Grace taught him
 *  - reconverge → 落地 choice (agency flag) → one ending + variants
 *  - exactly 2 wisdom cards on reachable spine scenes
 */
export const ep05: Episode = {
  id: 'ep05',
  order: 5,
  title: { zh: '最后一排', en: 'The Back Row' },
  subtitle: { zh: '顾岚 · 中学老师 / 倦怠', en: 'Gu Lan · middle-school teacher / burned out' },
  theme: { zh: '当你怀疑自己教的东西到底有没有用', en: 'When you wonder whether anything you teach actually matters' },
  caller: {
    id: 'gu_lan',
    handle: 'GL-0901',
    realName: { zh: '顾岚', en: 'Gu Lan' },
    age: 41,
    location: { zh: '某县城中学 · 教师宿舍', en: 'A county-town middle school · the teachers’ dormitory' },
    tagline: { zh: '教了快二十年书，热情快被磨光了', en: 'Almost twenty years of teaching, and the spark is nearly worn through' },
    reason: { zh: '深夜，又改完一摞卷子。她盯着满分和零分中间那一长串数字，突然不知道这些到底改变了什么。', en: 'Late at night, another stack of exams marked. She stares at the long run of numbers between top score and zero, and suddenly has no idea what any of it ever changed.' },
    outcomeShort: { zh: '她没有立刻找回热情。但第二天，她对一个总坐最后一排的孩子，做了一件不为分数的小事。', en: 'She did not get the fire back overnight. But the next day, for the kid who always sits in the back row, she did one small thing that had nothing to do with grades.' },
    morningBeat: { zh: '顾岚走进教室，没急着讲题。她叫了那个总坐最后一排的孩子的名字——这次，她记得这个名字背后的事。', en: 'Gu Lan walks into the classroom and, for once, doesn’t rush into the lesson. She says the name of the kid in the back row — and this time, she remembers the story behind that name.' },
    accent: 'gold',
  },
  cards: [
    { id: 'card_gl_survive', episodeId: 'ep05', speaker: 'rocky', text: { zh: '知识不会自己活。要有人，把它交给下一个人。老师，是知识的飞船。', en: 'Knowledge does not live on its own. Someone must hand it to the next one. A teacher is the ship knowledge rides.' } },
    { id: 'card_gl_unmeasured', episodeId: 'ep05', speaker: 'grace', text: { zh: '你救的那个，测不出来。但他还在。够了。', en: 'The one you saved — you cannot measure it. But they are still here. That is enough.' } },
  ],
  startNodeId: 'ring',
  nodes: {
    ring: {
      kind: 'scene',
      next: 'connect',
      lines: [
        { speaker: 'system', text: { zh: '〔星际通讯线 · ERID↔地球〕今晚第 23 通来电', en: '[INTERSTELLAR LINE · ERID↔EARTH] Call #23 tonight' }, stage: { zh: '信号建立中…', en: 'establishing link…' } },
        { speaker: 'narrator', text: { zh: '晚上十一点四十。教师宿舍的台灯下，一摞卷子刚批完。', en: '11:40 p.m. Under the desk lamp in the teachers’ dorm, the last stack of exams is finally marked.' } },
        { speaker: 'narrator', text: { zh: '红笔的墨快干了。最高分九十七，最低分三十一，中间是一长串你已经看了快二十年的数字。', en: 'The red pen is almost dry. Top score ninety-seven, bottom thirty-one, and in between a long run of numbers you’ve been reading for nearly twenty years.' } },
        { speaker: 'narrator', text: { zh: '今天教研会上，主任又说"现在谁还当老师啊"，说得像在安慰你，又像在提醒你。', en: 'At today’s faculty meeting the department head said it again — "who even goes into teaching anymore" — in a tone that was half comfort, half warning.' } },
        { speaker: 'narrator', text: { zh: '你点开那个存了很久的链接——据说能拨通一个外星人。你也说不清自己想问什么。', en: 'You open a link you saved long ago — supposedly it dials through to an alien. You couldn’t even say what you mean to ask.' } },
        { speaker: 'narrator', text: { zh: '拨号音很长。比一般的电话长得多。', en: 'The dial tone is long. Much longer than any ordinary call.' } },
      ],
    },

    connect: {
      kind: 'scene',
      next: 'q_open',
      lines: [
        { speaker: 'system', text: { zh: '● 信号接通 · 延迟 4.2 秒', en: '● SIGNAL LIVE · DELAY 4.2s' }, stage: { zh: '', en: '' } },
        { speaker: 'rocky', text: { zh: '接通。一个地球信号。', en: 'Connected. One Earth signal.' } },
        { speaker: 'rocky', text: { zh: '一个人类。声音……累。累很久那种。', en: 'One human. Voice… tired. The kind tired a long time.' } },
        { speaker: 'rocky', text: { zh: '我是 Rocky。你找格雷斯的朋友，问号。', en: 'I am Rocky. You look for Grace’s friend. Question.' } },
      ],
    },

    q_open: {
      kind: 'choice',
      choiceId: 'q_open',
      prompt: { zh: '（电话那头真的有人。你一时不知道从哪说起。）', en: '(There really is someone on the other end. For a moment you don’t know where to begin.)' },
      options: [
        {
          id: 'admit',
          label: { zh: '"我是个老师。教了快二十年。今晚……突然不知道自己教的这些，到底有没有用。"', en: '"I’m a teacher. Nearly twenty years. Tonight… I suddenly don’t know if any of what I teach matters at all."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'wry',
          label: { zh: '"听说这条线能找格雷斯。我听说他也教书，我想跟个同行聊聊。"', en: '"I heard this line reaches Grace. I heard he teaches too — I wanted to talk to someone in the same trade."' },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_listen',
        },
        {
          id: 'guard',
          label: { zh: '"也没什么大事。就是改卷子改到有点麻木，随便打来试试。"', en: '"It’s nothing, really. Just marked papers till I went numb, figured I’d try the line."' },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'rocky_listen',
        },
      ],
    },

    rocky_listen: {
      kind: 'scene',
      next: 'q_problem',
      lines: [
        { speaker: 'rocky', text: { zh: '老师。等。这个词我熟。', en: 'Teacher. Wait. This word I know.' } },
        { speaker: 'rocky', text: { zh: '我会的人类的东西，都是一个老师教的。一个。格雷斯。后面再说他。', en: 'Everything human I know, one teacher taught me. One. Grace. I tell you about him later.' } },
        { speaker: 'rocky', text: { zh: '现在你。声音累，但没断。像一台机器，跑太久，没坏，只是想停。', en: 'Now you. Voice tired, but not broken. Like a machine, run too long. Not broken. Just wants to stop.' } },
        { speaker: 'rocky', text: { zh: '我是工程师。机器想停，我先问：哪个部件在磨。说。', en: 'I am engineer. Machine wants to stop, I ask first: which part is wearing. Say.' } },
      ],
    },

    q_problem: {
      kind: 'choice',
      choiceId: 'q_problem',
      prompt: { zh: '（你叹了口气，像把一口憋了很久的气吐出来。）', en: '(You let out a breath — like air you’d been holding for a very long time.)' },
      options: [
        {
          id: 'measure',
          label: { zh: '"分数之外，我到底改变了什么？我教的东西，考完就忘，我量不出来自己有没有用。"', en: '"Beyond the grades, what have I actually changed? They forget what I teach the moment the exam ends. I can’t measure whether I’m any use at all."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_misunderstand',
        },
        {
          id: 'machine',
          label: { zh: '"学生被刷题刷成了机器，我也被刷成了讲题机器。这还叫教书吗。"', en: '"The drilling turns students into machines, and it turns me into a machine that recites problems. Is that even teaching?"' },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_misunderstand',
        },
        {
          id: 'burnout',
          label: { zh: '"刚入行时我是真的热爱。现在那股劲，被一年一年磨没了。"', en: '"When I started I truly loved it. That drive — year by year, it’s been worn away to nothing."' },
          effects: [{ type: 'signal', delta: 8 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'rocky_misunderstand',
        },
      ],
    },

    rocky_misunderstand: {
      kind: 'scene',
      next: 'rocky_pipeline',
      lines: [
        { speaker: 'rocky', text: { zh: '等。我先理解"老师"。我按字面理解，可能错。你纠正我。', en: 'Wait. First I understand "teacher." I take it literal. Maybe wrong. You correct me.' } },
        { speaker: 'rocky', text: { zh: '老师，就是：你脑子里有东西。学生脑子里没有。你把东西，搬过去。', en: 'Teacher is: thing in your head. Not in student head. You carry thing across.' } },
        { speaker: 'caller', text: { zh: '……差不多吧。可搬过去，他们考完就还回来了，忘光。', en: '…more or less. But once it’s carried over, they hand it right back after the exam. Forget all of it.' } },
        { speaker: 'rocky', text: { zh: '不。搬过去，你脑子里那份没少。两边都有了。这不是搬。这是……复制。备份。', en: 'No. Carry across, the copy in your head does not shrink. Now both sides have it. Not carrying. This is… copy. Backup.' } },
        { speaker: 'rocky', text: { zh: '工程里，备份有个名字。冗余。一份坏了，另一份还在。', en: 'In engineering, backup has a name. Redundancy. One copy fails, the other still there.' } },
      ],
    },

    rocky_pipeline: {
      kind: 'scene',
      next: 'rocky_survive',
      lines: [
        { speaker: 'rocky', text: { zh: '我要更多数据。问号。', en: 'I want more data. Question.' } },
        { speaker: 'rocky', text: { zh: 'Eridian 也教。必须教。一个 Eridian 死了，他脑子里的东西，不写下来，没人接——就跟着他一起没了。永远。', en: 'Eridian teach too. Must teach. One Eridian dies, the thing in his head — not written down, no one catches it — it dies with him. Forever.' } },
        { speaker: 'rocky', text: { zh: '我们没有你们的纸。我们靠声音，一代，传给下一代。传错一点，下一代造的桥，塌。', en: 'We have no paper like yours. We use sound. One generation, hands to the next. Hand it wrong a little, the bridge the next builds — falls.' } },
        { speaker: 'rocky', text: { zh: '所以对我们，"教"，不是搬运。是让知识，活过一个会死的人。', en: 'So for us, "teach" is not carrying. It is making knowledge live past a person who dies.' } },
      ],
    },

    rocky_survive: {
      kind: 'scene',
      next: 'gate_grace',
      lines: [
        { speaker: 'rocky', text: { zh: '你问，分数之外改变了什么。我换个问法。', en: 'You ask, beyond grades what did you change. I ask it different.' } },
        { speaker: 'rocky', text: { zh: '一个人会死。他脑子里的东西，本来跟他一起死。', en: 'A person dies. The thing in his head was going to die with him.', }, revealCardId: 'card_gl_survive' },
        { speaker: 'rocky', text: { zh: '知识不会自己活。要有人，把它，交给下一个人。', en: 'Knowledge does not live on its own. Someone must hand it to the next one.' } },
        { speaker: 'rocky', text: { zh: '老师，是知识的飞船。坐满了人，飞过一代人的死。', en: 'A teacher is the ship knowledge rides. Loaded full, it flies past the death of a generation.' } },
        { speaker: 'rocky', text: { zh: '你飞了快二十年。这个，分数那一栏，量不出来。', en: 'You have been flying nearly twenty years. This — the grades column cannot measure it.' } },
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
      next: 'grace_talk',
      lines: [
        { speaker: 'rocky', text: { zh: '等。这个，他比我会答。他自己就是老师。', en: 'Wait. This one, he answers better than me. He is a teacher himself.' } },
        { speaker: 'rocky', text: { zh: '格雷斯！过来。一个地球老师，教了二十年，问值不值。', en: 'Grace! Come. An Earth teacher, taught twenty years, asks if it was worth it.' } },
        { speaker: 'grace', text: { zh: '嘿，我是格雷斯。二十年……比我久。我也教书。', en: 'Hey, I’m Grace. Twenty years… that’s longer than me. I teach too.' } },
        { speaker: 'caller', text: { zh: '听说你以前是科学家。怎么会跑去……教书？', en: 'I heard you used to be a scientist. How did you end up… teaching?' } },
        { speaker: 'grace', text: { zh: '说来不光彩。我的论文被推翻，学术圈待不下去了，灰头土脸。能去的地方，只剩一所中学。', en: 'It’s not a flattering story. A paper of mine got torn down, the academic world had no room for me, and I slunk off with my tail between my legs. The only place that would take me was a middle school.' } },
        { speaker: 'grace', text: { zh: '我那时候觉得，这是退而求其次。降级。我一个搞分子生物的，去给十六岁的孩子讲细胞，憋屈。', en: 'Back then I thought of it as settling — a demotion. A molecular biologist, explaining cells to sixteen-year-olds. It chafed.' } },
      ],
    },

    grace_talk: {
      kind: 'scene',
      next: 'q_to_grace',
      lines: [
        { speaker: 'grace', text: { zh: '结果你猜怎么着。后来人类要派人去救命，挑来挑去，挑中了我。不是因为我论文写得好——是因为我能把难得要命的东西，讲给一屋子听不懂的人，让他们听懂。', en: 'And then — guess what. When humanity needed someone to go save lives, they sifted through everyone and landed on me. Not because of my papers. Because I could take something brutally hard and explain it to a room full of people who didn’t get it, until they did.' } },
        { speaker: 'grace', text: { zh: '那本事，是当老师练出来的。不是在实验室。', en: 'That skill came from teaching. Not from the lab.' } },
        { speaker: 'grace', text: { zh: '我以为教书是退而求其次。后来才发现，那是我这辈子做过最重要的事。', en: 'I thought teaching was the consolation prize. Turned out it was the most important thing I ever did.' } },
        { speaker: 'rocky', text: { zh: '现在他教 Eridian 小孩。我也算他半个学生。陈述。', en: 'Now he teaches Eridian children. I count as half a student of his. Statement.' } },
        { speaker: 'grace', text: { zh: '别提了，你比那帮小孩还难教。', en: 'Don’t get me started — you’re harder to teach than any of those kids.' } },
      ],
    },

    q_to_grace: {
      kind: 'choice',
      choiceId: 'q_to_grace',
      prompt: { zh: '（你握紧了手机。这个人，好像真的懂。）', en: '(You grip the phone tighter. This person — he actually seems to understand.)' },
      options: [
        {
          id: 'still_doubt',
          label: { zh: '"可你救了两颗星球。我呢？我连一个学生被我改成了什么样都看不见。"', en: '"But you saved two planets. Me? I can’t even see what I’ve changed in a single student."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'engaged', value: true }],
          next: 'grace_unmeasured',
        },
        {
          id: 'regret',
          label: { zh: '"你后悔过吗？放下做学问，去教那些……以后多半也用不上的东西。"', en: '"Did you ever regret it? Putting down real research to teach things… that most of them will never use anyway."' },
          effects: [{ type: 'signal', delta: 10 }],
          next: 'grace_unmeasured',
        },
        {
          id: 'tired',
          label: { zh: '"你也会累吗？累到怀疑自己讲的每句话，到底有没有人在听。"', en: '"Do you get tired too? Tired enough to doubt whether anyone’s even listening to a word you say."' },
          effects: [{ type: 'signal', delta: 10 }],
          next: 'grace_unmeasured',
        },
      ],
    },

    grace_unmeasured: {
      kind: 'scene',
      next: 'rocky_unmeasured',
      lines: [
        { speaker: 'grace', text: { zh: '我累过。也怀疑过。教室里二十张脸，十九张在神游，你讲到喉咙发哑——值不值，没人发奖状告诉你。', en: 'I’ve been tired. I’ve doubted. Twenty faces in the room, nineteen of them somewhere else, and you talk until your throat goes hoarse — and no one hands you a certificate to tell you it was worth it.' } },
        { speaker: 'grace', text: { zh: '但我教过一个孩子。家里乱，眼神是死的，所有人都放弃他了。我没做什么惊天动地的事，就是有一阵子，每天多问他一句话，记住他的名字。', en: 'But there was one kid I taught. Chaotic home, dead eyes, everyone had given up on him. I didn’t do anything dramatic — for a while there, I just asked him one extra thing every day, and I remembered his name.' } },
        { speaker: 'grace', text: { zh: '很多年以后我才知道，他没走上那条最坏的路。不是我救的——是他自己活下来了。我只是，那阵子在场。', en: 'Years later I learned he never went down the worst road. I didn’t save him — he survived on his own. I was just… there, for that stretch.' } },
        { speaker: 'grace', text: { zh: '你救的那个，测不出来。但他还在。够了。', en: 'The one you saved — you can’t measure it. But they’re still here. That’s enough.', }, revealCardId: 'card_gl_unmeasured' },
        { speaker: 'grace', text: { zh: '好了，我去看穹顶的水循环了。顾老师，你这一行，是地球上最重要的工程之一。别让今晚的累，骗你忘了这件事。', en: 'All right, I’m off to check the dome’s water cycle. Teacher Gu — your line of work is one of the most important pieces of engineering on Earth. Don’t let one tired night trick you into forgetting that.' } },
      ],
    },

    rocky_unmeasured: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: { zh: '他走了。他每次都这样，说完最重的一句，就跑去看水。', en: 'He left. Every time like this. Says the heaviest line, then runs off to look at water.' } },
        { speaker: 'rocky', text: { zh: '我补一句工程的。', en: 'I add one engineering thing.' } },
        { speaker: 'rocky', text: { zh: '你量不出一个学生被你改了多少。正常。你装进他脑子里的那份备份，要很多年以后，原件出事了，才被调用。', en: 'You cannot measure how much you changed a student. Normal. The backup you loaded into his head — it gets called up only many years later, when the original runs into trouble.' } },
        { speaker: 'rocky', text: { zh: '那时候你可能都不在场。但那艘飞船，照样飞过你的死。别熄火。你还在送人过河。', en: 'By then you may not even be there. But that ship still flies past your death. Do not cut the engine. You are still ferrying people across the river.' } },
      ],
    },

    rocky_solo: {
      kind: 'scene',
      next: 'q_next',
      lines: [
        { speaker: 'rocky', text: { zh: '我说回格雷斯。我说过，我会的人类东西，都是他教的。一个老师。', en: 'Back to Grace. I said it — everything human I know, he taught me. One teacher.' } },
        { speaker: 'rocky', text: { zh: '他以前是科学家，丢了前途，去当中学老师，觉得自己废了。后来人类挑他去救命，挑中的，正是他当老师练出来的那个本事——把难的东西，讲给听不懂的人。', en: 'He used to be a scientist. Lost his future, became a middle-school teacher, thought he was finished. Later humanity picked him to go save lives — and what they picked was the very skill teaching built in him: take the hard thing, explain it to people who do not get it.' } },
        { speaker: 'rocky', text: { zh: '他说，他以为教书是退而求其次。后来发现，是他做过最重要的事。', en: 'He says he thought teaching was the consolation prize. Then found it was the most important thing he ever did.' } },
        { speaker: 'rocky', text: { zh: '你量不出一个学生被你改了多少。正常。你存进他脑子里的那份备份，要很多年以后才被调用——那时候你可能都不在场。', en: 'You cannot measure how much you changed a student. Normal. The backup you saved into his head gets called up only many years later — and by then you may not even be there.' } },
        { speaker: 'rocky', text: { zh: '但那艘飞船，照样飞过你的死。别熄火。你还在送人过河。', en: 'But that ship still flies past your death. Do not cut the engine. You are still ferrying people across the river.' } },
      ],
    },

    q_next: {
      kind: 'choice',
      choiceId: 'q_next',
      prompt: { zh: '（窗外很静。那摞卷子还在桌上。但你看它的眼神，好像不太一样了。）', en: '(It’s quiet outside. The stack of exams is still on the desk. But the way you look at it has shifted, somehow.)' },
      options: [
        {
          id: 'name',
          label: { zh: '"我们班有个总坐最后一排的孩子。我连他名字背后的事都没问过。明天，我想真的问一次。"', en: '"There’s a kid in my class who always sits in the back row. I’ve never even asked about the story behind his name. Tomorrow, I want to actually ask."' },
          effects: [{ type: 'signal', delta: 12 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'listen',
          label: { zh: '"明天上课，我想认真听一个学生把话讲完。不打断，不为赶进度。就这一次。"', en: '"Tomorrow in class, I want to really let one student finish what they’re saying. No cutting in, no rushing the syllabus. Just this once."' },
          effects: [{ type: 'signal', delta: 10 }, { type: 'flag', key: 'agency', value: true }],
          next: 'end_main',
        },
        {
          id: 'rest',
          label: { zh: '"……我先睡吧。卷子明天再说。"', en: '"…I should sleep first. The papers can wait till tomorrow."' },
          effects: [{ type: 'signal', delta: 4 }],
          next: 'end_main',
        },
      ],
    },

    end_main: {
      kind: 'ending',
      endingId: 'gl_end',
      lines: [
        { speaker: 'rocky', text: { zh: '好。', en: 'Good.' } },
        { speaker: 'narrator', text: { zh: '你拧上了那支快干的红笔，把卷子摞齐，没再去看那串分数。', en: 'You cap the nearly dry red pen, square the stack of exams, and don’t look at the run of numbers again.' } },
      ],
      variants: [
        {
          when: { type: 'flagSet', key: 'agency' },
          lines: [
            { speaker: 'narrator', text: { zh: '你想起那个总坐最后一排的孩子，想起你其实一直知道他叫什么，只是从没好好叫过。', en: 'You think of the kid in the back row — and realize you’ve known his name all along, you’ve just never really said it.' } },
            { speaker: 'rocky', text: { zh: '明天那件量不出来的小事，也是修桥。只是这次，桥是一个孩子。', en: 'Tomorrow’s small unmeasurable thing is also building a bridge. Only this time, the bridge is a child.' } },
          ],
        },
        {
          when: { type: 'signalAtLeast', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '好好好。你声音，不那么累了。机器没停，只是上了点油。', en: 'Good good good. Your voice — not so tired now. Machine did not stop. Just got a little oil.' } },
            { speaker: 'rocky', text: { zh: '去睡，知识的飞船。明天那个最后一排的孩子，还等着上船。格雷斯说，同行会随时给你留位。', en: 'Go sleep, ship of knowledge. Tomorrow that kid in the back row is still waiting to board. Grace says he keeps a seat for you at the meeting of the trade, anytime.' } },
          ],
        },
        {
          when: { type: 'signalBelow', value: 58 },
          lines: [
            { speaker: 'rocky', text: { zh: '我不多说。', en: 'I do not say much.' } },
            { speaker: 'rocky', text: { zh: '去睡。明天，对一个孩子好一点点，就够了。一个。', en: 'Go sleep. Tomorrow, be a little kinder to one child. That is enough. One.' } },
            { speaker: 'narrator', text: { zh: '你没说太多。但挂电话前，你轻轻"嗯"了一声，然后关了台灯。', en: 'You don’t say much. But before you hang up, you let out a soft "mm," and then you switch off the desk lamp.' } },
          ],
        },
      ],
    },
  },
};
