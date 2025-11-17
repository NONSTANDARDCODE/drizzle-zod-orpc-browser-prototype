import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  external: ['@orpc/contract', 'zod', 'drizzle-orm', 'drizzle-zod', 'postgres'],
  // Don't mark backend as external - bundle it
  noExternal: ['backend'],
  clean: true,
})
