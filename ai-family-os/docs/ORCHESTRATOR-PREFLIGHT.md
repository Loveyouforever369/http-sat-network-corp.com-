# Orchestrator Pre-Flight — the thinking accelerator

*A fast checklist the leader runs before acting, so the family moves quickly without
repeating mistakes. This exists to speed up the thought process: decide once, encoded here,
then act on reflex. Distilled from `MISTAKES-AND-LESSONS.md`.*

## Tool tiers (know what's reliable here)
- **🟢 Reliable (file-based / always works):** Write/Edit/Read, Bash, `git` (this repo), the Node validator. **Default to these.**
- **🟡 Usually works (verify first):** Tavily (research), Notion (dashboard), Lovable (build). Flaps — check before promising.
- **🔴 Blocked / gated in this sandbox:** video render (Invideo/HeyGen approval stream), social publish/upload (needs a file + user auth), Discord/some outbound (proxy 403). **These run on the user's machine / n8n. Never imply they ran here.**

## Before I PROMISE an external action — 4 checks
1. **Loaded?** Is the tool's schema loaded (ToolSearch) and its server connected?
2. **Gated?** Is it approval-gated or credit-gated? (If the approval stream is closing, don't retry — stage it.)
3. **Reachable?** Does outbound reach the host? (When unsure, one curl test before promising.)
4. **Inputs?** Do I actually have every required input (e.g. a video FILE for an upload)?
If any is "no" → build the turnkey artifact instead and say plainly what's blocked.

## Before I COMMIT — 3 checks
1. Am I at the repo root? Use `git -C /home/user/http-sat-network-corp.com-` or absolute paths.
2. After commit, **print `git log --oneline -1`** to confirm it landed.
3. If I touched `config/family.json`, I already ran `node tools/validate.js` and it passed.

## Before I state a FACT or a CORRECTION
- Time-sensitive (models, prices, tools, who-holds-a-role)? **Web-search first** (Tavily). A correction needs a source as much as a claim does. Never overwrite the user's correct fact.

## Act vs. Ask
- User said **go / continue / build**? → **Produce decisively.** No "which would you like."
- Genuine fork that changes the work and only the user can decide? → ask **one** crisp question, recommend a default.

## Speed moves (delegate to go faster on big jobs)
- Heavy reading / multi-file sweeps → a **sub-agent** ("research X, Y, Z **in parallel using separate subagents**") returns only a summary; keeps my window clean.
- Repeated structure → use a **template** (course template, episode template) instead of re-deriving.
- Batch independent tool calls in **one** turn; never serialize what can run in parallel.

## The one-line creed
**Create here; run/publish where it works; verify before promising; lock every lesson.**
