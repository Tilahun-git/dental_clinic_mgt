import { services } from '../../../lib/mock-data';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Plus, Clock, DollarSign } from 'lucide-react';

export default function ServicesManagePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Services</h1>
          <p className="text-slate-500 text-sm mt-1">{services.length} services configured</p>
        </div>
        <Button variant="primary"><Plus size={16} /> Add Service</Button>
      </div>

      <Card padding={false}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Service', 'Category', 'Duration', 'Price', 'Actions'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                      <p className="text-xs text-slate-400">{s.description}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4"><Badge>{s.category}</Badge></td>
                <td className="py-3 px-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1"><Clock size={12} /> {s.duration} min</div>
                </td>
                <td className="py-3 px-4 text-sm font-bold text-sky-600">
                  <div className="flex items-center gap-1"><DollarSign size={12} /> {s.price.toLocaleString()} ETB</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

