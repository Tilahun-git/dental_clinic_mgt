'use client';

import { clinicRoles, useAuth } from '../lib/auth-context';
import { ClinicSidebar } from '../components/layout/clinic-sidebar';
import { ThemeToggle } from '../components/theme-toggle';
import { Bell, Search, Stethoscope } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BG = 'var(--bg-page)';
const BORDER = 'var(--border)';

export default function ClinicLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) router.push('/login');
    else if (!user || !clinicRoles.includes(user.role)) router.replace('/portal/dashboard');
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center animate-pulse">
          <Stethoscope size={26} className="text-white" />
        </div>
        <p className="text-orange-700 font-semibold text-sm">Loading SENAKO...</p>
      </div>
    </div>
  );

  if (!isAuthenticated || !user || !clinicRoles.includes(user.role)) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
      <p className="text-stone-400 text-sm">Redirecting...</p>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: BG }}>
      <ClinicSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="h-16 flex items-center justify-between px-6 flex-shrink-0 shadow-sm" style={{ background: 'var(--navbar)', borderBottom: `1px solid ${BORDER}` }}>
          <div className="relative hidden md:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-9 pr-4 py-2 text-sm rounded-xl w-56 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              style={{ border: `1.5px solid ${BORDER}`, background: 'var(--bg-card)', color: 'var(--text-base)' }}
            />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <ThemeToggle />
            <button className="relative p-2 rounded-xl transition-colors hover:bg-stone-100">
              <Bell size={18} className="text-stone-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-emerald-700 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {user?.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-stone-800 leading-tight">{user?.name}</p>
                <p className="text-xs text-stone-400 capitalize">{user?.role.toLowerCase().replace(/_/g, ' ')}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
