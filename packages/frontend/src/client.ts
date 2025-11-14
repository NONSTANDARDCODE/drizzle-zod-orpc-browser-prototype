import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import type { RouterClient } from '@orpc/server';
import type { AppRouter } from 'backend';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const link = new RPCLink({
  url: BASE_URL,
  fetch: (input, init) => fetch(input, init),
});

export const client = createORPCClient<RouterClient<AppRouter>>(link);
