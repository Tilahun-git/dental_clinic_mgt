'use client';

import { useAuth } from '../../../lib/auth-context';
import { useEffect, useState } from 'react';
import { useAppointments } from '../../../lib/appointments-store';
import { prescriptions, invoices, patients } from '../../../lib/mock-data';
import { AppointmentBadge } from '../../../components/ui/badge';
import { Calendar, DollarSign, Pill, ChevronRight, Bell } from 'lucide-react';
import Link from 'next/link';

export default function PatientDashboard() {
  const { user } = useAuth();
  const { appointments } = useAppointments(); // ← shared store — reflects receptionist actions
  const [now, setNow] = useState<number | null>(null);
  const patientId = user?.patientId ?? 'p1';
  const patient = patients.find(p => p.id === patientId);

  useEffect(() => {
    const timer = window.setTimeout(() => setNow(Date.now()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const myAppts = appointments.filter(a => a.patientId === patientId);
  const upcoming = myAppts.filter(a => ['CONFIRMED', 'REQUESTED', 'CHECKED_IN'].includes(a.status));
  const nextAppt = upcoming.sort((a, b) => a.date.localeCompare(b.date))[0];

  // Recently confirmed (confirmed in last 24h) — show notification
  const recentlyConfirmed = now === null ? [] : myAppts.filter(a =>
    a.status === 'CONFIRMED' &&
    (a as { confirmedAt?: string }).confirmedAt &&
    now - new Date((a as { confirmedAt?: string }).confirmedAt!).getTime() < 24 * 60 * 60 * 1000
  );

  const myRx = prescriptions.filter(r => r.patientId === patientId);
  const myInvoices = invoices.filter(i => i.patientId === patientId);
  const balance = myInvoices.reduce((s, i) => s + i.balance, 0);

  return (
    <div>
      {/* Confirmation notifications */}
      {recentlyConfirmed.length > 0 && (
        <div className="mb-5 space-y-2">
          {recentlyConfirmed.map(a => (
            <div key={a.id} className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3.5">
              <Bell size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-800 text-sm">Appointment Confirmed! 🎉</p>
                <p className="text-emerald-600 text-xs mt-0.5">
                  Your <strong>{a.serviceName}</strong> appointment with <strong>{a.dentistName}</strong> on <strong>{a.date}</strong> at <strong>{a.time}</strong> has been confirmed by our team.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Welcome banner */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
        <p className="text-orange-100 text-sm">Welcome back 👋</p>
        <h1 className="text-2xl font-black mt-0.5">{patient?.firstName ?? user?.name?.split(' ')[0]}</h1>
        <p className="text-orange-100 text-sm mt-1">Here&apos;s your dental health overview at SENAKO</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Upcoming Appts', value: upcoming.length, icon: Calendar, color: 'bg-orange-50 text-orange-600', href: '/portal/appointments' },
          { label: 'Balance Due', value: `${balance.toLocaleString()} ETB`, icon: DollarSign, color: balance > 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600', href: '/portal/invoices' },
          { label: 'Prescriptions', value: myRx.length, icon: Pill, color: 'bg-indigo-50 text-indigo-600', href: '/portal/prescriptions' },
        ].map(s => (
          <Link key={s.label} href={s.href}
            className={`${s.color} rounded-2xl p-4 flex flex-col gap-1 hover:opacity-90 transition-opacity`}
            style={{ border: '1px solid #E8E0D8' }}>
            <s.icon size={22} className="opacity-70" />
            <p className="text-2xl font-black">{s.value}</p>
            <p className="text-xs opacity-70">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Next appointment */}
        <div className="bg-white rounded-2xl shadow-sm p-5" style={{ border: '1px solid #E8E0D8' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-stone-800">Next Appointment</h2>
            <Link href="/portal/appointments" className="text-orange-500 text-sm font-semibold flex items-center gap-1">
              All <ChevronRight size={14} />
            </Link>
          </div>
          {nextAppt ? (
            <div className="bg-orange-50 rounded-2xl p-4" style={{ border: '1px solid #F5E6D8' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-lg">
                  {new Date(nextAppt.date).getDate()}
                </div>
                <div>
                  <p className="font-bold text-stone-800">{nextAppt.serviceName}</p>
                  <p className="text-sm text-stone-500">{nextAppt.dentistName}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-stone-500">{nextAppt.date} at {nextAppt.time}</p>
                <AppointmentBadge status={nextAppt.status} />
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-stone-400">
              <Calendar size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No upcoming appointments</p>
              <Link href="/booking" className="text-orange-500 text-sm font-semibold mt-1 inline-block hover:underline">
                Book one now →
              </Link>
            </div>
          )}
        </div>

        {/* All upcoming appointments */}
        <div className="bg-white rounded-2xl shadow-sm" style={{ border: '1px solid #E8E0D8' }}>
          <div className="p-4 flex justify-between items-center" style={{ borderBottom: '1px solid #E8E0D8' }}>
            <h2 className="font-bold text-stone-800">My Appointments</h2>
            <Link href="/portal/appointments" className="text-orange-500 text-sm font-semibold">View All</Link>
          </div>
          <div>
            {myAppts.slice(0, 4).map(a => (
              <div key={a.id} className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors" style={{ borderBottom: '1px solid #F5F0EB' }}>
                <div className="text-center w-10 shrink-0">
                  <p className="text-xs font-bold text-stone-600">{a.date.split('-')[2]}</p>
                  <p className="text-xs text-stone-400">{new Date(a.date).toLocaleString('en', { month: 'short' })}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-800 truncate">{a.serviceName}</p>
                  <p className="text-xs text-stone-400">{a.time} · {a.dentistName}</p>
                </div>
                <AppointmentBadge status={a.status} />
              </div>
            ))}
            {myAppts.length === 0 && (
              <p className="text-center py-6 text-stone-400 text-sm">No appointments yet</p>
            )}
          </div>
        </div>

        {/* Latest prescription */}
        {myRx.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-5" style={{ border: '1px solid #E8E0D8' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-stone-800">Latest Prescription</h2>
              <Link href="/portal/prescriptions" className="text-orange-500 text-sm font-semibold flex items-center gap-1">
                All <ChevronRight size={14} />
              </Link>
            </div>
            <p className="text-xs text-stone-400 mb-3">{myRx[0].dentistName} · {myRx[0].date}</p>
            <div className="space-y-2">
              {myRx[0].medications.slice(0, 3).map((med, i) => (
                <div key={i} className="bg-indigo-50 rounded-xl px-3 py-2.5" style={{ border: '1px solid #E0E7FF' }}>
                  <p className="font-bold text-indigo-800 text-sm">{med.name}</p>
                  <p className="text-indigo-500 text-xs">{med.frequency} · {med.duration}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Balance */}
        <div className={`rounded-2xl p-5 ${balance > 0 ? 'bg-red-50' : 'bg-emerald-50'}`}
          style={{ border: `1px solid ${balance > 0 ? '#FECACA' : '#A7F3D0'}` }}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-stone-600">Outstanding Balance</p>
              <p className={`text-3xl font-black mt-1 ${balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                {balance.toLocaleString()} ETB
              </p>
              <p className={`text-xs mt-1 ${balance > 0 ? 'text-red-400' : 'text-emerald-500 font-semibold'}`}>
                {balance > 0 ? 'Payment required' : 'All invoices paid ✓'}
              </p>
            </div>
            <Link href="/portal/invoices"
              className={`text-sm font-bold px-4 py-2 rounded-xl transition-colors ${
                balance > 0 ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}>
              {balance > 0 ? 'View Invoices' : 'History'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
