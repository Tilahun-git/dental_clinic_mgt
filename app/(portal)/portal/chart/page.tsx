'use client';

import { useAuth } from '../../../lib/auth-context';
import { dentalCharts, patients } from '../../../lib/mock-data';
import { Card, CardHeader, CardTitle } from '../../../components/ui/card';
import { useState } from 'react';

const conditionColors: Record<string, { bg: string; label: string; dot: string }> = {
  HEALTHY:    { bg: 'bg-emerald-100 border-emerald-300 text-emerald-800', label: 'Healthy',    dot: 'bg-emerald-500' },
  CARIES:     { bg: 'bg-yellow-100 border-yellow-300 text-yellow-800',   label: 'Caries',     dot: 'bg-yellow-500' },
  MISSING:    { bg: 'bg-slate-200 border-slate-400 text-slate-500',      label: 'Missing',    dot: 'bg-slate-400' },
  FILLED:     { bg: 'bg-sky-100 border-sky-300 text-sky-800',            label: 'Filled',     dot: 'bg-sky-500' },
  CROWN:      { bg: 'bg-amber-100 border-amber-300 text-amber-800',      label: 'Crown',      dot: 'bg-amber-500' },
  ROOT_CANAL: { bg: 'bg-purple-100 border-purple-300 text-purple-800',   label: 'Root Canal', dot: 'bg-purple-500' },
  EXTRACTION: { bg: 'bg-gray-300 border-gray-400 text-gray-700',         label: 'Extracted',  dot: 'bg-gray-500' },
  IMPLANT:    { bg: 'bg-teal-100 border-teal-300 text-teal-800',         label: 'Implant',    dot: 'bg-teal-500' },
  FRACTURE:   { bg: 'bg-red-100 border-red-300 text-red-800',            label: 'Fracture',   dot: 'bg-red-500' },
};

export default function MyDentalChartPage() {
  const { user } = useAuth();
  const patientId = user?.patientId ?? 'p1';
  const chart = dentalCharts.find(c => c.patientId === patientId);
  const patient = patients.find(p => p.id === patientId);
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);

  const getToothCondition = (num: number) =>
    chart?.teeth.find(t => t.toothNumber === num) ?? { toothNumber: num, condition: 'HEALTHY', notes: '' };

  const upper = Array.from({ length: 16 }, (_, i) => i + 1);
  const lower = Array.from({ length: 16 }, (_, i) => i + 17);

  const selectedData = selectedTooth ? getToothCondition(selectedTooth) : null;
  const selectedStyle = selectedData ? (conditionColors[selectedData.condition] ?? conditionColors.HEALTHY) : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Dental Chart</h1>
        <p className="text-slate-500 text-sm mt-1">
          {patient?.firstName} {patient?.lastName} — Click a tooth to see details
        </p>
      </div>

      <Card className="mb-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(conditionColors).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs text-slate-600">
              <div className={`w-3 h-3 rounded-sm ${val.dot}`} />
              {val.label}
            </div>
          ))}
        </div>

        {/* Upper jaw label */}
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-2">Upper Jaw</p>

        {/* Upper teeth (1–16, displayed right to left as in a mirror) */}
        <div className="flex justify-center gap-1 mb-1 flex-wrap">
          {upper.map(num => {
            const t = getToothCondition(num);
            const style = conditionColors[t.condition] ?? conditionColors.HEALTHY;
            const isSelected = selectedTooth === num;
            return (
              <button
                key={num}
                onClick={() => setSelectedTooth(isSelected ? null : num)}
                className={`w-9 h-10 rounded-t-lg border-2 text-xs font-bold flex flex-col items-center justify-end pb-1 transition-all
                  ${style.bg} ${isSelected ? 'ring-2 ring-slate-800 scale-110' : 'hover:scale-105'}`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Gum line */}
        <div className="h-3 bg-pink-100 rounded-full mb-1 mx-4" />

        {/* Lower teeth (17–32) */}
        <div className="flex justify-center gap-1 mt-1 flex-wrap">
          {lower.map(num => {
            const t = getToothCondition(num);
            const style = conditionColors[t.condition] ?? conditionColors.HEALTHY;
            const isSelected = selectedTooth === num;
            return (
              <button
                key={num}
                onClick={() => setSelectedTooth(isSelected ? null : num)}
                className={`w-9 h-10 rounded-b-lg border-2 text-xs font-bold flex flex-col items-center justify-start pt-1 transition-all
                  ${style.bg} ${isSelected ? 'ring-2 ring-slate-800 scale-110' : 'hover:scale-105'}`}
              >
                {num}
              </button>
            );
          })}
        </div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mt-2">Lower Jaw</p>
      </Card>

      {/* Selected tooth detail */}
      {selectedTooth && selectedData && selectedStyle && (
        <Card>
          <CardHeader>
            <CardTitle>Tooth #{selectedTooth}</CardTitle>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${selectedStyle.bg}`}>
              {conditionColors[selectedData.condition]?.label ?? selectedData.condition}
            </span>
          </CardHeader>
          {selectedData.notes ? (
            <p className="text-sm text-slate-600 mt-2">{selectedData.notes}</p>
          ) : (
            <p className="text-sm text-slate-400 mt-2 italic">No additional notes for this tooth.</p>
          )}
        </Card>
      )}

      {!selectedTooth && (
        <div className="text-center text-slate-400 py-4 text-sm">
          Click any tooth above to see its condition details
        </div>
      )}
    </div>
  );
}
