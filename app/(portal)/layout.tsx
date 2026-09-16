'use client';

import { useAuth } from '../lib/auth-context';
import { PortalSidebar } from '../components/layout/portal-sidebar';
import { ThemeToggle } from '../components/theme-toggle';
import { Bell, Stethoscope } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BG = 'var(--bg-page)';
const BORDER = 'var(--border)';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) router.push('/login');
    else if (user?.role !== 'PATIENT') router.replace('/clinic/dashboard');
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

  if (!isAuthenticated || user?.role !== 'PATIENT') return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
      <p className="text-stone-400 text-sm">Redirecting...</p>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: BG }}>
      <PortalSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 flex-shrink-0 shadow-sm" style={{ background: 'var(--navbar)', borderBottom: `1px solid ${BORDER}` }}>
          <p className="text-sm font-bold text-emerald-800 tracking-wide">Patient Portal</p>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="relative p-2 rounded-xl hover:bg-stone-100 transition-colors">
              <Bell size={18} className="text-stone-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-emerald-700 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {user?.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-stone-800">{user?.name}</p>
                <p className="text-xs text-stone-400">Patient</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
