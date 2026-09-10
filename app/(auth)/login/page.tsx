'use client';

import { useSearchParams } from 'next/navigation';
import { useAuth, getRoleHome } from '../../lib/auth-context';
import { demoUsers } from '../../lib/mock-data';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Zap, Stethoscope } from 'lucide-react';

const roleDest: Record<string, string> = {
  ADMIN: '/clinic/dashboard', RECEPTIONIST: '/clinic/dashboard',
  DENTIST: '/clinic/dashboard', CASHIER: '/clinic/dashboard',
  INVENTORY_MANAGER: '/clinic/dashboard', PATIENT: '/portal/dashboard',
};

const roleStyle: Record<string, string> = {
  ADMIN: 'bg-purple-600 hover:bg-purple-700',
  RECEPTIONIST: 'bg-teal-500 hover:bg-teal-600',
  DENTIST: 'bg-indigo-600 hover:bg-indigo-700',
  CASHIER: 'bg-amber-500 hover:bg-amber-600',
  INVENTORY_MANAGER: 'bg-emerald-600 hover:bg-emerald-700',
  PATIENT: 'bg-rose-500 hover:bg-rose-600',
};

const roleLabel: Record<string, string> = {
  ADMIN: 'Admin', RECEPTIONIST: 'Receptionist', DENTIST: 'Dentist',
  CASHIER: 'Cashier', INVENTORY_MANAGER: 'Inventory', PATIENT: 'Patient',
};

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const go = (userId: string) => {
    const u = demoUsers.find(d => d.id === userId);
    if (!u) return;
    login(userId);
    const returnTo = searchParams.get('returnTo');
    const safeReturnTo = returnTo?.startsWith('/') && !returnTo.startsWith('//') ? returnTo : null;
    router.push(safeReturnTo && u.role === 'PATIENT' ? safeReturnTo : getRoleHome(u.role));
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-teal-100">
        {/* Brand header */}
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 px-8 py-10 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Stethoscope size={30} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">SENAKO</h1>
          <p className="text-teal-100 text-sm mt-1">Dental Clinic Management</p>
        </div>

        <div className="p-7">
          {/* Demo login */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={15} className="text-teal-600" />
              <p className="text-sm font-bold text-gray-800">Quick Demo Login</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map(u => (
                <button key={u.id} onClick={() => go(u.id)}
                  className={`${roleStyle[u.role]} text-white text-xs font-bold py-3 px-3 rounded-xl transition-all hover:shadow-lg text-left`}>
                  <div className="font-bold text-sm">{roleLabel[u.role]}</div>
                  <div className="opacity-75 font-normal truncate mt-0.5 text-xs">{u.name.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            New patient?{' '}
            <Link href="/register" className="text-teal-600 font-semibold hover:underline">
                       Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
