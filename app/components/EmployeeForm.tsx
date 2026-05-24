'use client';

import { useState } from 'react';
import { Button, Group, NumberInput, Select, Stack, TextInput } from '@mantine/core';
import type { Employee } from '@/lib/employee';

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
  'Marketing Lead',
];

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'India', 'Australia', 'Brazil', 'France'];

const departments = ['Engineering', 'Product', 'HR', 'Finance', 'Design', 'Data', 'Operations', 'Marketing'];

type Props = {
  initialValue: Omit<Employee, 'id'>;
  onSubmit: (employee: Omit<Employee, 'id'>) => void;
};

export function EmployeeForm({ initialValue, onSubmit }: Props) {
  const [form, setForm] = useState<Omit<Employee, 'id'>>(initialValue);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
      }}
    >
      <Stack>
        <Group grow>
          <TextInput
            label="First name"
            value={form.firstName}
            onChange={(event) => setForm({ ...form, firstName: event.currentTarget.value })}
            required
          />
          <TextInput
            label="Last name"
            value={form.lastName}
            onChange={(event) => setForm({ ...form, lastName: event.currentTarget.value })}
            required
          />
        </Group>

        <Select
          label="Job title"
          data={titles.map((title) => ({ value: title, label: title }))}
          value={form.title}
          onChange={(value) => value && setForm({ ...form, title: value })}
          required
        />
        <Select
          label="Country"
          data={countries.map((country) => ({ value: country, label: country }))}
          value={form.country}
          onChange={(value) => value && setForm({ ...form, country: value })}
          required
        />
        <Select
          label="Department"
          data={departments.map((department) => ({ value: department, label: department }))}
          value={form.department}
          onChange={(value) => value && setForm({ ...form, department: value })}
          required
        />
        <NumberInput
          label="Salary"
          value={form.salary}
          min={0}
          step={1000}
          onChange={(salary) => {
            const value = typeof salary === 'number' ? salary : Number(salary ?? 0);
            setForm({ ...form, salary: Number.isNaN(value) ? 0 : value });
          }}
          required
        />
        <TextInput
          label="Date hired"
          type="date"
          value={form.dateHired}
          onChange={(event) => setForm({ ...form, dateHired: event.currentTarget.value })}
          required
        />
        <Button type="submit">Save employee</Button>
      </Stack>
    </form>
  );
}
