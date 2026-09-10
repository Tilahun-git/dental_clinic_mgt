'use client';

import { useAuth } from '../../../lib/auth-context';
import { useAppointments } from '../../../lib/appointments-store';
import { AppointmentBadge } from '../../../components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';

export default function MyAppointmentsPage() {
  const { user } = useAuth();
  const { appointments } = useAppointments(); // ← shared store
  const patientId = user?.patientId ?? 'p1';

  const myAppts = appointments
    .filter(a => a.patientId === patientId)
    .sort((a, b) => b.date.localeCompare(a.date));

  const upcoming = myAppts.filter(a => ['CONFIRMED', 'REQUESTED', 'CHECKED_IN', 'IN_PROGRESS'].includes(a.status));
  const past = myAppts.filter(a => ['COMPLETED', 'CANCELLED', 'NO_SHOW', 'REJECTED'].includes(a.status));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-stone-900">My Appointments</h1>
          <p className="text-stone-400 text-sm mt-0.5">{myAppts.length} total</p>
        </div>
        <Link href="/booking"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2.5 rounded-2xl transition-colors shadow-sm flex items-center gap-2">
          <Calendar size={15} /> Book New
        </Link>
      </div>

      {upcoming.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-stone-500 uppercase tracking-wide mb-3">Upcoming</h2>
          <div className="space-y-3">
            {upcoming.map(appt => (
              <div key={appt.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-4" style={{ border: '1px solid #E8E0D8' }}>
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 text-orange-600" style={{ border: '1px solid #F5E6D8' }}>
                  <span className="text-lg font-black">{appt.date.split('-')[2]}</span>
                  <span className="text-xs opacity-70">{new Date(appt.date).toLocaleString('en', { month: 'short' })}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-stone-800">{appt.serviceName}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-stone-500">
                        <span className="flex items-center gap-1"><User size={12} /> {appt.dentistName}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {appt.time}</span>
                      </div>
                    </div>
                    <AppointmentBadge status={appt.status} />
                  </div>
                  {appt.status === 'CONFIRMED' && (
                    <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                      ✓ Confirmed by our team
                    </p>
                  )}
                  {appt.status === 'REQUESTED' && (
                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                      ⏳ Waiting for confirmation from our team
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-stone-500 uppercase tracking-wide mb-3">Past</h2>
          <div className="space-y-3">
            {past.map(appt => (
              <div key={appt.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-4 opacity-75" style={{ border: '1px solid #E8E0D8' }}>
                <div className="w-14 h-14 bg-stone-100 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 text-stone-400">
                  <span className="text-lg font-black">{appt.date.split('-')[2]}</span>
                  <span className="text-xs opacity-70">{new Date(appt.date).toLocaleString('en', { month: 'short' })}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-stone-700">{appt.serviceName}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-stone-400">
                        <span className="flex items-center gap-1"><User size={12} /> {appt.dentistName}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {appt.time}</span>
                      </div>
                    </div>
                    <AppointmentBadge status={appt.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {myAppts.length === 0 && (
        <div className="text-center py-16 text-stone-400">
          <Calendar size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No appointments yet</p>
          <Link href="/booking" className="text-orange-500 font-bold mt-2 inline-block hover:underline">Book your first appointment →</Link>
        </div>
      )}
    </div>
  );
}
