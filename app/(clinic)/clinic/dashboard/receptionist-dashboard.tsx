'use client';

import { useAuth } from '../../../lib/auth-context';
import { useState } from 'react';
import { useAppointments } from '../../../lib/appointments-store';
import { waitingQueue } from '../../../lib/mock-data';
import { AppointmentBadge } from '../../../components/ui/badge';
import { Calendar, Clock, AlertCircle, DollarSign, CheckCircle, X, Users } from 'lucide-react';
import Link from 'next/link';
import { StatusDonut } from '../../../components/dashboard-charts';

export default function ReceptionistDashboard() {
  const { user } = useAuth();
  const { appointments, confirmAppt, cancelAppt } = useAppointments();
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'danger' } | null>(null);

  const todayAppts = appointments
    .filter(a => ['REQUESTED', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS'].includes(a.status))
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const pending = appointments.filter(a => a.status === 'REQUESTED');
  const waiting = waitingQueue.filter(q => q.status !== 'IN_PROGRESS');
  const unpaid = 3;
  const appointmentStatusValues = ['REQUESTED', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS'].map(status =>
    appointments.filter(a => a.status === status).length
  );

  const handleConfirm = (id: string, name: string) => {
    confirmAppt(id);
    setToast({ msg: `✓ Appointment confirmed for ${name}`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCancel = (id: string, name: string) => {
    cancelAppt(id);
    setToast({ msg: `✗ Appointment cancelled for ${name}`, type: 'danger' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="relative">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-semibold transition-all ${
          toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-black text-stone-900">Front Desk</h1>
        <p className="text-stone-400 text-sm mt-0.5">Welcome, {user?.name.split(' ')[0]} — Monday, July 14, 2025</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Today's Appts", value: todayAppts.length, icon: Calendar, color: 'from-orange-500 to-orange-600' },
          { label: 'Waiting Now', value: waiting.length, icon: Clock, color: 'from-amber-500 to-amber-600' },
          { label: 'Pending Confirm', value: pending.length, icon: AlertCircle, color: 'from-violet-500 to-violet-600' },
          { label: 'Unpaid Invoices', value: unpaid, icon: DollarSign, color: 'from-red-500 to-red-600' },
        ].map(s => (
          <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white shadow-md`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/75 text-xs font-medium">{s.label}</p>
                <p className="text-3xl font-black mt-1">{s.value}</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <s.icon size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {[
          { label: '+ New Appointment', href: '/clinic/appointments', style: 'bg-orange-500 hover:bg-orange-600 text-white' },
          { label: '+ Register Patient', href: '/clinic/patients', style: 'bg-indigo-500 hover:bg-indigo-600 text-white' },
          { label: 'View Queue', href: '/clinic/queue', style: 'bg-amber-500 hover:bg-amber-600 text-white' },
          { label: 'Create Invoice', href: '/clinic/billing', style: 'border-2 border-orange-300 text-orange-600 hover:bg-orange-50' },
        ].map(a => (
          <Link key={a.href} href={a.href}
            className={`${a.style} text-sm font-bold px-5 py-2.5 rounded-2xl transition-colors shadow-sm`}>
            {a.label}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 mb-5" style={{ border: '1px solid #DCE8E0' }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="font-bold text-stone-800">Appointment Pipeline</h2>
            <p className="text-xs text-stone-400 mt-1">Requests and visits currently in the shared store</p>
          </div>
          <Calendar size={18} className="text-emerald-600" />
        </div>
        <StatusDonut labels={['Requested', 'Confirmed', 'Checked in', 'In progress']} values={appointmentStatusValues} colors={['#8B5CF6', '#18794E', '#0EA5A4', '#F59E0B']} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Today's schedule */}
        <div className="bg-white rounded-2xl shadow-sm" style={{ border: '1px solid #E8E0D8' }}>
          <div className="p-4 flex justify-between items-center" style={{ borderBottom: '1px solid #E8E0D8' }}>
            <h2 className="font-bold text-stone-800">Today&apos;s Schedule</h2>
            <Link href="/clinic/appointments" className="text-orange-500 text-sm font-semibold">View All</Link>
          </div>
          <div className="divide-y" style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}>
            {todayAppts.slice(0, 6).map(a => (
              <div key={a.id} className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors">
                <span className="font-mono font-bold text-sm text-stone-700 w-12 flex-shrink-0">{a.time}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-800 truncate">{a.patientName}</p>
                  <p className="text-xs text-stone-400 truncate">{a.dentistName}</p>
                </div>
                <AppointmentBadge status={a.status} />
              </div>
            ))}
            {todayAppts.length === 0 && (
              <p className="text-center py-6 text-stone-400 text-sm">No appointments today</p>
            )}
          </div>
        </div>

        {/* Waiting queue */}
        <div className="bg-white rounded-2xl shadow-sm" style={{ border: '1px solid #E8E0D8' }}>
          <div className="p-4 flex justify-between items-center" style={{ borderBottom: '1px solid #E8E0D8' }}>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-stone-800">Waiting Queue</h2>
              {waiting.length > 0 && (
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">{waiting.length}</span>
              )}
            </div>
            <Link href="/clinic/queue" className="text-orange-500 text-sm font-semibold">Manage</Link>
          </div>
          <div>
            {waitingQueue.slice(0, 5).map((q, i) => (
              <div key={q.id} className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors" style={{ borderBottom: '1px solid #F5F0EB' }}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                  q.status === 'IN_PROGRESS' ? 'bg-orange-500' : 'bg-stone-300'}`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-800">{q.patientName}</p>
                  <p className="text-xs text-stone-400">{q.service}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                  q.status === 'IN_PROGRESS' ? 'bg-orange-100 text-orange-700' :
                  q.status === 'JUST_ARRIVED' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-stone-100 text-stone-600'}`}>
                  {q.waitMinutes > 0 ? `${q.waitMinutes}m` : 'Just arrived'}
                </span>
              </div>
            ))}
            {waitingQueue.length === 0 && <p className="text-center py-6 text-stone-400 text-sm">Queue is empty</p>}
          </div>
        </div>
      </div>

      {/* Pending requests — shared store, patient sees changes immediately */}
      <div className="bg-white rounded-2xl shadow-sm" style={{ border: '1px solid #E8E0D8' }}>
        <div className="p-4 flex items-center gap-2" style={{ borderBottom: '1px solid #E8E0D8' }}>
          <AlertCircle size={16} className="text-violet-500" />
          <h2 className="font-bold text-stone-800">Pending Confirmations</h2>
          {pending.length > 0 && (
            <span className="bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded-full">{pending.length}</span>
          )}
          <span className="text-xs text-stone-400 ml-1">
            — when you confirm, the patient&apos;s portal updates immediately
          </span>
        </div>

        {pending.length > 0 ? (
          <div>
            {pending.map(a => (
              <div key={a.id} className="flex items-center gap-4 px-4 py-3.5 hover:bg-stone-50 transition-colors" style={{ borderBottom: '1px solid #F5F0EB' }}>
                <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users size={15} className="text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-800 text-sm">{a.patientName}</p>
                  <p className="text-xs text-stone-400 truncate">
                    {a.serviceName} · {a.dentistName} · {a.date} at {a.time}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleConfirm(a.id, a.patientName)}
                    className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
                  >
                    <CheckCircle size={13} /> Confirm
                  </button>
                  <button
                    onClick={() => handleCancel(a.id, a.patientName)}
                    className="flex items-center gap-1.5 bg-red-100 hover:bg-red-200 active:scale-95 text-red-700 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                  >
                    <X size={13} /> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle size={28} className="text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-emerald-700 text-sm">All requests actioned</p>
            <p className="text-stone-400 text-xs mt-0.5">No pending confirmations</p>
          </div>
        )}
      </div>
    </div>
  );
}
