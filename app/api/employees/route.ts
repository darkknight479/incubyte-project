import { NextRequest, NextResponse } from 'next/server';
import { createEmployeeSchema, employeesQuerySchema } from '@/lib/validation';
import { createEmployee, getEmployeesPage } from '@/lib/db';

export async function GET(request: NextRequest) {
  const query = Object.fromEntries(request.nextUrl.searchParams.entries());
  const { page, pageSize } = employeesQuerySchema.parse(query);
  const { employees, total } = getEmployeesPage(page, pageSize);
  return NextResponse.json({ employees, total, page, pageSize });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const employeeData = createEmployeeSchema.parse(body);
  const employee = createEmployee(employeeData);
  return NextResponse.json(employee, { status: 201 });
}
