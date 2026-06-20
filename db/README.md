# @sat/db

Drizzle ORM schema, raw-SQL migrations, the 1M-row seeder, and a benchmark.

## Source of truth
- **DDL:** `sql/0001_init.sql` (extensions, enums, tables, indexes, partitioning,
  RLS, facets) — applied via `pnpm db:migrate` or Supabase.
- **Seed:** `sql/0002_seed.sql` defines `seed_reference()` + `seed_agents(n)`.
- **Flagship:** `sql/0003_flagship.sql` inserts the 3 real showcase agents.
- **Queries:** `src/schema.ts` is the typed Drizzle mirror for the app.

## Commands
```bash
pnpm db:migrate          # apply sql/*.sql in order (uses DIRECT_URL)
pnpm db:seed 1000000     # call seed_agents(n)
pnpm db:bench            # measure catalog query latency
```

## Performance notes
1M rows is small for Postgres **with the right indexes**:
- weighted `tsvector` + GIN (full-text), `pg_trgm` GIN (fuzzy/prefix),
- btree composites for filtered keyset browse,
- materialized `category_facets` for instant facet counts.

Use **keyset/cursor** pagination (never deep `OFFSET`). Target p99 < ~50 ms for
indexed catalog reads.
