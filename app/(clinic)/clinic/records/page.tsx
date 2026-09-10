'use client';

import { useAppointments } from '../../../lib/appointments-store';
import { patients } from '../../../lib/mock-data';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { AppointmentBadge } from '../../../components/ui/badge';
import { FileText } from 'lucide-react';

export default function RecordsPage() {
  const { appointments } = useAppointments();
  const completedAppts = appointments.filter(a => a.status === 'COMPLETED');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Medical Records</h1>
          <p className="text-slate-500 text-sm mt-1">{completedAppts.length} completed visits</p>
        </div>
        <Button variant="primary"><FileText size={16} /> New Record</Button>
      </div>

      <Card padding={false}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Patient', 'Date', 'Dentist', 'Service', 'Notes', 'Status'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {completedAppts.map(appt => (
              <tr key={appt.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm font-semibold text-slate-800">{appt.patientName}</td>
                <td className="py-3 px-4 text-sm text-slate-600">{appt.date}</td>
                <td className="py-3 px-4 text-sm text-slate-600">{appt.dentistName}</td>
                <td className="py-3 px-4 text-sm text-slate-700">{appt.serviceName}</td>
                <td className="py-3 px-4 text-sm text-slate-500">{appt.notes || 'â€”'}</td>
                <td className="py-3 px-4"><AppointmentBadge status={appt.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

