import { describe, expect, it } from 'vitest';
import { calculateCountryMetrics, calculateJobTitleAverage, Employee } from '@/lib/employee';

const sampleEmployees: Employee[] = [
  { id: 1, firstName: 'Alice', lastName: 'Stone', title: 'Software Engineer', country: 'United States', salary: 120000, department: 'Engineering', dateHired: '2022-02-01' },
  { id: 2, firstName: 'Bob', lastName: 'Patel', title: 'Product Manager', country: 'United States', salary: 115000, department: 'Product', dateHired: '2021-05-18' },
  { id: 3, firstName: 'Clara', lastName: 'Kim', title: 'Software Engineer', country: 'United States', salary: 130000, department: 'Engineering', dateHired: '2020-07-10' },
  { id: 4, firstName: 'Diego', lastName: 'Martinez', title: 'Software Engineer', country: 'Canada', salary: 95000, department: 'Engineering', dateHired: '2023-01-04' },
];

describe('Salary insight helpers', () => {
  it('calculates country metrics correctly', () => {
    const metrics = calculateCountryMetrics(sampleEmployees, 'United States');
    expect(metrics).toEqual({
      country: 'United States',
      count: 3,
      minSalary: 115000,
      maxSalary: 130000,
      avgSalary: 121667,
    });
  });

  it('returns null when a country has no employees', () => {
    const metrics = calculateCountryMetrics(sampleEmployees, 'France');
    expect(metrics).toBeNull();
  });

  it('calculates title average by country', () => {
    const average = calculateJobTitleAverage(sampleEmployees, 'United States', 'Software Engineer');
    expect(average).toEqual({
      country: 'United States',
      title: 'Software Engineer',
      averageSalary: 125000,
      count: 2,
    });
  });

  it('returns null when a title-country combination is missing', () => {
    const average = calculateJobTitleAverage(sampleEmployees, 'Germany', 'Software Engineer');
    expect(average).toBeNull();
  });
});
