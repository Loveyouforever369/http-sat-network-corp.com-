---
name: self-improvement
description: >
  The family's superpower: a repeatable loop for getting better every week — scouting new tools
  and techniques, vetting them honestly, testing them, adopting the winners, and locking every
  lesson into memory. Load this whenever asked to "find better tools," "make yourself better,"
  "add new skills," or "figure out a more effective way."
---

# Self-Improvement — the superpower loop

> "Figuring out better, more effective ways" is the job — and it only compounds if it's *locked
> in memory*. This skill is the engine that turns scouting into permanent capability.

## The loop: Scout → Vet → Test → Adopt → Lock
1. **Scout** — go find what's new and better.
   - **GitHub** (verified, free): the `github` tool — `search_repositories` sorted by stars
     (e.g. `awesome MCP servers stars:>2000`, `open source AI video stars:>3000`). Star counts are real.
   - **Hugging Face**: models/voices/spaces. **Tavily**: time-sensitive web + YouTube breakdowns.
   - Keep a scouting note in `intel/` (dated, sourced) — e.g. `intel/github-scout-*.md`.
2. **Vet (honestly)** — not everything shiny is good.
   - Check stars + recent activity + **license** (MIT/Apache = safe to self-host) + does it fit an organ?
   - Mark anything unconfirmed "verify before install." A pasted list is a *lead*, not a fact.
3. **Test** — run it where it actually runs (sandbox 🟢 vs. user machine / n8n 🔴). One real try, no hammering.
4. **Adopt** — wire the winners into the pipeline (render-queue, voice-map, Mission Control, a chore).
5. **Lock** — the part that makes it compound:
   - Worked → `LEARNINGS.md` + `config/tool-ratings.json` (🟢 + how we use it).
   - Failed → `MISTAKES-AND-LESSONS.md` + tool-ratings (🔴 + the lesson) — never re-try the dead end.
   - New repeatable behavior → a skill (`skills/`) or a chore (`tools/`, `docs/DELEGATION.md`).
   - Teachable → a Behind-the-Build episode.

## Vetting checklist (fast)
- [ ] Real (verified via API/primary source, not just a video/claim)?
- [ ] License lets us use it? Recent activity?
- [ ] Maps to an organ / a real need (not shiny-object)?
- [ ] Free or within budget? Where does it run (here vs. user machine)?
- [ ] After testing: recorded in the Tool Lab with an honest status?

## Fallback doctrine — a tool fails or can't do it → find a better way (never just stop)
The moment a tool errors, is gated, out of credits, or can't do the job:
1. **Name the failure + root cause** — the exact error and *why* → `config/tool-ratings.json` (🔴 + lesson). Don't hammer it (locked lessons #3, #11, #20 — pivot, don't repeat).
2. **Find a better path, fast (in this order):**
   - a tool we already have that does it (check the Tool Lab first),
   - a **free alternative** — research via Tavily / GitHub / Hugging Face (`docs/free-tools-to-get.md`, `docs/agent-stack-catalog.md`),
   - **learn to do it ourselves** — a script or the file-based route (how Descript became our render engine, how the HTML pages replaced flaky renderers),
   - **find a YouTube tutorial** — Tavily-extract the transcript and mimic/perfect the workflow (`skills/` + `intel/video-learnings-*`).
3. **Integrate the winner** into our environment — wire it, add a chore, update a skill, register it in the Tool Lab.
4. **Never dead-end** — if every path is gated on the user (auth/credits), surface the ONE exact unlock and keep moving on what's unblocked.

## Document right AND wrong — with the WHY
Every outcome is recorded *with its cause* — the "why" is the point; results without causes don't compound:
- **Worked** → `LEARNINGS.md` + Tool Lab 🟢, and *why* it worked (so we repeat the cause, not just the result).
- **Failed** → `MISTAKES-AND-LESSONS.md` + Tool Lab 🔴, the root cause + the rule (so we never repeat it).

## Cadence
- **Weekly:** one scout pass (GitHub + HF + a Tavily sweep) → update an `intel/` note.
- **Per adoption:** Tool Lab entry + a line in `LEARNINGS.md`.
- **Quarterly:** re-verify free tiers + model versions (they decay).

## Triple-check before you save (always)
1. `node tools/health.js` (6 checks) · 2. `node tools/guardian-lint.js` (disclosure) ·
3. `node tools/tool-lab.js` (status sane). Then commit + `git log -1` to confirm the push.

## The mindset
Don't chase hype; chase *leverage*. The edge isn't a secret tool — it's a family that scouts,
tests honestly, remembers everything, and never repeats a mistake. That memory is the superpower.
