import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from '@/drizzle/schema.js';

export const insertUserSchema = createInsertSchema(users, {
  name: (schema) => schema.name.min(1, 'Name is required'),
  email: (schema) => schema.email.email('Invalid email format'),
}).omit({ id: true, createdAt: true }).refine(
  (data) => !data.email.includes('test@'),
  {
    message: 'Test emails are not allowed',
    path: ['email'],
  }
);

export const selectUserSchema = createSelectSchema(users);
