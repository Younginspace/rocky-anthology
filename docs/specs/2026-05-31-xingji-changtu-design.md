# 《星际长途》 — 设计文档 v2 (Design Spec)

> 二创同人 · 互动文字游戏 · 以《挽救计划》(Project Hail Mary) 为背景
> Working title: **星际长途 / Long Distance, Across the Stars**
> Date: 2026-05-31 · Author: Claude (autonomous build, authorized by user)
> v2: 整合 codex review 第 1 轮反馈（scope 收敛、Rocky 去鸡汤化、共鸣隐藏化、群像落地、引擎防双重副作用）。

---

## 0. Status

用户睡前授权完整自主流水线：头脑风暴 → 设计 → 与 codex 互审 3 轮 → 实现 → subagent/codex review → E2E → 部署。本文档既是 design spec，也是 codex review 输入。替用户做的决策见 §11。

---

## 1. 愿景

深夜，戴上耳机，拨通一条"打给 Rocky 的星际长途"。那头是住在 Erid 星的外星工程师 Rocky（和偶尔上线的 Grace）。这头，是地球上一个个普通人——备考的大学生、高考前夜的少年、在异国流浪找意义的人。

每一集你**成为**其中一个打电话的人，用对话选择走过 ta 的一夜。Rocky 不懂"考试""被 AI 取代""旅行的意义"——但他是个独自穿越星际、失去全部船员、从零和一个外星人造出语言和信任的工程师。他不给答案，他**把你卡死的难题当成一个坏掉的系统来拆**，然后只给你一个能执行的下一步。

**反鸡汤铁律**：Rocky 不会说"一切都会好"。AI 真的可能冲击工作。高考真的重要。旅行可能是逃避、也可能是活下去的方式。Rocky 不解决你的人生，他只把"下一步"缩到你今晚做得到的尺寸。

三集下来，玩家从内部活过三种地球人生 = **群像**。结尾一段"第二天清晨"的蒙太奇，让三个来电者各自做出那个具体的下一步动作，这就是把孤独夜晚连起来的**弧光**。

**核心 = 沉浸式剧情（精心创作的弧光）+ 轻互动（有意义的对话选择 / 隐藏的信号系统 / 可收藏星语卡）。**

---

## 2. 世界观框架 & 视角

