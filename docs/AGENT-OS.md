# Agent OS — the operating model for the Prometheus AI Family

> How the family runs: one **Supervisor** who studies and refines, a **crew** of
> coding agents who build, and **partner tools** who post and ship. Plus a clear
> job for every member. Honest about what is wired vs. what needs your go-ahead.

---

## 1. The three layers

```
        ┌──────────────────────────────────────────────┐
        │  SUPERVISOR — Claude Code (this assistant)     │
        │  studies the codebase, refines the product,    │
        │  writes the trainings, runs QA, commits.       │
        │  Learns each tool → turns it into a track +    │
        │  a skill. Reviews everything before it ships.  │
        └───────────────┬───────────────┬───────────────┘
                        │               │
            ┌───────────▼──────┐  ┌──────▼───────────────┐
            │  CREW — coding   │  │  PARTNERS — post/ship │
            │  agents that     │  │  MCP tools that       │
            │  BUILD code      │  │  publish, deploy,     │
            │  (Aider, Cline…) │  │  design, email, sell  │
            └──────────────────┘  └──────────────────────┘
```

**Rule of the house:** the Supervisor reviews every diff and every outbound
artifact. Nothing posts, emails, or deploys without an explicit go-ahead from
the user. (See `CLAUDE.md` guardrails.)

---

## 2. The Supervisor (me) — job description

- **Study & refine:** read the codebase, keep `CLAUDE.md` current, raise the
  quality bar, fix what's weak.
- **Teach:** turn every tool we master into a deep Academy track (via the
  `add-academy-track` skill) and a reusable skill file.
- **Direct the crew:** pick the right coding agent per task; chain them.
- **Brief the partners:** prepare ship-ready assets (decks, videos, emails,
  deploys) and hand them to the partner tool that can publish — **after your OK**.
- **Guard:** no fabricated metrics, no key leakage, no celebrity-likeness
  cloning, no silent sends.

---

## 3. The Crew — coding agents and what each should do

Documented in full in the Academy track `open-source-coding-agents`
(`js/academy/coding-agents.js`). Assignments:

| Member | Primary job | Reach for it when… |
|--------|-------------|--------------------|
| **Claude Code** (Supervisor) | Orchestrate, refine, write trainings, review | Always — it runs the loop |
| **Aider** | Precise, git-committed edits; private/local-model work | A scoped change on a repo you have open; code can't leave the machine |
| **Cline** | In-editor agent (Plan/Act, browser, terminal) | You want to watch the loop and stay close to the diff |
| **Roo Code** | Multi-mode, multi-model editor agent | You want different models for plan vs code vs debug |
| **OpenHands** | Autonomous platform in a Docker sandbox | A self-contained task → issue-to-PR, high autonomy, isolated |
| **Goose** | MCP automation + repeatable **recipes** + subagents | A tool-using workflow you'll run every week |
| **Gemini CLI** | Free tier, huge context, multimodal exploration | Read a whole codebase/doc at once; low-cost audits; screenshots |
| **Continue** | IDE assistant: autocomplete + chat + @-context | Day-to-day coding inside VS Code / JetBrains |
| **Codex CLI** | OpenAI sandboxed terminal agent (approval modes) | Terminal tasks on OpenAI models with a safety gate |

