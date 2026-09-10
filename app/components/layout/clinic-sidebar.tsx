'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/lib/utils';
import { useAuth } from '@/app/lib/auth-context';
import {
  LayoutDashboard, Users, Calendar, Clock, FileText, Activity,
  Clipboard, Pill, Receipt, CreditCard, WalletCards, Package, UserCheck,
  BarChart3, Shield, Stethoscope, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import type { Role } from '@/app/lib/mock-data';

const navItems = [
  { href: '/clinic/dashboard',     label: 'Dashboard',      icon: LayoutDashboard, roles: ['ADMIN','RECEPTIONIST','DENTIST','CASHIER','INVENTORY_MANAGER'] as Role[] },
  { href: '/clinic/patients',      label: 'Patients',       icon: Users,           roles: ['ADMIN','RECEPTIONIST','DENTIST'] as Role[] },
  { href: '/clinic/appointments',  label: 'Appointments',   icon: Calendar,        roles: ['ADMIN','RECEPTIONIST','DENTIST'] as Role[] },
  { href: '/clinic/queue',         label: 'Queue',          icon: Clock,           roles: ['ADMIN','RECEPTIONIST','DENTIST'] as Role[], badge: '5' },
  { href: '/clinic/records',       label: 'Records',        icon: FileText,        roles: ['ADMIN','DENTIST'] as Role[] },
  { href: '/clinic/charts',        label: 'Dental Charts',  icon: Activity,        roles: ['ADMIN','DENTIST'] as Role[] },
  { href: '/clinic/treatments',    label: 'Treatments',     icon: Clipboard,       roles: ['ADMIN','DENTIST'] as Role[] },
  { href: '/clinic/prescriptions', label: 'Prescriptions',  icon: Pill,            roles: ['ADMIN','DENTIST'] as Role[] },
  { href: '/clinic/billing',       label: 'Billing',        icon: Receipt,         roles: ['ADMIN','CASHIER','RECEPTIONIST'] as Role[] },
  { href: '/clinic/payroll',       label: 'Payroll',        icon: WalletCards,     roles: ['ADMIN','CASHIER'] as Role[] },
  { href: '/clinic/payments',      label: 'Payments',       icon: CreditCard,      roles: ['ADMIN','CASHIER'] as Role[] },
  { href: '/clinic/inventory',     label: 'Inventory',      icon: Package,         roles: ['ADMIN','INVENTORY_MANAGER'] as Role[], badge: '3' },
  { href: '/clinic/staff',         label: 'Staff',          icon: UserCheck,       roles: ['ADMIN'] as Role[] },
  { href: '/clinic/services',      label: 'Services',       icon: Stethoscope,     roles: ['ADMIN'] as Role[] },
  { href: '/clinic/reports',       label: 'Reports',        icon: BarChart3,       roles: ['ADMIN'] as Role[] },
  { href: '/clinic/audit',         label: 'Audit Logs',     icon: Shield,          roles: ['ADMIN'] as Role[] },
];

export function ClinicSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const role = user?.role as Role | undefined;
  const visible = navItems.filter(i => !role || i.roles.includes(role));

  return (
    <div className={cn('flex flex-col h-full bg-[#111A16] text-white flex-shrink-0 transition-all duration-200', collapsed ? 'w-[68px]' : 'w-60')}>
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Stethoscope size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">SENAKO</p>
              <p className="text-xs text-gray-400">Dental Clinic</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto">
            <Stethoscope size={16} className="text-white" />
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white ml-auto flex-shrink-0">
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {visible.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined}
              className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative',
                isActive ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-400 hover:bg-white/10 hover:text-white')}>
              <item.icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{item.badge}</span>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 p-3">
        {!collapsed && user && (
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              {user.name.split(' ').map(n => n[0]).slice(0,2).join('')}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user.role.toLowerCase().replace(/_/g,' ')}</p>
            </div>
          </div>
        )}
        <button onClick={logout}
          className={cn('flex items-center gap-2 w-full px-3 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl text-sm transition-colors', collapsed && 'justify-center')}
          title={collapsed ? 'Logout' : undefined}>
          <LogOut size={15} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
