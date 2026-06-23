# Deploy Prometheus to Cloudflare Pages

Prometheus is a **zero-build static site** (single `index.html`, hash-routed,
vanilla JS). Cloudflare Pages serves it directly — no framework, no build step.

## Option A — Connect the GitHub repo (easiest, ~60 seconds)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** tab →
   **Connect to Git**.
2. Authorize GitHub and pick **`http-sat-network-corp.com-`**, branch
   `claude/sweet-knuth-gem84c` (or `main` after you merge).
3. Build settings:

   | Setting | Value |
   |---|---|
   | Framework preset | **None** |
   | Build command | *(leave empty)* |
   | Build output directory | **`/`** (repo root — `index.html` is at root) |
   | Root directory | `/` |
   | Environment variables | *(none needed for demo mode)* |

4. **Save and Deploy.** You get a `*.pages.dev` URL. Every push auto-deploys;
   add a custom domain later under the project's **Custom domains** tab.

## Option B — Wrangler CLI (from your own machine)

Requires a Cloudflare login (`wrangler login`) or `CLOUDFLARE_API_TOKEN`.

```bash
npm i -g wrangler            # or use npx
wrangler pages deploy . --project-name prometheus
```

Run it from the repo root; `.` is the directory that contains `index.html`.

## What's already wired for Cloudflare

- **`_headers`** — applies the same security headers as `vercel.json`
  (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`).
- **No `_redirects` needed** — routing is client-side via `location.hash`, and
  there is only one HTML entry point, so deep links never 404.
- **No build, no env vars** — demo mode runs entirely in the browser. To go
  live with the AI sandbox / HeyGen / Stripe, wire `CONFIG` in `js/app.js` to
  serverless routes and add keys **server-side only** (never in browser JS).

## Note from this session

This container has no `wrangler` and no Cloudflare credentials, and outbound to
the Cloudflare API is blocked — so the deploy itself is done from your Cloudflare
account via Option A or B above. The repo is prepared so it deploys with zero
extra configuration.
