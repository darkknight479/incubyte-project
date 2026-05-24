# Salary Management Tool

A minimal end-to-end salary management application for HR managers.

## What is included

- Next.js frontend with Mantine UI components
- SQLite backend accessed through Next.js API routes
- 10,000-employee seed script using first and last name lists
- Salary insights for country and job-title slices
- Unit tests for core metric and data helpers

## Scripts

- `npm install`
- `npm run dev` — start development server
- `npm run build` — build production bundle
- `npm start` — run in production mode
- `npm run seed` — generate `data/employees.sqlite` with 10,000 entries
- `npm test` — run unit tests

## Structure

- `app/` — UI pages and components
- `app/api/` — employee CRUD and insights APIs
- `lib/` — database and business logic helpers
- `scripts/` — database setup and seeding
- `data/` — seed name sources and generated database
- `tests/` — unit tests

## Notes

The seed script is designed for performance with batch insert transactions and efficient SQLite writes.
# incubyte-project
# incubyte-project
