# n8n Workflow Templates — the AI Family automation library

Ten copy-paste automations, absorbed from Perplexity's set and **re-cast to our family + tools**
(Zapier YouTube · Postiz · Notion · Tavily · the council). Build each in n8n on your machine. Each
names the family **owner** so roles stay clear. Honesty rule baked in: nothing auto-publishes
without an approval node until you trust it; never mark done without a returned ID.

> Pairs with `automation/n8n-blueprint.md` (the render→publish loop) and `config/render-queue.json`.

## 1 — Daily content poster · owner: Mom Social
`Schedule (8am)` → `AI (Claude): "Write today's LinkedIn post for The AI Family, operator-first, hook in line 1"` → `Approval` → `Postiz/LinkedIn` → `Notify: posted ✅`

## 2 — Transcript → content package · owner: Cipher
`Webhook (transcript upload)` → `AI: "From this transcript extract 5 tweets, 3 LinkedIn posts, 1 newsletter, 5 Shorts hooks (in brand voice)"` → `Notion/Sheets: append to Content Bank` → `Notify: package ready`

## 3 — Lead enrichment + sequence · owner: Atlas
`New row (Apollo export)` → `Enrich (Clay/HTTP)` → `AI: "personalized first line for {name} at {company}"` → `Gmail Day 1` → `Wait 3d → Day 3` → `Wait 3d → Day 6` (value-first; opt-out honored — see EP-0309 outreach copy)

## 4 — Meeting → action items · owner: Sage
`Webhook (Fathom/Granola post-call)` → `AI: "Summarize; extract decisions, action items, next steps"` → `Notion: new page in Meeting Notes` → `Gmail: follow-up to attendees` → `Notify`

## 5 — Competitor / signal monitor · owner: Sage + Brother News
`Schedule (6h)` → `RSS / Tavily: 5 sources` → `AI: "Summarize new items; flag new angles + trends"` → `Notify #intelligence` (feeds the Signal Desk)

## 6 — New-follower welcome · owner: Mom Social
`Webhook (new sub / opt-in)` → `AI: "warm welcome in AI Family voice"` → `Day 1 welcome` → `Wait 3d → "the free AI stack"` → `Wait 4d → "watch How AI Works / The Living System"`

## 7 — New video → social blast · owner: Mom Social
`Webhook (YouTube new upload)` → `AI: "from this title+desc make a thread, LinkedIn post, IG caption, TikTok hook"` → route to `Postiz` → `schedule next 24h` (the 1→many loop; use after Zapier upload_video returns an ID)

## 8 — Inbound lead qualifier · owner: Atlas + Guardian
`Webhook (form)` → `AI: "score 1–10 on ICP: budget, authority, need, timeline + reason"` → `IF ≥7 → Calendly link + email` `ELSE → nurture sheet` (Guardian gate before any auto-send)

## 9 — Daily intelligence brief ("The Grid Brief") · owner: Sage
`Schedule (7am)` → `Tavily: "top 5 AI items today for automation + content"` → `AI: "format as 5 bullets, one takeaway each"` → `Gmail: 'The Grid Brief — {date}'`

## 10 — Content repurpose machine · owner: Cipher
`Manual / webhook (new page)` → `AI (as Cipher): "Repurpose into 10 tweets, 5 LinkedIn posts, 3 IG captions, 1 newsletter, 5 Shorts hooks"` → `Notion: Content Bank` → `Notify: batch ready to review`

## Wiring notes
- **Publish rails:** YouTube via **Zapier `upload_video`** (enabled); everything else via **Postiz**
  (connect channels first). Discord via `scripts/discord-post.js`.
- **AI step:** route by the council map (`routing/model-map.json`) — volume on cheap/local (Ollama),
  hard calls on a frontier model.
- **Approval:** keep a human-approval node before first live publish on #1, #3, #6, #7, #8; remove once trusted.
- **Record results:** each workflow writes status + IDs back (Sheet/Notion) — no "done" without an ID.

_Absorbed from Perplexity's templates (2026-06-27), re-cast to our canon. Verify each app's
node names in your n8n version before running._
