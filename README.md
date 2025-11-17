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
│   ├── backend/         # Database schema, models, and ORPC router implementation
│   ├── shared/          # ORPC contract (imports models from backend)
│   └── frontend/        # Vue 3 frontend using the contract
├── docker-compose.yml   # PostgreSQL database setup
└── package.json         # Workspace configuration
```

## Architecture

This project uses a **contract-first** approach with **cross-imports** for API communication:

1. **Backend Package**: Contains the database schema (Drizzle), validation schemas (Drizzle-Zod), and implements the ORPC router
2. **Shared Package**: Imports model schemas from backend and exports the ORPC contract that defines the API interface  
3. **Frontend Package**: Uses the ORPC contract from shared to make type-safe API calls without directly depending on the backend package

This architecture ensures:
- ✅ Frontend never imports from backend (no tight coupling)
- ✅ Type safety across the entire stack
- ✅ Contract serves as the single source of truth for the API
- ✅ Backend and frontend can be developed independently
- ✅ Drizzle schema and models are centralized in backend
- ✅ Shared only imports types from backend for contract compilation

## Prerequisites

- Node.js 18+ and pnpm
- Docker and Docker Compose

# full setup
```
pnpm install & cp packages/backend/.env.example packages/backend/.env & cp packages/frontend/.env.example packages/frontend/.env && pnpm run --filter shared build & pnpm run --filter backend db:generate && pnpm run dev
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
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
pnpm run --filter shared build
```

### 4. Generate database migration

```bash
cd packages/backend
pnpm run db:generate
cd ../..
```

### 5. Start the application

#### Option A: Start everything at once (Recommended)

```bash
pnpm run dev
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
pnpm run db:up
```

**Terminal 2 - Run migrations (once database is ready):**
```bash
pnpm run db:migrate
```

**Terminal 3 - Backend:**
```bash
pnpm run dev:backend
```

**Terminal 4 - Frontend:**
```bash
pnpm run dev:frontend
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

- `pnpm run dev` - Start full stack (database, backend, frontend)
- `pnpm run dev:backend` - Start backend only
- `pnpm run dev:frontend` - Start frontend only
- `pnpm run db:up` - Start PostgreSQL
- `pnpm run db:down` - Stop PostgreSQL
- `pnpm run db:migrate` - Run database migrations
- `pnpm run build` - Build all packages
- `pnpm run clean` - Clean all node_modules and dist folders

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

When you modify the database schema in `packages/backend/src/drizzle/schema.ts`:

1. Generate a new migration:
   ```bash
   cd packages/backend
   pnpm run db:generate
   ```

2. Apply the migration:
   ```bash
   pnpm run db:migrate
   ```

### Type Safety

The application maintains end-to-end type safety through a contract-first approach with cross-imports:

1. **Database Schema**: Defined in Drizzle (`backend/src/drizzle/schema.ts`)
2. **Validation Schemas**: Zod schemas generated from Drizzle schemas (`backend/src/model/schemas.ts`)
3. **API Contract**: ORPC contract imports model schemas from backend and defines input/output types (`shared/src/contract/contract.ts`)
4. **Backend Implementation**: Implements the contract with type-safe handlers (`backend/src/router.ts`)
5. **Frontend Client**: Uses the contract from shared for type-safe API calls (`frontend/src/client.ts`)
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
pnpm run --filter shared build
```
