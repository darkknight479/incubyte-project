import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { Employee } from './employee';

const dbPath = path.join(process.cwd(), 'data', 'employees.sqlite');

function createDirectory() {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function openDatabase(): Database.Database {
  createDirectory();
  const db = new Database(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      title TEXT NOT NULL,
      country TEXT NOT NULL,
      salary INTEGER NOT NULL,
      department TEXT NOT NULL,
      dateHired TEXT NOT NULL
    );
  `);
  return db;
}

let cachedDb: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!cachedDb) {
    cachedDb = openDatabase();
  }
  return cachedDb;
}

export function getEmployees(): Employee[] {
  const db = getDb();
  return db.prepare('SELECT * FROM employees ORDER BY id DESC').all() as Employee[];
}

export function getEmployeesPage(page: number, pageSize: number): { employees: Employee[]; total: number } {
  const db = getDb();
  const countRow = db.prepare('SELECT COUNT(*) as count FROM employees').get() as { count?: number };
  const total = Number(countRow.count ?? 0);
  const offset = (page - 1) * pageSize;
  const employees = db
    .prepare('SELECT * FROM employees ORDER BY id DESC LIMIT ? OFFSET ?')
    .all(pageSize, offset) as Employee[];
  return { employees, total };
}

export function getEmployeeById(id: number): Employee | null {
  const db = getDb();
  return (db.prepare('SELECT * FROM employees WHERE id = ?').get(id) as Employee | undefined) ?? null;
}

export function createEmployee(data: Omit<Employee, 'id'>): Employee {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO employees (firstName, lastName, title, country, salary, department, dateHired)
       VALUES (@firstName, @lastName, @title, @country, @salary, @department, @dateHired)`
    )
    .run(data);

  return { id: Number(result.lastInsertRowid), ...data };
}

export function updateEmployee(id: number, data: Partial<Omit<Employee, 'id'>>): Employee | null {
  const employee = getEmployeeById(id);
  if (!employee) return null;
  const updated = { ...employee, ...data };
  const { id: _unused, ...updatedRow } = updated;
  getDb()
    .prepare(
      `UPDATE employees SET firstName = @firstName, lastName = @lastName, title = @title, country = @country,
       salary = @salary, department = @department, dateHired = @dateHired WHERE id = @id`
    )
    .run({ id, ...updatedRow });
  return updated;
}

export function deleteEmployee(id: number): boolean {
  const result = getDb().prepare('DELETE FROM employees WHERE id = ?').run(id);
  return result.changes > 0;
}

export function resetDatabase(): void {
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  cachedDb = null;
  openDatabase();
}
