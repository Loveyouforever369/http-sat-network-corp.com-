import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

// NOTE: The DDL source of truth is `db/sql/*.sql` (applied via `pnpm db:migrate`).
// This config exists for typed introspection / optional drizzle-kit workflows.
export default defineConfig({
  schema: './src/schema.ts',
  out: './.drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? '',
  },
  verbose: true,
  strict: true,
});
