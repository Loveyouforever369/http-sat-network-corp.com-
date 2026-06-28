# AI Family — Build Journal & Lessons

**Purpose:** remember everything we do, and *learn from the process*. Every working
session leaves an entry here: what we built, the decisions we made, what worked,
what broke, and the lesson we keep. This is the human-readable companion to the
machine logs in `logs/` — logs capture *events*, this captures *judgment*.

**How to use it:** newest entry on top. Each entry follows the same shape so the
Thinkers can mine it later (and so it can become course material). When a lesson
generalizes, promote it to the "Standing Lessons" list at the bottom.

---

## 2026-06-27 — Gathered + transcribed creator videos; built the YT + FB pages + lead playbook

"Gather videos like that, transcribe, learn, build the YouTube + Facebook pages, find owners in need."

**Transcribed (real, Tavily):** Tao Prompts (186k) "3 Tools for Any AI Video" → the
**design-sheet → storyboard → animate** pipeline with a **reference-image grid** for character
consistency (Claude writes/locks the design sheet → GPT Image 2 design sheet + storyboard → Seedance
animates; "no subtitles/no music" on raw gens). Plus the **5-Layer Prompt Framework**
(Hook→Script→Voice→Visuals→Retention) + a retention punch-list, format-specific workflows, the
"one tool per job" stack, and creators to follow (Tao Prompts, AI Video School, Curious Refuge).
→ `intel/video-learnings-2026-06.md`. Big insight: our `character-bible.json` descriptors ARE design
sheets — lock the sheet, storyboard, then animate = identical cast every episode.

**Built out the pages (paste-ready):** `content/youtube-channel-kit.md` (name, About, trailer script,
sections/playlists, first-5 uploads from the queue, VidIQ SEO template, cadence) and
`content/facebook-page-kit.md` (about, first posts, pinned, groups strategy, Book-Now CTA, lead capture).

