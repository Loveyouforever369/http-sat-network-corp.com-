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

## The meta-lesson
**Honesty compounds.** Every time I said plainly "this is blocked / I can't from here," it
saved us from a fake result and pointed at the real fix. The biggest risk to this project
was never a missing feature — it was a confident wrong claim. Keep the gates visible.

## How a new lesson gets locked (the routine)
1. Hit a mistake → write it here (mistake · root cause · fix · rule).
2. If it should change default behavior → add it to `ORCHESTRATOR-PREFLIGHT.md`.
3. If it's brand/strategy → note it in `CLAUDE.md`.
4. If it's teachable → turn it into content (see `content/EP-0301-behind-the-build.md`).
