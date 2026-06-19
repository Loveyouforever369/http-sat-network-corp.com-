-- ============================================================================
-- PROMETHEUS · Database Schema (PostgreSQL / Supabase)
-- ----------------------------------------------------------------------------
-- The static build persists progress in localStorage using exactly this shape,
-- so promoting to Supabase + Drizzle is a drop-in: create these tables, then
-- read/write user_progress + quiz_scores instead of localStorage.
-- A matching Drizzle schema is at the bottom of this file (commented).
-- ============================================================================

create extension if not exists "pgcrypto";

-- Users (pairs with Better Auth / Supabase Auth — store the auth id here) -----
create table if not exists users (
  id            uuid primary key default gen_random_uuid(),
  auth_id       text unique,                 -- id from Better Auth / Supabase Auth
  email         text unique not null,
  display_name  text,
  tier          text not null default 'initiate',   -- initiate | operator | architect
  xp            integer not null default 0,
  created_at    timestamptz not null default now()
);

-- Course modules (mirrors PROMETHEUS_DATA.modules) ---------------------------
create table if not exists course_modules (
  id          text primary key,             -- 'm1'..'m5'
  code        text not null,                -- '01'..'05'
  title       text not null,
  subtitle    text,
  tagline     text,
  color       text,
  icon        text,
  summary     text,
  xp          integer not null default 0,
  sort_order  integer not null default 0
);

-- Lessons / activities. Each module has 3 activities: lesson | training | game
create table if not exists lessons (
  id          text primary key,             -- e.g. 'm1:lesson'
  module_id   text not null references course_modules(id) on delete cascade,
  kind        text not null,                -- 'lesson' | 'training' | 'game'
  title       text not null,
  activity_type text,                       -- 'prompt-sandbox' | 'hallucination-hunter' | ...
  duration    text,
  xp          integer not null default 0,
  payload     jsonb,                        -- the lesson/training/game content
  unique (module_id, kind)
);

-- Per-user progress (mirrors localStorage `done`) ----------------------------
create table if not exists user_progress (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references users(id) on delete cascade,
  module_id   text not null references course_modules(id) on delete cascade,
  activity    text not null,                -- 'lesson' | 'training' | 'game'
  completed   boolean not null default false,
  completed_at timestamptz,
  unique (user_id, module_id, activity)
);

-- Quiz / game scores (mirrors localStorage `scores`) -------------------------
create table if not exists quiz_scores (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references users(id) on delete cascade,
  module_id   text not null references course_modules(id) on delete cascade,
  activity    text not null,                -- which training/game produced it
  score       integer not null,             -- 0..100
  created_at  timestamptz not null default now()
);

create index if not exists idx_progress_user on user_progress(user_id);
create index if not exists idx_scores_user   on quiz_scores(user_id);

-- ============================================================================
-- DRIZZLE ORM SCHEMA (TypeScript) — db/schema.ts
-- ----------------------------------------------------------------------------
-- import { pgTable, text, integer, boolean, timestamp, uuid, jsonb, uniqueIndex } from "drizzle-orm/pg-core";
--
-- export const users = pgTable("users", {
--   id: uuid("id").primaryKey().defaultRandom(),
--   authId: text("auth_id").unique(),
--   email: text("email").unique().notNull(),
--   displayName: text("display_name"),
--   tier: text("tier").notNull().default("initiate"),
--   xp: integer("xp").notNull().default(0),
--   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
-- });
--
-- export const courseModules = pgTable("course_modules", {
--   id: text("id").primaryKey(),
--   code: text("code").notNull(),
--   title: text("title").notNull(),
--   subtitle: text("subtitle"),
--   tagline: text("tagline"),
--   color: text("color"),
--   icon: text("icon"),
--   summary: text("summary"),
--   xp: integer("xp").notNull().default(0),
--   sortOrder: integer("sort_order").notNull().default(0),
-- });
--
-- export const lessons = pgTable("lessons", {
--   id: text("id").primaryKey(),
--   moduleId: text("module_id").notNull().references(() => courseModules.id),
--   kind: text("kind").notNull(),
--   title: text("title").notNull(),
--   activityType: text("activity_type"),
--   duration: text("duration"),
--   xp: integer("xp").notNull().default(0),
--   payload: jsonb("payload"),
-- });
--
-- export const userProgress = pgTable("user_progress", {
--   id: uuid("id").primaryKey().defaultRandom(),
--   userId: uuid("user_id").notNull().references(() => users.id),
--   moduleId: text("module_id").notNull().references(() => courseModules.id),
--   activity: text("activity").notNull(),
--   completed: boolean("completed").notNull().default(false),
--   completedAt: timestamp("completed_at", { withTimezone: true }),
-- }, (t) => ({ uniq: uniqueIndex("uq_progress").on(t.userId, t.moduleId, t.activity) }));
--
-- export const quizScores = pgTable("quiz_scores", {
--   id: uuid("id").primaryKey().defaultRandom(),
--   userId: uuid("user_id").notNull().references(() => users.id),
--   moduleId: text("module_id").notNull().references(() => courseModules.id),
--   activity: text("activity").notNull(),
--   score: integer("score").notNull(),
--   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
-- });
-- ============================================================================
