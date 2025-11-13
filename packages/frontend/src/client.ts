import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import type { contract } from 'shared';
import type { ContractRouterClient } from '@orpc/contract';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const link = new RPCLink({
  url: BASE_URL,
  fetch: (input, init) => fetch(input, init),
});

export const client: ContractRouterClient<typeof contract> = createORPCClient(link);
