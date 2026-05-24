# Architecture Overview

## Goals

- Build a simple, usable salary management tool for HR managers.
- Support employee CRUD and salary insights.
- Use a relational database for durability and SQL-backed metrics.
- Keep the UI responsive for up to 10,000 records.

## Stack

- Frontend: Next.js + React + Mantine UI
- Backend: Next.js API routes with Node.js runtime
- Database: SQLite via better-sqlite3
- Testing: Vitest for fast unit coverage

## Project Structure

- `app/`
  - UI pages and shared client components
  - `app/api/` contains backend endpoints
- `lib/`
  - Data models, validation, database connection, and business logic
- `scripts/`
  - Database and seed automation
- `data/`
  - Source name lists and generated `employees.sqlite`

## Key Design Choices

- `better-sqlite3` for synchronous SQLite access with strong performance and simple transactions.
- Pure business helpers in `lib/employee.ts` to enable deterministic tests.
- Client-side React state for UX simplicity, with light filtering and metrics.
- A seed script built for repeated use and efficient bulk inserts.