**Find owners in need:** `docs/find-business-owners.md` — ICP, the "in need" signals (slow replies,
hiring admin, manual booking, asking about AI), where to find them (FB groups, LinkedIn, Reddit, Maps,
inbound), ethical sourcing (Apollo/Clay only with authorization; value-first; no spam), and the
find→value→qualify(n8n #8)→book flow.

Honest: I can't create the actual accounts or send outreach (yours) — but every field, post, and the
flow are written and staged. Triple-checked: health 6/6, guardian 0 fail.

## 2026-06-27 — Full launch package staged (here-to-live in one runbook)

"Do everything / launch now / full hands on." Honest framing: the sandbox can't flip content public
(render needs a file; YouTube/socials need the user's auth) — so I staged the *entire* launch so it's
a one-session go-live, and committed it (that's the launch from our side).
- `docs/open-generative-ai-setup.md` — self-host the free render engine (Open-Generative-AI) to own
  rendering; honest that premium models may need a key, app is MIT/self-host.
- `content/launch-posts.md` — ready-to-fire post bank for every platform (launch announcement + a
  pillar set for How AI Works / Homefront / Business / Build-in-public / Story Vault) + a first-week schedule.
- `docs/LAUNCH-DAY.md` — the single sequence: setup → render RQ-001 → publish the proof → roll the
  queue (or n8n) → measure → lock results.

Delegated to **automated family chores** (subagents still spend-capped → would return empty, so no
spawns). Triple-checked: health 6/6, guardian 0 fail. Restated the one needle: render RQ-001 + send
the mp4 URL + "YouTube authed" → I publish from here. Everything else is staged and waiting.

## 2026-06-27 — Absorbed Perplexity's parallel build (learn, reconcile, align)

Perplexity (research family member) built a parallel "Prometheus AI Training" brand — 6-layer OS,
agent lineup, 10 n8n templates, Canva assets (banners/carousels/character art), season calendar.
Reviewed it honestly and absorbed the gold into our canon (`docs/perplexity-absorb.md`).

**Adopted:** the 6-layer framing; Operator/Teacher dual mode; the **10 n8n templates** (re-cast to our
family → `automation/n8n-templates.md`); the visual-prompt framework; the 1→many distribution; and new
free tools (Fathom, Granola, Phygital+, NotebookLM, Gemini Flash → `free-tools-to-get.md`).

**Lessons locked (#18, #19):** (1) it spun a **second brand** + a conflicting character lineup
(made Cipher a *researcher* — ours is the builder; invented Forge/Watcher = our Cipher/Guardian).
**One brand, one canon** — mapped them back in `config/character-bible.json`. (2) It built every asset
but **shipped nothing** ("live in 30s of recording") — *assets built ≠ published*; the real bottleneck
is render/auth, as we've said.

**Character consistency locked:** `config/character-bible.json` — appearance + color + voice per member
(the look from the Prometheus art the user liked), so the cast is identical every render. Reconciled
Perplexity's 5 → our richer cast. Triple-checked: health 6/6, guardian 0 fail, tool-lab valid.

## 2026-06-27 — GitHub scout, the self-improvement superpower + business outreach

Acted on "search GitHub, find powerful tools, make yourself better, add skills, post to business owners."

**Real GitHub scout (verified via the github API today):** `intel/github-scout-2026-06.md` —
standouts: **Open-Generative-AI** (21k★, MIT — self-hosted studio, 200+ video/image models = the
Forge engine we OWN), **Duix-Avatar** (14k★, offline digital humans), **Toonflow** (11k★, scripts→
animated shorts), **ha-mcp** (3.7k★, live Homefront demos), **system-prompts repo** (141k★, sharpen
our prompts), awesome-mcp-servers (90k★, the directory). Added the top 4 to the Tool Lab (untested/
adopt-next, GitHub-verified). These are verified (API), unlike the video-sourced catalog.

**New skill — the superpower:** `skills/self-improvement/` — the repeatable loop scout → vet → test →
adopt → **lock**. Codifies "figuring better, more effective ways" as memory, not vibes. Now 5 standing skills.

**Consolidated memory:** `docs/WHAT-WE-LEARNED.md` — right · wrong · better · add, with the next 3
moves. The single-page scoreboard, added to the leader's desk.

**Business outreach:** `content/EP-0309-business-outreach.md` (Atlas) — deeper pitch (problem → what
we deploy → honest math → guardrails) + 3 Shorts + **honest cold email / DM / follow-up templates**
(value-first, opt-out friendly, no guarantees). Queued RQ-015.

Triple-checked (health 6/6 · guardian 0 fail · tool-lab sane); INDEX + WORK-ORDERS regenerated.

## 2026-06-27 — The Story Vault (8 character shorts in one cinematic page)

Built `content/stories.html` (EP-0200, narrated by Echo) — the eight character shorts from
`storylines.md` (Prometheus·Cipher·Sage·Atlas·Nova·Luna·Guardian·Echo) as one cinematic gallery,
each card in the character's color with its logline, key line, and takeaway. Chose ONE gallery over
seven separate pages on purpose — avoids piling up unrendered files while still showcasing every arc.
Queued the whole set as RQ-014 (shorts-pack from storylines.md, per-character voices). Passes
Guardian-lint; health 6/6; render queue now 14 items; EP-0200 registered.

## 2026-06-27 — Render→publish made turnkey (work orders + n8n blueprint)

Closed the gap between "13 videos queued" and "rendered + posted." Built `tools/build-work-orders.js`
— it parses each queued page's `script[]`, attaches the member's voice (engine/style/rate/pitch from
voice-map), music cue, and targets, and writes one copy-paste sheet: `automation/WORK-ORDERS.md`
(13 items, full narration extracted). Plus `automation/n8n-blueprint.md` — the node-by-node loop
(trigger → read queue → voice → visuals (Meta AI→Flow) → assemble → caption+music → upload via
Zapier/Postiz → write back the ID). Render/publish run on the user's machine / n8n (still blocked
here) but are now turnkey, not hand-assembled. Added the chore to DELEGATION; honesty rule baked in
(no "published" without a returned ID). Health 6/6.

## 2026-06-27 — Homefront series shipped as pages (EP-0108/0109/0110)

Turned the three homeowner scripts into full narrated pages (Luna, teal homefront style):
- **EP-0108** — the 10-minute household assistant (one brain · calendar+email observe-only · 3 jobs).
- **EP-0109** — never get overcharged by a contractor (paste the quote + 3 questions · compare bids ·
  scam red flags; Atlas cameo; 78% over-budget stat attributed).
- **EP-0110** — AI that keeps your home + parents safe (catch danger early · age in place with dignity ·
  Matter + privacy + consent; Guardian cameo; "AI assists, never replaces 911").
All set to status `visual`, queued RQ-011/012/013 (voice: Luna), pass Guardian-lint (disclosure +
sources + caveats). Homefront (homeowner funnel) is now 4 live pages (0107–0110). Health 6/6.

## 2026-06-27 — The educational layer: how AI works, dos & don'ts, why we win

Built the teaching content the brand is *for* — long-form + shorts, from our own training.
- **EP-0307 "How AI Works"** (`content/how-ai-works.html`, host Luna) — flagship narrated page that
  teaches AI in plain English: examples → pattern engine → best guess (verify it), the 3 things to
  know, great-at vs careful-with, and the Role+Task+Format+Constraints prompt formula. Fun SVG pipeline.
- **EP-0306 "AI Dos & Don'ts"** (host Guardian) — 6 rules built straight from `MISTAKES-AND-LESSONS.md`
  + `ORCHESTRATOR-PREFLIGHT.md` (verify · protect data · human-on-the-gate · ignore hype · disclose AI
  · confirm the result). Long cut + 3 Shorts.
- **EP-0308 "Why Our Process Wins"** (host Grandpa Vellum) — teaches the locked 6-step workflow
  (sense·script·make·check·remember·ship) using our stack + the video-study tools (Meta AI→Flow,
  Seedance, our Voice Lab). Long cut + 3 Shorts. The "remember what works AND what fails" step is the spine.

All 3 registered (EP-0306/0307/0308), queued RQ-008/009/010, voices mapped. how-ai-works passes
Guardian-lint (disclosure present). Health 6/6; render queue now 10 items. Lock-what-works /
lock-what-fails is now itself a published lesson, not just an internal doc.

## 2026-06-27 — Mission Control (one hub) + the business showcase

**Fixed the "too many sites" problem.** Built `content/mission-control.html` — a single hub that
launches every external tool (Lovable/Vercel · Meta AI/Flow/Descript/ElevenLabs/IndexTTS-2 · Canva/
Gamma/Leonardo · YouTube Studio/Postiz/Zapier/n8n · Tavily/Hugging Face/Ollama/Notion), opens every
content page, shows live system status (6/6 health · 9/14 tools · 6 renders · 20 episodes), and lists
the family's one-command chores. Bookmark it = the whole OS from one screen.

**Business track (Atlas).** Built `content/for-business.html` (EP-0305) — narrated showcase for owners
+ entrepreneurs: the crew shown as roles you'd hire out, the busywork we automate first, and the honest
math (agency $5k–15k/mo vs AI crew $799–1,999/mo, framed as a hybrid, not a fantasy). CTA: book a free
strategy call. Queued as RQ-007 (voice: Atlas → ElevenLabs).

**Locked process:** both pages pass Guardian-lint (disclosure present); health 6/6; for-business
registered + queued; render-queue now 7 items; index auto-rebuilt. Music cues set per render item.

## 2026-06-27 — Studied a YouTube free-video breakdown (Meta AI + Flow + Seedance)

Extracted YouTube `8Q8Km4pvdE8` ("3 Free & Unlimited AI Video Generators") via Tavily and mined
the good parts → `intel/free-video-meta-flow-seedance.md`. Takeaways adopted:
- **Meta AI** = free + (daily-capped) "unlimited", watermark-free → our zero-cost **draft** engine.
- **Google Flow** = audio + consistent characters with a **saved voice per character** → the strong
  **final** render. Workflow: draft on Meta AI → finalize on Flow. Daily limits refresh (free drip).
- **Seedance 2.0** via Higgsfield / free on **BytePlus** for character shots.
Added Meta AI + Flow to the free-generator table in `intel/video-tools-2026-06.md`.

**What we do better (locked):** systematic character consistency via `voice-map.json` + a reference
per member (identical cast across the *whole series*, not one clip); our Voice Lab for emotion;
n8n automates the daily free drip from `render-queue.json`; the Guardian disclosure layer the video
skips; one-long→many-shorts repurposing; our cinematic house look so free videos don't look free.

**What to watch (caveat):** "unlimited/free" = daily-capped + region-gated and changes fast — re-verify;
not yet A/B tested by us (next: same 2 lines through Meta AI vs Flow vs our Voice Lab, pick by ear).

## 2026-06-27 — Guardian-as-code, the local trio, free-tool list + delegated chores

**Guardian-lint caught real bugs.** Built `tools/guardian-lint.js` (narrated pages MUST disclose
the AI host/voice) and it immediately flagged 3 pages shipped without it — index.html, the-cast.html,
story-the-first-spark.html. Fixed all 3, wired the lint into `health.js` as a publish gate (now
**6/6 checks**). Lesson #16 locked: habits that matter get enforced by code, not memory.

**Option 2 wired (local trio):** `docs/local-trio-setup.md` — OpenCut + voicebox + OpenMontage,
mapped onto our render-queue + voice-map + video-editor skill (install on the user's machine; they
upgrade the Forge & Voice Lab for free). Registered as untested · install-pending in the Tool Lab,
plus codebase-memory-mcp + Agent-Reach as adopt-next.

**Free tools to grab:** `docs/free-tools-to-get.md` — honest shopping list (Leonardo/Flux/ComfyUI
for character images, Suno + YouTube Audio Library for music, Ollama for FREE local delegation,
Pexels/Pixabay for B-roll). Top 5: Ollama, Leonardo, Suno, YT Audio Library, Flux.

**Delegated the repetitive work (spend-free).** With subagents spend-capped, the honest move:
repetitive jobs run as **automated family chores** (scripts), not paid spawns. Added the
Librarian's chore `tools/index-docs.js` → auto-generates `docs/INDEX.md` (the OS map). Documented
the full chore map in `docs/DELEGATION.md` (validate/tool-lab/guardian-lint/render-queue/index/health).
The lead keeps the heavy lifting; the house stays tidy for free. Ollama is the free local worker
for repetitive drafting once installed.

## 2026-06-27 — Delegation, the render bridge, the editor skill + the agent stack

Big build round on the OS itself + the first real delegation.

**Delegated for real (and learned the limit):** launched 2 background crew subagents (Nova →
visual tools; Sage → free AI workers). **Both returned empty — the account hit its monthly spend
limit.** Honest lesson locked: subagent delegation works but costs spend and is monthly-capped;
when hit, agents return nothing → stop spawning, fall back to inline Tavily, raise the limit.
Recorded in the Tool Lab (Subagents = 🟡 partial), `docs/DELEGATION.md`, and lessons #14.

**Shipped OS upgrades:**
- `config/voice-map.json` — every character → a Voice-Lab engine + style (recognizable by ear).
- `config/render-queue.json` + `tools/render-queue.js` — the render handoff (6 items queued);
  the bridge over the blocked-render gate (user's machine / n8n executes the work order).
- `tools/health.js` now validates pipeline configs too → **5/5 checks.**
- `skills/video-editor/SKILL.md` — editing grammar + honest tool map (Descript drivable here;
  OpenCut/CapCut local) + a train-yourself loop. ("add a video editor memory and train yourself.")
- `docs/DELEGATION.md` — crew→subagent roles + the **good habits** (always-on).

**Agent stack catalog:** `docs/agent-stack-catalog.md` — the 14-tool open-source stack from the
user's video (codebase-memory-mcp, Agent-Reach, OpenMontage, OpenCut, voicebox, FluidVoice,
worldmonitor, birdclaw, timesfm, penpot, system_prompts_leaks, peerd, daily_stock_analysis, +
Zapier MCP which we already use), each **mapped to the organ it upgrades** with an honest
verify-before-install status. Lesson #15: catalog third-party repos as *leads*, don't vendor
unverified repos, only mark a tool "working" after a real Tool Lab test.

**Content:** `content/EP-0304-academy-promo.md` — fun **group promo Shorts** advertising the free
Train-Anyone course across all socials (full-cast cameos, host Mom Social) → queued as RQ-005.

**Honest blockers this turn:** subagent delegation + deep web research are capped by the monthly
spend limit; external repo installs belong on the user's machine (sandbox can't clone arbitrary
repos). Said so plainly instead of faking results.

## 2026-06-27 — The Video Forge (find free tools → mimic → our version)

Acted on "find the best free AI-video tools/techniques on YouTube, learn to mimic, build OUR
version." Ran a live Tavily sweep of 2026 tutorials + roundups and **tested a video tool live**.

**Tested live:** ✅ **Descript MCP** (list_projects, authed) — reachable from the sandbox, unlike
the blocked render tools. That makes Descript our in-sandbox **edit/caption/publish** step. Added
to the Tool Lab 🟢.

**Notes (intel/video-tools-2026-06.md):** the free 2026 generator field — **Wan** (open-source,
free if self-hosted), **Kling 3.0** (physics/cinematic, 66 free/day), **Seedance** (character
consistency), **Hailuo**, **Veo/Google Flow**, **OpenArt**, **Luma/Pika**. The universal technique
is one loop: find what works → scene-by-scene script (3s hook) → lock characters → stills →
image-to-video → expressive voice → caption/music → publish. Differentiator = story + consistent
characters, **not** the tool.

**Our version (content):** `content/the-video-forge.html` (EP-0303, host Nova) — a narrated,
futuristic "8-station forge" page that *teaches* the pipeline (find→script→cast→stills→motion→
voice→cut→ship), each station owned by a character, free tool named, house style, voice hook.
Plus `content/EP-0303-make-ai-video-free.md` — the long cut **and 3 Shorts** (the long+short
content the user asked for), and `docs/social-channels.md` — the YouTube/FB/TikTok playbook with
the one-long→many-shorts repurposing pipeline.

**Locked rule of the niche:** *"AI video isn't dead — low-effort slop is."* Our honesty +
recurring detailed characters + consistent look is the built-in edge. Made it the spine of both.

**Honest limits found:** the `claude-code-remote` repo tools (list_repos/add_repo) aren't
connected this session — can't add external repos from here; it's a web-app/account action
(lesson #13). The heavy generators + Discord still run on the user's machine / n8n; only Descript
among video tools is verified reachable here.

## 2026-06-27 — The Tool Lab + the Living System (test, rate, remember, teach)

Ran the family's own doctrine on itself: **find / test / rate tools, record what doesn't
work, turn it into content.**

**Tested live (real results):** ✅ Tavily (current voice/video intel), ✅ Hugging Face Hub +
Spaces (authed; sourced the voice shortlist), ❌ **Wolfram Alpha** — "permission stream closed,"
the same approval-gate class as the render tools. No hammering — recorded and moved on.

**Built the memory of our hands — the Tool Lab:** `config/tool-ratings.json` (12 tools with
honest status 🟢/🟡/🔴 + ratings; blocked ones *must* carry a lesson) and `tools/tool-lab.js`
(prints the scorecard, validates structure). Now we never re-try a dead end. Added a
one-command **system health check** `tools/health.js` (config graph + tool lab + referenced
files + leader's desk, green/red in one screen) — run it before every push.

**Voice Lab (the robotic-voice fix):** `intel/voice-tools-2026-06.md` — rated the unique open
TTS field. Standouts: **Kokoro v1.0** (free/local default), **Qwen3-TTS** (per-character voice
design), **IndexTTS-2** (emotion control — the actual fix), **OmniVoice/Chatterbox** (multilingual).
Plan: render finals through these / ElevenLabs into each page's `AUDIO[]` hook.

**Unforgettable content:** `content/the-living-system.html` (EP-0302, host Grandpa Vellum) — a
narrated, story-driven map of the family as a living organism (organs = characters: senses,
hands, eyes, voice, conscience, heart, memory), fun inline-SVG anatomy with a pulsing core,
house style, voice hook. The "we're a system, not a tool" story made visual.

**Deep features + training:** `docs/DEEP-FEATURES.md` (shipped vs. proposed, incl. the
render-queue manifest as highest-leverage next) and `courses/train-anyone/README.md` (zero-to-
shipping onboarding so the method is teachable to anyone).

**Lessons locked:** Wolfram = blocked class (don't retry); an empty search result ≠ a broken
tool (check the call succeeded first). Both appended to `MISTAKES-AND-LESSONS.md`. Also fixed
the **Qwen 3.7 Plus** correction everywhere (CLAUDE.md + TOOL-205) so all files agree.

## 2026-06-26 — Leader's system: plan + retrospective + pre-flight + content

Built the **leader's desk** — the durable system that makes the family get sharper
every week instead of repeating itself:
- `docs/MASTER-PLAN.md` — phased roadmap, the C:\Users\billw assets to ingest, crew map,
  definition of done, next 3 actions.
- `docs/MISTAKES-AND-LESSONS.md` — a 10-row retrospective (mistake · root cause · locked
  rule) mined from this whole build, plus the meta-lesson *honesty compounds*.
- `docs/ORCHESTRATOR-PREFLIGHT.md` — the **thought accelerator**: tool tiers
  (🟢 file-based reliable · 🟡 verify-first · 🔴 blocked here), pre-promise + pre-commit
  checks, the act-vs-ask rule, and speed moves (subagents, templates, parallel calls).
- `CLAUDE.md` now opens with **"Read at session start (the leader's desk)"** so every
  session loads the plan, the lessons, and the pre-flight before acting — and a
  **lesson-locking routine**: new lesson → append to MISTAKES-AND-LESSONS → (if it changes
  behavior) PREFLIGHT → (if teachable) a Behind-the-Build episode.

**Content from the learnings:** wrote `content/EP-0301-behind-the-build.md` — *"5 Mistakes
We Made (and the Fixes)"* (host Cipher + Guardian), registered as **EP-0301** in
`config/family.json`. The retrospective is now a teachable episode, exactly as instructed.

**Discord reinstated (honestly):** the webhook is **active on the user's machine**, so I
re-added the poster — `scripts/discord-post.js` reads `content/discord-queue.md` (a bank of
~11 on-brand, honest posts) and fires each to `FAMILY_DISCORD_WEBHOOK`. Discord is
**network-blocked from this cloud sandbox** (403 to discord.com), so the poster runs on the
**local machine / n8n**, not here. Roster ≈ **140 members** (`FAMILY-ROSTER.md` import pending).

**Lesson locked:** a project that *remembers its mistakes in committed files* beats one that
re-learns them every session. The plan/retrospective/pre-flight trio is the real moat —
the content is the output, the system is the product.

## 2026-06-26 — YouTube dispatch wired; the honest bottleneck found

Studied the publish chain end to end and **wired the publisher for real**: enabled the
Zapier **YouTube `upload_video`** action (YouTubeV4CLIAPI). The dispatch chain is now:
`research → script → RENDER (file) → Guardian → upload_video → log`.

**Two gates remain — both on the user's side, neither fakeable:**
1. One-time **YouTube auth** in Zapier (auth URL surfaced).
2. A **rendered video FILE** — `upload_video.video` is a required file, and the render
   tools won't execute from this sandbox (approval stream closes).

**Key lesson locked:** the **publisher is no longer the blocker — the video file is.**
Never mark content "posted" unless an upload returns a video ID. See `docs/publishing-system.md`.
The fix path: render on the user's machine/n8n → hand me (or n8n) the file/URL → upload fires.

## 2026-06-26 — Signal Desk built by the family (real tools, real roles)

Ran the content pipeline with members doing different jobs: **Sage + Scout** researched
live via **Tavily** (this week's AI news), **Cipher + Nova** built `content/signal-desk.html`,
**Echo** wrote the narration, **Guardian** added the sourcing/attribution note, **Luna**
distributed it to the **Notion** dashboard. Wired it into the homepage's Signal Desk card.

**Correction locked:** **Qwen 3.7 Plus is real** (released ~June 3, 2026, 1M ctx) — my
earlier "it's 3.6 not 3.7" was wrong; the user was right. Also fresh this week: GLM-5.2
(new open-weight record), Gemini 3.5 Pro delayed to July, NotebookLM 2.0, Samsung→ChatGPT
company-wide. Re-verify fast-moving items (e.g. Anthropic/Alibaba) before stating as fact.

## 2026-06-26 — Discord dropped (user's call)
Removed the Discord poster + TOOL-115. The family already interacts through existing
channels — no Discord webhook needed. The council/models help *build* content; the user's
own channels handle interaction/distribution. (It was network-blocked from the sandbox anyway.)

## 2026-06-26 (review) — "Would the biggest company in the world release it?"

Ran the genesis-grid commit gate over everything. Honest verdict:

**Release-ready (ship it):** the OS doctrine + skills + memory (`CLAUDE.md`), the
registry/validator, the written scripts (EP-0001, EP-0107), the Homefront strategy, the
**Character Bible**, and the EP-0107 episode page. Real, validated, self-contained.

**NOT release-ready (don't claim it's done):**
- **No video has actually rendered** — Invideo is approval-stream-blocked this session.
- **Nothing is published** — no social connector here, and **Discord is network-blocked**
  (proxy 403 to discord.com). Publishing runs on your infra, not this sandbox.
- **Voices were robotic** — fixed the *path* (page now plays a real audio file when one is
  supplied; warmer Web Speech fallback), but premium ElevenLabs audio still needs wiring.
- **Site AI not wired** — designed, not deployed.

So a big company would release the **foundation + docs + site**, and would NOT yet claim a
"live, self-running content machine." That gap is the honest line, every time.

**Added this pass:** Character Bible (8 futuristic hosts, locked look/voice/lane); the
voice fix (real-audio path); the Discord poster (portable, ready for the webhook URL).

**Lessons locked (never repeat):**
- **Verify outbound reachability BEFORE promising a post.** Discord = 403 CONNECT here.
- Don't hammer an approval-gated tool when the permission stream is closing — prepare a
  turnkey order and fire when healthy.
- "Connected in your account" ≠ "callable from this sandbox." Create here; run/post where
  the network + approval channel allow.

## 2026-06-26 (cont.) — Homefront produced; honest tooling reality

**Built**
- Pivoted the brand to **homeowners** (Homefront series, host Luna); wrote EP-0107 and a
  turnkey `content/EP-0107-render-order.md` (render params + publish packet).

**Tooling reality found this session (important — don't forget)**
- **No social-publish connector is wired in this environment.** Searched: no Postiz / no
  YouTube / FB / IG publish tool exists here. **I can create, but not post.** Publishing
  happens on the user's side (Postiz) or via a **Zapier** bridge we'd build.
- **Invideo** (`generate-video-from-script`) IS available, but the render call hit a
  *permission-stream closure* — a transient connector drop, not a denial. Retry when stable.
- **HeyGen** (HyperFrames) did not surface in tool search this session — treat as
  intermittently available; don't promise an avatar render until it's confirmed reachable.
- MCP connectors are **flapping** (connect/disconnect each turn). Don't hammer unstable
  tools; prepare turnkey orders and fire when the channel is stable.

**Promoted Standing Lesson:** *Create here; publish on your side (or via Zapier). There is
no native social-publish connector — never imply content was posted when it was only made.*

## 2026-06-26 — Family doctrine ingested; facts re-verified on the web

**Brought in / built**
- Pulled the **genesis-grid** and **voice-layer** skills from the prior bundle into the
  canonical OS (`skills/`), added **`CLAUDE.md`** so the doctrine auto-loads in any Claude
  Code session here, and brought in the council `routing/` map + `router.js`.
- Refreshed `free-tool-stack.md` and `routing/model-map.json` with **live-verified**
  June-2026 data (Tavily). Registered the model **partners** (the council) + the web tools
  (Tavily, Nimble) in the registry. Wrote `docs/avatars-and-publishing.md`.

**Verified facts (so memory isn't stale)**
- Open-weight: GLM-5.2 leads the open index; GLM-5.1 = coding flagship; DeepSeek V4
  Pro/Flash (1M ctx, Flash = cost floor); MiniMax M3 (1M + multimodal); Kimi K2.6.
- Video: Veo 3.1 best overall; Seedance 2.0 watermark-free; Kling 3.0; Runway free tier
  collapsed (~2–3 clips); Sora availability-dependent; Gemini CLI retired → Antigravity.

**Corrections logged (don't repeat)**
- **Perplexity does NOT publish content** — it's research/answer (Comet browser). Publish
  via **Postiz**; Perplexity feeds the *front* of the machine, not the end.
- **"Vellum" is the character Grandpa Vellum, not an LLM partner.**
- **Qwen is at 3.6, not 3.7.**
- Avatars / council / voice are **real but need wiring or credits** — a skill file alone
  grants no powers (genesis-grid honesty rule #1).

## 2026-06-25 — Content machine: first site + first real intel

**Built**
- Stood up **"The AI Family" site** in Lovable — fully functional, real backend (episodes / subscribers / leads tables + admin login). Private preview live.
- Ran a real **web-gather** and folded it into the OS: refreshed the Signal Desk signals with sourced June-2026 news, registered **EP-0106** (the $5k/mo-agency episode) with real cost figures, saved `intel/web-gather-2026-06-25.md`.
- Wrote **EP-0001** in full (this Signal Desk script).
- Started the **Academy** (course program) and shipped the first course + skill: **Playwright MCP**.

**Decisions**
- Site builder = **Lovable** for the functional flagship (backend), **Gamma** reserved for fast one-pagers. Both kept in the registry.
- Weekly Signal Desk = **faceless** (Invideo) by default; HeyGen avatars reserved for character-hosted episodes.

**Lessons**
- External creative tools (Gamma, Lovable, video) are **approval-gated** — tee them up, the human approves. Good: that *is* the publish gate working.
- Real data beats placeholders: swapping `example.com` signals for sourced news immediately made the episode writable.

## 2026-06-24 — OS spine + local-intel ingestion

**Built**
- The **AI Family OS** spine: `config/family.json` (14 members, 10 crews, 6 pipelines), PowerShell scripts (`call-family`, `daily-loop`, `posting-pipeline`, `send-family-briefing`), Node validator, Notion mirror.
- Ingested the `C:\Users\billw` asset inventory: 37-entry **Tools & MCP Registry** + the MCP-breaking-changes signal + Episode 105.

**Lessons (the ones that cost us time — keep them)**
- **Can't create a new GitHub repo from this integration** (403). → Stage the OS as a self-contained `ai-family-os/` folder that lifts out later.
- **PowerShell isn't in the cloud sandbox.** → The `.ps1` spine targets the user's machine; we verify the *data* layer here with a **Node validator** instead.
- **The episode `status` field is an enum** (`idea→scripted→visual→voiced→scored→review→published`). "researched" failed validation → use `idea`. Validate after every config edit.
- **`C:\Users\billw` is unreachable** from this Linux container — local assets must be committed or uploaded before we can import them faithfully.

---

## Standing Lessons (promoted, always true)
1. **Validate after every `config/family.json` edit** (`node tools/validate.js`) — references + enums.
2. **Cite sources in `intel/` and on every signal** — Guardian verifies before anything ships.
3. **Keep `ai-family-os/` self-contained** so it can become its own repo with zero edits.
4. **Human gate before publish** — always. Speed without a check is a faster mistake.
5. **Every tool we adopt gets a course + (where useful) a skill** — see `courses/`.
