# Deploy Prometheus to Vercel — the simple click-by-click guide

Goal: connect this GitHub repo to Vercel **once**, so that from then on every
change auto-deploys with zero effort. ~5 minutes, no command line.

> ⚠️ One thing that matters for THIS repo: our site lives on the branch
> **`claude/sweet-knuth-gem84c`**, but the repo's *default* branch is a
> different project (`claude/lending-platform-major-overhaul-NW144`).
> So there's one extra step (Step 5) to point Vercel at the right branch.
> Skip it and you'll deploy the wrong site.

---

## Step 1 — Log in to Vercel

1. Go to **https://vercel.com** and click **Sign Up** (or **Log In**).
2. Choose **Continue with GitHub** (fastest — it lets Vercel see your repos).
   - A GitHub page appears asking to authorize Vercel → click **Authorize**.
   - *(Prefer not to use GitHub to log in? Use Email or Google instead — you'll
     just connect GitHub as a step inside Vercel later.)*

You land on the Vercel **dashboard**.

## Step 2 — Start a new project

1. Top-right, click **Add New…** → **Project**.
2. You'll see **Import Git Repository** with a list of your repos.

**If you DON'T see `http-sat-network-corp.com-` in the list:**
- Click **Adjust GitHub App Permissions** (or **Configure GitHub App**).
- A GitHub page opens → choose your account → under **Repository access** pick
  **Only select repositories** → select **`http-sat-network-corp.com-`** →
  click **Save**.
- You return to Vercel and the repo now appears.

## Step 3 — Import the repo

1. Next to **`http-sat-network-corp.com-`**, click **Import**.

## Step 4 — Settings (leave almost everything default)

On the **Configure Project** screen:

| Field | What to do |
|---|---|
| **Project Name** | Leave as-is (or type `prometheus`) |
| **Framework Preset** | Choose **Other** (it usually auto-detects this) |
| **Root Directory** | Leave as `./` |
| **Build and Output Settings** | Leave **empty** — there is **no build step** |
| **Environment Variables** | None needed |

Then click the big **Deploy** button. Wait ~30–60 seconds for the confetti. 🎉

> This first deploy may show the *other* project (the default branch). That's
> expected — fix it in Step 5, then it's correct forever.

## Step 5 — Point production at our branch (the important one)

1. In your new project, click **Settings** (top nav) → **Git** (left side).
2. Find **Production Branch**. It probably says
   `claude/lending-platform-major-overhaul-NW144`.
3. Change it to **`claude/sweet-knuth-gem84c`** and click **Save**.
4. Go to the **Deployments** tab → click the **⋯** menu on the latest one →
   **Redeploy** (or just wait for the next push — see below).

Your live URL is shown at the top of the project (looks like
`https://prometheus-xxxx.vercel.app`). Click it — that's your site. ✅

## From now on (the payoff)

- Every time changes are pushed to **`claude/sweet-knuth-gem84c`**, Vercel
  **auto-deploys** them to your production URL. Nothing else to do.
- Pushes to any other branch get their own temporary **Preview URL** — handy for
  trying something before it goes live.

## Add your own domain (optional, later)

Project → **Settings** → **Domains** → type your domain → follow the DNS lines
it shows you. (Free `*.vercel.app` URL works forever without this.)

---

## Quick fixes

- **Repo not in the list** → Step 2's "Adjust GitHub App Permissions" — Vercel
  only sees repos you explicitly grant.
- **Live site looks wrong / old** → you're on the wrong production branch; redo
  Step 5 and Redeploy.
- **It asks for a build command** → leave it empty and set Framework to **Other**.
  This site is plain HTML/JS with nothing to build.
- **Want a different primary URL** → Settings → Domains lets you rename or add one.

## Why this repo "just works" on Vercel

`vercel.json` (already in the repo) sets clean URLs + security headers, and the
app is a single hash-routed `index.html`, so there's nothing to configure and no
deep-link 404s. Demo mode runs fully in the browser; going live with the AI
sandbox / avatars / Stripe is separate (`CONFIG` in `js/app.js`, keys server-side).
