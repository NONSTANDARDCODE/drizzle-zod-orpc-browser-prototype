import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: '../shared/src/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'prototype_db',
  },
});
