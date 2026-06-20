import {
  pgTable, pgEnum, uuid, text, integer, numeric, boolean, timestamp,
  jsonb, primaryKey, index, uniqueIndex,
} from 'drizzle-orm/pg-core';

// ── Enums ────────────────────────────────────────────────────────────────
export const agentStatus = pgEnum('agent_status', ['draft', 'active', 'suspended', 'archived']);
export const agentVisibility = pgEnum('agent_visibility', ['public', 'unlisted', 'private']);
export const executionMode = pgEnum('execution_mode', ['dry_run', 'live']);
export const renderStatus = pgEnum('render_status', ['pending', 'queued', 'rendering', 'complete', 'failed', 'skipped']);
export const runStatus = pgEnum('run_status', ['pending', 'running', 'succeeded', 'failed', 'skipped', 'awaiting_approval', 'cancelled']);
export const httpMethod = pgEnum('http_method', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'GRAPHQL']);

// ── Reference ──────────────────────────────────────────────────────────────
export const appUsers = pgTable('app_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique(),
  displayName: text('display_name'),
  isSystem: boolean('is_system').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  parentId: uuid('parent_id'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
});

// ── DNA ──────────────────────────────────────────────────────────────────
export const souls = pgTable('souls', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  content: text('content'),
  config: jsonb('config').notNull().default({}),
  guardrails: jsonb('guardrails').notNull().default({}),
  version: integer('version').notNull().default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const skills = pgTable('skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: text('key').notNull(),
  content: text('content'),
  definition: jsonb('definition').notNull().default({}),
  runtime: text('runtime').notNull().default('python'),
  codeRef: text('code_ref'),
  riskLevel: text('risk_level').notNull().default('low'),
  requiresConnector: text('requires_connector'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── Agents ─────────────────────────────────────────────────────────────────
// Note: `search` (tsvector) and `embedding` (vector) are generated/optional and
// managed in db/sql; full-text queries are issued as raw SQL in the query layer.
export const agents = pgTable('agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  publicId: text('public_id').notNull().unique(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  tagline: text('tagline'),
  description: text('description'),
  categoryId: uuid('category_id'),
  status: agentStatus('status').notNull().default('active'),
  visibility: agentVisibility('visibility').notNull().default('public'),
  ownerId: uuid('owner_id'),
  model: text('model').notNull().default('claude-opus-4-8'),
  executionMode: executionMode('execution_mode').notNull().default('dry_run'),
  version: integer('version').notNull().default(1),
  popularity: numeric('popularity').notNull().default('0'),
  installCount: integer('install_count').notNull().default(0),
  soulId: uuid('soul_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  index('agents_browse_global_idx').on(t.status, t.popularity.desc(), t.id.desc()),
  index('agents_browse_category_idx').on(t.status, t.categoryId, t.popularity.desc(), t.id.desc()),
  index('agents_owner_idx').on(t.ownerId),
]);

export const agentTriggers = pgTable('agent_triggers', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  platform: text('platform').notNull(),
  webhookType: text('webhook_type').notNull(),
  conditions: jsonb('conditions').notNull().default([]),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  index('agent_triggers_agent_idx').on(t.agentId),
  index('agent_triggers_match_idx').on(t.platform, t.webhookType),
]);

export const agentSteps = pgTable('agent_steps', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  stepIndex: integer('step_index').notNull(),
  name: text('name').notNull(),
  condition: text('condition'),
  provider: text('provider').notNull(),
  endpoint: text('endpoint'),
  method: httpMethod('method'),
  action: text('action'),
  payload: jsonb('payload'),
  dependsOn: text('depends_on').array(),
}, (t) => [
  uniqueIndex('agent_steps_unique').on(t.agentId, t.stepIndex),
  index('agent_steps_agent_idx').on(t.agentId),
]);

export const agentMarketing = pgTable('agent_marketing', {
  agentId: uuid('agent_id').primaryKey(),
  shortPitch: text('short_pitch'),
  visualThemeKeywords: text('visual_theme_keywords'),
  crreoPrompt: text('crreo_prompt'),
  veoPrompt: text('veo_prompt'),
  imageUrl: text('image_url'),
  videoUrl: text('video_url'),
  renderStatus: renderStatus('render_status').notNull().default('pending'),
  renderedAt: timestamp('rendered_at', { withTimezone: true }),
});

export const agentTags = pgTable('agent_tags', {
  agentId: uuid('agent_id').notNull(),
  tagId: uuid('tag_id').notNull(),
}, (t) => [primaryKey({ columns: [t.agentId, t.tagId] })]);

export const agentSkills = pgTable('agent_skills', {
  agentId: uuid('agent_id').notNull(),
  skillId: uuid('skill_id').notNull(),
}, (t) => [primaryKey({ columns: [t.agentId, t.skillId] })]);

// ── Vault / audit ──────────────────────────────────────────────────────────
export const vaultCredentials = pgTable('vault_credentials', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  connector: text('connector').notNull(),
  label: text('label').notNull().default('default'),
  ciphertext: text('ciphertext').notNull(),
  iv: text('iv').notNull(),
  authTag: text('auth_tag').notNull(),
  meta: jsonb('meta').notNull().default({}),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [uniqueIndex('vault_unique').on(t.userId, t.connector, t.label)]);

export const idempotencyKeys = pgTable('idempotency_keys', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  eventId: text('event_id').notNull(),
  runId: uuid('run_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [uniqueIndex('idempotency_unique').on(t.agentId, t.eventId)]);

export const stepRuns = pgTable('step_runs', {
  id: uuid('id').primaryKey().defaultRandom(),
  runId: uuid('run_id').notNull(),
  stepIndex: integer('step_index').notNull(),
  provider: text('provider'),
  status: runStatus('status').notNull().default('pending'),
  request: jsonb('request'),
  response: jsonb('response'),
  spendUsd: numeric('spend_usd').notNull().default('0'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index('step_runs_run_idx').on(t.runId, t.stepIndex)]);
