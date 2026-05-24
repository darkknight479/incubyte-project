# AI Tooling Notes

## Purpose

These notes capture how AI was used to accelerate implementation while preserving correctness.

## Prompts and Signals

- Asked the AI to scaffold a fullstack salary management application with a React frontend and SQLite backend.
- Focused on delivering:
  - Employee CRUD flows
  - Salary insights by country and job title
  - A fast seed script for 10,000 employees
  - Clean test coverage for core metrics

## Engineering Choices

- Selected Next.js because it supports both UI and backend routes in one repo.
- Chose Mantine for rapid component design and a polished HR manager experience.
- Used SQLite plus `better-sqlite3` for a lightweight relational store suitable for desktop/demo apps.
