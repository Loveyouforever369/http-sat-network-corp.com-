import 'dotenv/config';
import postgres from 'postgres';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Applies db/sql/*.sql in lexical order. DDL → prefer the direct (non-pooled) URL.
const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!url) throw new Error('Set DIRECT_URL or DATABASE_URL in .env.local');

const sqlDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'sql');
const files = readdirSync(sqlDir).filter((f) => f.endsWith('.sql')).sort();

const sql = postgres(url, { max: 1, prepare: false });
try {
  for (const file of files) {
    const text = readFileSync(join(sqlDir, file), 'utf8');
    process.stdout.write(`→ applying ${file} ... `);
    // `.simple()` uses the simple query protocol so multi-statement files
    // (incl. $$-quoted functions) run as one batch.
    await sql.unsafe(text).simple();
    console.log('ok');
  }
  console.log('migrations complete');
} finally {
  await sql.end();
}
