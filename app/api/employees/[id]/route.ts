import { NextRequest, NextResponse } from 'next/server';
import { updateEmployeeSchema } from '@/lib/validation';
import { deleteEmployee, getEmployeeById, updateEmployee } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const employee = getEmployeeById(id);
  if (!employee) return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
  return NextResponse.json(employee);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await request.json();
  const updates = updateEmployeeSchema.parse(body);
  const employee = updateEmployee(id, updates);
  if (!employee) return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
  return NextResponse.json(employee);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const deleted = deleteEmployee(id);
  if (!deleted) return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
