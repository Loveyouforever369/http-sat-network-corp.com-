# Free / Trial Tool Stack — verified 2026-06-26

> **Read this first.** Free tiers, trials, and credits decay faster than anything else in
> this doctrine. Treat every line as a *starting point*, not a fact — web-search the
> current pricing page before relying on any "free / unlimited / N-day" claim. This is a
> snapshot **verified via live web search on 2026-06-26**; re-verify quarterly.

## How to use this list
- Prefer **open-source / self-hostable** for anything that runs repeatedly (no decaying trial).
- Use **trials** for one-off tests, evaluate before buying.
- Match tool to job; state the one reason. Never adopt because a list named it.

## Corrected / stale-watch (don't repeat the old versions)
- **Gemini CLI retired** (~June 18, 2026) → use **Antigravity CLI** (Gemini 3 backbone) or Gemini via API/MCP.
- **Sora is availability-dependent** — treat as a bonus, not a production backbone. **Veo 3.1 / Kling 3.0 / Seedance 2.0** are the current engines.
- **Runway's free tier collapsed** — ~125 one-time credits (≈2–3 clips, no refresh). That's a trial, not a free plan.
- **Hailuo tightened** from unlimited → ~3 clips/day. Free video caps move monthly.

## Models — open-weight (self-host on Ollama, or via OpenRouter)
| Model | License | Why |
|---|---|---|
| **GLM-5.1 / 5.2** (Zhipu) | MIT | Long-horizon coding + structured output; 5.2 leads the open-weight intelligence index. |
| **DeepSeek V4** Pro/Flash | MIT | 1M context; **Flash is the cost floor** (~$0.14/$0.28 per 1M via cheapest providers). |
| **MiniMax M3** | open weights | Cheap **1M-context + native multimodal** in one model. |
| **Qwen 3.6** (Alibaba) | Apache | Compact MoE, runs on a single GPU, vision + tool calling. *(It's 3.6, not 3.7.)* |
| **Kimi K2.6** (Moonshot) | mod. MIT | Agentic, long autonomous runs. |

## Models — frontier / hosted (the hard 20%)
| Tool | Free? | Use it for |
|---|---|---|
| **Google AI Studio (Gemini + Veo)** | Free w/ rate limits | Copy + best-quality video for testing. |
| **Microsoft Copilot (free)** | Free tier | Web-connected drafting/research. |
| **OpenRouter** | PAYG (some free models) | One API across many models — the simplest "council" on-ramp. |

## Orchestration & agents
| Tool | Free? | Use it for |
|---|---|---|
| **n8n** (self-host) | Free community | The action layer / Agent OS core. |
| **Dify / Flowise / Langflow** | Free / OSS | Visual LLM/RAG app builders. |
| **CrewAI / LangGraph** | Free / OSS | Code-first multi-agent orchestration. |
| **Ollama** | Free | Run the open-weight models above locally (the volume tier). |

## Video (free credits — re-verify caps constantly)
| Tool | Free tier (2026-06) | Use it for |
|---|---|---|
| **Veo 3.1** (Google AI Studio) | Free w/ limits, watermark-free on supported flows | Best overall quality / cinematic. |
| **Seedance 2.0** | Daily credits, **no watermark**, commercial | Watermark-free social / product clips. |
| **Kling 3.0 / Omni** | Trial credits | Native audio + multi-shot storyboards. |
| **Pika** | Free w/ limits | Daily Reels/TikTok/Shorts. |
| **Runway Gen-4.5** | ~125 one-time credits (≈trial) | Editing controls / hero ads. |
| **CapCut** (desktop) | Free, **no watermark** | ~80% of Shorts editing + captions/TTS. |
| **WAN** (open-source) | Free to self-host | Local video gen, no trial decay. |
| **HeyGen / Synthesia** | Small free quota | Avatar / spokesperson video (lip-sync, multilingual). |
| **InVideo AI** | Free w/ watermark | Script → video with voiceover. |

## Voice & narration (see the `voice-layer` skill for the full recipe)
| Tool | Free? | Use it for |
|---|---|---|
| **ElevenLabs** | Free ~10k credits/mo | Studio TTS + cloning — the narration engine. Official MCP. |
| **Web Speech API** | Free (browser) | Draft-grade narration in single-file HTML. |
| **Retell / Vapi** | Free credits | Live phone agents — wired into n8n, not chat connectors. |

## Visuals / design
| Tool | Free? | Use it for |
|---|---|---|
| **Adobe Firefly** | Limited free | Brand visuals in the Adobe workflow. |
| **Inline SVG (hand-built)** | Free | House default for single-file HTML — no external image deps. |

## The buying rule
Spend only on intelligence (one frontier API for the hard 20%) and managed reliability
where self-hosting isn't worth the time. Self-host the volume on Ollama + n8n. Add a paid
tool only when a specific job demands it. **Re-verify every free tier and price quarterly.**
