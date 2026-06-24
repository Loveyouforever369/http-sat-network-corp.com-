# AI Family OS

The operating system for the **AI Family** — an AI training, automation, and
creative-content studio. This folder is the **technical source of truth**: the
canon, the agent roster, and the runnable automation spine. (Notion is the
human-facing dashboard that mirrors it.)

> **Why this lives inside the Prometheus repo:** creating a brand-new GitHub repo
> was blocked for the assistant integration (`403 — not accessible by integration`),
> so the OS is staged here as a **fully self-contained folder**. Nothing here
> imports from Prometheus and Prometheus does not import from here. Copy
> `ai-family-os/` into its own repo any time — see *Lift into its own repo* below.

---

## Layout

```
ai-family-os/
├── config/family.json          # single source of truth: roster, crews, pipelines, campaigns, signals, episodes
├── scripts/
│   ├── _Common.ps1             # shared runtime: config load, dispatch, logging, the model SEAM
│   ├── call-family.ps1         # -Member | -Pipeline | -Campaign | -Request | -List
│   ├── daily-loop.ps1          # morning / midday / evening routine
│   ├── posting-pipeline.ps1    # -Generate the posting queue
│   └── send-family-briefing.ps1# render the daily Briefing v2 (a decision tool)
├── tools/validate.js           # Node validator — checks the roster/pipeline graph is consistent
├── briefs/                     # generated briefings + posting queues land here
├── logs/                       # structured JSONL logs land here
└── assets/                     # reusable creative/technical assets
```

## Run it (PowerShell 7+)

The whole spine runs in **demo mode out of the box** — no API keys needed (just
like Prometheus). Every command from the README §13 command set maps to a script:

```powershell
cd ai-family-os/scripts

./call-family.ps1 -List Members              # list members
./call-family.ps1 -List Pipelines            # list pipelines
./daily-loop.ps1                             # run the daily loop (all phases)
./posting-pipeline.ps1 -Generate             # generate the posting queue
./send-family-briefing.ps1                   # create the daily briefing
./call-family.ps1 -Pipeline family-training-loop   # run the training loop
./call-family.ps1 -Pipeline content-engine         # run the content engine
./call-family.ps1 -Pipeline guardian-review        # run guardian review

./call-family.ps1 -Member sage -Request "Study this model, return a training brief"
./call-family.ps1 -Campaign weekly-signal-drop
```

Outputs: a real `briefs/briefing-YYYY-MM-DD.md`, a `briefs/posting-queue-*.json`,
and structured `logs/family-YYYY-MM-DD.jsonl`.

## Verify the config (Node)

```bash
node tools/validate.js
```

Checks every foreign key resolves (members↔crews, pipeline steps, campaign
pipelines, signal/episode hosts) and that all status/priority enums are valid.

## The model seam (demo → live)

`Invoke-Model` in `scripts/_Common.ps1` is the single seam. In demo mode it
returns a deterministic stub. To go live, set `settings.demo_mode = false` in
`config/family.json` and implement the real call (e.g. the Anthropic Messages
API using `settings.model`). Nothing else changes — every member and pipeline
already routes through that one function.

## Environment variables

| Var | Default | Purpose |
|-----|---------|---------|
| `FAMILY_ROOT`   | this folder        | OS root |
| `FAMILY_CONFIG` | `config/family.json` | config path |
| `FAMILY_LOGS`   | `logs/`            | log output |
| `FAMILY_BRIEFS` | `briefs/`          | briefing output |

## Lift into its own repo

When you create an empty `ai-family-os` repo on GitHub:

```bash
cd ai-family-os
git init && git add . && git commit -m "AI Family OS v1.0"
git branch -M main
git remote add origin https://github.com/Loveyouforever369/ai-family-os.git
git push -u origin main
```

That's it — the folder is self-contained, so it moves with zero edits.
