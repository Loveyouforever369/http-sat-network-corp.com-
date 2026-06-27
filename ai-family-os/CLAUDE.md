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
- `docs/DELEGATION.md` — how to split work to crew subagents + the **good habits** (always-on).
- `config/tool-ratings.json` (run `node tools/tool-lab.js`) — what works 🟢 / blocked 🔴. Don't re-try dead ends.
- `docs/agent-stack-catalog.md` — external tools we're adopting (verify before install).

**Run `node tools/health.js` before any push** (config · tool lab · scripts · desk · pipeline · guardian-lint = 6 checks).
**Delegated chores (free, no spawn):** `validate.js` · `tool-lab.js` · `guardian-lint.js` (publish gate) · `render-queue.js` · `index-docs.js` (rebuild `docs/INDEX.md`). See `docs/DELEGATION.md`.
**Free tools to grab:** `docs/free-tools-to-get.md` · local video/voice trio: `docs/local-trio-setup.md`.
**Mission Control** = `content/mission-control.html` — one hub to launch every tool + page + see status (no site-hopping). **Publish:** `docs/PUBLISH-NOW.md`.

**Routine — lock every lesson:** good outcome → `LEARNINGS.md`; mistake → `MISTAKES-AND-LESSONS.md` → (if behavioral) `ORCHESTRATOR-PREFLIGHT.md`; tool result → `config/tool-ratings.json`; (if teachable) a Behind-the-Build episode.

**Delegation:** delegate heavy/parallel research + bounded builds to crew **subagents** (`docs/DELEGATION.md`); keep synthesis + the commit gate on the main thread. **Subagents cost spend and are monthly-capped** — if they return empty, the cap is hit: stop spawning, fall back to inline Tavily, tell the user to raise the limit.

**Posting:** the Discord webhook is **active on the user's machine** — post our bank with `node scripts/discord-post.js` (reads `content/discord-queue.md`); set `FAMILY_DISCORD_WEBHOOK`. Discord is network-blocked from this cloud sandbox, so the **local runner / n8n** fires it. Roster ≈ **140 members** (`FAMILY-ROSTER.md` pending import).

## Standing doctrine — always active
Four skills are the house operating system and apply to **all** work, even unnamed:
- **`skills/genesis-grid/`** — the build loop (Explore → Study → Multi-source → Plan →
  Build → Quadruple-check → Commit-gate), the multi-model **council**, context
  discipline, cross-referencing, verify-before-relying tool selection, radical
  simplification, and the house design system.
- **`skills/voice-layer/`** — voice & audio doctrine (ElevenLabs for narration;
  Retell/Vapi on n8n for live agents; engine-in-n8n, control-via-MCP).
- **`skills/video-editor/`** — editing grammar + tool map (Descript drivable here; OpenCut/CapCut
  local) + a train-yourself loop. Load it when cutting/captioning/scoring video.
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
- `config/tool-ratings.json` — the **Tool Lab** (tested status + ratings; `node tools/tool-lab.js`).
- `config/voice-map.json` — per-member voices · `config/render-queue.json` — the render handoff (`node tools/render-queue.js`).
- `tools/health.js` — one-command system check (run before every push).
- `courses/` — the Academy (study everything; one course per tool). `skills/` — loadable skills.
- `content/` — episode scripts + narrated HTML pages. `intel/` — sourced research. `routing/` — the council map.
- `docs/` — MASTER-PLAN, MISTAKES-AND-LESSONS, ORCHESTRATOR-PREFLIGHT, DEEP-FEATURES, DELEGATION, agent-stack-catalog, social-channels, avatars-and-publishing.
- `LEARNINGS.md` — the Build Journal (decisions + lessons, newest on top).

_Re-verify model names, pricing, and free tiers quarterly. Keep the Guardian gate on._
