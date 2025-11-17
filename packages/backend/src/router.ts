import { os } from '@orpc/server';
import { insertUserSchema, selectUserSchema } from './model/schemas.js';
import { users } from './drizzle/schema.js';
import { z } from 'zod';
import { db } from './db.js';

export const router = {
  createUser: os
    .input(insertUserSchema)
    .output(selectUserSchema)
    .handler(async ({ input }) => {
      const [user] = await db.insert(users).values(input).returning();
      return user;
    }),
  
  getUsers: os
    .output(z.array(selectUserSchema))
    .handler(async () => {
      const allUsers = await db.select().from(users);
      return allUsers;
    }),
};

export type AppRouter = typeof router;
