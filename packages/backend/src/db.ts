import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from 'shared/src/schema.js';

const connectionString = 'postgres://postgres:postgres@localhost:5432/prototype_db';

export const client = postgres(connectionString);
export const db = drizzle(client, { schema });
