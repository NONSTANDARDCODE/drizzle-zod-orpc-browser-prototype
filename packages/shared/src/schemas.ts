import { z } from 'zod';

// User input schema with validation
export const insertUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
}).refine(
  (data) => data.name.trim().length > 0,
  {
    message: 'Name cannot be empty or contain only whitespace',
    path: ['name'],
  }
);

// User output schema
export const selectUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  createdAt: z.date(),
});
