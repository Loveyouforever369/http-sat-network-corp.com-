# SAT Agent Network — Build Plan (source of truth)

## What we're building
A platform that stores/serves **1,000,000 agent records** from Supabase Postgres
with low-latency search, where each agent is **Agent DNA** (`SOUL.md` identity +
guardrails, `SKILL.md` executable Python tools). Agents are **event-triggered
workflows with a Claude brain**: webhook → condition match → multi-step API
workflow (data flows between steps) → audited result. An **MCP Gateway** routes
each agent's tool calls to external services with per-user credentials injected
from an encrypted vault (never exposed to the model).

## Locked decisions
- **Reasoning provider:** Claude (`claude-opus-4-8`) for generator + agent brain;
  agent *steps* stay multi-provider (an agent may call OpenAI/Gemini/etc. as a
  connector step — e.g. AGT-45902 step 1 is an OpenAI sentiment call).
- **Scale strategy:** hybrid — a combinatorial taxonomy (providers × triggers ×
  action-chains × categories) enumerates millions of structurally-valid records
  cheaply in SQL (this is what makes "1M served instantly" true); Claude
  generates a few hundred gold exemplars; full marketing copy + Veo/Firefly media
  render **lazily** (on view/activate or background batches), never all 1M up
  front. The mass-generation engine survives as an optional resumable worker.
- **Render:** Veo 3.1 (video, via Gemini API) + Adobe Firefly (stills, via MCP),
  pluggable; Invideo / Crreo optional adapters.
- **Safety (always on):** dry-run by default, live opt-in per agent; per-agent and
  per-connector spend caps + rate limits; approval thresholds (auto under $X,
  human approval above); idempotency keys on webhook event id (no double
  refunds); full audit trail.

## Performance approach ("1M served fast")
1M rows is small for Postgres **with the right indexes**. The win is *how* we
query:
- Full-text: generated `tsvector` + GIN index.
- Fuzzy/prefix name+slug: `pg_trgm` GIN.
- Filtered sorts (status + category + popularity): btree composite/covering.
- Pagination: keyset/cursor (never deep OFFSET).
- Faceting: materialized view for category/tag counts.
- Optional semantic search: `pgvector` + HNSW (flagged).
- Hot-list caching in the app layer.

Honest target: **p99 well under ~50 ms** for indexed catalog reads (not literal
zero latency), proven by `db:bench`. A SQL `generate_series` seeder fills
1,000,000 rows in seconds.

## Canonical data model (matches the agent JSON schema)
`agents` · `agent_triggers` (platform, webhook_type, conditions[]) ·
`agent_steps` (index, name, condition, provider, endpoint, method, action,
payload, depends_on) · `agent_marketing` (short_pitch, theme_keywords,
crreo_prompt, veo_prompt, image_url, video_url, render_status) · `souls` ·
`skills` (DNA authoring layer + base inheritance → compiles to the canonical
record) · `vault_credentials` (encrypted) · `runs` + `step_runs` (audit,
month-partitioned) · `categories` (hierarchical) · `tags` · `users`.

## Milestones
- **M0 — Scaffold:** monorepo, tooling, env template, gitignored secrets, docs. ✅
- **M1 — Live DB:** provision Supabase, Drizzle schema + migrations + indexes +
  RLS, SQL combinatorial seeder → 1M rows + benchmark, 3 flagship agents loaded.
- **M2 — Agent DNA:** SOUL/SKILL spec + base inheritance, TS+Python validators,
  resolver/compiler → canonical record, 3 samples as DNA.
- **M3 — Skill Runner:** FastAPI + Docker sandbox; workflow engine (conditional
  DAG, data-passing, idempotency); 9 connectors (real SDKs) dry-run + live.
- **M4 — MCP Gateway + Triggers:** MCP server, connector registry, encrypted
  vault, OAuth + key flows, signed webhook ingestion + condition matcher,
  guardrails/spend-caps/audit, agent-run endpoint (Claude loop, streaming).
- **M5 — Generator + Render:** Claude generator (combinatorial + exemplars,
  structured outputs, resumable) + Veo/Firefly pipeline → Supabase Storage.
- **M6 — Web app:** catalog/search over 1M, agent detail with media, run/trigger
  console, credential management, DNA viewer, Supabase Auth.
- **M7 — Hardening:** tests, security notes, deploy docs (Vercel web + container
  runner).

## Flagship agents (must run end-to-end)
- **AGT-45902** Angry Customer Auto-Refunder — Zendesk → OpenAI → Shopify → Zendesk
- **AGT-45903** VIP Churn-Crusher Triage — Stripe → Linear → Slack
- **AGT-45904** Contract Signature SMS Chaser — DocuSign → Salesforce → Twilio

## What's needed from the operator
- Anthropic key (rotated) in `.env.local` — to run agents (M2+).
- Gemini key — only for real Veo renders (M5).
- Connector keys — only to run a flagship agent **live**; all builds/demos work
  in dry-run without them. Stripe/Shopify test keys work immediately.
