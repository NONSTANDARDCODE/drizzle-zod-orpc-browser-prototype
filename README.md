# Drizzle + ORPC + Vue 3 Full-Stack Prototype

A complete full-stack application prototype demonstrating end-to-end type safety using:

- **Backend**: Node.js HTTP server with ORPC for RPC
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Validation**: Drizzle-Zod for generating Zod schemas
- **Frontend**: Vue 3 with Composition API
- **Type Safety**: Complete end-to-end type inference from database to UI

## Project Structure

```
.
├── packages/
│   ├── shared/          # Shared schemas and types
│   ├── backend/         # Node.js backend with ORPC
│   └── frontend/        # Vue 3 frontend
├── docker-compose.yml   # PostgreSQL database setup
└── package.json         # Workspace configuration
```

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate database migration**:
   ```bash
   cd packages/backend
   npm run db:generate
   cd ../..
   ```

3. **Start the application**:
   ```bash
   npm run dev
   ```

   This will:
   - Start PostgreSQL via Docker Compose
   - Run database migrations
   - Start the backend server on http://localhost:3000
   - Start the frontend dev server on http://localhost:5173

4. **Open your browser** to http://localhost:5173

## Features

- **Type-Safe API**: ORPC provides full type safety between frontend and backend
- **Database Schema**: Drizzle ORM with type-safe queries
- **Validation**: Zod schemas generated from Drizzle schemas
- **Monorepo**: Shared types package for consistency
- **Auto-Migration**: Drizzle migrations for database schema

## API Endpoints

- `POST /createUser` - Create a new user
- `POST /getUsers` - Get all users

## Scripts

- `npm run dev` - Start full stack (database, backend, frontend)
- `npm run dev:backend` - Start backend only
- `npm run dev:frontend` - Start frontend only
- `npm run db:up` - Start PostgreSQL
- `npm run db:down` - Stop PostgreSQL
- `npm run db:migrate` - Run database migrations
- `npm run build` - Build all packages
- `npm run clean` - Clean all node_modules and dist folders
