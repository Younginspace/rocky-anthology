# rocky-anthology

Fullstack EdgeSpark project.

## Structure

- `server/` — Hono API on Cloudflare Workers (see server/CLAUDE.md)
- `web/` — React SPA via Vite (see web/CLAUDE.md)
- `server/dev/` — Local-dev helpers (see "Dev Seeds" section)
- `configs/` — Project config files (auth)
- `edgespark.toml` — Project configuration

## Setup

Install dependencies in each directory separately:

```bash
cd server && npm install
cd ../web && npm install
```

## Commands

```bash
edgespark deploy        # build + deploy to platform (run from project root)
```

## EdgeSpark CLI

- **Always run `edgespark <command> --help` before using a command you are unsure about.** Do not guess flags or arguments.
- Run `edgespark` commands on behalf of the user; do not ask the user to run them manually.
- If an `edgespark` command returns a URL, code, or prompt that must be completed by the human owner outside the agent, show it to the user exactly and tell them what to do next. Do not hide it.
- Never run multiple `edgespark` CLI commands in parallel. Run them sequentially.
- If a command fails with "Not authenticated", run `edgespark login`. It prints a URL — show it to the user to open in their browser. Once they approve, re-run the original command.
- `edgespark secret set` prints a secure URL for the user to enter secret values in the browser. Secret values must never pass through agent context or LLM APIs.

## Dev Seeds

`edgespark dev` can seed the local dev database, storage, and auth with reproducible test data by running `server/dev/seed.ts` once at startup. A commented starter lives at `server/dev/seed.ts.example` — rename it to `server/dev/seed.ts` to activate. The seed lives inside `server/` so `drizzle-orm`, `@edgespark/devkit`, and your schema all resolve from `server/node_modules/` — no duplicate deps anywhere.

The default export is `async function seed(ctx: SeedContext<DB>)`. `ctx` exposes:

- `ctx.db` — Drizzle client against the local D1 (pass `SqliteRemoteDatabase<typeof schema>` as the `DB` generic for full type-safe queries)
- `ctx.origin` — dev proxy origin (e.g. `http://localhost:7775`)
- `ctx.fetch(path, init?)` — unauthenticated fetch; relative paths are resolved against `ctx.origin`
- `ctx.auth.createUser({ email, password, name })` — sign up + auto-verify a user; returns `{ user, fetch }` where `fetch` replays the session cookie for same-origin requests only

Re-run semantics: the seed runs on the first `edgespark dev` that sees the file, and re-runs whenever the file contents change OR the user passes `--reset`. Seeds must be idempotent (use `onConflictDoNothing`, or rely on `--reset` to wipe state). Failures are soft — the dev session continues and the next run retries.

See `@edgespark/devkit` for the full `SeedContext` type.

## EdgeSpark Skill References

If you have the `building-edgespark-apps` skill installed, use its references:

- **Always** check `dev-workflow.md` for development workflows (database, storage, auth, vars, secrets, deploy)
- **Always** check `server-patterns.md` when writing server-side code
- **Always** check `web-patterns.md` when writing frontend code with `@edgespark/web`
- **Always** check `auth-patterns.md` when configuring auth providers (OAuth, email/password)

## 美术规则：Rocky 人设（硬约束 / RULES）

> 任何 Rocky 的生图、渲染、插画都**必须**严格遵守以下设定。违反会让粉丝立刻出戏 —— 这是不可妥协的红线。详见 [docs/ROCKY_CANON.md](docs/ROCKY_CANON.md)。

- **身体**：单个圆润的石头 / boulder。
- **无脸**：完全没有脸 —— 无眼、无嘴、无五官（他是盲的，靠声音感知）。
- **五肢（最关键，最易错）**：**恰好 5 条肢** = **3 条下肢（短腿，在身下成三脚架支撑）** + **2 条上肢（短臂，在身体前方）**。绝不能是 4 条腿，也绝不能只画 1 条手臂。
- **手指**：每条肢体末端**恰好 3 根短手指**。
- **形态**：短而敦实、贴近身体；**不要细长 / 蜘蛛 / 昆虫态**。
- **体表**：淡淡的 teal 青绿色荧光斑点。
- **画风**：手绘水彩绘本（暖米色纸张 + 墨线 + 水彩 washes + teal 点缀）。

**生图要求**：每次都附 IP 参考图（Renoise material `#4676` = `rocky_comic_demo/concept_v2.png`）+ 风格参考 `#40470`。最易出错的是把第二条手臂省略掉 → 用「Rocky 双臂在身前一起捧着发光电话屏、三腿在下」这类**两臂都必须出现**的姿势，并生成多张、逐张数肢体后再选用。脚本见 `../gen_art.mjs` / `../gen_hero.mjs`。
