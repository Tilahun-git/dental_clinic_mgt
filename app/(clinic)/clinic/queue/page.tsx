'use client';

import { useState } from 'react';
import { waitingQueue } from '../../../lib/mock-data';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Clock, Phone, ArrowRight, Users, CheckCircle } from 'lucide-react';

export default function QueuePage() {
  const [queue, setQueue] = useState(waitingQueue);

  const callPatient = (id: string) => {
    setQueue((prev) => prev.map((q) => q.id === id ? { ...q, status: 'CALLED' } : q));
  };

  const completePatient = (id: string) => {
    setQueue((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Waiting Queue</h1>
          <p className="text-slate-500 text-sm mt-1">Monday, July 14, 2025 â€” Real-time view</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-200">
          <Users size={16} />
          <span className="font-semibold text-sm">{queue.length} in queue</span>
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="text-center">
          <p className="text-3xl font-bold text-slate-800">{queue.length}</p>
          <p className="text-sm text-slate-500 mt-1">Waiting</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-orange-500">{queue.filter(q => q.status === 'IN_PROGRESS').length}</p>
          <p className="text-sm text-slate-500 mt-1">In Progress</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-sky-500">{Math.round(queue.reduce((s, q) => s + q.waitMinutes, 0) / queue.length) || 0}</p>
          <p className="text-sm text-slate-500 mt-1">Avg Wait (min)</p>
        </Card>
      </div>

      {queue.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <CheckCircle size={48} className="text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-800">Queue is empty!</h3>
            <p className="text-slate-500 text-sm mt-1">All patients have been seen.</p>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {queue.map((patient, idx) => (
          <div
            key={patient.id}
            className={`bg-white rounded-2xl border-2 p-5 shadow-sm transition-all ${
              patient.status === 'IN_PROGRESS' ? 'border-orange-300 shadow-orange-100' :
              patient.status === 'CALLED' ? 'border-sky-300 shadow-sky-100' :
              patient.status === 'JUST_ARRIVED' ? 'border-emerald-300 shadow-emerald-100' :
              'border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                  idx === 0 ? 'bg-orange-500' : idx === 1 ? 'bg-sky-500' : 'bg-slate-500'
                }`}>
                  #{idx + 1}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{patient.patientName}</p>
                  <p className="text-slate-500 text-xs">{patient.service}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                patient.status === 'IN_PROGRESS' ? 'bg-orange-100 text-orange-700' :
                patient.status === 'CALLED' ? 'bg-sky-100 text-sky-700' :
                patient.status === 'JUST_ARRIVED' ? 'bg-emerald-100 text-emerald-700' :
                'bg-slate-100 text-slate-600'
              }`}>
                {patient.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-1.5 text-sm mb-4">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock size={13} className="text-slate-400" />
                <span>Check-in: <strong>{patient.checkInTime}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock size={13} className="text-slate-400" />
                <span>Wait time: <strong className={patient.waitMinutes > 30 ? 'text-red-600' : 'text-slate-800'}>
                  {patient.waitMinutes > 0 ? `${patient.waitMinutes} min` : 'Just arrived'}
                </strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone size={13} className="text-slate-400" />
                <span>Dentist: <strong>{patient.dentistName}</strong></span>
              </div>
              {patient.room && (
                <div className="flex items-center gap-2 text-slate-600">
                  <ArrowRight size={13} className="text-slate-400" />
                  <span>Room: <strong>{patient.room}</strong></span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {patient.status !== 'IN_PROGRESS' && patient.status !== 'CALLED' && (
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => callPatient(patient.id)}
                >
                  Call Patient
                </Button>
              )}
              {(patient.status === 'IN_PROGRESS' || patient.status === 'CALLED') && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => completePatient(patient.id)}
                >
                  <CheckCircle size={14} /> Complete
                </Button>
              )}
              <Button variant="ghost" size="sm">Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