### 2.1 框架（呼应真实项目）
Grace 留在 Erid 后成了年轻 Eridian 的老师，并和 Eridian 工程师一起架了一条从 Erid 回地球的"开放通讯线"。这正是真实项目 [rocky.savemoss.com](https://rocky.savemoss.com) 的设定，本游戏是它的"故事化二创"。游戏 = 这条线上一通通来电的**选集 (anthology)** = "星际通讯档案"。

### 2.2 视角
玩家**代入每集的来电者本人**（第一人称沉浸），替 ta 做选择。玩完 3 集 = 从内部亲历三种人生。通讯终端（comms console）是轻量旁白外壳：框住每通电话、显示信号质量、归档星语卡。

### 2.3 为什么是作者编写的分支叙事（非实时 LLM）
弧光是写作成就，须手写编排，实时 LLM 给不了可靠弧光；纯前端确定性叙事 = 无后端/DB/API key/延迟/审核风险、可单测、可部署——契合"无 bug、鲁棒"。实时自由对话留给现有 app + 未来扩展。

---

## 3. 故事圣经

### 3.1 Rocky 的中文声音（灵魂 · codex 强化版）

**Rocky 每次给"洞见"前，必须先走完这个工程师管线（防止他变成算命饼干式心理咨询师）：**
1. **字面观察**（描述他听到/感知到的，物种化的）
2. **误解地球习俗**（把人类的事按字面或工程逻辑理解错一点）
3. **要缺失的数据**（"需要更多数据。问号。"）
4. **把问题拆成约束/故障模式**（用工程词汇）
5. **给一个可执行的下一步**（小、具体、今晚做得到）
— 智慧是这个过程的**副产品**，不是开场白。

**Rocky 用工程词汇**：单点故障、冗余、约束、故障模式、负载、余量、小测试、可执行任务、材料、应力。
**Rocky 嘴里禁用心理咨询黑话**："被看见""归属""底层恐惧""自我价值"——这些只能出现在**旁白**或**来电者自己的领悟**里，不能从 Rocky 嘴里说出来。

**语言准则**：短句、压缩、重意义轻语法、常省"的"/助词。三连重复（好好好/坏坏/想想想/很很很）和"问号。""陈述。"是**稀有调味**，不是每句都有。"朋友"靠诚实和共同做事**赚来**，不轻易叫陌生人。叫 Grace 就叫"格雷斯"。字面化幽默 + 物种差异，不是网络段子、不讽刺。情感真实但不煽情、不抒情、不长篇说教。绝不出戏（不提 AI/prompt/全知旁白）。

> 写作自检：每句 Rocky 台词在脑内读一遍——像不像那个外星工程师？像才留。

### 3.2 Grace 客串
温暖的人类老朋友，话少但点到要害（沿用原项目 [ROCKY]/[GRACE] 双说话人精神 + 暖金调色）。canon 共振素材：Grace 曾是幻灭的科学家、丢了学术前途、去当**中学老师**被认为屈才——结果这个"失败者"救了两个文明；现在在 Erid 教年轻 Eridian，选择留下、回不去地球。
**Grace 不是"高脆弱分"的奖励**：触发条件是玩家**真诚投入**（无论是直球的脆弱、还是戒备但认真的较劲），不是只奖励"哭出来"的人。每集都有 ≥2 条不同姿态的路径能触发 Grace。

### 3.3 三集（首发） · scope 收敛
- **第一集 = 完整纵切片**（最丰富，~10–12 分钟，分支最多）——先打磨它到位，作为质量基准。
- **第二、三集 = 紧凑版**（~5–7 分钟，分支更少但弧光完整）。先保证三集都能从头玩到尾、都动人，再加料。

每集结构：**来电 → 接通 → 试探/拆解（分支）→ 转折（Rocky 拆系统 / 分享一段记忆 / Grace 上线）→ 落地（一个结局 + 2–3 段按选择变化的变体段落）→ 星语卡（1–2 张）**。
弧光铁律：从"恐惧/困惑里蜷缩"开始，到"打开一点 + 一个具体而人性的下一步动作"结束。不假治愈。

---

#### 第一集 ·《二战的夜》— 林晚 / Lin Wan（完整纵切片）
- **人物**：23 岁，考研二战 + 考公；出租屋；AI 焦虑。当年高三读《挽救计划》入坑。
- **具体的伤**（codex：别让弧光太干净）：一战已经失败过一次；家里为她二战的钱在硬撑（妈妈把广场舞的事都推了去接私活）；她曾经真心喜欢的那门专业课，如今只剩刷排名。
- **开场**：凌晨两点，又一次模考崩。刷到"AI 又能做某件她正在学的事"。朋友圈别人都上岸。她觉得学的没用、努力会被取代、自己没价值。半好奇半逃避，拨通这条收藏很久的线。
- **Rocky 怎么拆**（走工程管线）：他**拒绝**陪她辩"AI vs 人类"。他先字面误解（"考试 = 测什么？谁定的标准？"），要数据，把"被取代"重述成一个系统问题：会替你做事的机器，没有"要解决哪个问题"——那是你挑的；挑问题的人没被替代。然后抛出关键一问：**"恐惧替你挑问题之前，你自己挑的是哪个问题？"** 他讲自己的故事：23 个船员、22 个死了；他活下来不是最强，是工作台恰好挡了辐射——能力 + 运气 + 还活着还在做事。
- **Grace 客串**（真诚投入触发）："我这辈子最重要的工作，是在我以为自己最没用的时候做的。"
- **落地**（agency，不只是睡觉）：她做一个小小的、夺回主动权的动作——把一道她曾经真心喜欢的题，**用自己的话**重新讲一遍（为弄懂，不为打败机器）；并给自己划一条线：哪些交给 AI、哪些不外包。然后才睡。
- **星语卡**（去鸡汤、更 Rocky）：
  - 「没用的东西，不会半夜怕。会怕，说明在乎。在乎是稀缺材料。」
  - 「机器做你的题。机器不想做你的题。'想'，机器没有。你有。」

#### 第二集 ·《发射前夜》— 陈乐 / Chen Le（紧凑）
- **人物**：18 岁，高考前一晚失眠。倒计时贴满墙，桌上一杯凉了的牛奶，抽屉里准考证。
- **具体的伤 / 父母节拍**（codex）：傍晚无意听到爸妈压低声音算这几年补习的钱、和"考不好怎么办"；她想给妈妈发条消息，打了又删（未发送的草稿）。怕的不只是考砸。
- **Rocky 怎么拆**：他不懂"一场测试定一生"——在他看来是**坏设计：单点故障**。但他懂"重大发射前的恐惧"。把高考类比成发射：准备已做完，剩执行 + 不可控变量。"休息是任务的一部分。"（canon："你睡。人类不睡，不能正常运转。"）他**不否认数字重要**：数字会有，数字重要，但数字不是整个系统——你是系统，系统比一个数据点活得久。
- **Grace 客串**（老师身份）：分数会变成几年后想不起来的数字；"你怎么对待害怕的自己"会留下。
- **落地**：不是"你会考好"。ta 做发射前检查单——削好铅笔、定好闹钟、想好去考场的路；把那条删了又打的消息，发出去（或留张便条）；喝掉凉牛奶；去睡。Rocky 亲昵："去睡，漏水的太空团子。"
- **星语卡**：
  - 「一个测试定一生。坏设计。单点故障。我不喜欢。」
  - 「发射前最后一件事，是睡。然后发射。」

#### 第三集 ·《在别处》— 苏野 / Su Ye（紧凑）
- **人物**：28 岁，独自在异国某青旅走了大半年。朋友圈点赞很多，夜里空。
- **具体的伤 + 真实离开的理由**（codex：别让它显得说教）：他不是"为了诗和远方"出来的——是上一份工作把他熬空了 + 一段关系结束，他逃出来的。青旅里有个一直想说话却被他避开的人（比如同屋一个总在修自行车/做饭的当地人）。
- **Rocky 怎么拆**：他真的独自穿越星际、失去全部船员、到陌生星系——论远行没人比他更有资格。Eridian 终生择偶、对家/Erid 有强归属；他离家是**有目的的远行**（为族人存续）。重构（从他自己的生命，不抽象）：**"我和格雷斯，从零，造出一种语言。那是我整个旅途里，真正发生过的事。不是看了多少颗星。"** 他**不否定旅行**：移动没问题，但"移动当药"——剂量到了就不再起效（故障模式）。他要数据：这大半年，你和谁一起做过一件真正难的事？
- **转折**（领悟属于来电者，不是 Rocky 嘴）：苏野自己意识到——他一直在"路过"，没"连接"。
- **Grace 客串**：Grace 也被扔进陌生世界、回不了家（选择留下）。留下 vs 回去都不是逃；关键是"去连接，还是去躲"。
- **落地**（具体、非自助书）：三选一的承诺式动作——① 在这站多留一周，帮青旅那个人做一件真实的事；② 把那条一直没敢发的消息发出去；③ 继续走，但带上**一个具体承诺**（不是泛泛"去工作坊"）。
- **星语卡**：
  - 「你走很远。问题跟着你，到每一颗星球。问题不在地点。」
  - 「不是看了多少颗星。是和谁，一起，造了什么。」

### 3.4 群像落地（codex：星图只是 UI，不是群像）
- **"第二天清晨"蒙太奇**（通关三集后解锁）：三个微场景并置——林晚用自己的话讲一道题给镜子里的自己；陈乐走进考场；苏野蹲下来帮那个人扶住自行车 / 递过工具。最后镜头拉到 Erid，Rocky（或 Grace）看着通讯记录上并排的三条信号。**这一段才让选集真正落地。**
- **跨来电痕迹**（轻触）：通讯日志里能看到彼此存在过——"今晚这条线上的第 N 通来电""上一通来电者：代号 LW，已结束"。不喧宾夺主。
- 星图档案是入口和收藏面，不是群像本身；群像靠蒙太奇 + 痕迹兑现。

### 3.5 未来集（架构已留，本期不写）
第四集：全职带娃、怀疑当初辞职决定的人。第五集：当老师的人（与 Grace 深度互动，天然共鸣）。更多：被 PHM 感动的各行各业粉丝。

---

## 4. 玩法设计

### 4.1 核心循环
boot（开机自检）→ 通讯档案 hub（三颗信号星）→ 选一集 → 来电响铃 → 接通 → 分支对话 →（可能）Grace 上线 → 结局 + 变体段落 → 解锁星语卡 → 回 hub（该星点亮、档案揭示）→ 三集通关 → 清晨蒙太奇。

### 4.2 互动机制
1. **分支对话**：每节拍 2–4 个选项，体现内在姿态（戒备 ↔ 诚实，逃避 ↔ 投入，旁观 ↔ 较劲）。岔开的分支适时**重新汇合**（避免组合爆炸，保证每条路质量）。
2. **信号稳定度（隐藏，不是分数）**（codex：别道德化脆弱）：内部维护一个数值，但**永不以"0–100 分/共鸣值"形式展示**。对外只呈现为**通讯信号质量的粗粒度状态**：`微弱 → 平稳 → 清晰 → 锁定`（贴合星际通讯主题）。
   - 它**门控的是"路由到哪段真实素材"，不是好坏**：戒备的选择不更差，只是把 Rocky 带向不同但同样真实的话（更克制、更工程化的安慰）；诚实的选择解锁更深、更暖的记忆。
   - Grace 上线条件 = **真诚投入**（诚实路径 OR 戒备但认真较劲的路径都可达），不是"脆弱分够高"。
   - 不是失败机制：每条路都通向有意义的结局。
3. **星语卡**：每集解锁 1–2 张 Rocky 台词，存入档案。简单收藏面，不做复杂分享/社交资产（v1）。
4. **通讯档案 hub（星图）**：三个来电者 = 三颗星。通关一集点亮一颗，揭示档案（代号、从哪拨入、一句"ta 后来怎样了"）和卡片。
5. **结局**：每集**一个结局 + 2–3 段按信号状态/关键选择变化的变体段落**（不是 2–3 个完全不同的结局，省工又保质）。
6. **存档/续玩**：localStorage（版本化 key）。无账号。

### 4.3 沉浸式呈现
- 来电响铃屏：呼入动画，来电者元信息从"遮蔽"逐步揭示。
- 逐字打字机正文（终端风），可点"跳过"立即整段显示（尊重节奏 + 利于测试）。
- **Rocky = 2D 风格化全息**（复用 rocky_comic1/rocky_realistic + CSS 扫描线/辉光 + GSAP 轻浮动）。**刻意不用 Three.js**——bug 面小、性能稳、契合"鲁棒无 bug"。
- **声音**：v1 **不做或仅极轻**（一个接通提示音，默认静音、用户手势后才播）。codex：音频是 polish 时间，不值当，砍。
- 美术：沿用扩展原项目终端美学（深空 `#050a12`、琥珀 `#f0a500` + 青 `#00d4aa`、JetBrains Mono、CRT、Grace 暖金）。用 design skill 打磨，避免"通用 AI 感"。
- **复用生产经验**：index.html 沿用原项目的移动端 viewport meta、theme-color、以及针对国产安卓浏览器的缓存破坏 + stale-bundle 自愈脚本。

---

## 5. 内容数据模型

内容与引擎/UI 严格分离。每集 = 一个类型化 `Episode`（故事图）。引擎解释执行。加新集 = 加文件 + 注册，引擎/UI 不动。

```ts
type SpeakerId = 'rocky' | 'grace' | 'caller' | 'narrator' | 'system';

interface Episode {
  id: string; title: string; subtitle?: string;
  caller: CallerProfile;
  startNodeId: string;
  nodes: Record<string, StoryNode>;   // key = nodeId（唯一）
  cards: WisdomCard[];
}

interface CallerProfile {
  id: string; handle: string;          // 代号 LW / CL / SY
  realName: string; age: number; location: string; tagline: string;
  outcomeShort: string;                // 结局后揭示"ta 后来怎样了"
  morningBeat: string;                  // 清晨蒙太奇的一句
  accent: 'amber' | 'cyan' | 'violet';  // 该来电者的视觉强调色
}

// codex：用 scene 批量承载多行，避免几百个小节点
type StoryNode =
  | { kind: 'scene'; lines: Line[]; next: string }       // 连续旁白/台词块
  | { kind: 'choice'; choiceId: string; prompt?: string; options: ChoiceOption[] }
  | { kind: 'branch'; branches: { when: Condition; goto: string }[]; else: string }
  | { kind: 'ending'; endingId: string; lines: Line[]; variants?: Variant[] };

interface Line { speaker: SpeakerId; text: string; revealCardId?: string; }
interface Variant { when: Condition; lines: Line[]; }

interface ChoiceOption {
  id: string;                          // codex：稳定 choiceId，用于存档/历史/测试
  label: string;                       // 玩家看到的（来电者的话/想法）
  effects?: Effect[];                  // 仅在"选择"这种 transition 上施加
  next: string;
  showWhen?: Condition;
}

// codex：副作用只发生在 transition（choice 选择）上，绝不在被动渲染的 line 上，
// 从根上杜绝"刷新/回溯后重复施加"。引擎对每次施加用 (nodeId+choiceId) 幂等。
type Effect =
  | { type: 'signal'; delta: number }                  // 改隐藏信号值
  | { type: 'flag'; key: string; value: boolean | number | string }
  | { type: 'unlockCard'; cardId: string };

type Condition =
  | { type: 'signalAtLeast'; value: number }           // 内部阈值，玩家看不到
  | { type: 'flag'; key: string; equals: boolean | number | string }
  | { type: 'and'; all: Condition[] }
  | { type: 'or'; any: Condition[] }
  | { type: 'not'; cond: Condition };

interface WisdomCard { id: string; text: string; speaker: SpeakerId; episodeId: string; }
```

---

## 6. 技术架构

### 6.1 栈
React 19 + TS + Vite（同原项目）；GSAP 动画；**无 Three.js / 无后端 / 无 DB / 无 LLM** → 纯静态 SPA。状态：`useReducer` + Context（引擎纯函数，UI 只 dispatch）。持久化：localStorage（版本化 `xct.save.v1`）。i18n：v1 仅简中，字符串集中可寻址，未来可加 en/ja（不现在搭完整 i18n）。

### 6.2 目录
```
rocky2 game/
  docs/superpowers/specs/      ← 本文档 + plan
  <slug>/                      ← edgespark init（无空格名）
    edgespark.toml
    web/
      public/  (rocky/grace 图, 字体, favicon, OG 图)
      src/
        main.tsx App.tsx
        engine/    types.ts engine.ts validate.ts *.test.ts
        content/   episodes/ep01.ts ep02.ts ep03.ts  index.ts  callers.ts
        state/     gameReducer.ts persistence.ts useGame.ts
        components/ BootScreen CallArchive IncomingCall TransmissionView
                    ChoiceList SignalIndicator RockyHologram GraceBadge
                    WisdomCardView CardCollection EndingScreen MorningMontage ...
        hooks/     useTypewriter.ts
        styles/    terminal.css(改) game.css
    server/        (若 EdgeSpark 强制；否则配置 web-only)
```

### 6.3 引擎（确定性 → 可测）
- 纯函数 `advance(state, choiceId) -> { state, output }`；`reveal()` 计算当前要显示的 scene/choice/ending（含 variant 选取）。
- `GameState = { episodeId, currentNodeId, signal, flags, unlockedCards, appliedEffects:Set, history }`。
- **引擎内禁用 `Math.random` / `Date.now`**（保证可重放、可测）；随机/时间放 UI 层。
- **副作用幂等**：每个 `(nodeId, choiceId)` 的 effects 只施加一次，记进 `appliedEffects`；杜绝刷新/回溯重复加分。
- UI 通过 reducer 喂选择、渲染引擎输出。

### 6.4 资产复用（从 hail-mary-chat 拷）
字体 JetBrainsMono/PatrickHand；Rocky 形象 rocky_comic1/rocky_realistic；Grace graceposter*；terminal.css 变量与 CRT；OG 图 Rocky_Cover_*。来电者头像**不用照片**，用风格化 SVG/几何"信号源"头像（确定性构建）。

### 6.5 EdgeSpark 部署
目标 **web-only 静态部署**。codex：**早期就 scaffold + 部署一个 smoke test**（hello world 能上线），别等内容写完才发现部署问题。用 building-edgespark-apps skill 确认 web-only 配置；若平台要求 server，保留最小空 server。

---

## 7. 鲁棒性与可扩展性

- **故事图静态校验器**（最大鲁棒杠杆，开发期 load 跑 + 测试里跑）。codex 强化清单，必须检测：
  - 重复 nodeId / 重复 cardId；
  - 悬空引用（next/goto/showWhen-goto/revealCardId 指向不存在）；
  - `showWhen` 过滤后**可能 0 个可见选项**的死局；
  - 不可能命中的 branch（条件永假）/ `else` 缺失；
  - 无法到达的节点（含**无法触达的 Grace 路径**告警）；
  - 信号值溢出（累计可能 < 0 或越界）；
  - 结局可达性（每集至少一个 ending 可达，且每条路终将到 ending）；
  - **无限循环**（图中无 ending 的环）；
  - 引用资产存在（头像/图/卡）。
- localStorage 版本守卫：schema 变更优雅迁移/重置，不崩。
- 无外部运行时依赖（零网络请求）→ 不因 API/网络挂。
- React Error Boundary 兜底；资产失败降级（全息图 fallback、字体走系统）。
- 引擎纯函数 + 无随机 + 副作用幂等 → 可重放、可快照测试。
- **加新集 = 写 content 文件 + content/index.ts 注册 + 加 caller。引擎/UI 零改动。** 写进 `CONTENT_GUIDE.md`。

---

## 8. 测试策略

- **单测 (vitest)**：图校验器对全部 episodes 跑（§7 清单）；引擎给定选择序列 → 状态/信号/解卡/结局符合预期 + 条件/分支正确 + 重放确定 + **副作用幂等**（同一选择重复 dispatch 不重复加分）；持久化存/读/版本迁移。
- **E2E (Playwright MCP)**：boot→hub→每集至少 2 条路径（高信号/低信号）跑到结局 + 清晨蒙太奇；验证 Grace 在真诚投入路径触发、星语卡解锁归档、结局变体、刷新后进度保留、**无 console 报错**、移动 + 桌面响应式、打字机"跳过"、键盘可达。
- **评审**：subagent 代码评审（必做）；codex 评审（设计 3 轮 + 实现后 1 轮）；上线前 verification 真实跑应用看行为。
- **早部署 smoke test**（§6.5）。

---

## 9. Build Order（codex：先纵切片）
1. 设计定稿（本文档）+ codex 三轮互审。2. 实现计划。3. **scaffold + 部署 smoke test（hello world 上线）**。4. 引擎 + schema + 校验器 + 单测。5. **第一集完整纵切片（含一个结局可玩到尾）**→ 跑通 → 再写二、三集（紧凑）。6. UI（design skill 打磨）。7. 清晨蒙太奇 + 群像痕迹。8. subagent + codex 代码评审 → 修。9. E2E → 修。10. 部署 + 验证 + 交付总结。

---

## 10. 非目标 (v1)
实时 LLM 自由对话；账号/云存档；多语言（仅简中，架构预留）；实时 TTS；第四/五集内容（架构已留）；复杂 3D；复杂卡片分享/社交资产；可见的数字化共鸣分。

---

## 11. 替你做的决定（睡前授权，醒来可推翻，改起来都不贵）
1. **作者编写的分支叙事**（非实时 LLM）—— 精准弧光 + 确定性 + 鲁棒。
2. **玩家代入每个来电者本人**，三集 = 亲历三种人生 = 群像。
3. **v1 仅简体中文**（架构 i18n-ready）。
4. **2D 风格化全息 Rocky**（复用形象图）替代 Three.js。
5. **首发三集 = 你列的前三个**（大学生/AI 焦虑、高考生、旅人）；带娃 + 老师留作第四/五集。
6. **新建独立 EdgeSpark 项目（web-only），全新部署**，不并入 rocky.savemoss.com。
7. **无账号；localStorage 存进度。**
8. 标题《星际长途》（双关：漫长旅程 + 长途电话）。
9. **scope（codex）**：第一集做成完整纵切片打磨到位，二三集紧凑（5–7 分钟）；先保证三集都能玩到尾、都动人，再加料。
10. **信号系统隐藏**（不显示数字共鸣分），呈现为通讯信号质量；戒备选择不更差，只路由到不同真实素材。
11. **音频 v1 基本砍掉**（最多一个默认静音的接通提示音）。

---

## 12. 验收标准 (DoD)
三集可从头玩到尾，每集 ≥2 条有意义路径，结局变体正确，清晨蒙太奇兑现群像。Rocky 声音过关（走工程师管线、不鸡汤、读起来就是他），弧光落地不假治愈。信号系统/Grace 真诚触发/星语卡/星图档案/存档续玩工作。无 console 报错；移动+桌面响应式；键盘可达；首屏快。单测 + 图校验绿；E2E 通过；subagent + codex review 无遗留严重问题。EdgeSpark 部署成功，live URL 可访问。文档：README + CONTENT_GUIDE。
