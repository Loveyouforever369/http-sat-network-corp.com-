# AI Family — Build Journal & Lessons

**Purpose:** remember everything we do, and *learn from the process*. Every working
session leaves an entry here: what we built, the decisions we made, what worked,
what broke, and the lesson we keep. This is the human-readable companion to the
machine logs in `logs/` — logs capture *events*, this captures *judgment*.

**How to use it:** newest entry on top. Each entry follows the same shape so the
Thinkers can mine it later (and so it can become course material). When a lesson
generalizes, promote it to the "Standing Lessons" list at the bottom.

---

## 2026-06-25 — Content machine: first site + first real intel

**Built**
- Stood up **"The AI Family" site** in Lovable — fully functional, real backend (episodes / subscribers / leads tables + admin login). Private preview live.
- Ran a real **web-gather** and folded it into the OS: refreshed the Signal Desk signals with sourced June-2026 news, registered **EP-0106** (the $5k/mo-agency episode) with real cost figures, saved `intel/web-gather-2026-06-25.md`.
- Wrote **EP-0001** in full (this Signal Desk script).
- Started the **Academy** (course program) and shipped the first course + skill: **Playwright MCP**.

**Decisions**
- Site builder = **Lovable** for the functional flagship (backend), **Gamma** reserved for fast one-pagers. Both kept in the registry.
- Weekly Signal Desk = **faceless** (Invideo) by default; HeyGen avatars reserved for character-hosted episodes.

**Lessons**
- External creative tools (Gamma, Lovable, video) are **approval-gated** — tee them up, the human approves. Good: that *is* the publish gate working.
- Real data beats placeholders: swapping `example.com` signals for sourced news immediately made the episode writable.

## 2026-06-24 — OS spine + local-intel ingestion

**Built**
- The **AI Family OS** spine: `config/family.json` (14 members, 10 crews, 6 pipelines), PowerShell scripts (`call-family`, `daily-loop`, `posting-pipeline`, `send-family-briefing`), Node validator, Notion mirror.
- Ingested the `C:\Users\billw` asset inventory: 37-entry **Tools & MCP Registry** + the MCP-breaking-changes signal + Episode 105.

**Lessons (the ones that cost us time — keep them)**
- **Can't create a new GitHub repo from this integration** (403). → Stage the OS as a self-contained `ai-family-os/` folder that lifts out later.
- **PowerShell isn't in the cloud sandbox.** → The `.ps1` spine targets the user's machine; we verify the *data* layer here with a **Node validator** instead.
- **The episode `status` field is an enum** (`idea→scripted→visual→voiced→scored→review→published`). "researched" failed validation → use `idea`. Validate after every config edit.
- **`C:\Users\billw` is unreachable** from this Linux container — local assets must be committed or uploaded before we can import them faithfully.

---

## Standing Lessons (promoted, always true)
1. **Validate after every `config/family.json` edit** (`node tools/validate.js`) — references + enums.
2. **Cite sources in `intel/` and on every signal** — Guardian verifies before anything ships.
3. **Keep `ai-family-os/` self-contained** so it can become its own repo with zero edits.
4. **Human gate before publish** — always. Speed without a check is a faster mistake.
5. **Every tool we adopt gets a course + (where useful) a skill** — see `courses/`.
