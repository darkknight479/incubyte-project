import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import './globals.css';

export const metadata = {
  title: 'Salary Management Tool',
  description: 'Manage employee salaries and view country-specific insights.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-900">
        <MantineProvider withGlobalClasses withCssVariables>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
