import { patients } from '../../../lib/mock-data';
import Link from 'next/link';
import { Activity } from 'lucide-react';
import { Card } from '../../../components/ui/card';

export default function ChartsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Dental Charts</h1>
      <p className="text-slate-500 text-sm mb-6">Select a patient to view their odontogram</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((p) => (
          <Link key={p.id} href={`/charts/${p.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                  <Activity size={18} className="text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{p.firstName} {p.lastName}</p>
                  <p className="text-slate-500 text-xs">{p.patientId}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

