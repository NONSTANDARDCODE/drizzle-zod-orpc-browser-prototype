# Drizzle + ORPC + Vue 3 Full-Stack Prototype

A complete full-stack application prototype demonstrating end-to-end type safety using:

- **Backend**: Node.js HTTP server with ORPC for RPC
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Validation**: Drizzle-Zod for generating Zod schemas
- **Type Safety**: Direct router import for type-safe API communication
- **Frontend**: Vue 3 with Composition API
- **Type Inference**: Complete end-to-end type inference from database to UI

## Project Structure

```
.
├── packages/
│   ├── shared/          # Shared database schema (Drizzle)
│   ├── backend/         # Node.js backend with ORPC router
│   └── frontend/        # Vue 3 frontend consuming backend router types
├── docker-compose.yml   # PostgreSQL database setup
└── package.json         # Workspace configuration
```

## Architecture

This project follows the **ORPC monorepo best practices** with direct router imports:

1. **Shared Package**: Contains only the database schema (Drizzle) - minimal and reusable
2. **Backend Package**: Exports the ORPC router with validation schemas (Drizzle-Zod) and type definitions
3. **Frontend Package**: Imports router types directly from backend for type-safe API calls

This architecture ensures:
- ✅ Type safety across the entire stack through direct type inference
- ✅ Simpler architecture without a separate contract layer
- ✅ Better developer experience with automatic type updates
- ✅ Follows ORPC recommended monorepo setup
- ✅ Browser-compatible with drizzle-zod schemas

> **Note**: See [TECHNICAL_ANALYSIS.md](./TECHNICAL_ANALYSIS.md) for a detailed comparison of contract-based vs direct import approaches.

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose

# full setup
```
npm install && cp packages/backend/.env.example packages/backend/.env && cp packages/frontend/.env.example packages/frontend/.env && npm run build --workspace=shared && npm run build --workspace=backend && npm run --workspace=backend db:generate && npm run dev
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

### 3. Build shared and backend packages

```bash
npm run build --workspace=shared
npm run build --workspace=backend
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

- **Direct Router Import**: Frontend imports router types directly from backend (ORPC best practice)
- **Type-Safe API**: Full type safety from database to frontend with automatic type inference
- **Database Schema**: Drizzle ORM with type-safe queries
- **Validation**: Zod schemas generated from Drizzle schemas for input validation
- **Monorepo**: Shared package containing database schema, backend with router and schemas
- **Auto-Migration**: Drizzle migrations for database schema
- **Environment Variables**: Configurable connection strings and ports
- **Browser Compatible**: Drizzle-Zod schemas work perfectly in browser environments

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

The application maintains end-to-end type safety through direct router imports:

1. **Database Schema**: Defined in Drizzle (`shared/src/drizzle/schema.ts`)
2. **Backend Router**: Exports ORPC router with Zod schemas from Drizzle (`backend/src/router.ts`)
3. **Validation Schemas**: Zod schemas generated from Drizzle schemas (`backend/src/model/schemas.ts`)
4. **Frontend Client**: Imports router types directly from backend (`frontend/src/client.ts`)
5. **Type Inference**: Frontend gets complete type inference and autocomplete from backend router
6. **Automatic Updates**: Changes in backend router automatically reflect in frontend types

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

Ensure both shared and backend packages are built:
```bash
npm run build --workspace=shared
npm run build --workspace=backend
```
