# Agent Stack Catalog — the open-source tools we're adopting

The 14-tool "Claude Code agent stack" (from the Andrew Warner + Adam Brakhane video the user
shared) — evaluated and **mapped onto the AI Family OS**. This is how we "gather them into our
work": not by blindly cloning 14 repos into this repo (sandbox + repo scope won't allow that,
and vendoring someone else's repos is the wrong move), but by cataloging each, mapping it to the
organ it upgrades, and giving an honest adopt/verify status.

> **Guardian note (read first):** Repo names/URLs below are **transcribed from the source video,
> not independently verified by us** — our crew's live verification run hit the account's monthly
> spend limit (2026-06-27). **Verify each repo exists, read its README, and check the license
> before installing.** Install on the user's machine / n8n (most are local-first); this cloud
> sandbox can't clone arbitrary repos. Treat anything unverified as a lead, not a fact.

## Status legend
🟢 already in our stack · 🔵 adopt next (high fit) · 🟡 evaluate · ⚪ niche/later · 🔎 verify repo first

## 1. Core MCP & agent infrastructure (highest leverage)
| Tool | What it claims | Maps to our organ | Status |
|---|---|---|---|
| **Zapier MCP** | Claude → 9,000+ apps / 30k actions | Distribution + Hands (we use it for YouTube `upload_video`) | 🟢 in use (TOOL-111/116) |
| **codebase-memory-mcp** (DeusData) | Indexes a repo into a queryable graph; ~99% fewer tokens | Memory (structural code memory for this OS) | 🔵 adopt next · 🔎 verify |
| **Agent-Reach** (Panniantong) | No-API scraping of X/Reddit/GitHub/YouTube/LinkedIn | Senses (Sage's research reach beyond Tavily) | 🔵 adopt next · 🔎 verify |

## 2. Video production (agentic & local) — upgrades the Video Forge
| Tool | What it claims | Maps to | Status |
|---|---|---|---|
| **OpenMontage** (calesthio) | Agentic video production; pipelines + tools + skills; "avoids AI slop" | Motion+Cut stations (Cipher/Nova) | 🔵 adopt next · 🔎 verify |
| **OpenCut** (OpenCut-app) | Open-source CapCut alt; MCP server, headless | Cut station; pairs with our `skills/video-editor` | 🔵 adopt next · 🔎 verify |

## 3. Voice & audio (local, private) — upgrades the Voice Lab
| Tool | What it claims | Maps to | Status |
|---|---|---|---|
| **voicebox** (jamiepine) | Local zero-shot voice cloning; multi-track; local ElevenLabs alt | Voice (Echo) — per-character cloned voices, free | 🔵 adopt next · 🔎 verify |
| **FluidVoice** (altic-dev) | Fast offline macOS dictation (local Whisper) | Input — dictate scripts/prompts | 🟡 evaluate · 🔎 verify |

## 4. Research, monitoring & forecasting — upgrades the Senses
| Tool | What it claims | Maps to | Status |
|---|---|---|---|
| **worldmonitor** (koala73) | Real-time global intel dashboard, self-hostable | Senses (macro signals for Signal Desk) | 🟡 evaluate · 🔎 verify |
| **birdclaw** (steipete) | Local-first X/Twitter workspace; SQLite + CLI | Senses + Distribution (X triage) | 🟡 evaluate · 🔎 verify |
| **timesfm** (Google Research) | Zero-shot time-series forecasting | Analysis (trend/market forecasts) | 🟡 evaluate · 🔎 verify |

## 5. Design, prompts & browser — upgrades Eyes + the brain
| Tool | What it claims | Maps to | Status |
|---|---|---|---|
| **penpot** | Open-source self-hosted Figma alt | Eyes (Nova — design → code) | 🟡 evaluate · 🔎 verify |
| **system_prompts_leaks** (asgeirtj) | Curated real system prompts | The brain (refine our master prompt + skills) | 🔵 study now · 🔎 verify |
| **peerd** (NotASithLord) | Browser-native local agent (extension) | Hands (browser agent; cf. our playwright-mcp) | 🟡 evaluate · 🔎 verify |

## 6. Finance / daily intelligence
| Tool | What it claims | Maps to | Status |
|---|---|---|---|
| **daily_stock_analysis** (ZhuLinsen) | Daily multi-market analysis → pushes to Discord/Slack/etc. | Atlas (business track), optional | ⚪ later · 🔎 verify |

## Our adoption order (honest, low-risk first)
1. **Confirm Zapier MCP** end-to-end (already wired) — finish the YouTube auth.
2. **Verify + try the local video/voice trio** on the user's machine: **OpenCut + voicebox + OpenMontage** — they directly upgrade the Video Forge & Voice Lab (free, local). Render is already a local/n8n job for us, so this is the right home.
3. **codebase-memory-mcp + Agent-Reach** — bigger memory + wider research, once verified.
4. **Study system_prompts_leaks** to sharpen our master prompt / skills.
5. The rest (worldmonitor, timesfm, penpot, birdclaw, peerd, daily_stock_analysis): evaluate as needs arise.

## How "gather into our work" actually happens here
- **In this repo (now):** this catalog + the mapping + adoption order (done).
- **On the user's machine / n8n (where installs belong):** clone the verified repos, wire the MCP
  servers into Claude Code, and connect them to our pipelines (render-queue, voice-map).
- **Then back here:** record each in `config/tool-ratings.json` with a real tested status (🟢/🔴 +
  a lesson) once we've actually run it — same rule as every other tool.

_Re-verify repos + licenses before installing. Nothing here is marked "working for us" until it's
in the Tool Lab with a real test result._
