# Publishing System — how content actually reaches YouTube (honest)

The dispatch path is **wired and real**. Two gates remain, and both are on your side — so
this documents exactly how it fires the moment they clear. **Rule: nothing is "posted"
until an upload returns a video ID. Creating ≠ posting.**

## The dispatch chain
`Research → Script → RENDER (video file) → Guardian gate → UPLOAD to YouTube → Log`

- **GATE 1 — a rendered video FILE.** YouTube's upload needs an actual video. The render
  tools (Invideo / HeyGen) won't execute from this cloud sandbox (the approval stream
  closes). Render on your machine / n8n / a stable session → an MP4 or a public URL.
- **GATE 2 — YouTube auth (one-time).** Connect your channel to Zapier:
  `https://mcp.zapier.com/mcp/servers/22b2ba9e-3f4d-4e48-bebb-cbfab515ca0b/app-auth/YouTubeV4CLIAPI`

## The publisher (ENABLED, ready)
Zapier action **`YouTube: upload_video`** (`YouTubeV4CLIAPI`) is enabled on the server.
Field map the system fills per episode:

| Field | Required | Value |
|---|---|---|
| `title` | ✓ | episode title |
| `description` | ✓ | packet description (+ disclosure + CTA link) |
| `video` | ✓ | **the rendered file/URL — the missing input** |
| `thumbnail` | – | the Canva thumbnail |
| `tags` | – | episode tags (list) |
| `privacy_status` | – | start **`unlisted`** → flip `public` after review |
| `category_id` | – | Education / Howto & Style |
| `made_for_kids` | – | `false` |
| `notify_subscribers` | – | `true` |

## Two ways to fire
1. **From here (when both gates clear):** give me a **public video URL** + confirm YouTube
   is connected. I run `execute_zapier_write_action → upload_video`, default
   `privacy_status: unlisted`, and **confirm with you before flipping to `public`**
   (publishing is outward-facing — your call, every time).
2. **Self-running (n8n):** a render node → `upload_video` node → Notion log, on a schedule.
   This is the "set it and it runs" path; lives on your infra.

## YouTube publish queue (ready the moment a file exists)
| Episode | title | privacy | video | thumbnail |
|---|---|---|---|---|
| EP-0107 Homefront | "Your House Is Overcharging You — 3 Free AI Fixes" | unlisted→public | **PENDING render** | PENDING (Canva) |
| Signal Desk 06/26 | "What Changed in AI This Week (GLM-5.2, Gemini delay…)" | unlisted→public | **PENDING render** | PENDING |
| EP-0108 | "The 10-Minute AI Assistant Every Household Should Set Up" | unlisted→public | **PENDING render** | PENDING |
| EP-0109 | "Never Get Overcharged by a Contractor Again" | unlisted→public | **PENDING render** | PENDING |
| EP-0110 | "AI That Keeps Your Home & Your Parents Safe" | unlisted→public | **PENDING render** | PENDING |

Full descriptions/tags live in each episode's packet (`content/EP-*.md`, `EP-0107-render-order.md`).

## The honest line
The **publisher is no longer the blocker — the rendered video file is.** Get me one video
URL (or render on your side) + connect YouTube, and EP-0107 dispatches for real.
