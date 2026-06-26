# Claude Code Playbook — Delegation, Context, and Teaching

Purpose: teach the operator to run Claude Code as a *programmable platform*, not a chat
box — and to do it while working, so the operator learns by watching.

> All of this is **Claude Code** (the CLI). The Claude.ai/desktop chat has no subagents.

---

## The three extensibility layers (what each is for)

- **Skills** — reusable prompts/procedures that load **in the main context**. Use for
  workflows you repeat (like Genesis Grid itself). Easiest to create; start here.
- **Subagents** — specialized child agents in **isolated context**. Use to keep the
  main window clean on heavy/verbose work, or to enforce tool restrictions.
- **Hooks** — deterministic code that runs on lifecycle events (e.g. `SubagentStop`
  failing a return if tests didn't pass). Use to enforce gates automatically.

Rule of thumb: **Skill for a procedure, Subagent for heavy isolated work, Hook for a
hard gate.**

---

## Subagents: how to use them well

**Define one** by dropping a markdown file in `.claude/agents/` (project, committed and
shared) or `~/.claude/agents/` (personal). Frontmatter: `name`, `description`, `tools`,
`model`, then a system-prompt body. Restart the session to load a new file.

```markdown
---
name: code-reviewer
description: Expert code review for quality, security, correctness. MUST BE USED
  immediately after writing or modifying code. Use proactively.
tools: Read, Grep, Glob, Bash
model: sonnet
---
You are a senior reviewer. When invoked: run git diff, review changes against the
checklist, return a prioritized list of findings with file:line and a fix for each.
```

**Triggering:** the `description` is the router — Claude reads it to decide when to
delegate. Make it pushy: include the situations and phrases that should invoke it, and
"**use proactively**" / "**MUST BE USED**" for auto-delegation. You can also force it:
"Use the code-reviewer agent to…".

**The boundary (most mistakes are boundary mistakes):** a subagent starts from a fresh,
isolated context. It does **not** see your conversation, the files already read, or the
skills already invoked. The **only** thing that crosses is the delegation prompt — so
put every needed file path, error message, branch name, and decision *in that prompt*.

**Hard limits to design around:**
- A subagent **cannot ask you a clarifying question** and **cannot get mid-task
  approval**. Never delegate an approval-dependent step.
- Whether a subagent can spawn its own subagents is **version-dependent** (some versions
  allow nesting, others deny it). Don't rely on nesting; chain from the main thread or
  use a coordinator agent instead.

**Parallelism:** say the magic phrase — *"…in parallel using separate subagents."*
Example: "Research the auth, database, and API modules **in parallel using separate
subagents**. Return a one-paragraph summary per module." Cap at **3–5** concurrent for
everyday work; merging more summaries than that costs more than it saves.

**Model routing saves real money:** cheap/fast model for classification and bulk
reading, strong model for synthesis and architecture.

---

## A starter team to delegate to (drop these in `.claude/agents/`)

- `explorer` — read-only codebase reconnaissance; returns a map, no edits.
- `reviewer` — quality/security/correctness review after every change (proactive).
- `test-runner` — runs the suite, returns only pass/fail + failing details.
- `researcher` — heavy multi-source web/file research; returns a cited summary.
- `doc-writer` — keeps docs/runbooks current with code.

Then add delegation rules to `CLAUDE.md` so they fire automatically, e.g.:
"Use `reviewer` proactively after any code change. Use `researcher` for any task that
would pull large search results or many files into the main context."

---

## Context management discipline (for big projects)

- Watch the window. When it's filling with detail you won't reference again, that's the
  signal to **delegate that work to a subagent** and keep only the summary.
- For a quick question about something already in context, use `/btw` (sees context, no
  tools, answer is discarded — doesn't bloat history) instead of a subagent.
- Snapshot/commit at clean milestones so a context reset is cheap to recover from.
- If the window is genuinely near full mid-task, **stop and decide the best next step**:
  summarize state to a file, delegate the heavy part out, or hand long material to a
  long-context council model and resume from its summary.

---

## Teaching cadence (do this while working, so the operator learns)

When running Claude Code work, narrate the *why* briefly as you go:
- "Delegating this to a subagent so the main window stays clean."
- "Routing this bulk pass to a cheaper model to cut cost."
- "Adding a `SubagentStop` hook so tests must pass before this returns."
- "This needs your approval, so I'm keeping it in the main thread, not delegating."

One tip per action, not a lecture. The goal is that the operator can run the same move
solo next time.
