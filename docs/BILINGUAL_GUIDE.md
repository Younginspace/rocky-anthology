# Bilingual migration guide (zh + en)

Convert one episode file so every player-facing string becomes `{ zh, en }`.
Smooth the Chinese for flow; add faithful English in Rocky/Grace's canonical voice.

## What to convert (and ONLY these)

Wrap each of these string values into `{ zh: '<smoothed chinese>', en: '<english>' }`:

- `caller`: `realName`, `location`, `tagline`, `reason`, `outcomeShort`, `morningBeat`
- episode `title`, `subtitle`, `theme`
- every `Line` `text` (and `stage` if present) in scene / ending / variants `lines`
- every `ChoiceOption` `label`
- every choice node `prompt`
- every `cards[].text`

The type is a union (`string | {zh,en}`) so it compiles either way — but convert ALL of the above to the `{zh,en}` object form. `speaker`, `system` lines too (translate the visible part; keep the bracket/▲ glyphs).

## DO NOT TOUCH (changing these breaks the engine + tests)

`id`, node ids (object keys in `nodes`), `choiceId`, option `id`, `effects`, `flag` keys/values, `signal` deltas, `next`, `goto`, `else`, `when`/conditions, `kind`, `revealCardId`, `cards[].id`, `episodeId`, `accent`, `age`, `order`, `startNodeId`. Only string TEXT values change.

## Chinese: smooth for immersion

Keep meaning + structure. Improve readability and flow, especially `narrator`, `caller`, and `grace` lines — make them read like good prose / natural speech (the player feedback was "代入感差/不够通顺"). 
**Keep Rocky's voice clipped** (short, engineer, fragmentary) — that's canonical, don't "smooth" it into fluent sentences. But make sure it still reads cleanly.

## English: Rocky & Grace canonical voice

**Rocky** (from the novel/film — English is his native rendered voice, so lean in):
- Short sentences. Compressed. Simplified grammar; often drop articles ("Machine does your problem. Machine not want to.").
- Triple-repeat for strong feeling: "good good good", "amaze amaze amaze", "very very very".
- Occasionally end a line with "Question." or "Statement." — RARE seasoning, not every line.
- Engineer vocabulary, matched to each card's concept:
  - single point of failure / bad design (ep02 card: "One test decides one life. Bad design. Single point of failure. I do not like.")
  - load-bearing / redundancy / margin / constraint / failure mode / small test
  - "function" vs "operator" (ep07: "Machine took the function. Not you. You are not the function you run.")
- Literal, blunt, warm-not-gushy. Calls Grace "Grace". "fist my bump", "leaky space blob" only where the zh used the equivalent.
- NO therapy words in Rocky's mouth (seen/belonging/self-worth) — keep those in narrator/caller.

**Grace**: warm, plain, wry human — a former scientist turned teacher. Idiomatic natural English.

**Narrator / caller**: natural, idiomatic, literary English — not a stiff word-for-word translation. Localize culture lightly (e.g., 高考 → "the gaokao — the exam that sorts every kid in the country", 朋友圈 → "the feed", 考研二战 → "second run at the grad-school exam"). Keep it emotionally true.

### Caller English names (use for `realName.en`)
ep01 林晚 → Lin Wan · ep02 陈乐 → Chen Le · ep03 苏野 → Su Ye · ep04 周敏 → Zhou Min · ep05 顾岚 → Gu Lan · ep06 江帆 → Jiang Fan · ep07 韩冬 → Han Dong · ep08 梅雨 → Mei Yu · ep09 高建国 → Gao Jianguo (老高 → "Old Gao") · ep10 夏鸣 → Xia Ming

### system lines
e.g. `〔星际通讯线 · ERID↔地球〕今晚第 14 通来电` → en: `[INTERSTELLAR LINE · ERID↔EARTH] Call #14 tonight`. `● 信号接通 · 延迟 4.2 秒` → `● SIGNAL LIVE · DELAY 4.2s`. `信号建立中…` → `establishing link…`.

## Format example

```ts
{ speaker: 'rocky', text: { zh: '机器做你的题。机器不想做你的题。', en: 'Machine does your problem. Machine not want to do your problem.' } },
{ speaker: 'narrator', text: { zh: '凌晨两点零七分。出租屋的灯没开。', en: '2:07 a.m. The rented room is dark.' }, },
```

## Finish
Run `cd web && npx tsc --noEmit` — must be clean. Don't run git. Reply with: file path, # of strings converted, and any line you were unsure about.
