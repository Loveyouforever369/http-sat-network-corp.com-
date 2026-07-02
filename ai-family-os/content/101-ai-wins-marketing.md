# 101 AI Wins — Category 1: Marketing & Content (15 wins)

The first category of the "101 AI Wins" library — the low-ticket product's core + free-content fuel.
Each win: what it does · tool (free-first) · how to train it · the prompt seed · who it's for
(persona from `config/customer-personas.json`). ROI figures illustrative. Format: teach one win per
short/post; bundle the category as the $27–47 product ("101 AI Wins for Coaches & Creators — Vol. 1").

1. **Voice-trained content repurposer** — 1 long piece → 10+ assets in YOUR voice.
   Tool: Claude/ChatGPT + n8n (template #10). Train: feed 10 best pieces + voice rules ("warm, direct, ends with a question"). Seed: *"Learn my voice from these 10 posts. Repurpose this transcript into 10 tweets, 5 LinkedIn posts, 3 captions, 1 newsletter — my voice only."* → Sarah, Chris.

2. **3-second hook generator** — 10 hook options per piece, pick by instinct.
   Tool: any LLM. Train: paste 5 hooks that worked in your niche. Seed: *"Give me 10 hooks under 12 words for [topic]; curiosity or stakes; no clickbait lies."* → all.

3. **Comment-to-content miner** — turn audience questions into next week's posts.
   Tool: LLM + a sheet of real comments/DMs. Seed: *"Cluster these 50 comments into the 5 questions people actually ask; draft one post answering each, in my voice."* → Sarah, Mike.

4. **Review-response agent (local, warm)** — every review answered same-day in the owner's tone.
   Tool: n8n + LLM (+ Google Business). Train: 10 sample replies (happy/unhappy). Rule: escalate 1–2★ to the owner. → Mike. *ROI: faster resolutions, higher ratings.*

5. **Weekly newsletter assembler** — auto-drafts from what you published + saved links.
   Tool: n8n (template #2) + LLM. Seed: *"From these 5 items, draft my weekly email: 1 insight, 3 quick hits, 1 CTA — 250 words, my voice."* → Sarah, Steve.

6. **Auto-captions + clips** — every long video → captioned Shorts, free.
   Tool: **CapCut (free, 1080p, watermark-free)** or Clipchamp (built into Windows). Train: pick a caption style once, reuse. → all. (Our own pipeline uses this — `intel/descript-alternatives-2026-07.md`.)

7. **Thumbnail concept generator** — 3 concepts per video, big text ≤4 words.
   Tool: GPT Image 2 / Leonardo (free tier). Seed: *"3 thumbnail concepts for '[title]': one focal face/object, ≤4 bold words, high contrast, no clutter."* → Chris, Sarah.

8. **SEO metadata pass** — titles/tags/description that match real search language.
   Tool: VidIQ (free tier) + LLM. Rule: clarity, not stuffing. → all.

9. **Story-arc post writer** — turn a client win into the 6-beat transformation story.
   Tool: LLM + our arc (Situation → Pain → Discovery → Implementation → ROI → Invitation). Seed: *"Write this client win as the 6-beat arc, 300 words, no hype, real numbers only."* → Atlas-track personas (Sam, Pat).

10. **Content calendar autopilot** — a month of ideas ranked by effort/impact.
    Tool: LLM + sheet. Seed: *"30 content ideas for [persona]; rank by impact vs effort; mark the 6 worth filming."* → all.

11. **Ad copy variant tester** — 5 honest variants per offer, one variable at a time.
    Tool: LLM (+ Meta's free tools). Rule: never fabricate results in ads. → Mike, Sam.

12. **DM/inbox first-line personalizer** — outreach that references something *true* about them.
    Tool: LLM + their public page. Rule: value-first, opt-out friendly (EP-0309 templates). → Sam, Steve.

13. **Testimonial multiplier** — one testimonial → case study, post, email snippet, proof card.
    Tool: LLM (n8n-able). Seed: *"From this testimonial make: a 150-word case study, a social post, a 2-line email proof, a quote card caption. No exaggeration."* → all.

14. **Trend scanner (weekly)** — what changed in your niche, decoded for your audience.
    Tool: Tavily/Perplexity + LLM (our Signal Desk pattern, n8n template #9). → Sage-style content for any niche.

15. **The 1→many dispatcher** — one hero piece auto-drafted for every platform's format.
    Tool: n8n template #7 + Postiz. Rule: platform-native, not copy-paste identical. → all.

---

## How to sell/teach this category
- **Free:** one win per Short ("AI Win #4: never leave a review unanswered") — 15 pieces of content ready.
- **Low-ticket ($27–47):** this category as Vol. 1 with the prompts + setup walkthroughs.
- **Bootcamp:** wins #1, #6, #15 built live in a session ("Your First AI Sidekick in 7 Days").
- Every win names its persona → feeds the quiz result pages.

**Next categories (build on request):** Operations & Scheduling · Sales & Follow-up · Research &
Strategy · Customer Service · Finance & Admin · (target: 7 categories ≈ 101 wins).

## Guardian
Free tiers change — verify before teaching. No fabricated ROI in the product. Every automated
send keeps a human gate until trusted (dos & don'ts, EP-0306).
