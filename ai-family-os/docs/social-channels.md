# Social Channels — the AI Family distribution playbook

How the family shows up everywhere from one forge run. Owner: **Mom Social** (distribution),
with **Atlas** (business track) and **Luna** (homeowner track). This is the plan + the honest
status of what's wired vs. what needs the user to set up.

## The channels (and what each is *for*)

| Channel | Format | Job | Primary host |
|---|---|---|---|
| **YouTube (long)** | 6–12 min | The library — teach deeply, build authority/SEO | Nova, Sage, Luna |
| **YouTube Shorts** | ≤60s vertical | Discovery — top of funnel | rotating |
| **TikTok** | 15–45s vertical | Discovery + personality, fastest reach | Luna, Nova |
| **Instagram Reels** | 15–45s vertical | Discovery + warm audience, saves/shares | Luna, Mom Social |
| **Facebook (Page + Reels)** | mixed | Reaches homeowners + local business owners (older skew) | Luna, Atlas |
| **X / Threads** | text + clip | Build-in-public notes, repurposed hooks | Cipher, Sage |
| **LinkedIn** | text + long | Business track — reach owners/decision-makers | Atlas |

## The one-to-many pipeline (the core idea)
**One forge run → one long video → 5–8 derivatives.** Never make platform content one at a time.
```
TOPIC ─► long video (YouTube) ─► cut 3–6 vertical Shorts (best 15–30s moments)
                              ├─► 2–3 quote/stat cards (IG/FB/X image posts)
                              ├─► 1 carousel (the steps, IG/LinkedIn)
                              └─► 1 build-in-public thread (X/LinkedIn)
```
The Shorts script blocks are pre-written in each episode file (see `EP-0303` Shorts #1–#3).

## Format spec (so everything is consistent)
- **Vertical 9:16, 1080×1920**, captions burned in (most watch muted), brand lower-third.
- **Hook in 3 seconds.** First frame = the payoff or the question, never a slow intro.
- **House look:** void-navy / gold / ember / teal; Fraunces + Sora type; one recurring host per clip.
- **Always:** AI host + voice disclosed in description; sources for any stat; one clear CTA.

## Cadence (start sustainable, then scale)
- **Phase 1 (now):** 1 long/week + 3 Shorts/week + 3–4 image/text posts/week. Discord bank already drafted.
- **Phase 2:** 2 longs/week + daily Shorts once the forge is smooth.
- Batch on one day; schedule the rest. The daily loop picks from the content calendar (proposed: `config/calendar.json`).

## Channel setup checklist (handles + bios)
Keep the handle identical everywhere if available: **@TheAIFamily** (fallback **@AIFamilyOS**).
- **Bio (short):** "Meet the AI Family — we teach you what AI can actually do, in plain English, and set it up for you. New episode weekly. 🔥"
- **Profile art:** the cast lineup (Nova) · **Avatar:** the family crest/Prometheus torch.
- **Links:** the brand site → book-a-call. **Pinned:** "Start here" (The First Spark or The Living System).

## Honest status — what's wired vs. what needs you
- 🟢 **Distribution rails exist:** **Postiz** (TOOL-101, 28+ channels) and **Zapier** are connected;
  Zapier **YouTube `upload_video`** is enabled.
- 🟡 **Needs your action (account-level, can't be done from here):**
  1. Create / claim the channels above with the @TheAIFamily handle.
  2. Connect each into Postiz (and authorize YouTube in Zapier — one-time).
  3. Provide a rendered video file (render is blocked in this sandbox — runs on your machine / n8n).
- 🔴 **Blocked from sandbox:** the video render itself and Discord posting — both run on your machine / n8n
  (see `config/tool-ratings.json`).

## What I can do from here right now
- Write every script + the long-form companion pages (done: `the-video-forge.html`, `the-living-system.html`).
- Draft all platform copy (titles, captions, hooks, hashtags) — see each `EP-*` file.
- Prepare the post bank (`content/discord-queue.md`) and the render handoff (proposed `config/render-queue.json`).
- Fire the publish step **once** a rendered file + connected channel exist (via Zapier/Postiz).

_Owner: Mom Social. Re-verify channel availability + free tiers before relying. Honesty rule:
never mark a post "published" without a returned post/video ID._
