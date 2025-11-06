import type { AppRouter } from '../../backend/src/router';
import type { InsertUser, SelectUser } from 'shared';

interface ORPCClient {
  createUser: (input: InsertUser) => Promise<SelectUser>;
  getUsers: () => Promise<SelectUser[]>;
}

const BASE_URL = 'http://localhost:3000';

export function createORPCClient(): ORPCClient {
  async function call<T>(procedureName: string, input?: unknown): Promise<T> {
    const response = await fetch(`${BASE_URL}/${procedureName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input ?? null),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  return {
    createUser: (input: InsertUser) => call<SelectUser>('createUser', input),
    getUsers: () => call<SelectUser[]>('getUsers'),
  };
}

export const client = createORPCClient();
