'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  LoadingOverlay,
  Paper,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import type { CountryMetrics, Employee, TitleAverage } from '@/lib/employee';
import { EmployeeForm } from '@/app/components/EmployeeForm';
import { EmployeeTable } from '@/app/components/EmployeeTable';
import { InsightsPanel } from '@/app/components/InsightsPanel';
import { PaginationControls } from '@/app/components/PaginationControls';

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'India', 'Australia', 'Brazil', 'France'];
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

const emptyEmployee: Omit<Employee, 'id'> = {
  firstName: '',
  lastName: '',
  title: '',
  country: '',
  salary: 0,
  department: '',
  dateHired: new Date().toISOString().slice(0, 10),
};

export default function HomePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [insightCountry, setInsightCountry] = useState('United States');
  const [insightTitle, setInsightTitle] = useState('Software Engineer');
  const [loading, setLoading] = useState(false);
  const [insightMetrics, setInsightMetrics] = useState<{ countryMetrics: CountryMetrics | null; titleAverage: TitleAverage | null }>({ countryMetrics: null, titleAverage: null });

  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const pageOptions = useMemo(
    () => [10, 20, 50].map((value) => ({ value: String(value), label: `${value} rows` })),
    []
  );

  const reloadEmployees = async (nextPage = page, nextPageSize = pageSize) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/employees?page=${nextPage}&pageSize=${nextPageSize}`);
      const data = await response.json();
      setEmployees(data.employees);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  const reloadInsights = async (country: string, title: string) => {
    try {
      const params = new URLSearchParams({ country });
      if (title) params.set('title', title);
      const response = await fetch(`/api/insights?${params.toString()}`);
      const data = await response.json();
      setInsightMetrics({ countryMetrics: data.countryMetrics, titleAverage: data.titleAverage });
    } catch {
      setInsightMetrics({ countryMetrics: null, titleAverage: null });
    }
  };

  useEffect(() => {
    reloadEmployees(page, pageSize);
  }, [page, pageSize]);

  useEffect(() => {
    reloadInsights(insightCountry, insightTitle);
  }, [insightCountry, insightTitle]);

  useEffect(() => {
    if (page > 1 && page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const handleSave = async (employeeData: Omit<Employee, 'id'>) => {
    setLoading(true);
    try {
      const url = selectedEmployee ? `/api/employees/${selectedEmployee.id}` : '/api/employees';
      const method = selectedEmployee ? 'PATCH' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });
      setSelectedEmployee(null);
      await reloadEmployees(page, pageSize);
      await reloadInsights(insightCountry, insightTitle);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await fetch(`/api/employees/${id}`, { method: 'DELETE' });
      await reloadEmployees(page, pageSize);
      await reloadInsights(insightCountry, insightTitle);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <LoadingOverlay visible={loading} />
      <Container size="xl" className="rounded-[2rem] bg-white/90 p-8 shadow-2xl ring-1 ring-slate-200 backdrop-blur-xl">
        <Stack gap="xl">
          <div className="space-y-3">
            <Title order={1}>Salary Management</Title>
            <Text c="dimmed" className="max-w-2xl">
              Add, update, delete employees and monitor salary insights by country and role with paginated results.
            </Text>
          </div>

          <Grid>
            <Grid.Col span={7}>
              <Paper p="lg" radius="md" shadow="sm" className="border border-slate-200">
                <Group justify="space-between" mb="md">
                  <Title order={3}>Employees</Title>
                  <Button onClick={() => setSelectedEmployee(null)}>Add employee</Button>
                </Group>
                <EmployeeTable employees={employees} onEdit={(employee) => setSelectedEmployee(employee)} onDelete={handleDelete} />
                <div className="mt-6">
                  <PaginationControls page={page} pageSize={pageSize} total={total} onPageChange={setPage} />
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="text-sm text-slate-600">Page size</div>
                  <Select
                    label="Rows per page"
                    data={pageOptions}
                    value={String(pageSize)}
                    onChange={(value) => {
                      if (value) {
                        setPageSize(Number(value));
                        setPage(1);
                      }
                    }}
                  />
                </div>
              </Paper>
            </Grid.Col>
            <Grid.Col span={5}>
              <Paper p="lg" radius="md" shadow="sm" className="border border-slate-200">
                <Title order={3}>{selectedEmployee ? 'Edit employee' : 'New employee'}</Title>
                <EmployeeForm key={selectedEmployee?.id ?? 'new'} initialValue={selectedEmployee ?? emptyEmployee} onSubmit={handleSave} />
              </Paper>
            </Grid.Col>
          </Grid>

          <Paper p="lg" radius="md" shadow="sm" className="border border-slate-200">
            <Stack gap="lg">
              <Group justify="space-between" align="flex-end">
                <div>
                  <Title order={3}>Salary insights</Title>
                  <Text c="dimmed">Compare salary distributions by country and job title across the entire organization.</Text>
                </div>
                <Group>
                  <Select
                    label="Country"
                    placeholder="Select country"
                    data={countries.map((country) => ({ value: country, label: country }))}
                    value={insightCountry}
                    onChange={(value) => value && setInsightCountry(value)}
                  />
                  <Select
                    label="Job title"
                    placeholder="Select title"
                    data={[{ value: '', label: 'All titles' }, ...titles.map((title) => ({ value: title, label: title }))]}
                    value={insightTitle}
                    onChange={(value) => value !== null && setInsightTitle(value)}
                  />
                </Group>
              </Group>
              <InsightsPanel countryMetrics={insightMetrics.countryMetrics} titleMetrics={insightMetrics.titleAverage} />
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </div>
  );
}
