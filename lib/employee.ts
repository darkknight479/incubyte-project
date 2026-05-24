export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  country: string;
  salary: number;
  department: string;
  dateHired: string;
};

export type CountryMetrics = {
  country: string;
  count: number;
  minSalary: number;
  maxSalary: number;
  avgSalary: number;
};

export type TitleAverage = {
  title: string;
  country: string;
  averageSalary: number;
  count: number;
};

export function formatName(employee: Employee): string {
  return `${employee.firstName} ${employee.lastName}`;
}

export function calculateCountryMetrics(
  employees: Employee[],
  country: string
): CountryMetrics | null {
  const slice = employees.filter((item) => item.country === country);
  if (!slice.length) return null;
  const salaries = slice.map((employee) => employee.salary);
  const count = salaries.length;
  const minSalary = Math.min(...salaries);
  const maxSalary = Math.max(...salaries);
  const avgSalary = Math.round(salaries.reduce((sum, value) => sum + value, 0) / count);

  return { country, count, minSalary, maxSalary, avgSalary };
}

export function calculateJobTitleAverage(
  employees: Employee[],
  country: string,
  title: string
): TitleAverage | null {
  const slice = employees.filter(
    (item) => item.country === country && item.title === title
  );
  if (!slice.length) return null;
  const count = slice.length;
  const averageSalary = Math.round(
    slice.reduce((sum, employee) => sum + employee.salary, 0) / count
  );

  return { country, title, averageSalary, count };
}
