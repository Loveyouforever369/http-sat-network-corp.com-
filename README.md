# SAT Agent Network

A platform that stores and serves **1,000,000 agent records** with low-latency
search, where every agent is defined by standardized **Agent DNA**
(`SOUL.md` = identity + guardrails, `SKILL.md` = executable Python tools) and
acts on the world through an **MCP Gateway** that securely routes each agent's
tool calls to external services (Stripe, Slack, Salesforce, Shopify, Zendesk,
Linear, Twilio, DocuSign, …).

Agents are **event-triggered automation workflows with a Claude brain**: a
webhook fires → conditions match → a multi-step API workflow runs with data
flowing between steps → results are audited. Think "Zapier/n8n + Claude," plus a
million-agent marketplace and AI-generated marketing media.

> ⚠️ **Security:** never put real secrets in chat, code, or commits. Copy
> `.env.example` → `.env.local` (gitignored) and fill values there. If a key was
> ever shared in plaintext, rotate it.

## Architecture (high level)

```
Next.js (web/)  ──────────────  MCP Gateway (in-app)
  catalog/search over 1M           authenticate → enforce SOUL guardrails →
  run + trigger console            inject vault creds → route → audit
  credential management                    │
        │ Claude agent loop                │ internal authed HTTP
        ▼                                  ▼
  Anthropic API (claude-opus-4-8)   Python Skill Runner (runner/)
                                    sandboxed workflow engine + connectors
                                            │
                                    Stripe · Slack · Salesforce · Shopify · …
Supabase Postgres (db/) — 1M agents, GIN/trgm/btree indexes, RLS, audit
```

See [`PLAN.md`](./PLAN.md) for the full roadmap and [`docs/`](./docs) for
architecture and security details.

## Monorepo layout

| Path            | What it is                                                        |
| --------------- | ----------------------------------------------------------------- |
| `web/`          | Next.js (App Router, TS) — UI + MCP Gateway + agent-run API       |
| `runner/`       | Python (FastAPI) — sandboxed Skill Runner + workflow engine       |
| `db/`           | Drizzle ORM schema, migrations, 1M seeder, benchmark              |
| `packages/dna/` | Shared SOUL.md/SKILL.md spec, base DNA, validators, compiler      |
| `agents/`       | Example agent DNA files (the flagship agents)                     |
| `docs/`         | Architecture, security, setup                                     |
| `legacy/`       | Archived unrelated prior site (not part of this project)          |

## Quickstart

```bash
pnpm install
cp .env.example .env.local         # fill in values
pnpm db:generate                   # generate SQL migrations from the schema
pnpm db:migrate                    # apply to your Supabase Postgres
pnpm db:seed                       # seed agents (configurable count)
pnpm dev                           # run the web app
```

The Python runner:

```bash
cd runner
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload      # or: docker compose up runner
```

## Status

Built in milestones (see `PLAN.md`). Each milestone is committed and pushed to
the `claude/pensive-volta-2yf3zi` branch.

- [x] **M0** — Monorepo scaffold, env template, docs
- [ ] **M1** — Live Supabase DB + 1M-row schema/seed/benchmark
- [ ] **M2** — Agent DNA framework (SOUL.md / SKILL.md)
- [ ] **M3** — Python Skill Runner + workflow engine + connectors
- [ ] **M4** — MCP Gateway + trigger ingestion + vault + guardrails
- [ ] **M5** — Claude generator + Veo/Firefly render pipeline
- [ ] **M6** — Web app (catalog, run console, credentials, DNA viewer)
- [ ] **M7** — Hardening, tests, deploy docs
