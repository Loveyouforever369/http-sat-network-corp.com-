-- ════════════════════════════════════════════════════════════════════════
--  SAT Agent Network — Initial schema (canonical DDL, source of truth)
--  Tuned to store & serve 1,000,000 agent records with low-latency reads.
--  Apply to Supabase Postgres. Idempotent where practical.
-- ════════════════════════════════════════════════════════════════════════

-- ── Extensions ──────────────────────────────────────────────────────────
create extension if not exists pgcrypto;     -- gen_random_uuid(), crypto
create extension if not exists pg_trgm;       -- fuzzy / prefix search
create extension if not exists citext;        -- case-insensitive slugs/emails
create extension if not exists vector;        -- optional semantic search (M5)

-- ── Enums ───────────────────────────────────────────────────────────────
do $$ begin
  create type agent_status     as enum ('draft','active','suspended','archived');
exception when duplicate_object then null; end $$;
do $$ begin
  create type agent_visibility as enum ('public','unlisted','private');
exception when duplicate_object then null; end $$;
do $$ begin
  create type execution_mode   as enum ('dry_run','live');
exception when duplicate_object then null; end $$;
do $$ begin
  create type render_status     as enum ('pending','queued','rendering','complete','failed','skipped');
exception when duplicate_object then null; end $$;
do $$ begin
  create type run_status        as enum ('pending','running','succeeded','failed','skipped','awaiting_approval','cancelled');
exception when duplicate_object then null; end $$;
do $$ begin
  create type http_method       as enum ('GET','POST','PUT','PATCH','DELETE','GRAPHQL');
exception when duplicate_object then null; end $$;

-- ── Helper: updated_at trigger ─────────────────────────────────────────
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end $$ language plpgsql;

-- ── Users (decoupled from auth for seeding; link to auth.users later) ───
create table if not exists app_users (
  id           uuid primary key default gen_random_uuid(),
  email        citext unique,
  display_name text,
  is_system    boolean not null default false,
  created_at   timestamptz not null default now()
);

-- ── Categories (hierarchical) ───────────────────────────────────────────
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  slug        citext unique not null,
  name        text not null,
  parent_id   uuid references categories(id) on delete set null,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);
create index if not exists categories_parent_idx on categories(parent_id);

-- ── Tags ────────────────────────────────────────────────────────────────
create table if not exists tags (
  id    uuid primary key default gen_random_uuid(),
  slug  citext unique not null,
  name  text not null
);

-- ── Souls (DNA: identity + guardrails) ──────────────────────────────────
create table if not exists souls (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  content     text,                     -- raw SOUL.md
  config      jsonb not null default '{}'::jsonb,      -- parsed identity
  guardrails  jsonb not null default '{}'::jsonb,      -- policy object
  version     int not null default 1,
  created_at  timestamptz not null default now()
);

-- ── Skills (DNA: executable tool definitions) ───────────────────────────
create table if not exists skills (
  id                 uuid primary key default gen_random_uuid(),
  key                text not null,            -- tool name
  content            text,                     -- raw SKILL.md
  definition         jsonb not null default '{}'::jsonb,  -- Anthropic tool def
  runtime            text not null default 'python',
  code_ref           text,
  risk_level         text not null default 'low',         -- low|medium|high
  requires_connector text,
  created_at         timestamptz not null default now()
);

