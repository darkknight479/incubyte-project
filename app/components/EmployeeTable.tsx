'use client';

import { ActionIcon, Table, Text, Tooltip } from '@mantine/core';
import { Pencil, Trash } from 'tabler-icons-react';
import type { Employee } from '@/lib/employee';

type Props = {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
};

export function EmployeeTable({ employees, onEdit, onDelete }: Props) {
  return (
    <Table highlightOnHover verticalSpacing="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Country</th>
          <th>Salary</th>
          <th>Department</th>
          <th>Date hired</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{`${employee.firstName} ${employee.lastName}`}</td>
            <td>{employee.title}</td>
            <td>{employee.country}</td>
            <td>${employee.salary.toLocaleString()}</td>
            <td>{employee.department}</td>
            <td>{employee.dateHired}</td>
            <td>
              <Tooltip label="Edit employee">
                <ActionIcon onClick={() => onEdit(employee)}>
                  <Pencil size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete employee">
                <ActionIcon color="red" onClick={() => onDelete(employee.id)}>
                  <Trash size={16} />
                </ActionIcon>
              </Tooltip>
            </td>
          </tr>
        ))}
        {employees.length === 0 && (
          <tr>
            <td colSpan={7}>
              <Text style={{ textAlign: 'center' }} color="dimmed">
                No employees found.
              </Text>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
