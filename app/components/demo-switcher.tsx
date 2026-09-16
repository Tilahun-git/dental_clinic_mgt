'use client';

import { useState } from 'react';
import { useAuth } from '@/app/lib/auth-context';
import { demoUsers } from '@/app/lib/mock-data';
import { Zap, X, ChevronUp, CheckCircle } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { useRouter } from 'next/navigation';

const roleColors: Record<string, string> = {
  ADMIN:             'bg-purple-600',
  RECEPTIONIST:      'bg-teal-600',
  DENTIST:           'bg-indigo-600',
  CASHIER:           'bg-amber-600',
  INVENTORY_MANAGER: 'bg-orange-600',
  PATIENT:           'bg-violet-600',
};

const roleBg: Record<string, string> = {
  ADMIN:             'bg-purple-50 border-purple-200',
  RECEPTIONIST:      'bg-teal-50 border-teal-200',
  DENTIST:           'bg-indigo-50 border-indigo-200',
  CASHIER:           'bg-amber-50 border-amber-200',
  INVENTORY_MANAGER: 'bg-orange-50 border-orange-200',
  PATIENT:           'bg-violet-50 border-violet-200',
};

const roleLabels: Record<string, string> = {
  ADMIN:             'Admin',
  RECEPTIONIST:      'Receptionist',
  DENTIST:           'Dentist',
  CASHIER:           'Cashier',
  INVENTORY_MANAGER: 'Inventory Mgr',
  PATIENT:           'Patient',
};

// Correct destinations — MUST match actual Next.js routes
const roleDestinations: Record<string, string> = {
  ADMIN:             '/clinic/dashboard',
  RECEPTIONIST:      '/clinic/dashboard',
  DENTIST:           '/clinic/dashboard',
  CASHIER:           '/clinic/dashboard',
  INVENTORY_MANAGER: '/clinic/dashboard',
  PATIENT:           '/portal/dashboard',
};

export function DemoSwitcher() {
  const [open, setOpen] = useState(false);
  const { user, login } = useAuth();
  const router = useRouter();

  const handleSwitch = (userId: string) => {
    const u = demoUsers.find(d => d.id === userId);
    if (!u) return;
    login(userId);
    setOpen(false);
    router.push(roleDestinations[u.role] ?? '/clinic/dashboard');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 bg-white rounded-2xl shadow-2xl border border-gray-200 w-76 overflow-hidden"
          style={{ width: '300px' }}>
          {/* Header */}
          <div className="bg-slate-700 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-white text-sm font-bold">Demo Role Switcher</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Current user banner */}
          {user && (
            <div className={cn('px-4 py-2.5 border-b border-gray-100 flex items-center gap-3', roleBg[user.role])}>
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0', roleColors[user.role])}>
                {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-700 truncate">{user.name}</p>
                <p className="text-xs text-gray-500">{roleLabels[user.role]} — currently active</p>
              </div>
              <CheckCircle size={14} className="text-teal-500 flex-shrink-0" />
            </div>
          )}

          {/* Role list */}
          <div className="p-2 max-h-80 overflow-y-auto">
            {demoUsers.map(u => {
              const isActive = user?.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => handleSwitch(u.id)}
                  disabled={isActive}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all mb-1',
                    isActive
                      ? 'opacity-60 cursor-default bg-gray-50'
                      : 'hover:bg-gray-50 hover:scale-[1.01] active:scale-[0.99]'
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm',
                    roleColors[u.role]
                  )}>
                    {u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{u.name}</p>
                    <p className="text-xs text-gray-400">{roleLabels[u.role]}</p>
                  </div>
                  {isActive
                    ? <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-semibold">Active</span>
                    : <span className="text-xs text-gray-400">Switch →</span>
                  }
                </button>
              );
            })}
          </div>

          <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              Each role shows a different dashboard view
            </p>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl text-white font-semibold text-sm transition-all hover:opacity-90 hover:shadow-2xl active:scale-95',
          user ? (roleColors[user.role] ?? 'bg-gray-700') : 'bg-gray-800'
        )}
      >
        <Zap size={16} className="text-yellow-300" />
        <span>{user ? roleLabels[user.role] : 'Demo Login'}</span>
        <ChevronUp size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
    </div>
  );
}
