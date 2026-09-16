'use client';

import { useAuth } from '../../../lib/auth-context';
import { useAppointments } from '../../../lib/appointments-store';
import { waitingQueue, treatmentPlans } from '../../../lib/mock-data';
import { AppointmentBadge } from '../../../components/ui/badge';
import { Calendar, Clock, Clipboard } from 'lucide-react';
import Link from 'next/link';
import { StatusDonut } from '../../../components/dashboard-charts';

export default function DentistDashboard() {
  const { user } = useAuth();
  const { appointments } = useAppointments();
  const myAppointments = appointments
    .filter(a => a.dentistName === user?.name)
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const todayAppts = myAppointments.filter(a =>
    ['REQUESTED', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'REJECTED'].includes(a.status)
  );
  const myQueue = waitingQueue.filter(q => q.dentistName === user?.name);
  const inProgress = myQueue.find(q => q.status === 'IN_PROGRESS');
  const nextPatient = myQueue.find(q => q.status === 'WAITING' || q.status === 'JUST_ARRIVED');
  const activeTreatments = treatmentPlans.filter(t => t.dentistName === user?.name && t.status === 'IN_PROGRESS');
  const clinicalStatusValues = ['REQUESTED', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'REJECTED'].map(status =>
    myAppointments.filter(a => a.status === status).length
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Good morning, {user?.name}!</h1>
        <p className="text-gray-400 text-sm mt-0.5">Monday, July 14, 2025 — Your clinical day</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Your Appointments", value: todayAppts.length, icon: Calendar, color: 'from-orange-500 to-orange-600' },
          { label: 'Your Queue', value: myQueue.filter(q => q.status === 'WAITING' || q.status === 'JUST_ARRIVED').length, icon: Clock, color: 'from-amber-500 to-amber-600' },
          { label: 'Active Treatments', value: activeTreatments.length, icon: Clipboard, color: 'from-indigo-500 to-indigo-600' },
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

      {/* Current patient */}
      {inProgress && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 text-white mb-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            <p className="text-sm font-bold text-white/90 uppercase tracking-wide">Currently Treating</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white font-black text-xl">
              {inProgress.patientName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <p className="text-xl font-black">{inProgress.patientName}</p>
              <p className="text-orange-100 text-sm">{inProgress.service}</p>
            </div>
            <div className="flex gap-2">
              <Link href="/clinic/records" className="bg-white/20 hover:bg-white/30 text-white text-sm font-bold py-2 px-3 rounded-xl transition-colors">Record</Link>
            </div>
          </div>
        </div>
      )}

      {/* Next patient */}
      {nextPatient && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 font-black">
            {nextPatient.patientName.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-800">{nextPatient.patientName}</p>
            <p className="text-sm text-gray-500">{nextPatient.service} · Waiting {nextPatient.waitMinutes}m</p>
          </div>
          <Link href="/clinic/queue"
            className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold py-2 px-4 rounded-xl transition-colors">
            Call →
          </Link>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-5 mb-5">
        <h2 className="font-bold text-gray-800">Today&apos;s Clinical Flow</h2>
        <p className="text-xs text-gray-400 mt-1">Your appointments by treatment stage</p>
        <StatusDonut labels={['Requested', 'Confirmed', 'Checked in', 'In progress', 'Completed', 'Cancelled', 'No show', 'Rejected']} values={clinicalStatusValues} colors={['#F59E0B', '#18794E', '#0EA5A4', '#F59E0B', '#94A3B8', '#EF4444', '#78716C', '#E11D48']} />
      </div>

      {/* Today's schedule */}
      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-800">Today&apos;s Schedule</h2>
          <Link href="/clinic/appointments" className="text-orange-500 text-sm font-semibold">View All</Link>
        </div>
        <div className="divide-y divide-gray-50">
          {todayAppts.map(a => (
            <div key={a.id} className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50/30 transition-colors">
              <span className="font-mono font-bold text-sm text-gray-700 w-12 flex-shrink-0">{a.time}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{a.patientName}</p>
                <p className="text-xs text-gray-400">{a.serviceName}</p>
              </div>
              <AppointmentBadge status={a.status} />
              <Link href={`/clinic/patients/${a.patientId}`} className="text-orange-500 text-xs font-semibold hover:underline flex-shrink-0">Patient</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
