/**
 * EDGESPARK SERVER — 《星际长途》
 *
 * The game itself is a static SPA; the only backend is the player-feedback
 * inbox ("letters to Rocky"). Public, anonymous (random per-browser uid).
 */

import { db } from "edgespark";
import { feedback } from "@defs";
import { Hono } from "hono";
import { sql } from "drizzle-orm";

const KINDS = new Set(["resonated", "share", "wish"]);
const MAX_LEN = 4000;

const app = new Hono()
  .get("/api/public/hello", (c) =>
    c.json({ message: "Hello from EdgeSpark! Spark your idea to the Edge." })
  )

  // How many letters Rocky has received (shown on the feedback screen).
  .get("/api/public/feedback/count", async (c) => {
    const [row] = await db.select({ n: sql<number>`count(*)` }).from(feedback);
    return c.json({ count: row?.n ?? 0 });
  })

  // Submit a letter to Rocky. Body: { uid, kind, episodeId?, content, lang? }
  .post("/api/public/feedback", async (c) => {
    let body: Record<string, unknown>;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "bad json" }, 400);
    }

    const uid = typeof body.uid === "string" ? body.uid.slice(0, 64) : "";
    const kind = typeof body.kind === "string" ? body.kind : "";
    const contentRaw = typeof body.content === "string" ? body.content.trim() : "";
    const episodeId =
      typeof body.episodeId === "string" ? body.episodeId.slice(0, 32) : null;
    const lang = typeof body.lang === "string" ? body.lang.slice(0, 8) : null;

    if (!uid || !KINDS.has(kind)) {
      return c.json({ error: "invalid uid or kind" }, 400);
    }
    if (!contentRaw) {
      return c.json({ error: "empty content" }, 400);
    }
    const content = contentRaw.slice(0, MAX_LEN);

    const [row] = await db
      .insert(feedback)
      .values({ uid, kind, episode_id: episodeId, content, lang })
      .returning({ id: feedback.id });

    return c.json({ ok: true, id: row?.id }, 201);
  });

export default app;
