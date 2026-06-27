# Delegation — how the family splits the work

The orchestrator (Grandpa Vellum / the lead session) doesn't do everything alone. It **delegates
self-contained chunks to crew members** — implemented as Claude Code **subagents**, each given a
character role, a tight brief, and a required return format. The lead keeps the main thread for
synthesis, the commit gate, and anything needing full project context.

## Who gets what (crew → subagent role)
| Member | Delegate when you need… | Typical brief |
|---|---|---|
| **Sage / Brother News** | research, fact-finding, scouting | "Find + rate X as of <date>, sourced, return a markdown table." |
| **Nova** | visual/tool scouting, design options | "Find top tools for Y, free-tier honest, return shortlist + top 5." |
| **Cipher** | a contained build/refactor | "Build script Z that does …, return the file + how you tested it." |
| **Echo / Soundtrack** | voice/music options | "Shortlist voices/scores for <mood>, with access paths." |
| **Guardian** | a review pass | "Check this for fake claims / missing sources, return a punch list." |

## Delegated chores (automated + free — no spend, no spawn)
The honest way to "delegate small repetitive work" while the spend cap is on: the repetitive jobs
run as **scripts owned by family members**, not paid subagents. The lead does the heavy lifting
(architecture, content, synthesis); these chores keep the house tidy for free.

| Chore | Owner | Command | When |
|---|---|---|---|
| Validate the registry graph | Cipher | `node tools/validate.js` | after any `config/family.json` edit |
| Tool Lab scorecard | Grandpa Vellum | `node tools/tool-lab.js` | after testing a tool |
| Guardian honesty lint | Guardian | `node tools/guardian-lint.js` | before publishing any page |
| Render work order | Mom Social | `node tools/render-queue.js` | when prepping a render run |
| Rebuild the memory map | the Librarian | `node tools/index-docs.js` | after adding files |
| Full system health | Grandpa Vellum | `node tools/health.js` | before every push |

Local-model delegation (free, once installed): route repetitive *drafting* to **Ollama** on the
user's machine (see `docs/free-tools-to-get.md`) — the volume 90% for free, frontier saved for the hard 10%.

## When to delegate (and when NOT to)
- **Delegate** heavy, parallelizable, self-contained work (research fan-out, a bounded build) —
  it keeps the main context clean so quality doesn't decay late.
- **Don't delegate** the synthesis, the commit gate, or anything needing the whole repo in head.
- **Brief rule:** a subagent starts cold. Give it everything it needs, name the tools to use, and
  specify the exact return format. Vague briefs waste a spawn.

## The good habits (always — lock these)
1. **Verify before you promise.** Tool loaded + reachable before claiming it (Tool Lab tiers).
2. **Verify before you correct.** A correction needs a source too.
3. **Record what works AND what fails.** Good → `LEARNINGS.md`; bad → `MISTAKES-AND-LESSONS.md`;
   tools → `config/tool-ratings.json`. Never re-try a known dead end.
4. **Confirm the result.** Print the receipt (`git log -1`, health check) — don't assume success.
5. **One source of truth.** `config/family.json` for IDs/names; run `node tools/health.js` after edits.
6. **Honesty compounds.** Say where a capability lives; never claim an action that didn't happen.
7. **When told "go," produce.** Reserve questions for real forks.

## Honest limit found 2026-06-27 (a real lesson)
We delegated two research agents (Nova: visual tools; Sage: free AI workers). **Both returned
empty — the account hit its monthly spend limit** (`claude.ai/settings/usage`). So:
- **Subagent delegation costs spend**, and is **capped by the account's monthly limit.** When the
  limit is hit, agents return nothing useful — *don't* keep spawning them.
- **Fallback (locked):** when delegation is unavailable, the lead does the critical research
  inline with low-cost reliable tools (Tavily), or defers the deep-research items and says so.
- To re-enable full family delegation + deep web research, **raise the limit** in settings.

## Status line
- 🟢 Subagent delegation is wired and works (we launched 2 in parallel).
- 🔴 Currently **capped by the monthly spend limit** — raise it to run the family at full tilt.
- The render/voice handoff (`config/render-queue.json`, `config/voice-map.json`) is the other
  half: heavy media work is delegated to the user's machine / n8n, not the sandbox.
