'use client';

import { useAuth } from '../../../lib/auth-context';
import { prescriptions } from '../../../lib/mock-data';
import { Card, CardHeader, CardTitle } from '../../../components/ui/card';
import { Pill, User, Calendar } from 'lucide-react';

export default function MyPrescriptionsPage() {
  const { user } = useAuth();
  const patientId = user?.patientId ?? 'p1';
  const myRx = prescriptions.filter(r => r.patientId === patientId);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Prescriptions</h1>
        <p className="text-slate-500 text-sm mt-1">{myRx.length} prescriptions on record</p>
      </div>

      {myRx.length === 0 ? (
        <Card><p className="text-center text-slate-400 py-8 text-sm">No prescriptions found.</p></Card>
      ) : (
        <div className="space-y-4">
          {myRx.map(rx => (
            <Card key={rx.id}>
              <CardHeader>
                <div>
                  <CardTitle>Prescription #{rx.id.toUpperCase()}</CardTitle>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><User size={13} /> {rx.dentistName}</span>
                    <span className="flex items-center gap-1"><Calendar size={13} /> {rx.date}</span>
                  </div>
                </div>
              </CardHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {rx.medications.map((med, i) => (
                  <div key={i} className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Pill size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-purple-900 text-sm">{med.name}</p>
                        <p className="text-xs text-purple-700 mt-0.5">{med.dosage}</p>
                        <div className="flex gap-3 mt-1 text-xs text-purple-600">
                          <span>🕐 {med.frequency}</span>
                          <span>📅 {med.duration}</span>
                        </div>
                        {med.instructions && (
                          <p className="text-xs text-purple-500 mt-1 italic">{med.instructions}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
