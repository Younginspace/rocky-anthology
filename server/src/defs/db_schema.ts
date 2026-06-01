/**
 * Database Schema
 *
 * Define your app tables here using Drizzle ORM.
 * If you want app-level `relations(...)`, define them in `src/defs/db_relations.ts`.
 *
 * After making changes, run:
 *   edgespark db generate   (create migration files)
 *   edgespark db migrate    (apply to the project database)
 *   edgespark deploy        (deploy with latest schema)
 */

import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Player feedback — "letters to Rocky". Anonymous: each browser is assigned a
 * random uid (no login). kind ∈ 'resonated' | 'share' | 'wish'.
 *   resonated → which story hit hardest (episode_id set)
 *   share     → the player shares their own story
 *   wish      → a story they'd like a call from
 */
export const feedback = sqliteTable("feedback", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uid: text("uid").notNull(),
  kind: text("kind").notNull(),
  episode_id: text("episode_id"),
  content: text("content").notNull(),
  lang: text("lang"),
  created_at: text("created_at").notNull().default(sql`(current_timestamp)`),
});
