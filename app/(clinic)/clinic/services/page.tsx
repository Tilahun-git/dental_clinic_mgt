 'use client';

import { services as initialServices } from '../../../lib/mock-data';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Plus, Clock, DollarSign, X, Save } from 'lucide-react';
import { useState } from 'react';

export default function ServicesManagePage() {
  const [serviceList, setServiceList] = useState(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', duration: 30, price: 0, description: '' });

  const openForm = (service?: typeof initialServices[number]) => {
    setShowForm(true);
    setEditingId(service?.id ?? null);
    setForm(service ? { name: service.name, category: service.category, duration: service.duration, price: service.price, description: service.description } : { name: '', category: 'General', duration: 30, price: 0, description: '' });
  };

  const saveService = () => {
    if (!form.name.trim()) return;
    if (editingId) {
      setServiceList(current => current.map(service => service.id === editingId ? { ...service, ...form } : service));
    } else {
      setServiceList(current => [...current, { ...initialServices[0], ...form, id: `custom-${Date.now()}`, icon: '🦷', image: initialServices[0].image }]);
    }
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Services</h1>
          <p className="text-slate-500 text-sm mt-1">{serviceList.length} services configured</p>
        </div>
        <Button variant="primary" onClick={() => openForm()}><Plus size={16} /> Add Service</Button>
      </div>

      {showForm && (
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[var(--text-heading)]">{editingId ? 'Edit Service' : 'Add Service'}</h2>
            <button onClick={() => { setEditingId(null); setShowForm(false); setForm({ name: '', category: '', duration: 30, price: 0, description: '' }); }} aria-label="Close service form"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Service name" className="border border-slate-200 rounded-xl px-3 py-2 text-sm" />
            <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category" className="border border-slate-200 rounded-xl px-3 py-2 text-sm" />
            <input type="number" value={form.duration} onChange={e => setForm({ ...form, duration: Number(e.target.value) })} placeholder="Minutes" className="border border-slate-200 rounded-xl px-3 py-2 text-sm" />
            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} placeholder="Price ETB" className="border border-slate-200 rounded-xl px-3 py-2 text-sm" />
          </div>
          <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm mt-3" />
          <Button variant="primary" size="sm" className="mt-3" onClick={saveService}><Save size={14} /> Save Service</Button>
        </div>
      )}

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
            {serviceList.map(s => (
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
                    <Button variant="ghost" size="sm" onClick={() => openForm(s)}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => setServiceList(current => current.filter(service => service.id !== s.id))}>Remove</Button>
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

