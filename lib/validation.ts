import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  title: z.string().min(1),
  country: z.string().min(1),
  salary: z.number().int().min(0),
  department: z.string().min(1),
  dateHired: z.string().min(1),
});

export const createEmployeeSchema = employeeSchema;

export const updateEmployeeSchema = employeeSchema.partial();

export const employeesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export const insightsQuerySchema = z.object({
  country: z.string().min(1),
  title: z.string().optional(),
});
