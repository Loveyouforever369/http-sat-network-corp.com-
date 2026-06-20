# runner/ — Python Skill Runner (Milestone 3)

FastAPI service (Dockerized, sandboxed) that executes `SKILL.md` Python tools and
runs the conditional workflow engine. Hosts the real connectors (Stripe, Slack,
Salesforce, Shopify, Zendesk, Linear, Twilio, DocuSign) in `dry_run` / `live`
modes. Authenticated to the MCP Gateway via a shared secret; holds no long-lived
credentials (the gateway injects scoped credentials per call).

Scaffolded in Milestone 3.
