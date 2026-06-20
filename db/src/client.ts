import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema.js';

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error('DATABASE_URL is not set. Copy .env.example → .env.local and fill it in.');
}

// `prepare: false` is required for Supabase's transaction-mode pooler (pgbouncer).
export const sql = postgres(url, { max: 10, prepare: false });
export const db = drizzle(sql, { schema });
export { schema };
