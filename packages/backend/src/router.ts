import { os } from '@orpc/server';
import { insertUserSchema, selectUserSchema } from 'shared';
import { users } from 'shared/src/schema.js';
import { db } from './db.js';
import { z } from 'zod';

export const router = {
  createUser: os
    .input(insertUserSchema)
    .handler(async ({ input }) => {
      const [user] = await db.insert(users).values(input).returning();
      return user;
    }),
  
  getUsers: os
    .handler(async () => {
      const allUsers = await db.select().from(users);
      return allUsers;
    }),
};

export type AppRouter = typeof router;
