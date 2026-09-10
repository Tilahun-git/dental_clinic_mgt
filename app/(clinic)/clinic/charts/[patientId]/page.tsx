'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { patients, dentalChartP1 } from '../../../../lib/mock-data';
import { Card, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import type { ToothCondition } from '../../../../lib/mock-data';

const CONDITIONS: ToothCondition[] = ['HEALTHY', 'CARIES', 'MISSING', 'FILLED', 'CROWN', 'ROOT_CANAL', 'EXTRACTION', 'IMPLANT', 'FRACTURE'];

const conditionStyle: Record<string, { bg: string; label: string; dot: string }> = {
  HEALTHY:    { bg: 'bg-emerald-100 border-emerald-300 text-emerald-800', label: 'Healthy',    dot: 'bg-emerald-500' },
  CARIES:     { bg: 'bg-yellow-100 border-yellow-300 text-yellow-800',   label: 'Caries',     dot: 'bg-yellow-500' },
  MISSING:    { bg: 'bg-slate-200 border-slate-400 text-slate-500',      label: 'Missing',    dot: 'bg-slate-400'  },
  FILLED:     { bg: 'bg-sky-100 border-sky-300 text-sky-800',            label: 'Filled',     dot: 'bg-sky-500'    },
  CROWN:      { bg: 'bg-amber-100 border-amber-300 text-amber-800',      label: 'Crown',      dot: 'bg-amber-500'  },
  ROOT_CANAL: { bg: 'bg-purple-100 border-purple-300 text-purple-800',   label: 'Root Canal', dot: 'bg-purple-500' },
  EXTRACTION: { bg: 'bg-gray-200 border-gray-400 text-gray-700',         label: 'Extracted',  dot: 'bg-gray-500'   },
  IMPLANT:    { bg: 'bg-teal-100 border-teal-300 text-teal-800',         label: 'Implant',    dot: 'bg-teal-500'   },
  FRACTURE:   { bg: 'bg-red-100 border-red-300 text-red-800',            label: 'Fracture',   dot: 'bg-red-500'    },
};

export default function DentalChartPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const patient = patients.find(p => p.id === patientId);

  // Initialize chart data — use p1 data as default for demo
  const [chart, setChart] = useState<Record<number, { condition: ToothCondition; notes: string }>>(
    patientId === 'p1' ? { ...dentalChartP1 } :
    Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i + 1, { condition: 'HEALTHY' as ToothCondition, notes: '' }]))
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [editCondition, setEditCondition] = useState<ToothCondition>('HEALTHY');
  const [editNotes, setEditNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const selectTooth = (num: number) => {
    setSelected(num);
    setEditCondition(chart[num]?.condition ?? 'HEALTHY');
    setEditNotes(chart[num]?.notes ?? '');
    setSaved(false);
  };

  const saveCondition = () => {
    if (!selected) return;
    setChart(prev => ({ ...prev, [selected]: { condition: editCondition, notes: editNotes } }));
    setSaved(true);
  };

  const upper = Array.from({ length: 16 }, (_, i) => i + 1);
  const lower = Array.from({ length: 16 }, (_, i) => i + 17);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/clinic/patients" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft size={18} className="text-slate-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Dental Chart — {patient ? `${patient.firstName} ${patient.lastName}` : patientId}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Click a tooth to update its condition</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart */}
        <Card className="lg:col-span-2">
          {/* Legend */}
          <div className="flex flex-wrap gap-2 mb-5">
            {CONDITIONS.map(c => (
              <div key={c} className="flex items-center gap-1.5 text-xs text-slate-600">
                <div className={`w-3 h-3 rounded-sm ${conditionStyle[c].dot}`} />
                {conditionStyle[c].label}
              </div>
            ))}
          </div>

          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-2">Upper Jaw</p>
          <div className="flex justify-center gap-1 mb-1 flex-wrap">
            {upper.map(num => {
              const cond = chart[num]?.condition ?? 'HEALTHY';
              const style = conditionStyle[cond];
              return (
                <button key={num} onClick={() => selectTooth(num)}
                  className={`w-9 h-10 rounded-t-lg border-2 text-xs font-bold flex flex-col items-center justify-end pb-1 transition-all
                    ${style.bg} ${selected === num ? 'ring-2 ring-slate-900 scale-110' : 'hover:scale-105'}`}>
                  {num}
                </button>
              );
            })}
          </div>
          <div className="h-3 bg-pink-100 rounded-full mb-1 mx-2" />
          <div className="flex justify-center gap-1 mt-1 flex-wrap">
            {lower.map(num => {
              const cond = chart[num]?.condition ?? 'HEALTHY';
              const style = conditionStyle[cond];
              return (
                <button key={num} onClick={() => selectTooth(num)}
                  className={`w-9 h-10 rounded-b-lg border-2 text-xs font-bold flex flex-col items-center justify-start pt-1 transition-all
                    ${style.bg} ${selected === num ? 'ring-2 ring-slate-900 scale-110' : 'hover:scale-105'}`}>
                  {num}
                </button>
              );
            })}
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mt-2">Lower Jaw</p>
        </Card>

        {/* Edit panel */}
        <Card>
          {selected ? (
            <>
              <CardHeader>
                <CardTitle>Tooth #{selected}</CardTitle>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${conditionStyle[chart[selected]?.condition ?? 'HEALTHY'].bg}`}>
                  {conditionStyle[chart[selected]?.condition ?? 'HEALTHY'].label}
                </span>
              </CardHeader>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Condition</label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {CONDITIONS.map(c => (
                      <button key={c} onClick={() => setEditCondition(c)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-left transition-all border
                          ${editCondition === c ? conditionStyle[c].bg + ' border-current' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${conditionStyle[c].dot}`} />
                        {conditionStyle[c].label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Notes</label>
                  <textarea
                    value={editNotes}
                    onChange={e => { setEditNotes(e.target.value); setSaved(false); }}
                    rows={3}
                    placeholder="Clinical notes for this tooth..."
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  />
                </div>
                <Button variant="primary" className="w-full" onClick={saveCondition}>
                  <Save size={14} />
                  {saved ? 'Saved!' : 'Save Changes'}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🦷</span>
              </div>
              <p className="text-sm font-medium">Select a tooth</p>
              <p className="text-xs mt-1">Click any tooth on the chart to view and edit its condition</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
