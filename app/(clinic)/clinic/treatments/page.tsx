'use client';

import { useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import { useTreatments, type NewPlanInput, type TreatmentItem } from '../../../lib/treatments-store';
import { patients } from '../../../lib/mock-data';
import { Badge } from '../../../components/ui/badge';
import { Clipboard, Plus, X, ChevronDown, ChevronUp, Check } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  COMPLETED:   'bg-emerald-100 text-emerald-700',
  IN_PROGRESS: 'bg-orange-100 text-orange-700',
  PLANNED:     'bg-amber-100 text-amber-700',
  CANCELLED:   'bg-red-100 text-red-700',
};

type ItemDraft = { service: string; quantity: number; unitPrice: number; status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' };

const emptyItem = (): ItemDraft => ({ service: '', quantity: 1, unitPrice: 0, status: 'PLANNED' });

export default function TreatmentsPage() {
  const { user } = useAuth();
  const { plans, addPlan, addItem, updateStatus, updateItemStatus } = useTreatments();

  // New Plan form state
  const [showForm, setShowForm] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<ItemDraft[]>([emptyItem()]);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  // Add-item-to-existing-plan state
  const [addingItemTo, setAddingItemTo] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<ItemDraft>(emptyItem());

  const [toast, setToast] = useState('');
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const selectedPatient = patients.find(p => p.id === patientId);
  const total = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);

  const handleSubmit = () => {
    if (!patientId || !diagnosis || items.some(i => !i.service)) return;
    const input: NewPlanInput = {
      patientId,
      patientName: `${selectedPatient?.firstName} ${selectedPatient?.lastName}`,
      dentistId: user?.staffId ?? 'd1',
      dentistName: user?.name ?? 'Dentist',
      diagnosis,
      notes,
      items,
    };
    const id = addPlan(input);
    showToast('Treatment plan created successfully!');
    setShowForm(false);
    setPatientId(''); setDiagnosis(''); setNotes(''); setItems([emptyItem()]);
    setExpandedPlan(id);
  };

  const handleAddItem = (planId: string) => {
    if (!newItem.service) return;
    addItem(planId, newItem);
    setAddingItemTo(null);
    setNewItem(emptyItem());
    showToast('Item added to treatment plan!');
  };

  return (
    <div className="relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold">
          <Check size={15} /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-stone-900">Treatment Plans</h1>
          <p className="text-stone-400 text-sm mt-0.5">{plans.length} plans on record</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2.5 rounded-2xl transition-colors shadow-sm">
          <Clipboard size={16} /> New Treatment Plan
        </button>
      </div>

      {/* New Plan Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm" style={{ border: '1px solid #E8E0D8' }}>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold text-stone-800">Create New Treatment Plan</h2>
            <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-stone-100 rounded-xl"><X size={16} className="text-stone-500" /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">Patient *</label>
              <select value={patientId} onChange={e => setPatientId(e.target.value)}
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                <option value="">Select patient...</option>
                {patients.filter(p => p.status === 'Active').map(p => (
                  <option key={p.id} value={p.id}>{p.firstName} {p.lastName} ({p.patientId})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">Diagnosis *</label>
              <input type="text" value={diagnosis} onChange={e => setDiagnosis(e.target.value)}
                placeholder="Primary diagnosis..."
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">Clinical Notes</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                placeholder="Additional notes for this treatment plan..."
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
            </div>
          </div>

          {/* Treatment items */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-stone-600 uppercase tracking-wide">Treatment Items *</label>
              <button onClick={() => setItems(prev => [...prev, emptyItem()])}
                className="flex items-center gap-1 text-teal-600 hover:text-teal-700 text-xs font-bold">
                <Plus size={13} /> Add Item
              </button>
            </div>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center p-3 rounded-xl" style={{ background: '#F8F5F2' }}>
                  <div className="col-span-5">
                    <input type="text" placeholder="Service / Procedure *"
                      value={item.service} onChange={e => setItems(prev => prev.map((it, i) => i === idx ? { ...it, service: e.target.value } : it))}
                      className="w-full border border-stone-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400" />
                  </div>
                  <div className="col-span-2">
                    <input type="number" placeholder="Qty" min={1}
                      value={item.quantity} onChange={e => setItems(prev => prev.map((it, i) => i === idx ? { ...it, quantity: parseInt(e.target.value) || 1 } : it))}
                      className="w-full border border-stone-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400" />
                  </div>
                  <div className="col-span-3">
                    <input type="number" placeholder="Unit Price (ETB)" min={0}
                      value={item.unitPrice || ''} onChange={e => setItems(prev => prev.map((it, i) => i === idx ? { ...it, unitPrice: parseFloat(e.target.value) || 0 } : it))}
                      className="w-full border border-stone-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400" />
                  </div>
                  <div className="col-span-1 text-right">
                    <span className="text-xs font-bold text-stone-600">{(item.unitPrice * item.quantity).toLocaleString()}</span>
                  </div>
                  <div className="col-span-1 text-right">
                    {items.length > 1 && (
                      <button onClick={() => setItems(prev => prev.filter((_, i) => i !== idx))}
                        className="p-1 hover:bg-red-100 rounded-lg text-red-400 hover:text-red-600 transition-colors">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right mt-2">
              <span className="text-sm font-black text-stone-800">Total: {total.toLocaleString()} ETB</span>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4" style={{ borderTop: '1px solid #E8E0D8' }}>
            <button onClick={() => setShowForm(false)}
              className="px-5 py-2.5 border-2 border-stone-200 text-stone-600 font-semibold rounded-2xl hover:bg-stone-50 transition-colors text-sm">
              Cancel
            </button>
            <button onClick={handleSubmit}
              disabled={!patientId || !diagnosis || items.some(i => !i.service)}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition-colors text-sm shadow-sm disabled:opacity-40">
              Create Treatment Plan
            </button>
          </div>
        </div>
      )}

      {/* Plans list */}
      <div className="space-y-4">
        {plans.map(plan => (
          <div key={plan.id} className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid #E8E0D8' }}>
            {/* Plan header */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-black text-stone-800 text-base">{plan.patientName}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[plan.status] ?? 'bg-stone-100 text-stone-600'}`}>
                      {plan.status.replace('_',' ')}
                    </span>
                  </div>
                  <p className="text-stone-600 text-sm mt-1">{plan.diagnosis}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{plan.dentistName} · {plan.createdAt}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-black text-teal-700 text-sm">{plan.totalCost.toLocaleString()} ETB</span>
                  <button onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                    className="p-1.5 hover:bg-stone-100 rounded-xl transition-colors">
                    {expandedPlan === plan.id ? <ChevronUp size={16} className="text-stone-500" /> : <ChevronDown size={16} className="text-stone-500" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded details */}
            {expandedPlan === plan.id && (
              <div style={{ borderTop: '1px solid #F0EBE5' }}>
                {/* Items */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-stone-700">Treatment Items</h3>
                    <button onClick={() => { setAddingItemTo(addingItemTo === plan.id ? null : plan.id); setNewItem(emptyItem()); }}
                      className="flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-xl transition-colors" style={{ border: '1px solid #CCECE9' }}>
                      <Plus size={12} /> Add Item
                    </button>
                  </div>

                  <div className="space-y-2">
                    {plan.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F8F5F2' }}>
                        <div className="flex items-center gap-3">
                          <select value={item.status}
                            onChange={e => updateItemStatus(plan.id, item.id, e.target.value as TreatmentItem['status'])}
                            className="text-xs font-bold border-0 bg-transparent focus:outline-none cursor-pointer">
                            <option value="PLANNED">PLANNED</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
                          <span className={`text-sm ${item.status === 'COMPLETED' ? 'line-through text-stone-400' : 'text-stone-700'}`}>
                            {item.service}
                          </span>
                          {item.quantity > 1 && <span className="text-xs text-stone-400">× {item.quantity}</span>}
                        </div>
                        <span className="text-sm font-bold text-stone-700">{(item.unitPrice * item.quantity).toLocaleString()} ETB</span>
                      </div>
                    ))}
                  </div>

                  {/* Add item inline form */}
                  {addingItemTo === plan.id && (
                    <div className="mt-3 p-4 rounded-2xl" style={{ background: '#EDF8F6', border: '1px solid #CCECE9' }}>
                      <p className="text-xs font-bold text-teal-700 mb-2">New Item</p>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <input type="text" placeholder="Service name *" value={newItem.service}
                          onChange={e => setNewItem(prev => ({ ...prev, service: e.target.value }))}
                          className="sm:col-span-2 border border-teal-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
                        <input type="number" placeholder="Qty" min={1} value={newItem.quantity}
                          onChange={e => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                          className="border border-teal-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
                        <input type="number" placeholder="Price (ETB)" min={0} value={newItem.unitPrice || ''}
                          onChange={e => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                          className="border border-teal-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
                      </div>
                      <div className="flex gap-2 mt-3 justify-end">
                        <button onClick={() => { setAddingItemTo(null); setNewItem(emptyItem()); }}
                          className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-700 border border-stone-200 rounded-xl">
                          Cancel
                        </button>
                        <button onClick={() => handleAddItem(plan.id)} disabled={!newItem.service}
                          className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors disabled:opacity-40">
                          Add Item
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4 pt-3" style={{ borderTop: '1px solid #E8E0D8' }}>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-stone-500">Plan Status:</label>
                      <select value={plan.status} onChange={e => updateStatus(plan.id, e.target.value as any)}
                        className="text-xs font-bold border border-stone-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-400 bg-white">
                        <option value="PLANNED">PLANNED</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                    <span className="font-black text-teal-700">Total: {plan.totalCost.toLocaleString()} ETB</span>
                  </div>
                </div>

                {plan.notes && (
                  <div className="px-5 pb-5">
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-1">Notes</p>
                    <p className="text-sm text-stone-600 italic">{plan.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {plans.length === 0 && (
          <div className="text-center py-16 text-stone-400">
            <Clipboard size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No treatment plans yet</p>
            <p className="text-sm mt-1">Create one using the button above</p>
          </div>
        )}
      </div>
    </div>
  );
}
