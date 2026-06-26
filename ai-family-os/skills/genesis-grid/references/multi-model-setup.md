# Multi-Model Setup — Wiring the Council for Real

This is how the "family" stops being a word in a file and becomes callable tools.
All of this lives in **Claude Code** (the CLI), not the Claude.ai chat. Set it up once.

> Honesty check: Claude (in this chat) cannot sign up for trials or install servers on
> your machine for you. These are steps you run, or you ask Claude Code to run with
> your approval. Claude can write the config and walk you through it.

---

## Option A — Multi-AI MCP server (Gemini, Grok, DeepSeek, ChatGPT)

A community MCP server lets Claude Code call other models as tools. You only enable the
ones you have API keys for; tools for missing models simply don't appear.

- Project: `RaiAnsar/claude_code-multi-AI-MCP` (GitHub). Setup is a clone + `./setup.sh`.
- Keys are stored locally (e.g. `~/.claude-mcp-servers/multi-ai-collab/credentials.json`)
  and should be git-ignored. Never commit keys.
- After setup, you talk to Claude Code normally:
  - "Ask Grok for a creative alternative to this architecture."
  - "Have Gemini and DeepSeek debate REST vs event-driven for this."
  - "Get all available AIs to review this function for performance."
- Tools surface as `mcp__multi-ai-collab__ask_gemini`, `...ask_grok`, `...ask_all_ais`,
  `...ai_debate`, plus per-model `code_review` variants.

**Alternative, broader:** `BeehiveInnovations/pal-mcp-server` orchestrates 50+ models
(Gemini Pro, GPT, OpenRouter, Grok, **Ollama/local**, custom endpoints) and is built for
context-revival — having a long-context model "remind" Claude after a context reset.
Good when you want one bridge to everything including local models.

> Verify before installing: these are third-party servers. Check the repo is current,
> read the setup script, and confirm it still matches your Claude Code version.

---

## Option B — Local models (free, no trial decay): DeepSeek, Qwen, GLM via Ollama

For models you want to run free and offline (DeepSeek, Qwen, and many GLM-family /
open weights):

1. Install **Ollama**, pull the model (e.g. `ollama pull qwen` / a DeepSeek build).
2. Expose it to Claude Code either through the `pal-mcp-server` (Option A) which speaks
   to Ollama, or via a thin CLI the agent calls with Bash.
3. Route bulk/cheap passes here to save both money and the main context window.

Local = no API key, no expiring trial, no per-seat ceiling. Best for repeatable jobs.

---

## Option C — Other coding CLIs as the orchestrator or as bridges

- **Aider** — AI pair-programming with Git; works with Claude, GPT, DeepSeek, and local
  models via Ollama. Great for the "edit → review diff → auto-commit" loop.
- **OpenCode** (sst/opencode) — open-source, provider-neutral, 75+ LLM endpoints. Use
  when you want one tool that can front many providers.
- **Antigravity CLI** — Google's terminal agent (Gemini 3 backbone). **Important
  update:** Google is retiring the old **Gemini CLI** — free/Pro/Ultra access stopped
  around **June 18, 2026**; Antigravity CLI is the replacement. If any older note says
  "use Gemini CLI," update it to Antigravity CLI (or call Gemini via API/MCP instead).

---

## How the council plugs into the Build Loop

- **Step 3 (Multi-source) & Step 6 (Quadruple-check):** run a council review — ask 2–3
  models to critique the plan/code; surface where they disagree.
- **Context rescue:** when the window is near full, delegate heavy reading to a
  long-context model and pull back only the summary.
- **Division of labor:** Grok → creative alternatives; DeepSeek/GLM → logical & cost
  reasoning; Gemini → long-context reads + multimodal; local Qwen → cheap bulk passes.

If none of this is wired in the current environment, say so and either set it up or
proceed solo with a noted "council review pending." Never fake a council pass.