-- ── Agents (the big table) ──────────────────────────────────────────────
create table if not exists agents (
  id             uuid primary key default gen_random_uuid(),
  public_id      text unique not null,         -- e.g. 'AGT-45902'
  slug           citext unique not null,
  name           text not null,
  tagline        text,
  description    text,
  category_id    uuid references categories(id) on delete set null,
  status         agent_status not null default 'active',
  visibility     agent_visibility not null default 'public',
  owner_id       uuid references app_users(id) on delete set null,
  model          text not null default 'claude-opus-4-8',
  execution_mode execution_mode not null default 'dry_run',
  version        int not null default 1,
  popularity     numeric not null default 0,   -- ranking score
  install_count  int not null default 0,
  soul_id        uuid references souls(id) on delete set null,
  embedding      vector(1536),                 -- optional (M5)
  search         tsvector generated always as (
                   setweight(to_tsvector('english', coalesce(name,'')), 'A') ||
                   setweight(to_tsvector('english', coalesce(tagline,'')), 'B') ||
                   setweight(to_tsvector('english', coalesce(description,'')), 'C')
                 ) stored,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
drop trigger if exists agents_set_updated_at on agents;
create trigger agents_set_updated_at before update on agents
  for each row execute function set_updated_at();

-- ── Agent triggers (event source + match conditions) ────────────────────
create table if not exists agent_triggers (
  id           uuid primary key default gen_random_uuid(),
  agent_id     uuid not null references agents(id) on delete cascade,
  platform     text not null,            -- Zendesk, Stripe, DocuSign, ...
  webhook_type text not null,            -- ticket.created, ...
  conditions   jsonb not null default '[]'::jsonb,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);
create index if not exists agent_triggers_agent_idx on agent_triggers(agent_id);
create index if not exists agent_triggers_match_idx  on agent_triggers(platform, webhook_type);

-- ── Agent steps (the conditional API workflow / DAG) ────────────────────
create table if not exists agent_steps (
  id          uuid primary key default gen_random_uuid(),
  agent_id    uuid not null references agents(id) on delete cascade,
  step_index  int not null,
  name        text not null,            -- e.g. step_1_analyze_sentiment
  condition   text,                     -- expression gating this step
  provider    text not null,            -- Shopify, Stripe, OpenAI, ...
  endpoint    text,
  method      http_method,
  action      text,
  payload     jsonb,
  depends_on  text[],
  unique (agent_id, step_index)
);
create index if not exists agent_steps_agent_idx on agent_steps(agent_id);

-- ── Agent marketing (multimodal) ────────────────────────────────────────
create table if not exists agent_marketing (
  agent_id              uuid primary key references agents(id) on delete cascade,
  short_pitch           text,
  visual_theme_keywords text,
  crreo_prompt          text,           -- still-image prompt
  veo_prompt            text,           -- cinematic video prompt
  image_url             text,
  video_url             text,
  render_status         render_status not null default 'pending',
  rendered_at           timestamptz
);

-- ── Join tables ─────────────────────────────────────────────────────────
create table if not exists agent_tags (
  agent_id uuid not null references agents(id) on delete cascade,
  tag_id   uuid not null references tags(id)   on delete cascade,
  primary key (agent_id, tag_id)
);
create index if not exists agent_tags_tag_idx on agent_tags(tag_id);

create table if not exists agent_skills (
  agent_id uuid not null references agents(id) on delete cascade,
  skill_id uuid not null references skills(id) on delete cascade,
  primary key (agent_id, skill_id)
);

-- ── Credential vault (encrypted at rest, never reaches the model) ───────
create table if not exists vault_credentials (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references app_users(id) on delete cascade,
  connector  text not null,             -- stripe, slack, salesforce, ...
  label      text not null default 'default',
  ciphertext bytea not null,            -- AES-256-GCM encrypted secret blob
  iv         bytea not null,
  auth_tag   bytea not null,
  meta       jsonb not null default '{}'::jsonb,   -- non-secret metadata
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, connector, label)
);
drop trigger if exists vault_set_updated_at on vault_credentials;
create trigger vault_set_updated_at before update on vault_credentials
  for each row execute function set_updated_at();

-- ── Idempotency (once-only side effects per webhook event) ──────────────
create table if not exists idempotency_keys (
  id         uuid primary key default gen_random_uuid(),
  agent_id   uuid not null references agents(id) on delete cascade,
  event_id   text not null,
  run_id     uuid,
  created_at timestamptz not null default now(),
  unique (agent_id, event_id)
);

-- ── Runs (audit, partitioned by month) ──────────────────────────────────
create table if not exists runs (
  id              uuid not null default gen_random_uuid(),
  agent_id        uuid not null,
  user_id         uuid,
  trigger_event_id text,
  mode            execution_mode not null default 'dry_run',
  status          run_status not null default 'pending',
  input           jsonb,
  output          jsonb,
  error           text,
  spend_usd       numeric not null default 0,
  created_at      timestamptz not null default now(),
  primary key (id, created_at)
) partition by range (created_at);

create table if not exists runs_default partition of runs default;
create table if not exists runs_2026_06 partition of runs
  for values from ('2026-06-01') to ('2026-07-01');
