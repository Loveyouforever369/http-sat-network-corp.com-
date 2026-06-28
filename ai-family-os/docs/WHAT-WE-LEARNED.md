# What We Learned — right · wrong · better · add

The one-page truth of this build. A living scoreboard so we keep what works, drop what doesn't,
and always know the next best move. Full detail: `LEARNINGS.md` (right) + `MISTAKES-AND-LESSONS.md`
(wrong). Updated 2026-06-27.

## ✅ What we've done RIGHT (keep doing)
- **Honesty as the product.** Disclose AI, source every stat, say where a capability lives. It's now
  enforced by code (`guardian-lint`), not just intention. This is the moat.
- **Memory that compounds.** Every lesson → a committed file. The system gets sharper each session.
- **File-first deliverables.** Self-contained HTML pages + JSON registries never "flap" like MCP tools do.
- **Validate everything.** `health.js` (6 checks) before every push; nothing ships red.
- **Create here, run where it works.** Build in the sandbox; render/publish on the user's machine/n8n.
- **One source of truth.** `config/family.json` + the Tool Lab; auto-indexed by `index-docs.js`.

## ⛔ What we've done WRONG (don't repeat — see MISTAKES-AND-LESSONS.md)
- Promised before verifying · hammered approval-gated tools · corrected a fact without a source ·
  silent git failures · shipped pages without disclosure · spawned subagents into a spend cap ·
  treated a pasted repo list as verified. **All now have guardrails.**

## 🔧 What can be done BETTER (active improvements)
- **Voice:** we A/B nothing yet — render the same 2 lines through Kokoro / IndexTTS-2 / ElevenLabs, pick by ear.
- **Render:** still manual/local — adopt **Open-Generative-AI** (self-host, 200+ models) so we own the engine.
- **Characters:** lock a visual reference per member (Duix-Avatar / Seedance) for true cross-episode consistency.
- **Delegation:** capped by spend — lean on **free local models (Ollama)** + automated chores for the repetitive 90%.
- **Distribution:** channels not yet connected — wire Postiz + YouTube auth to make the queue fire.

## ➕ What to ADD next (the superpowers — from the GitHub scout)
1. **Open-Generative-AI** (21k★, MIT) — free self-hosted video/image studio → the Forge's owned engine.
2. **Toonflow** (11k★) + **Duix-Avatar** (14k★) — turn the 8 story scripts into animated shorts with faces.
3. **ha-mcp** (3.7k★) — make Homefront demos real (live home automation for Luna).
4. **system-prompts repo** (141k★) — study to sharpen our skills + master prompt.
5. **The self-improvement loop** — now a skill (`skills/self-improvement/`): scout → vet → test → adopt → lock.

## The next 3 concrete moves
1. **Render + publish RQ-001** (Meta AI→Flow → YouTube via Zapier) — close the loop, prove the chain.
2. **Deploy the site to Vercel** — make all 15 pages a live URL.
3. **Self-host Open-Generative-AI** — own the render engine, then auto-run the whole queue via n8n.

_Re-read this at session start with the leader's desk. Update it whenever a row changes._
