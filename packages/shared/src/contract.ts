import { oc } from '@orpc/contract';
import { z } from 'zod';
import { insertUserSchema, selectUserSchema } from './schemas.js';

// Create the ORPC contract
export const contract = {
  createUser: oc
    .input(insertUserSchema)
    .output(selectUserSchema),
  
  getUsers: oc
    .output(z.array(selectUserSchema)),
};

export type AppContract = typeof contract;