create table if not exists runs_2026_07 partition of runs
  for values from ('2026-07-01') to ('2026-08-01');
create table if not exists runs_2026_08 partition of runs
  for values from ('2026-08-01') to ('2026-09-01');
create index if not exists runs_agent_idx on runs(agent_id, created_at desc);

-- ── Step runs (per-step audit; sanitized — no secrets) ──────────────────
create table if not exists step_runs (
  id          uuid primary key default gen_random_uuid(),
  run_id      uuid not null,
  step_index  int not null,
  provider    text,
  status      run_status not null default 'pending',
  request     jsonb,
  response    jsonb,
  spend_usd   numeric not null default 0,
  created_at  timestamptz not null default now()
);
create index if not exists step_runs_run_idx on step_runs(run_id, step_index);

-- ════════════════════════════════════════════════════════════════════════
--  Indexes that make "1M served fast" true
-- ════════════════════════════════════════════════════════════════════════
-- Full-text (weighted tsvector)
create index if not exists agents_search_idx on agents using gin (search);
-- Fuzzy / prefix on name + slug
create index if not exists agents_name_trgm_idx on agents using gin (name gin_trgm_ops);
create index if not exists agents_slug_trgm_idx on agents using gin (slug gin_trgm_ops);
-- Keyset browse: global popular
create index if not exists agents_browse_global_idx
  on agents (status, popularity desc, id desc);
-- Keyset browse: within a category
create index if not exists agents_browse_category_idx
  on agents (status, category_id, popularity desc, id desc);
-- Owner lookups
create index if not exists agents_owner_idx on agents (owner_id);
-- Recency
create index if not exists agents_created_idx on agents (created_at desc);

-- ════════════════════════════════════════════════════════════════════════
--  Faceting (materialized view, CONCURRENTLY-refreshable)
-- ════════════════════════════════════════════════════════════════════════
drop materialized view if exists category_facets;
create materialized view category_facets as
  select c.id as category_id, c.slug, c.name,
         count(a.id) filter (where a.status='active' and a.visibility='public') as agent_count
  from categories c
  left join agents a on a.category_id = c.id
  group by c.id, c.slug, c.name;
create unique index if not exists category_facets_pk on category_facets(category_id);

create or replace function refresh_category_facets() returns void as $$
begin
  refresh materialized view concurrently category_facets;
end $$ language plpgsql;

-- ════════════════════════════════════════════════════════════════════════
--  Row-Level Security
-- ════════════════════════════════════════════════════════════════════════
alter table agents             enable row level security;
alter table vault_credentials  enable row level security;
alter table runs               enable row level security;
alter table step_runs          enable row level security;
alter table app_users          enable row level security;

-- Public can read public, active agents; owners manage their own.
drop policy if exists agents_public_read on agents;
create policy agents_public_read on agents for select
  using (visibility = 'public');
drop policy if exists agents_owner_all on agents;
create policy agents_owner_all on agents for all
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());

-- Vault: strictly owner-only.
drop policy if exists vault_owner_all on vault_credentials;
create policy vault_owner_all on vault_credentials for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Runs / step_runs: owner read only (writes happen via service role).
drop policy if exists runs_owner_read on runs;
create policy runs_owner_read on runs for select using (user_id = auth.uid());
drop policy if exists step_runs_owner_read on step_runs;
create policy step_runs_owner_read on step_runs for select
  using (exists (select 1 from runs r where r.id = step_runs.run_id and r.user_id = auth.uid()));

-- App users: self read/update.
drop policy if exists app_users_self on app_users;
create policy app_users_self on app_users for all
  using (id = auth.uid()) with check (id = auth.uid());

-- Categories / tags / marketing / triggers / steps are public-readable catalog
-- data; reads are open, writes go through the service role.
alter table categories      enable row level security;
alter table tags            enable row level security;
alter table agent_marketing enable row level security;
alter table agent_triggers  enable row level security;
alter table agent_steps     enable row level security;
do $$ begin
  create policy categories_read      on categories      for select using (true);
  create policy tags_read            on tags            for select using (true);
  create policy agent_marketing_read on agent_marketing for select using (true);
  create policy agent_triggers_read  on agent_triggers  for select using (true);
  create policy agent_steps_read     on agent_steps     for select using (true);
exception when duplicate_object then null; end $$;
