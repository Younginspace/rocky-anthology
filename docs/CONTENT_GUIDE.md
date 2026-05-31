# 如何新增一集 (Content Guide)

整个项目为可扩展而设计：**加一集 = 写一个文件 + 注册一行**，引擎和 UI 零改动。

## 步骤

1. **读 `docs/STORY_BIBLE.md`**（尤其 §B Rocky 声音准则、§E 写作约定）。这是写作的唯一真理来源。
2. **复制样板** `web/src/content/episodes/ep01.ts`，另存为 `epNN.ts`，改成你的剧情。
3. **在注册表登记**：编辑 `web/src/content/index.ts`，`import { epNN }` 并加入 `episodes` 数组（数组按 `order` 自动排序）。
4. **跑测试**：`cd web && npm run test`。静态校验器 + 通关冒烟测试会立刻告诉你内容是否合法（无悬空节点、无死胡同、结局可达、卡可解锁、id 唯一）。
5. 绿了就能玩。`npm run build` 确认类型，`edgespark deploy` 上线。

## 一个 Episode 的骨架

```ts
import type { Episode } from '../../engine/types';

export const epNN: Episode = {
  id: 'epNN', order: NN, title: '…', subtitle: '…', theme: '…',
  caller: { id, handle: 'XX-####', realName, age, location, tagline, reason,
            outcomeShort, morningBeat, accent: 'amber'|'cyan'|'violet'|'rose'|'green'|'gold' },
  cards: [
    { id: 'card_xx_a', episodeId: 'epNN', speaker: 'rocky', text: '…' },
    { id: 'card_xx_b', episodeId: 'epNN', speaker: 'grace'|'rocky', text: '…' },
  ],
  startNodeId: 'ring',
  nodes: {
    ring:   { kind: 'scene', lines: [ {speaker:'system', text:'…今晚第 N 通来电'}, {speaker:'narrator', text:'…'} ], next: 'connect' },
    // … scene / choice / branch / ending …
  },
};
```

## 节点类型速查

| kind | 作用 | 关键字段 |
|---|---|---|
| `scene` | 连续台词块，UI 逐条渲染 | `lines[]`, `next`；line 可带 `revealCardId` |
| `choice` | 玩家选择（选项即"你"说的话） | `choiceId`, `options[]`（每个 `id`/`label`/`next`，可带 `effects`/`showWhen`） |
| `branch` | 引擎按条件自动跳转（无 UI） | `branches[{when, goto}]`, `else` |
| `ending` | 终点 | `endingId`, `lines[]`, `variants[{when, lines}]` |

## 硬规则（否则校验/编译不过）

- **副作用只放在 `choice` 选项的 `effects` 上**（`signal` / `flag` / `unlockCard`）。`scene`/`ending` 的 line 只能用 `revealCardId`（解卡天然幂等）。**不要**在 scene 上加 signal/flag。
- **node id / option id / card id** 全集唯一；card id 还需**全局唯一**（建议 `card_<缩写>_<关键词>`）。
- **signal 起始 42（隐藏，玩家只看到"信号微弱/平稳/清晰/锁定"）**。建议 delta：诚实/勇敢 `+8..+14`、中性 `+3..+6`、戒备 `0..+2`（**绝不为负**）。
- **Grace 门**：用 `branch`，`when: { type:'or', any:[{type:'signalAtLeast',value:60},{type:'flagSet',key:'engaged'}] }`；两条分支最终要**重新汇合**到主线。
- **结局变体不要两个 flag 变体同时命中**（会叠加出冗余/矛盾段落）。常用安全组合：一个 `signalAtLeast 58`（暖版）+ 一个 `signalBelow 58`（克制版）互斥，再加**至多一个**关键 flag 变体；若多个动作 flag 互斥，用 `and(flagSet X, not flagSet Y)` 保证唯一。
- **每条路径都要能到达 ending**；`choice` 不要让所有 option 都带 `showWhen`（可能 0 个可选）。

## 校验器会替你抓什么

`web/src/engine/validate.ts`（`npm run test` 自动跑）：重复 id、悬空 `next`/`goto`/`revealCardId`、所有选项被 `showWhen` 过滤后为空、不可达节点、无法到达结局的死胡同/环、纯 branch 环、未声明的卡。绿灯 = 这一集结构上不会卡死玩家。
