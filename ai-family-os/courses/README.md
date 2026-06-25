# AI Family Academy — the course program

**Mission:** study *everything* AI, and master *every tool* in our stack to the
best of its ability. Knowledge is not a side effect here — it's the product.
Every course we write also becomes (1) an episode the Family can teach on camera,
and (2) where useful, a **skill** the agents can load (`../skills/`).

## How it works
- **Two tracks.** *AI Fundamentals* (the timeless concepts) and *Tool Mastery*
  (one deep course per connector/tool in the registry).
- **One template, every course** (below) so they're consistent and minable.
- **Learn → teach → automate.** A finished course feeds an episode script and,
  if the tool is something agents use, a `SKILL.md`.

## The course template
Every course file follows this exact shape:
1. **Overview** — what it is, in one paragraph.
2. **When to use it / when not to** — the decision, up front.
3. **Setup** — install, auth, config (copy-pasteable).
4. **Core concepts** — the mental model.
5. **Hands-on lessons** — beginner → intermediate → advanced, each with a real task.
6. **Playbook** — copy-paste prompts/commands for common jobs.
7. **Gotchas** — what bites people (from our Build Journal).
8. **Mastery checklist** — you can do these without looking.
9. **Resources** — official docs + our internal links.

## Curriculum

### Track A — AI Fundamentals
| # | Course | Status |
|---|--------|--------|
| A1 | How models actually work (tokens, context, temperature) | planned |
| A2 | Prompting that holds up (Role · Task · Constraints · Output) | planned |
| A3 | Agents & tool-use (the loop, when to let AI act) | planned |
| A4 | MCP — the USB-C for AI tools | planned |
| A5 | RAG & long context — feeding AI your knowledge | planned |
| A6 | Automation & orchestration (Zapier / n8n patterns) | planned |
| A7 | Trust, safety & disclosure (the Guardian discipline) | planned |

### Track B — Tool Mastery (one per registry tool)
| # | Course | Tool ID | Status |
|---|--------|---------|--------|
| B1 | **Playwright MCP** | TOOL-001 | ✅ **done** → `playwright-mcp.md` (+ skill) |
| B2 | Lovable (full-stack sites) | TOOL-103 | planned |
| B3 | Gamma (decks & one-pagers) | TOOL-106 | planned |
| B4 | HeyGen (avatars) | TOOL-108 | planned |
| B5 | Invideo (faceless video) | TOOL-107 | planned |
| B6 | Descript (edit by text) | TOOL-109 | planned |
| B7 | Canva (graphics & thumbnails) | TOOL-110 | planned |
| B8 | Postiz (one-to-many publishing) | TOOL-101 | planned |
| B9 | Notion (the OS dashboard) | — | planned |
| B10 | Supabase (database + auth) | — | planned |
| B11 | Zapier & n8n (orchestration) | TOOL-111/112 | planned |
| B12 | ElevenLabs (voice) | candidate | planned |

> Pace: we don't rush these. A course is "done" only when its Mastery Checklist
> is something a beginner could actually pass. First one (Playwright MCP) sets the bar.
