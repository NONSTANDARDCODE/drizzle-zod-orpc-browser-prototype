# Drizzle + ORPC + Vue 3 Full-Stack Prototype

A complete full-stack application prototype demonstrating end-to-end type safety using:

- **Backend**: Node.js HTTP server with ORPC for RPC
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Validation**: Drizzle-Zod for generating Zod schemas
- **Contract**: ORPC contract for type-safe API communication
- **Frontend**: Vue 3 with Composition API
- **Type Safety**: Complete end-to-end type inference from database to UI

## Project Structure

```
.
├── packages/
│   ├── shared/          # Shared schemas, types, and ORPC contract
│   ├── backend/         # Node.js backend implementing the contract
│   └── frontend/        # Vue 3 frontend using the contract
├── docker-compose.yml   # PostgreSQL database setup
└── package.json         # Workspace configuration
```

## Architecture

This project uses a **contract-first** approach for API communication:

1. **Shared Package**: Contains the database schema (Drizzle), validation schemas (Drizzle-Zod), and the ORPC contract that defines the API interface
2. **Backend Package**: Implements the ORPC contract procedures with actual database operations
3. **Frontend Package**: Uses the ORPC contract to make type-safe API calls without directly depending on the backend package

This architecture ensures:
- ✅ Frontend never imports from backend (no tight coupling)
- ✅ Type safety across the entire stack
- ✅ Contract serves as the single source of truth for the API
- ✅ Frontend and backend can be developed independently

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose

# full setup
```
npm install & cp packages/backend/.env.example packages/backend/.env & cp packages/frontend/.env.example packages/frontend/.env && npm run build --workspace=shared & npm run --workspace=backend db:generate && npm run dev
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

#### Backend Configuration

Copy the example environment file and configure if needed:

```bash
cd packages/backend
cp .env.example .env
```

The `.env` file contains:
- `DATABASE_URL`: PostgreSQL connection string (default: `postgres://postgres:postgres@localhost:5432/prototype_db`)
- `PORT`: Backend server port (default: `3000`)

#### Frontend Configuration

Copy the example environment file and configure if needed:

```bash
cd packages/frontend
cp .env.example .env
```

The `.env` file contains:
- `VITE_API_URL`: Backend API URL (default: `http://localhost:3000`)

### 3. Build shared package

```bash
npm run build --workspace=shared
```

### 4. Generate database migration

```bash
cd packages/backend
npm run db:generate
cd ../..
```

### 5. Start the application

#### Option A: Start everything at once (Recommended)

```bash
npm run dev
```

This will:
- Start PostgreSQL via Docker Compose
- Run database migrations
- Start the backend server on http://localhost:3000
- Start the frontend dev server on http://localhost:5173

#### Option B: Start services individually

If you prefer more control, start each service separately:

**Terminal 1 - Database:**
```bash
npm run db:up
```

**Terminal 2 - Run migrations (once database is ready):**
```bash
npm run db:migrate
```

**Terminal 3 - Backend:**
```bash
npm run dev:backend
```

**Terminal 4 - Frontend:**
```bash
npm run dev:frontend
```

### 6. Open your browser

Navigate to http://localhost:5173 to see the application.

## Features

- **Contract-First Architecture**: ORPC contract defines the API interface in a shared package
- **Type-Safe API**: Full type safety from database to frontend without tight coupling
- **Database Schema**: Drizzle ORM with type-safe queries
- **Validation**: Zod schemas generated from Drizzle schemas for input validation
- **Monorepo**: Shared package containing schemas and contract
- **Auto-Migration**: Drizzle migrations for database schema
- **Environment Variables**: Configurable connection strings and ports
- **Decoupled Frontend**: Frontend uses contract without importing backend code

## API Endpoints

The backend exposes the following ORPC procedures:

- `POST /createUser` - Create a new user
  - Input: `{ name: string, email: string }`
  - Output: User object with id, name, email, and createdAt
  
- `POST /getUsers` - Get all users
  - Input: none
  - Output: Array of user objects

## Available Scripts

- `npm run dev` - Start full stack (database, backend, frontend)
- `npm run dev:backend` - Start backend only
- `npm run dev:frontend` - Start frontend only
- `npm run db:up` - Start PostgreSQL
- `npm run db:down` - Stop PostgreSQL
- `npm run db:migrate` - Run database migrations
- `npm run build` - Build all packages
- `npm run clean` - Clean all node_modules and dist folders

## Environment Variables Reference

### Backend (`packages/backend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://postgres:postgres@localhost:5432/prototype_db` |
| `PORT` | Backend server port | `3000` |

### Frontend (`packages/frontend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |

## Development

### Database Migrations

When you modify the database schema in `packages/shared/src/schema.ts`:

1. Generate a new migration:
   ```bash
   cd packages/backend
   npm run db:generate
   ```

2. Apply the migration:
   ```bash
   npm run db:migrate
   ```

### Type Safety

The application maintains end-to-end type safety through a contract-first approach:

1. **Database Schema**: Defined in Drizzle (`shared/src/schema.ts`)
2. **Validation Schemas**: Zod schemas generated from Drizzle schemas (`shared/src/schemas.ts`)
3. **API Contract**: ORPC contract defines input/output types (`shared/src/contract.ts`)
4. **Backend Implementation**: Implements the contract with type-safe handlers (`backend/src/router.ts`)
5. **Frontend Client**: Uses the contract for type-safe API calls (`frontend/src/client.ts`)
6. **Full Autocomplete**: Frontend gets complete type inference without importing backend code

## Troubleshooting

### Database connection errors

If you get connection errors, ensure:
- Docker is running
- PostgreSQL container is up: `docker compose ps`
- Connection string in `.env` matches your setup

### Port conflicts

If port 3000 or 5173 is already in use:
- Change `PORT` in `packages/backend/.env`
- Change `VITE_API_URL` in `packages/frontend/.env` to match
- Update the Vite port in `packages/frontend/vite.config.ts`

### TypeScript errors in frontend

Ensure the shared package is built:
```bash
npm run build --workspace=shared
```
