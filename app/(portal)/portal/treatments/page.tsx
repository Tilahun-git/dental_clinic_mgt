'use client';

import { useAuth } from '../../../lib/auth-context';
import { useTreatments } from '../../../lib/treatments-store';
import { Clipboard, User, Calendar, CheckCircle, Circle, Clock } from 'lucide-react';

const statusColors: Record<string, string> = {
  PLANNED:     'bg-amber-100 text-amber-700',
  IN_PROGRESS: 'bg-orange-100 text-orange-700',
  COMPLETED:   'bg-emerald-100 text-emerald-700',
  CANCELLED:   'bg-red-100 text-red-700',
};

export default function MyTreatmentsPage() {
  const { user } = useAuth();
  const { plans } = useTreatments(); // ← reads from shared store
  const patientId = user?.patientId ?? 'p1';

  // Show plans belonging to this patient
  const myPlans = plans.filter(t => t.patientId === patientId);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-stone-900">My Treatment Plans</h1>
        <p className="text-stone-400 text-sm mt-0.5">{myPlans.length} treatment plans</p>
      </div>

      {myPlans.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm" style={{ border: '1px solid #E8E0D8' }}>
          <Clipboard size={36} className="mx-auto mb-3 text-stone-300" />
          <p className="font-semibold text-stone-500">No treatment plans yet</p>
          <p className="text-sm text-stone-400 mt-1">Your dentist will create a plan for you during your visit.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {myPlans.map(plan => {
            const completed = plan.items.filter(i => i.status === 'COMPLETED').length;
            const progress = plan.items.length > 0 ? Math.round((completed / plan.items.length) * 100) : 0;
            return (
              <div key={plan.id} className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid #E8E0D8' }}>
                {/* Header */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                        <Clipboard size={18} className="text-teal-600" />
                      </div>
                      <div>
                        <h2 className="font-bold text-stone-800">{plan.diagnosis}</h2>
                        <div className="flex items-center gap-3 text-xs text-stone-400 mt-0.5">
                          <span className="flex items-center gap-1"><User size={11} /> {plan.dentistName}</span>
                          <span className="flex items-center gap-1"><Calendar size={11} /> {plan.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${statusColors[plan.status] ?? 'bg-stone-100 text-stone-600'}`}>
                      {plan.status.replace('_', ' ')}
                    </span>
                  </div>

                  {plan.notes && (
                    <p className="text-sm text-stone-500 mt-3 italic">{plan.notes}</p>
                  )}
                </div>

                {/* Progress */}
                <div className="px-5 pb-2">
                  <div className="flex justify-between text-xs text-stone-400 mb-1.5">
                    <span>Progress</span>
                    <span>{completed}/{plan.items.length} completed</span>
                  </div>
                  <div className="bg-stone-100 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Items */}
                <div className="px-5 pb-5 mt-3 space-y-2">
                  {plan.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F8F5F2' }}>
                      <div className="flex items-center gap-2.5">
                        {item.status === 'COMPLETED'
                          ? <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                          : item.status === 'IN_PROGRESS'
                            ? <Clock size={16} className="text-orange-500 flex-shrink-0" />
                            : <Circle size={16} className="text-stone-300 flex-shrink-0" />}
                        <span className={`text-sm ${item.status === 'COMPLETED' ? 'line-through text-stone-400' : 'text-stone-700'}`}>
                          {item.service}
                        </span>
                        {item.quantity > 1 && <span className="text-xs text-stone-400">× {item.quantity}</span>}
                      </div>
                      <span className="text-xs font-bold text-stone-500">
                        {(item.unitPrice * item.quantity).toLocaleString()} ETB
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="px-5 pb-5 flex justify-between items-center" style={{ borderTop: '1px solid #F0EBE5' }}>
                  <span className="text-sm text-stone-400 pt-4">Estimated Total</span>
                  <span className="font-black text-teal-700 text-lg pt-4">{plan.totalCost.toLocaleString()} ETB</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
