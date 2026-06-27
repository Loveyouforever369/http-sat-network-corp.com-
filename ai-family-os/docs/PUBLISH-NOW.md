# PUBLISH NOW — the "send everything out" runbook

The single press-go guide to get our content onto YouTube, Facebook, and everywhere. Honest about
what fires where. Owner: Mom Social (distribution) + Atlas (business track).

## The one blocker, stated plainly
**Everything waits on a rendered video FILE.** Video render is blocked in this cloud sandbox, so
the file is made on **your machine / n8n** (use the local trio — `docs/local-trio-setup.md`).
No file = nothing to upload. Once a file (or a public mp4 URL) exists, the rails below fire.

## What's actually wired (checked 2026-06-27)
| Rail | Status | Needs |
|---|---|---|
| **YouTube** (Zapier `upload_video`) | 🟡 action enabled | (1) one-time YouTube auth in Zapier · (2) a video file/URL |
| **Facebook / IG / TikTok / X** | 🟡 via **Postiz** (on your machine) | channels connected in Postiz + the file |
| **Discord** | 🔴 blocked from sandbox | run `scripts/discord-post.js` locally w/ `FAMILY_DISCORD_WEBHOOK` |
| **X / LinkedIn text** | 🟡 via Postiz | connected accounts |

## One-time setup (do once, then it's a button)
1. **YouTube auth** in Zapier (authorize the channel for `upload_video`).
2. **Connect channels in Postiz**: YouTube, Facebook, Instagram, TikTok, X, LinkedIn.
3. **Set `FAMILY_DISCORD_WEBHOOK`** in your env for the Discord runner.
4. Confirm handles are claimed (`@TheAIFamily`) — see `docs/social-channels.md`.

## The run loop (per video)
1. `node tools/render-queue.js` → see what's ready (6 items queued: RQ-001…RQ-006).
2. **Render** the item on your machine / n8n (voice per `config/voice-map.json`; trio per `local-trio-setup.md`).
3. **YouTube (long):** Zapier `upload_video` with the file → record the returned **video ID**.
4. **Cut shorts:** slice 3–6 vertical clips → push via **Postiz** to Shorts / TikTok / Reels / FB.
5. **Discord + X text:** `scripts/discord-post.js` (local) + Postiz text posts.
6. Update the queue item's `status` → `published` and paste the IDs. **Never mark published without an ID.**

## What I can do from here vs. what's yours
- **From here (now):** prep every script, page, caption, hashtag set, and the render-queue work
  order; fire the **YouTube upload the moment you give me a public mp4 URL + confirm YT is authed.**
- **Yours (machine/n8n):** the render itself, connecting channels, the one-time auths, Discord.

## The fastest path to "first video live today"
1. Install the trio (or use any tool you already have) and render **RQ-001** (The Living System).
2. Authorize YouTube in Zapier.
3. Give me the public mp4 URL → I fire `upload_video` and hand you the video ID. **That's the lock-in.**

_Re-check enabled rails before each run; free tiers + connections drift. Honesty rule: a post is
only "published" when there's a returned ID._
