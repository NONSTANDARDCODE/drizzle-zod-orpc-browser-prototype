import { oc } from '@orpc/contract';
import { z } from 'zod';
import { insertUserSchema } from 'backend/model';
import { createSelectSchema } from 'drizzle-zod';
import { users } from 'backend/drizzle';

// Create select schema for output
const selectUserSchema = createSelectSchema(users);

// Create the ORPC contract
export const contract = {
  createUser: oc
    .input(insertUserSchema)
    .output(selectUserSchema),
  
  getUsers: oc
    .input(z.void())
    .output(z.array(selectUserSchema)),
};

export type AppContract = typeof contract;
