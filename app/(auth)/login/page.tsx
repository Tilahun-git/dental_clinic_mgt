'use client';

import { useSearchParams } from 'next/navigation';
import { useAuth, getRoleHome } from '../../lib/auth-context';
import { demoUsers } from '../../lib/mock-data';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { Suspense, useState } from 'react';

const roleLabel: Record<string, string> = {
  ADMIN: 'Admin', RECEPTIONIST: 'Receptionist', DENTIST: 'Dentist',
  CASHIER: 'Cashier', INVENTORY_MANAGER: 'Inventory', PATIENT: 'Patient',
};

function LoginPageContent() {
  const { login, loginWithCredentials } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const go = (userId: string) => {
    const u = demoUsers.find(d => d.id === userId);
    if (!u) return;
    login(userId);
    const returnTo = searchParams.get('returnTo');
    const safeReturnTo = returnTo?.startsWith('/') && !returnTo.startsWith('//') ? returnTo : null;
    router.push(safeReturnTo && u.role === 'PATIENT' ? safeReturnTo : getRoleHome(u.role));
  };

  const submitCredentials = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = loginWithCredentials(email, password);
    if (result === 'invalid-credentials') {
      setError('Email or password is incorrect.');
      return;
    }
    const account = demoUsers.find(user => user.email.toLowerCase() === email.trim().toLowerCase());
    if (account) {
      const returnTo = searchParams.get('returnTo');
      const safeReturnTo = returnTo?.startsWith('/') && !returnTo.startsWith('//') ? returnTo : null;
      router.push(safeReturnTo && account.role === 'PATIENT' ? safeReturnTo : getRoleHome(account.role));
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-[#fbfcfa] rounded-3xl shadow-xl overflow-hidden border border-[#d8e4dc]">
        {/* Brand header */}
        <div className="bg-[#17231d] px-8 py-10 text-center">
          <div className="w-16 h-16 bg-[#d7b36a] rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Stethoscope size={30} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">SENAKO</h1>
          <p className="text-[#b9cfc0] text-sm mt-1">Dental Clinic Management</p>
        </div>

        <div className="p-7">
          <form onSubmit={submitCredentials} className="mb-6 space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#64736a] uppercase tracking-wide mb-1">Email</label>
              <input type="email" required value={email} onChange={event => { setEmail(event.target.value); setError(''); }} placeholder="you@smilecare.et"
                className="w-full border border-[#d8e4dc] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#176b49]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#64736a] uppercase tracking-wide mb-1">Password</label>
              <input type="password" required value={password} onChange={event => { setPassword(event.target.value); setError(''); }} placeholder="Enter your password"
                className="w-full border border-[#d8e4dc] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#176b49]" />
            </div>
            {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
            <button type="submit" className="w-full bg-[#176b49] hover:bg-[#12583c] text-white font-bold py-2.5 rounded-xl transition-colors">Sign in</button>
          </form>

          {/* Demo login */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-4 border-t border-[#d8e4dc] pt-5">
              <p className="text-sm font-bold text-[#17231d]">Demo accounts</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map(u => (
                <button key={u.id} onClick={() => go(u.id)}
                  className="bg-[#eef3ef] hover:bg-[#dce9df] text-[#176b49] border border-[#c9dbcf] text-xs font-bold py-3 px-3 rounded-xl transition-all text-left">
                  <div className="font-bold text-sm">{roleLabel[u.role]}</div>
                  <div className="text-[#64736a] font-normal truncate mt-0.5 text-xs">{u.name}</div>
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-sm text-gray-500">Loading login...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
