# 星际长途 · Long Distance, Across the Stars

> 一个《挽救计划》(Project Hail Mary) 的二创互动文字游戏。
> 深夜，你拨通一条从 Erid 星打回地球的"开放通讯线"，电话那头是外星工程师 **Rocky**（偶尔还有 **Grace**）。
> 你将代入十位地球来电者，用对话选择，陪 ta 走过那个睡不着的夜。

灵感与世界观致敬 Andy Weir《挽救计划》，并与真实项目 **[rocky.savemoss.com](https://rocky.savemoss.com)** 遥相呼应——那里你能和 Rocky 实时聊天；这里，是十段被精心写下的、有人物弧光的故事。

> ⚠️ 这是粉丝二创（fan work），非官方、非商业。Rocky / Grace / Project Hail Mary 版权归原作者所有。

## 它是什么

- **十位来电者，十种人生**：备考的大学生、高考前夜的少年、裸辞旅人、全职妈妈、倦怠的老师、创业失败者、中年失业的程序员、夜班护士、刚退休的老人、没人听的独立音乐人。
- **核心**：沉浸式剧情（人物弧光）+ 轻互动（有意义的对话选择 / 隐藏的"信号"系统 / 可收藏的星语卡）。
- **反鸡汤**：Rocky 不会说"一切都会好"。他是个工程师——他把你卡死的难题当成一个坏掉的系统拆开，然后只给你一个今晚做得到的下一步。
- **群像**：玩完十集，会解锁"第二天清晨"蒙太奇，把十个深夜连成一片。

## 技术栈

React 19 + TypeScript + Vite · 纯静态 SPA（无后端 / 无数据库 / 无 LLM，全部为作者编写的确定性分支叙事）· 部署于 EdgeSpark。

故事内容与引擎/UI 严格分离：一个类型化的故事图引擎（`engine/`）解释执行作为数据的剧本（`content/`），UI（`components/`）只渲染引擎的输出。

## 本地开发

```bash
cd web && npm install
npm run dev       # Vite 开发服务器
npm run test      # 引擎单测 + 故事图校验 + 每集通关冒烟测试
npm run build     # tsc --noEmit && vite build
```

部署（项目根目录）：

```bash
edgespark deploy
```

## 结构

```
web/src/
  engine/      故事图类型、纯函数解释器、静态校验器、单测
  content/     10 个 Episode（episodes/ep01..ep10.ts）+ 注册表 + 内容校验测试
  state/       游戏状态机（useReducer + Context）+ localStorage 持久化
  components/  终端通讯 UI（boot / 档案 / 来电 / 对话 / 结局 / 星语卡 / 清晨蒙太奇）
  styles/      深空 CRT 终端设计系统
docs/
  STORY_BIBLE.md     Rocky 声音准则 + 十位来电者花名册（写作唯一真理来源）
  CONTENT_GUIDE.md   如何新增一集（可扩展性）
  specs/             设计文档
```

## 鲁棒性

- **故事图静态校验器**把"内容写错了吗"变成确定性测试：悬空引用、死胡同、分支环、无法到达的结局、未知卡、重复 id 一律拦下。`npm run test` 绿 = 内容可玩。
- 引擎纯函数、无随机、副作用幂等 → 可重放、可单测、刷新可续玩。
- localStorage 版本守卫 + React Error Boundary + 资产降级，单点失败不拖垮全局。

## 致谢

Built autonomously with Claude Code. 世界观与角色致敬 Andy Weir《Project Hail Mary》。
