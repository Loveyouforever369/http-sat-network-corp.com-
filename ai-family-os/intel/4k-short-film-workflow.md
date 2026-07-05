# Intel — Ultra-Realistic 4K AI Short Films (studied 2026-07-01)

**Source:** YouTube `HSON-SoFz7s` — "Make Ultra Realistic AI Short Films with Fable 5 + Seedance 4K
(Full Workflow)" by Adil (transcript extracted via Tavily). Upgrades our EP-0310 movie pipeline.

## The workflow (scene-by-scene, all inside Higgsfield AI)
1. **Assets first:** build every character/prop/location in **Soul Cinema + GPT Image 2 + Nano Banana Pro**.
2. **Reference sheets on GREY backgrounds** — lock characters, props, AND locations (not just faces).
3. **A custom Claude skill writes the Seedance 2.0 prompts** — pro-level prompt engineering, automated.
4. **Generate in native 4K** (Runway ML 2.0 4K / Seedance) — 4K holds detail in wide shots where 1080p falls apart.
5. **Layout maps** for scene consistency; pick the right image model per job.
6. **Voiceover trick:** upload the finished clip → AI analyzes it → writes the documentary-style VO → pick a voice. (No script stress.)
7. **Iterate ONE prompt until it lands** — don't scattershot.

## What we adopt into EP-0310 (locked)
- Add **grey-background reference sheets** for props + locations to our character sheets (Part 1 of the SCRIPT).
- **Generate hero/wide shots in 4K**, not 1080p.
- Build a **`skills/seedance-prompter/`-style prompt skill** (we already write per-shot prompts — formalize as a skill next session).
- Use the **analyze-clip → auto-VO** trick for B-roll beats; our written narration stays for the hero VO.
- Consider **Higgsfield** as the all-in-one render home (also cited in our earlier research).

## Content to make about it
Behind-the-Build short: "We studied the 4K film workflow the pros use — 5 tricks: grey-background
reference sheets, 4K wides, one-prompt iteration, layout maps, auto-VO from the clip." (Queue next session.)
