'use client';

import { useAuth } from '../../../lib/auth-context';
import { medicalRecords } from '../../../lib/mock-data';
import { Card, CardHeader, CardTitle } from '../../../components/ui/card';
import { FileText, User, Calendar, AlertCircle } from 'lucide-react';

export default function MyRecordsPage() {
  const { user } = useAuth();
  const patientId = user?.patientId ?? 'p1';
  const myRecords = medicalRecords.filter(r => r.patientId === patientId);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Dental Records</h1>
        <p className="text-slate-500 text-sm mt-1">{myRecords.length} clinical records</p>
      </div>

      {myRecords.length === 0 ? (
        <Card><p className="text-center text-slate-400 py-8 text-sm">No records found.</p></Card>
      ) : (
        <div className="space-y-4">
          {myRecords.map(rec => (
            <Card key={rec.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                    <FileText size={18} className="text-sky-600" />
                  </div>
                  <div>
                    <CardTitle>{rec.chiefComplaint}</CardTitle>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1"><User size={11} /> {rec.dentistName}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} /> {rec.date}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {rec.diagnosis && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Diagnosis</p>
                    <p className="text-sm text-amber-800">{rec.diagnosis}</p>
                  </div>
                )}
                {rec.clinicalNotes && (
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Clinical Notes</p>
                    <p className="text-sm text-slate-700">{rec.clinicalNotes}</p>
                  </div>
                )}
                {rec.treatmentNotes && (
                  <div className="bg-sky-50 border border-sky-100 rounded-xl p-3">
                    <p className="text-xs font-semibold text-sky-700 uppercase tracking-wide mb-1">Treatment</p>
                    <p className="text-sm text-sky-800">{rec.treatmentNotes}</p>
                  </div>
                )}
                {rec.followUpInstructions && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                    <div className="flex items-center gap-1 mb-1">
                      <AlertCircle size={12} className="text-emerald-600" />
                      <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Follow-up</p>
                    </div>
                    <p className="text-sm text-emerald-800">{rec.followUpInstructions}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
