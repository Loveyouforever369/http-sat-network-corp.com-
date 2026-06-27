# AI Family OS — Master Plan

*The single, organized roadmap. Read this + `CLAUDE.md` at the start of every session.
Updated as we learn. Owner: Grandpa Vellum (orchestration) → the crews.*

---

## 0. Where we are (state snapshot — 2026-06-26)
**Built & pushed:**
- **OS core:** `config/family.json` (14 members, 10 crews, 6 pipelines, 4 campaigns, 47 tools, 16 episodes), Node validator, PowerShell spine.
- **Memory & doctrine:** `CLAUDE.md`, skills (`genesis-grid`, `voice-layer`, `playwright-mcp`), `LEARNINGS.md`, council `routing/`.
- **Brand site (deployable, zero-dep):** homepage, Cast, Episodes hub, + live pages (Homefront EP-0107, Signal Desk, The First Spark).
- **Content bank:** Signal Desk (live), Homefront EP-0107–0110, Family Stories EP-0201–0208, Behind-the-Build EP-0301.
- **Publisher wired:** Zapier `YouTube: upload_video` enabled (TOOL-116).

**Honest gates (not yet cleared):** video **render** (tools blocked in sandbox), **publish auth** (connect YouTube), **outbound** (Discord/some hosts blocked here). These run on the user's machine / n8n.

---

## 1. Assets to ingest (from `C:\Users\billw`) — surfaced, not yet imported
These live on the user's Windows machine; commit them to the repo or drop in Google Drive and the family ingests them faithfully.

| Asset | What it is | Action |
|---|---|---|
| `agent-family/FAMILY-ROSTER.md` | the real **107-member** roster (46 active) | import → expand `config/family.json` |
| `ai-signal-desk/content/` | a full **episode library** (ep01–ep04, s2ep03, tool05 MCP) | import → register as episodes |
| `AI-FAMILY-CONTENT-DROPS.md` | daily/weekly **content calendar** (6 platforms) | merge into the posting plan |
| `prometheus-platform/content/perplexity-100-content-drops.md` | **1198-line** content-drop master | mine for episode ideas |
| `agent-family/browser-agents/*` | Browser-Use / auto-post **scripts** | register + wire to publishing |
| `AI-FAMILY-MCP-SERVERS.md` + `install-mcp-servers.ps1` | the **21+ MCP** stack | already in registry; sync exact configs |
| `agent-family/docs/RUFLO-STUDY.md` | RuFlo **210+ MCP tools** | evaluate for the automation spine |
| `AI-FAMILY-*-BIBLE.md` (Cline, Aider, OpenCode) | tool **playbooks** | fold into `courses/` |

---

## 2. The roadmap (phases)
- **Phase 1 — Foundation ✅ (done):** OS, memory, skills, content bank, wired publisher.
- **Phase 2 — Ingest + produce (now):** import the 107 roster + Signal Desk library + content-drops; produce content *in detail* (full narrated pages for every episode); keep the retrospective loop running.
- **Phase 3 — Go live:** render pipeline (user/n8n) → **Guardian gate** → publish (YouTube via Zapier, socials via the user's channels); deploy the site (Vercel/Lovable).
- **Phase 4 — Self-running:** n8n `daily-loop` runs Sage→Nova→Guardian→Luna on a schedule, logs to Notion; analytics feed back (Motion/Meta) to pick winners.
- **Phase 5 — Scale:** monetize (the "100 members" community target, digital products, the done-for-you home-AI service), expand the universe, weekly cadence on both shows.

## 3. Who does what (crew map)
Elders (Vellum) orchestrate · Thinkers (Sage, Scout, Brother News) research · Builders (Cipher, Atlas) build/automate · Creators (Nova, Mom Social) package · Studio/Voice/Soundtrack (Nova Studio, Echo, Soundtrack Dir) produce · Guardian gates · Luna distributes · Operator (Uncle n8n) runs the loop + logs.

## 4. Definition of done (per content unit)
A unit ships only when it has: script ✓ · visual plan ✓ · voice plan ✓ · music cue ✓ · Guardian pass ✓ · AI-disclosure ✓ · a publish packet ✓. (No unit "done" without all seven.)

## 5. Suggested next 3 actions (concrete)
1. **Import the 107 roster** — user commits `agent-family/FAMILY-ROSTER.md`; we expand the registry faithfully.
2. **Full narrated pages** for EP-0108–0110 + EP-0202–0208 (reliable, no tools needed).
3. **Clear one publish gate** — connect YouTube + render one clip → dispatch the first real video.

*See `MISTAKES-AND-LESSONS.md` (what we fixed) and `ORCHESTRATOR-PREFLIGHT.md` (how we avoid repeating it).*
