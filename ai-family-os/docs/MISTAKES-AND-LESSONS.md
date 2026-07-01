# Mistakes & Lessons — the honest retrospective

*Every mistake made building this, its root cause, the fix, and the rule now locked.
The point of writing these down is simple: never make the same one twice. This is living —
each new lesson gets appended and promoted into `CLAUDE.md` / the pre-flight checklist.*

| # | Mistake | Root cause | Fix / Locked rule |
|---|---|---|---|
| 1 | Tried to create a new GitHub repo → **403** | assumed integration scope without checking | Check scope first; stage in a self-contained folder; don't promise a repo I can't make. |
| 2 | `cd` in Bash persisted → `git add ai-family-os` matched nothing → a **commit silently didn't happen** | working dir changed; didn't verify the commit landed | Use `git -C <repo-root>` or absolute paths; **always print `git log -1` to confirm** the commit + push. |
| 3 | **Hammered an approval-gated tool** (Invideo ×2) while the permission stream was closing | retried into a broken channel | Don't retry a closing approval stream. Prepare a turnkey order; fire when healthy. |
| 4 | Implied I could **post/publish** before verifying | didn't check tool existence + outbound first | **Verify the tool is loaded + the server connected + outbound reaches the host BEFORE promising.** (Discord = 403; no YouTube tool until Zapier.) |
| 5 | "Corrected" that **Qwen is 3.6 not 3.7** — but 3.7 Plus was real | corrected from stale memory without a source | A correction needs a source too. Verify before correcting; never overwrite a user's right fact. |
| 6 | Used an **invalid episode `status`** ("researched") → validator failed | didn't know the enum | Know the enums; **run `node tools/validate.js` after every `config` edit.** |
| 7 | Created a **duplicate Notion page** instead of editing | `create-pages` makes new; needed `update-page` | Check if it exists; use the right verb (create vs update). |
| 8 | Occasionally **over-planned / re-asked** when told "go" | hedging on genuine momentum | When the user says go/continue, **produce decisively**; reserve questions for real forks. |
| 9 | **Name↔ID drift** (EP-0001 host MBR-0002 labeled "Sage" on the site; config MBR-0002 = Prometheus) | two sources of truth for names | One map: `config/family.json` is canonical; **check the id→name map before assigning a host.** |
| 10 | Built assuming **tools stay connected**; they flap | treated MCP as stable | Prefer reliable file-based deliverables; treat MCP creative/publish as best-effort; always have a fallback. |
| 11 | **Wolfram Alpha** failed: "permission stream closed before response received" | approval-gated MCP tool needs an interactive grant the sandbox can't give | The approval-stream-closed failure isn't just render tools — it's a *class*. Recorded in the Tool Lab as 🔴 blocked; don't retry, run on the user's machine. |
| 12 | HF model search with a **tag filter returned empty** (looked like a failure) | the `text-to-speech` filter over-constrained the query | An empty result ≠ a broken tool. Search by query first, narrow with filters only after; check the call *succeeded* before assuming the tool failed. |
| 13 | Went to **add external repos** to help the project — the `list_repos`/`add_repo` tools aren't connected this session | assumed a capability was present without checking | Check the tool is actually loaded before promising it. Repo-adding is a web-app/account action here; surface it to the user instead of faking it. |
| 14 | Delegated 2 research subagents → **both returned empty (monthly spend limit hit)** | spawned without knowing the account was at its cap | Subagent delegation costs spend + is capped monthly. When hit, agents return nothing — stop spawning, fall back to inline Tavily or defer, and tell the user to raise the limit. (`docs/DELEGATION.md`) |
| 15 | Asked to "gather 14 repos into our work" — almost treated a pasted tool list as verified fact | a third-party video's repo names/URLs aren't verified, and the sandbox can't clone arbitrary repos | Catalog third-party tools as *leads* (`docs/agent-stack-catalog.md`), mark "verify before install," and only record a tool as working after a real test in the Tool Lab. Don't vendor unverified repos. |
| 16 | 3 narrated pages (index, the-cast, story) shipped **without the AI disclosure** | disclosure was a manual habit, not enforced | Built `tools/guardian-lint.js` to fail any narrated page missing disclosure, and wired it into `health.js` (now a publish gate). Habits that matter get enforced by code, not memory. |
| 17 | Asked to "send everything out everywhere" — but checked first | only **YouTube** is wired in Zapier; FB/IG/TikTok/X = Postiz on the user's machine; all need a rendered file | Before promising multi-channel publish, run `list_enabled_zapier_actions`. The publish loop + one-time setup live in `docs/PUBLISH-NOW.md`. No post is "published" without a returned ID. |
| 18 | A parallel session (Perplexity) spun a **second brand** ("Prometheus AI Training") + a conflicting character lineup | parallel work didn't reconcile to canon | One brand, one handle, one canon: `config/family.json` + `config/character-bible.json`. Map parallel work onto them (see `docs/perplexity-absorb.md`); never fork the brand mid-build. |
| 19 | Perplexity built every asset but **nothing shipped** ("live in 30s of recording") | mistook production for publishing | "Assets built" ≠ "published." The real bottleneck is render/record + auth. Don't celebrate a brand as live until a piece has a returned ID. |
| 20 | The epic-refine + Short job **failed: "Insufficient AI credits"** (Descript) | external tool credits are finite + ran dry after ~100 credits / 2 jobs | Treat credits + auth as hard gates, like the spend cap. On a credit-out / auth-required error: STOP (don't hammer), surface the exact upgrade/auth link, and do the script-level work instead. Both render (Descript credits) + publish (YouTube auth) now sit on the user's accounts. |
| 21 | Absorbed a big uploaded plan with **mismatches** (40-min ask vs ~3-min storyboard; LA vs Vegas; a 2nd character set) | new plans arrive with internal + cross-plan conflicts | Reconcile before locking: ship the 3–4 min hero first (feature is chapters after); keep geo adaptable; keep TWO rosters separate (cast = `character-bible.json`, customer personas = `customer-personas.json`); label ROI as illustrative. Absorb → align → note conflicts, never blindly merge. |

## The meta-lesson
**Honesty compounds.** Every time I said plainly "this is blocked / I can't from here," it
saved us from a fake result and pointed at the real fix. The biggest risk to this project
was never a missing feature — it was a confident wrong claim. Keep the gates visible.

## How a new lesson gets locked (the routine)
1. Hit a mistake → write it here (mistake · root cause · fix · rule).
2. If it should change default behavior → add it to `ORCHESTRATOR-PREFLIGHT.md`.
3. If it's brand/strategy → note it in `CLAUDE.md`.
4. If it's teachable → turn it into content (see `content/EP-0301-behind-the-build.md`).
