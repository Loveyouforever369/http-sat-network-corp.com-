# Architecture

## Components

### 1. Web app + MCP Gateway (`web/`, Next.js App Router, TypeScript)
- **Catalog/search UI** over 1M agents (keyset pagination, GIN/trgm-backed).
- **MCP Gateway** (`/api/mcp`) — a real Model Context Protocol server built with
  `@modelcontextprotocol/sdk` (Streamable HTTP). It is the single secure choke
  point through which agents act:
  1. Authenticate the caller and resolve `(agent, user)`.
  2. Enforce **SOUL guardrails** (allow/deny, spend caps, approval thresholds).
  3. Inject credentials from the **encrypted vault** — secrets never enter the
     model's context.
  4. Route the tool call to the Python Skill Runner (or a connector).
  5. Write an **audit record** to `runs` / `step_runs`.
- **Agent-run endpoint** — runs the Claude agent loop with `SOUL.md` as the
  system prompt and `mcp_servers=[gateway]`; streams results.
- **Trigger ingestion** (`/api/triggers/[platform]`) — signed inbound webhooks
  (Zendesk, Stripe, DocuSign, Shopify…), signature verification, event
  normalization, condition matching, dispatch to the workflow engine.

### 2. Python Skill Runner (`runner/`, FastAPI, Dockerized)
- Executes `SKILL.md` **Python** tools in a sandbox (timeouts, memory/CPU caps,
  import allowlist, egress allowlist).
- **Workflow engine** — runs `api_execution_logic` as a conditional DAG: ordered
  steps, per-step `condition` expressions, data passing between steps
  (`step_1.is_angry → step_2`), retries, idempotency, structured audit.
- **Connectors** — real SDK clients for Stripe, Slack, Salesforce, Shopify,
  Zendesk, Linear, Twilio, DocuSign, plus LLM-step providers (OpenAI/Gemini).
  Each runs in `dry_run` (simulate) or `live` (real writes) mode.
- Authenticated to the gateway via a shared secret; credentials are passed
  per-call by the gateway and never stored in the runner.

### 3. Database (`db/`, Supabase Postgres + Drizzle ORM)
- Canonical agent model (see `PLAN.md`), tuned for 1M-row low-latency reads.
- Row-Level Security; audit tables month-partitioned.

### 4. Agent DNA (`packages/dna/` + `agents/`)
- `SOUL.md` (YAML front-matter + Markdown) → Claude system prompt + policy
  object (identity, guardrails, anti-hallucination rules).
- `SKILL.md` → Anthropic tool definitions + Skill-Runner registry entries.
- A **base DNA** every agent inherits; a resolver merges base + agent overrides;
  a compiler emits the canonical DB record.

### 5. Generator + Render (`web/` workers / `runner/`)
- Claude generator: combinatorial taxonomy + gold exemplars (structured
  outputs), resumable, idempotent, deduped.
- Render pipeline: Veo 3.1 (video, Gemini API) + Adobe Firefly (stills),
  async jobs, assets in Supabase Storage, status on `agent_marketing`.

## Request flows

### Browse (read path — the "1M served fast" path)
`UI → /api/agents (keyset + filters) → Postgres (GIN/trgm/btree) → JSON`. Hot
lists cached. Target p99 < ~50 ms.

### Run / trigger (write path)
`webhook → trigger ingestion (verify + match) → workflow engine → for each step:
gateway (guardrails + vault) → connector (dry_run|live) → audit`. The Claude
brain is invoked where a step requires reasoning; deterministic steps call
connectors directly.

## Anti-hallucination posture
Grounding rules in `SOUL.md` (answer only from tool results / provided data;
cite; "say you don't know"), strict tool schemas + structured outputs, and an
optional verification pass. Combined with dry-run + approval thresholds for any
side-effecting step. We reduce — not "guarantee zero" — hallucination, and gate
irreversible actions behind policy.
