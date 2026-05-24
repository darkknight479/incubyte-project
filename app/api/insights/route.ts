import { NextRequest, NextResponse } from 'next/server';
import { insightsQuerySchema } from '@/lib/validation';
import { getEmployees } from '@/lib/db';
import { calculateCountryMetrics, calculateJobTitleAverage } from '@/lib/employee';

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
  const { country, title } = insightsQuerySchema.parse(searchParams);
  const employees = getEmployees();

  const countryMetrics = calculateCountryMetrics(employees, country);
  const titleAverage = title ? calculateJobTitleAverage(employees, country, title) : null;

  return NextResponse.json({ countryMetrics, titleAverage });
}
