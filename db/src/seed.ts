import { sql } from './client.js';

// Usage: pnpm db:seed [count]   (default 1,000,000)
const n = Number(process.argv[2] ?? process.env.SEED_COUNT ?? 1_000_000);
if (!Number.isFinite(n) || n <= 0) throw new Error(`Invalid seed count: ${process.argv[2]}`);

console.log(`Seeding ${n.toLocaleString()} agents ...`);
const start = Date.now();
await sql`select seed_agents(${n})`;
const secs = ((Date.now() - start) / 1000).toFixed(1);

const [{ agents }] = await sql<{ agents: number }[]>`select count(*)::int as agents from agents`;
const [{ steps }] = await sql<{ steps: number }[]>`select count(*)::int as steps from agent_steps`;
console.log(`done in ${secs}s — agents: ${agents.toLocaleString()}, steps: ${steps.toLocaleString()}`);
await sql.end();
