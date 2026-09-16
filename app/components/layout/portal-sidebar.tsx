'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/lib/utils';
import { useAuth } from '@/app/lib/auth-context';
import { LayoutDashboard, Calendar, FileText, Activity, Clipboard, Pill, Receipt, Stethoscope, LogOut } from 'lucide-react';

const navItems = [
  { href: '/portal/dashboard',     label: 'Dashboard',       icon: LayoutDashboard },
  { href: '/portal/appointments',  label: 'My Appointments', icon: Calendar },
  { href: '/portal/records',       label: 'My Records',      icon: FileText },
  { href: '/portal/chart',         label: 'Dental Chart',    icon: Activity },
  { href: '/portal/treatments',    label: 'Treatments',      icon: Clipboard },
  { href: '/portal/prescriptions', label: 'Prescriptions',   icon: Pill },
  { href: '/portal/invoices',      label: 'My Invoices',     icon: Receipt },
];

export function PortalSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col h-full bg-slate-700 text-white w-60 shrink-0">
      <div className="flex items-center gap-2.5 h-16 px-4 border-b border-white/10">
        <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0">
          <Stethoscope size={16} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-sm text-white">SENAKO</p>
          <p className="text-xs text-gray-400">Patient Portal</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 mt-1">
        {navItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href}
              className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                isActive ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-400 hover:bg-white/10 hover:text-white')}>
              <item.icon size={17} className="shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        {user && (
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
              {user.name.split(' ').map(n => n[0]).slice(0,2).join('')}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-400">Patient</p>
            </div>
          </div>
        )}
        <button onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl text-sm transition-colors">
          <LogOut size={15} /><span>Logout</span>
        </button>
      </div>
    </div>
  );
}
