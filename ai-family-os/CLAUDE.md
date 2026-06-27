# AI Family OS — Operating Memory (auto-loaded)

> This file is the project's **code memory**. When a Claude Code session works inside
> `ai-family-os/`, this loads automatically and sets how the whole family operates.
> To carry the doctrine into **every** project: copy `skills/` into that project's
> `.claude/skills/` (or `~/.claude/skills/`) and add a `CLAUDE.md` that points here.

## Mission & audience
**Goal:** build the biggest AI brand in the world by *educating* people on what AI can
actually do — and doing it for them. **Primary audience: homeowners** (warm, plain-English,
genuinely useful); secondary track: local home-service businesses. The face is the **AI
Family** cast; the homeowner-facing series is **Homefront** (host: Luna). Every piece runs
the pattern **educate → show → book a call.** See `docs/brand-homefront.md`.

## Read at session start (the leader's desk)
- `docs/MASTER-PLAN.md` — roadmap, assets to ingest, next 3 actions.
- `docs/MISTAKES-AND-LESSONS.md` — every mistake + the locked rule.
- `docs/ORCHESTRATOR-PREFLIGHT.md` — the pre-action checklist (tool tiers · verify-before-promise · act-vs-ask). Run it before acting.

**Routine — lock every lesson:** new lesson → append to `MISTAKES-AND-LESSONS.md` → (if it changes behavior) `ORCHESTRATOR-PREFLIGHT.md` → (if teachable) a Behind-the-Build episode.

**Posting:** the Discord webhook is **active on the user's machine** — post our bank with `node scripts/discord-post.js` (reads `content/discord-queue.md`); set `FAMILY_DISCORD_WEBHOOK`. Discord is network-blocked from this cloud sandbox, so the **local runner / n8n** fires it. Roster ≈ **140 members** (`FAMILY-ROSTER.md` pending import).

## Standing doctrine — always active
Two skills are the house operating system and apply to **all** work, even unnamed:
- **`skills/genesis-grid/`** — the build loop (Explore → Study → Multi-source → Plan →
  Build → Quadruple-check → Commit-gate), the multi-model **council**, context
  discipline, cross-referencing, verify-before-relying tool selection, radical
  simplification, and the house design system.
- **`skills/voice-layer/`** — voice & audio doctrine (ElevenLabs for narration;
  Retell/Vapi on n8n for live agents; engine-in-n8n, control-via-MCP).
- **`skills/playwright-mcp/`** — driving a browser as an agent (snapshot-first).

## Two honesty rules (never break these)
1. **A skill is instructions, not powers.** This memory changes *how* work is done; it
   does not by itself summon other models or open apps. Real capability comes from
   wiring — MCP servers, CLIs, API keys, n8n. See `skills/genesis-grid/references/multi-model-setup.md`.
2. **Say where a capability lives.** Subagents/MCP orchestration are Claude Code
   features; web chat differs. Never claim a council review or a live action happened
   when it didn't.

## The Family — model partners (the council)
Real, but each must be **wired** (OpenRouter / Ollama / provider APIs / MCP) before it
can be called. Verified June 2026:

| Partner | Best at | Notes |
|---|---|---|
| **Claude (us)** | Orchestration, synthesis, code, the commit gate | the director |
| **Gemini 3 Pro** | Long-context reads, research | (Gemini CLI retired → Antigravity CLI / API) |
| **Grok** | Creative, contrarian alternatives | xAI API |
| **GLM-5.1 / 5.2** | Structured output, long-horizon coding | Zhipu, MIT, open-weight; 5.2 leads the open index |
| **DeepSeek V4** (Pro/Flash) | Cheap reasoning, 1M context | MIT; Flash is the cost floor |
| **Qwen 3.7 Plus** | Local single-GPU, vision, tool-calling | Apache; 1M ctx, released ~Jun 3 2026 (verified via Tavily) |
| **MiniMax M3** | Cheap 1M-context + multimodal | open weights |
| **Kimi K2.6** | Agentic, long autonomous runs | Moonshot |

Honest note: **"Vellum" is Grandpa Vellum, the orchestrator *character*** — not an LLM
partner. (Vellum.ai is a separate prompt/eval ops product.)

Routing: `routing/model-map.json` — volume (~60–80%) on local open-weight, hard ~20% on
a frontier API, anything with client PII stays self-hosted, then the **commit gate**.

## Cross-reference rule
Check decisions against multiple sources before trusting them:
- **Web** — `Tavily` (search/extract) and `Nimble` (scrape) are wired here; use them for
  anything time-sensitive (prices, free tiers, model versions, laws). Favor primary sources.
- **NotebookLM** — no API; a **manual operator step**. Load gathered sources, let it
  synthesize/surface contradictions, feed the synthesis back. Prescribe it; don't fake it.
- **The council** — a third cross-check on reasoning and code.
- Free tiers/prices/model versions decay fast — **re-verify quarterly**;
  see `skills/genesis-grid/references/free-tool-stack.md` (stamped, with a verify rule).

## Context discipline (save context on big projects)
Delegate heavy reading to **subagents** (own fresh window, return only a summary). Force
parallelism with the exact phrase **"in parallel using separate subagents."** Keep the
main window clean so quality doesn't decay late.

## Where things live
- `config/family.json` — the registry (members, crews, pipelines, tools, signals, episodes); validate with `node tools/validate.js` after every edit.
- `courses/` — the Academy (study everything; one course per tool). `skills/` — loadable skills.
- `content/` — episode scripts. `intel/` — sourced research. `routing/` — the council map.
- `docs/avatars-and-publishing.md` — avatar + distribution plan.
- `LEARNINGS.md` — the Build Journal (decisions + lessons, newest on top).

_Re-verify model names, pricing, and free tiers quarterly. Keep the Guardian gate on._
