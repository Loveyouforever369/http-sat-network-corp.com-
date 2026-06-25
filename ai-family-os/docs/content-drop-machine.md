# The Content-Drop Machine (PIPE-006)

**One concrete, runnable flow for a single goal:**
*"A new video gets made → the landing page updates → it publishes to YouTube,
Facebook, and Instagram on a schedule"* — with exactly **one** human approval gate.

This is the four-stage pipeline (**make → build → distribute → orchestrate**)
wired to the connectors already on the account.

## The flow, step by step

| # | Stage | Family member | Connector(s) | Output |
|---|-------|---------------|--------------|--------|
| 1 | Research | Brother News *(Thinkers)* | Brave Search · Tavily · browser-use | `topic_brief` |
| 2 | Script | Nova *(Creators)* | Claude | `content_concept` |
| 3 | Voice / video | Echo *(Voice)* | HeyGen · Descript | `voice_plan` + footage |
| 4 | Visuals | Nova Studio *(Studio)* | Canva · Invideo | `visual_spec` + thumbnail |
| 5 | Music | Soundtrack Director | — | `music_spec` |
| 6 | Site | Atlas *(Builders)* | Lovable / Base44 → Vercel | `site_update` (live URL) |
| 7 | 🚦 **GATE** | **Guardian** | **human approval** | `guardian_report` |
| 8 | Distribute | Luna *(Connectors)* | **Postiz** → YouTube, Facebook, Instagram (+25) | `distribution` |
| 9 | Orchestrate | Uncle n8n *(Operators)* | n8n / Zapier | `schedule` + triggers |

**The gate (step 7) is the rule:** nothing in steps 8–9 fires until a human
approves the Guardian report. Keep that gate manual until the flow has shipped
clean **twice**; then you may let it auto-approve low-risk drops.

## What runs today vs. what needs one-time setup

- **Runs now (demo mode, zero API keys):** `./scripts/content-drop.ps1` walks all
  9 steps, logs every handoff, and **stops at the gate**.
- **One-time auth (per platform):** YouTube, Facebook Page, and Instagram are each
  authenticated once inside **Postiz**; **Vercel** needs the project linked; **n8n**
  is self-hosted (you run it). This is the only manual setup — after it, the flow
  runs hands-off.
- **Go live:** set `settings.demo_mode=false`, wire `Invoke-Model` + the connector
  calls, and the same flow ships for real.

## Run it

```powershell
cd ai-family-os/scripts
./content-drop.ps1 -Topic "Your video topic"           # walks to the gate, then stops
./content-drop.ps1 -Topic "Your video topic" -Approve   # continues past the gate (distribute + schedule)
```

## How your bigger vision maps onto this machine

| You said | Where it lives |
|----------|----------------|
| Marvel-themed characters | `members` (Prometheus, Cipher, Sage, Nova, Atlas, Luna, Echo, Guardian) |
| Futuristic backgrounds / visuals | The Studio crew → step 4 `visual_spec` |
| Deep stories | `episodes` → step 2 `content_concept` |
| Great music | The Soundtrack crew → step 5 `music_spec` |
| Gather data all over the web | Browser agents (`TOOL-051..054`) + Brave/Tavily → step 1 |
| Learn / train on every tool | `tools` registry + the `family-training-loop` pipeline |
| Monetize on Facebook / YouTube | Step 8 distribute (Postiz) |
| Save it into memory | This repo (source of truth) + the Notion mirror |
