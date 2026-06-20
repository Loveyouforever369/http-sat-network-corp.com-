# Security

## Secrets
- **Never** in chat, code, or commits. Use `.env.local` (gitignored). If a secret
  was shared in plaintext anywhere, **rotate it**.
- `.gitignore` blocks `.env*` (except `.env.example`), `*.key`, `*.pem`,
  `secrets/`, `.vault/`.
- CI should scan for secrets before merge.

## Credential vault
- Per-user, per-connector credentials are stored **encrypted at rest**
  (envelope encryption with `VAULT_ENCRYPTION_KEY`, AES-256-GCM).
- The MCP Gateway injects credentials into outbound connector calls **after** the
  request leaves the model boundary. Secrets never enter Claude's context, never
  reach the browser, and are never written to logs or audit records.
- Rotation: update the vault entry; in-flight runs use the value resolved at call
  time.

## Money-moving safety
Agents that write to the world (refunds, payments, messages) are gated:
- **dry_run by default** — side-effects are simulated and logged; `live` is
  opt-in per agent.
- **Spend caps** per agent and per connector; **approval thresholds** route any
  spend over `DEFAULT_APPROVAL_THRESHOLD_USD` to a human.
- **Idempotency keys** derived from the inbound webhook event id prevent
  duplicate side-effects on provider retries (e.g. no double refund).
- Every step writes an immutable audit row (`step_runs`).

## Webhooks
- Each provider's signature is verified (Stripe `Stripe-Signature`, Slack signing
  secret, Shopify HMAC, DocuSign HMAC, …) before any processing.
- Replays are rejected via event-id de-duplication + timestamp window.

## Database
- Supabase Row-Level Security on all user-scoped tables.
- Least-privilege keys: the browser only ever sees the publishable key; the
  secret key is server-only.

## Python Skill Runner sandbox
- Iteration-1 sandbox: per-call timeouts, memory/CPU limits, import allowlist,
  network egress allowlist, no filesystem persistence between calls.
- Hardening path (documented, deploy-time): gVisor / Firecracker / nsjail for
  kernel-level isolation; one runner pool per trust boundary.
- The runner holds **no** long-lived credentials; the gateway passes scoped
  credentials per call.
