'use client';

import { prescriptions } from '../../../lib/mock-data';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Pill, Plus } from 'lucide-react';

export default function PrescriptionsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Prescriptions</h1>
          <p className="text-slate-500 text-sm mt-1">{prescriptions.length} prescriptions issued</p>
        </div>
        <Button variant="primary"><Plus size={16} /> New Prescription</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {prescriptions.map((rx) => (
          <Card key={rx.id}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Pill size={18} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800">{rx.patientName}</p>
                <p className="text-slate-500 text-xs">{rx.dentistName}</p>
                <p className="text-slate-400 text-xs">{rx.date}</p>
              </div>
              <Button variant="outline" size="sm">Print</Button>
            </div>

            <div className="space-y-2">
              {rx.medications.map((med, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-3">
                  <p className="font-semibold text-slate-800 text-sm">{med.name}</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-1.5 text-xs text-slate-500">
                    <span>Dosage: <span className="text-slate-700 font-medium">{med.dosage}</span></span>
                    <span>Frequency: <span className="text-slate-700 font-medium">{med.frequency}</span></span>
                    <span>Duration: <span className="text-slate-700 font-medium">{med.duration}</span></span>
                    <span>Note: <span className="text-slate-700">{med.instructions}</span></span>
                  </div>
                </div>
              ))}
            </div>

            {rx.notes && (
              <p className="mt-3 text-xs text-slate-500 italic border-t border-slate-100 pt-3">{rx.notes}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

