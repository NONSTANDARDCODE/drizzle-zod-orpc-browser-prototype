import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from 'shared';

export const insertUserSchema = createInsertSchema(users, {
  name: (schema) => schema.name.min(1, 'Name is required'),
  email: (schema) => schema.email.email('Invalid email format'),
}).omit({ id: true, createdAt: true });

export const selectUserSchema = createSelectSchema(users);

export type InsertUser = typeof insertUserSchema._type;
export type SelectUser = typeof selectUserSchema._type;
