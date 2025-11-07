import { os } from '@orpc/server';
import { insertUserSchema, users } from 'shared';
import { db } from './db.js';

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
