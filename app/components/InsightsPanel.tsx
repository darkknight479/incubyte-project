'use client';

import { Box, Badge, Group, Stack, Text, Title } from '@mantine/core';
import type { CountryMetrics, TitleAverage } from '@/lib/employee';

type Props = {
  countryMetrics: CountryMetrics | null;
  titleMetrics: TitleAverage | null;
};

export function InsightsPanel({ countryMetrics, titleMetrics }: Props) {
  return (
    <Stack>
      <Group justify="space-between" align="flex-start">
        <Box>
          <Title order={4}>Country metrics</Title>
          {countryMetrics ? (
            <Stack gap="xs" mt="sm">
              <Text>Country: <strong>{countryMetrics.country}</strong></Text>
              <Text>Employee count: <strong>{countryMetrics.count}</strong></Text>
              <Text>Minimum salary: <strong>${countryMetrics.minSalary.toLocaleString()}</strong></Text>
              <Text>Maximum salary: <strong>${countryMetrics.maxSalary.toLocaleString()}</strong></Text>
              <Text>Average salary: <strong>${countryMetrics.avgSalary.toLocaleString()}</strong></Text>
            </Stack>
          ) : (
            <Text c="dimmed" mt="sm">
              No salary data found for this country.
            </Text>
          )}
        </Box>

        <Box>
          <Title order={4}>Role metrics</Title>
          {titleMetrics ? (
            <Stack gap="xs" mt="sm">
              <Text>Title: <strong>{titleMetrics.title}</strong></Text>
              <Text>Country: <strong>{titleMetrics.country}</strong></Text>
              <Text>Employee count: <strong>{titleMetrics.count}</strong></Text>
              <Text>Average salary: <strong>${titleMetrics.averageSalary.toLocaleString()}</strong></Text>
            </Stack>
          ) : (
            <Text c="dimmed" mt="sm">
              No role data found for the selected title in this country.
            </Text>
          )}
        </Box>
      </Group>
      <Group gap="xs">
        <Badge color="blue">Salary by country</Badge>
        <Badge color="green">Job title average</Badge>
      </Group>
    </Stack>
  );
}
