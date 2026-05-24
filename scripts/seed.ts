import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.join(process.cwd(), 'data', 'employees.sqlite');
const namesDir = path.join(process.cwd(), 'data');

function readLines(filename: string): string[] {
  return fs.readFileSync(path.join(namesDir, filename), 'utf-8')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomSalary(): number {
  return Math.round((Math.random() * 140000 + 45000) / 100) * 100;
}

function randomDate(): string {
  const start = new Date(2015, 0, 1).getTime();
  const end = Date.now();
  const ts = Math.floor(Math.random() * (end - start)) + start;
  return new Date(ts).toISOString().slice(0, 10);
}

const titles = [
  'Software Engineer',
  'Product Manager',
  'HR Business Partner',
  'Finance Analyst',
  'Design Lead',
  'Data Scientist',
  'Customer Success',
  'Operations Manager',
  'Talent Acquisition',
  'Marketing Lead'
];

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'India', 'Australia', 'Brazil', 'France'];
const departments = ['Engineering', 'Product', 'HR', 'Finance', 'Design', 'Data', 'Operations', 'Marketing'];

function createSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      title TEXT NOT NULL,
      country TEXT NOT NULL,
      salary INTEGER NOT NULL,
      department TEXT NOT NULL,
      dateHired TEXT NOT NULL
    );
  `);
}

function main() {
  const firstNames = readLines('first_names.txt');
  const lastNames = readLines('last_names.txt');

  if (!firstNames.length || !lastNames.length) {
    throw new Error('Name lists are required for seeding.');
  }

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  createSchema(db);

  const insert = db.prepare(`
    INSERT INTO employees (firstName, lastName, title, country, salary, department, dateHired)
    VALUES (@firstName, @lastName, @title, @country, @salary, @department, @dateHired)
  `);

  const transaction = db.transaction((rows: Array<Record<string, unknown>>) => {
    for (const row of rows) insert.run(row);
  });

  const BATCH_SIZE = 1000;
  const total = 10000;
  for (let start = 0; start < total; start += BATCH_SIZE) {
    const batch = Array.from({ length: Math.min(BATCH_SIZE, total - start) }, () => ({
      firstName: randomItem(firstNames),
      lastName: randomItem(lastNames),
      title: randomItem(titles),
      country: randomItem(countries),
      salary: randomSalary(),
      department: randomItem(departments),
      dateHired: randomDate(),
    }));
    transaction(batch);
    console.log(`Inserted ${Math.min(start + BATCH_SIZE, total)} / ${total}`);
  }

  db.close();
  console.log(`Seed complete: ${dbPath}`);
}

main();
