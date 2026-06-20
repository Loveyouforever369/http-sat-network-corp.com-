import { sql } from './client.js';

// Proves "1M served fast": runs representative catalog queries N times and
// reports wall-clock min/avg, plus the planner's execution time via EXPLAIN.
type Q = { label: string; run: () => Promise<unknown>; explain: string };

const queries: Q[] = [
  {
    label: 'keyset browse — global popular (limit 24)',
    run: () => sql`select id, public_id, name, popularity from agents
                   where status='active' and visibility='public'
                   order by popularity desc, id desc limit 24`,
    explain: `select id from agents where status='active' and visibility='public'
              order by popularity desc, id desc limit 24`,
  },
  {
    label: 'category-filtered browse (limit 24)',
    run: () => sql`select a.id, a.name from agents a
                   join categories c on c.id=a.category_id
                   where a.status='active' and c.slug='revenue-operations'
                   order by a.popularity desc, a.id desc limit 24`,
    explain: `select a.id from agents a join categories c on c.id=a.category_id
              where a.status='active' and c.slug='revenue-operations'
              order by a.popularity desc, a.id desc limit 24`,
  },
  {
    label: 'full-text search "refund shopify" (GIN tsvector)',
    run: () => sql`select id, name from agents
                   where search @@ websearch_to_tsquery('english','refund shopify')
                   order by popularity desc limit 24`,
    explain: `select id from agents
              where search @@ websearch_to_tsquery('english','refund shopify')
              order by popularity desc limit 24`,
  },
  {
    label: 'fuzzy name contains "churn" (GIN trigram)',
    run: () => sql`select id, name from agents where name ilike '%churn%'
                   order by popularity desc limit 24`,
    explain: `select id from agents where name ilike '%churn%'
              order by popularity desc limit 24`,
  },
];

function pct(ms: number[], p: number): number {
  const s = [...ms].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))]!;
}

const [{ count }] = await sql<{ count: number }[]>`select count(*)::int as count from agents`;
console.log(`\nCatalog size: ${count.toLocaleString()} agents\n`);

const ROUNDS = 20;
for (const q of queries) {
  const times: number[] = [];
  await q.run(); // warm
  for (let i = 0; i < ROUNDS; i++) {
    const t = performance.now();
    await q.run();
    times.push(performance.now() - t);
  }
  const explain = await sql.unsafe(`explain (analyze, buffers, format text) ${q.explain}`);
  const planMs = explain
    .map((r: Record<string, string>) => Object.values(r)[0] ?? '')
    .join('\n')
    .match(/Execution Time: ([\d.]+) ms/)?.[1];
  const avg = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
  console.log(`■ ${q.label}`);
  console.log(`   wall  min ${Math.min(...times).toFixed(2)}ms · p50 ${pct(times, 50).toFixed(2)}ms · p95 ${pct(times, 95).toFixed(2)}ms · avg ${avg}ms`);
  console.log(`   plan  execution ${planMs ?? '?'}ms\n`);
}
await sql.end();
