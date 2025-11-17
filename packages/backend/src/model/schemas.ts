import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from '../drizzle/schema.js';

export const insertUserSchema = createInsertSchema(users, {
  name: (schema) => schema.name.min(1, 'Name is required'),
  email: (schema) => schema.email.email('Invalid email format'),
}).omit({ id: true, createdAt: true }).refine(
  (data) => data.name.trim().length > 0,
  {
    message: 'Name cannot be empty or contain only whitespace',
    path: ['name'],
  }
);

export const selectUserSchema = createSelectSchema(users);
