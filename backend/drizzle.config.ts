import { defineConfig } from 'drizzle-kit';

const url = process.env.DATABASE_URL;
if (!url) {
  console.warn('DATABASE_URL is not set');
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: url ?? '',
  },
});