**Default crew to know deeply:** Aider + Cline + Goose + Gemini CLI. Add others
only when one clearly wins a task. (Don't let tool sprawl set strategy.)

---

## 4. The Partners — who can actually post / ship

These are real tools available in **this session**. Honest status: *available =
present; most will ask you to authorize on first use.* I will **draft and stage**
with them but **not publish/send without your explicit go-ahead.**

| Job (what "ship" means) | Partner tool(s) | Status / note |
|-------------------------|-----------------|---------------|
| **Deploy the site live** | **Vercel** (`deploy_to_vercel`) | Available; static deploy of this repo |
| **Code review / PRs / CI** | **GitHub** (scoped to this repo) | Available; PRs only when you ask |
| **Email business owners** | **Gmail** (`create_draft`) | Can draft into your Gmail; you review & send. No mass auto-send. |
| **Find & enrich owner leads** | **Apollo.io**, **Clay** | Available; people/company search + enrichment |
| **Competitive / SEO research** | **Semrush** | Available; keyword, traffic, competitor data |
| **Find paid AI gigs** | **Upwork** | Available; search jobs/freelancers, prep a post |
| **Decks / one-pagers** | **Gamma**, **Canva** | Available; generate slide decks & graphics |
| **Design / thumbnails / brand** | **Canva**, **Figma**, **Adobe** | Available; visuals for content |
| **Video content** | **Descript**, **InVideo**, **Adobe video** | Available; edit/generate video from script |
| **Companion apps / backends** | **Lovable**, **Replit**, **Base44**, **Supabase**, **Cloudflare** | Available; build & host adjacent apps |
| **Contracts / e-sign (College Center)** | **PandaDoc**, **Docusign** | Available; enrollment/agreement docs |
| **Booking the 725 call flow** | **Calendly** | Available; event types & scheduling links |
| **Knowledge base** | **Notion** | Available; store research & SOPs |
| **Social listening / trends** | **LunarCrush** | Available; social & market signal |
| **Automation glue (9k+ apps)** | **Zapier** | Available; connect steps across apps |
| **Research / docs / math** | **Hugging Face**, **Microsoft Learn**, **Wolfram**, **Scholar Gateway** | Available; grounding & references |

> **Not in this container:** direct posting to TikTok/IG/X/YouTube, SMTP blasts,
> NotebookLM, and voice cloning. Those need accounts/keys you connect, or a
> partner above used within its terms. I'll prep ship-ready assets either way.

---

## 5. The on-screen cast (the product's characters) — and their beat

From `js/data.js` and the Academy instructors. These are the *faces* of the
content; assign each the topics they host.

| Character | Discipline | Hosts (content beat) |
|-----------|-----------|----------------------|
| **The Architect** | Backend & system design | Coding-agent tracks, MCP, "how AI works" deep dives |
| **The Catalyst** | Marketing, sales & outbound | Owner outreach, growth, the business case |
| **Byte** | Beginner guide | Onboarding, foundations, the sandbox |
| **Cipher Vale** (new) | Terminal Agents Engineer | Instructor for the Open-Source Coding Agents track |
| Academy instructors (Nova Reyes, Dev Rao, …) | Per-tool experts | One named guide per track — keep this pattern |

When we port the larger Windows roster (107+ members across crews) into this
repo, assign each the same way: **a clear discipline + the exact track or job
they own.** One member, one beat.

---

## 6. The daily loop (operating cadence)

A repeatable loop the Supervisor runs; partners execute the ship steps on your OK.

1. **Study** — read what changed; update `CLAUDE.md` "current state."
2. **Refine** — fix the weakest existing track or feature.
3. **Build** — master one new tool → new Academy track (`add-academy-track`
   skill) → QA green → commit.
4. **Skill-ify** — capture any new repeatable process as a `.claude/skills/*` file.
5. **Content** — produce a ship-ready kit for the new track (scripts + visuals
   brief + hashtags + owner DM). See `content/` kits.
6. **Stage to partners** — draft the deck/video/email/deploy with the right
   partner tool.
7. **Review & ship** — Supervisor reviews; **user approves**; partner publishes.
8. **Record** — log what shipped back into `CLAUDE.md`.

---

## 7. Guardrails (repeated because they matter)

- Review **every** diff and **every** outbound artifact before it ships.
- **No fabricated metrics or fake testimonials**, ever, in customer-facing work.
- **No model/API keys in browser code** — server-side routes only.
- **No cloning a real, identifiable person's voice/likeness** for marketing.
- **Nothing is posted, emailed, or deployed silently.** The user gives the go.
- CTAs use **725-314-9140** and **michaelparks011@gmail.com**.
