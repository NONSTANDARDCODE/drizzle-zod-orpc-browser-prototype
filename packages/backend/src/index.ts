import { createServer } from 'node:http';
import { RPCHandler } from '@orpc/server/node';
import { router } from './router.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const handler = new RPCHandler(router);

const server = createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  const result = await handler.handle(req, res, { context: {} });
  
  if (!result.matched) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Procedure not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
