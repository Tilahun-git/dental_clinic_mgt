import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from './lib/auth-context';
import { ThemeProvider } from './lib/theme-context';
import { AppointmentsProvider } from './lib/appointments-store';
import { TreatmentsProvider } from './lib/treatments-store';
import { DemoSwitcher } from './components/demo-switcher';
import { PrimeReactProvider } from '@primereact/core';

export const metadata: Metadata = {
  title: 'SENAKO Dental Clinic',
  description: 'SENAKO Dental Clinic Management System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <PrimeReactProvider ripple>
          <ThemeProvider>
            <AuthProvider>
              <AppointmentsProvider>
                <TreatmentsProvider>
                  {children}
                  <DemoSwitcher />
                </TreatmentsProvider>
              </AppointmentsProvider>
            </AuthProvider>
          </ThemeProvider>
        </PrimeReactProvider> 
      </body>
    </html>
  );
}
