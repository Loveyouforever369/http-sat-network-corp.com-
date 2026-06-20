# agents/ — Agent DNA files (Milestone 2)

Each agent is authored as a folder of **Agent DNA**:
- `SOUL.md` — identity, mission, behavioral guardrails, anti-hallucination rules.
- `SKILL.md` — executable Python tools (name, input schema, implementation ref,
  required connector, risk level, approval policy).

A base DNA in `_base/` is inherited by every agent; the compiler merges base +
overrides and emits the canonical DB record. The 3 flagship agents (AGT-45902/3/4)
are expressed here in Milestone 2.
