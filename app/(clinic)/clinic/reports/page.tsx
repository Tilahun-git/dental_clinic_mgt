'use client';

import { useState } from 'react';
import { useAppointments } from '../../../lib/appointments-store';
import { patients, invoices, inventory, payrollRecords } from '../../../lib/mock-data';
import { Card, CardHeader, CardTitle } from '../../../components/ui/card';
import { Download } from 'lucide-react';
import { downloadCsv } from '../../../lib/document-utils';

const tabs = ['Patient Reports', 'Appointment Reports', 'Financial Reports', 'Inventory Reports'];

const BarChart = ({ data, max, colorClass }: { data: { label: string; value: number }[]; max: number; colorClass: string }) => (
  <div className="flex items-end gap-3 h-36 mt-4">
    {data.map((d) => (
      <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
        <span className="text-xs text-slate-500">{d.value}</span>
        <div className={`w-full ${colorClass} rounded-t-lg`} style={{ height: `${max > 0 ? (d.value / max) * 100 : 0}%` }} />
        <span className="text-xs text-slate-500 font-medium">{d.label}</span>
      </div>
    ))}
  </div>
);

export default function ReportsPage() {
  const [tab, setTab] = useState('Patient Reports');
  const { appointments } = useAppointments();

  const totalRevenue = invoices.reduce((s, inv) => s + (inv.total - inv.balance), 0);
  const totalPayroll = payrollRecords.reduce((s, p) => s + p.netSalary, 0);
  const completedAppts = appointments.filter(a => a.status === 'COMPLETED').length;
  const statusCounts = ['REQUESTED','CONFIRMED','COMPLETED','CANCELLED','NO_SHOW'].map(s => ({
    label: s.split('_')[0].slice(0, 4),
    value: appointments.filter(a => a.status === s).length,
  }));

  const monthRevenue = [
    { label: 'Apr', value: 44000 },
    { label: 'May', value: 61000 },
    { label: 'Jun', value: 55000 },
    { label: 'Jul', value: 45600 },
  ];

  const categoryStock = Array.from(new Set(inventory.map(i => i.category))).slice(0, 5).map(cat => ({
    label: cat.slice(0, 5),
    value: inventory.filter(i => i.category === cat).reduce((s, i) => s + i.quantity, 0),
  }));

  const exportReport = () => {
    if (tab === 'Patient Reports') {
      downloadCsv('patient-report.csv', ['Metric', 'Value'], [
        ['Total Registered Patients', patients.length],
        ['Active Patients', patients.filter(p => p.status === 'Active').length],
        ['Inactive Patients', patients.filter(p => p.status === 'Inactive').length],
        ['Male Patients', patients.filter(p => p.gender === 'Male').length],
        ['Female Patients', patients.filter(p => p.gender === 'Female').length],
      ]);
      return;
    }
    if (tab === 'Appointment Reports') {
      downloadCsv('appointment-report.csv', ['Status', 'Count'], statusCounts.map(item => [item.label, item.value]));
      return;
    }
    if (tab === 'Financial Reports') {
      downloadCsv('financial-report.csv', ['Metric', 'Amount (ETB)'], [
        ['Total Billed', invoices.reduce((s, i) => s + i.total, 0)],
        ['Collected', totalRevenue],
        ['Outstanding', invoices.reduce((s, i) => s + i.balance, 0)],
        ['Payroll Cost', totalPayroll],
      ]);
      return;
    }
    downloadCsv('inventory-report.csv', ['Category', 'Quantity'], categoryStock.map(item => [item.label, item.value]));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
        <button onClick={exportReport} className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Download size={15} /> Export CSV
        </button>
      </div>

      <div className="flex gap-1 border-b border-slate-200 mb-6 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
              tab === t ? 'border-sky-500 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Patient Reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card>
            <CardHeader><CardTitle>Patient Overview</CardTitle></CardHeader>
            <div className="space-y-3">
              {[
                { label: 'Total Registered Patients', value: '1,247', color: 'text-sky-600' },
                { label: 'Active Patients', value: patients.filter(p => p.status === 'Active').length, color: 'text-emerald-600' },
                { label: 'New This Month', value: 12, color: 'text-amber-600' },
                { label: 'Inactive Patients', value: patients.filter(p => p.status === 'Inactive').length, color: 'text-slate-500' },
              ].map(s => (
                <div key={s.label} className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-sm text-slate-600">{s.label}</span>
                  <span className={`text-lg font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader><CardTitle>Gender Distribution</CardTitle></CardHeader>
            <div className="space-y-3 mt-2">
              {['Male', 'Female'].map(g => {
                const count = patients.filter(p => p.gender === g).length;
                const pct = Math.round((count / patients.length) * 100);
                return (
                  <div key={g}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{g}</span>
                      <span className="font-medium">{count} ({pct}%)</span>
                    </div>
                    <div className="bg-slate-100 rounded-full h-3">
                      <div className={`${g === 'Male' ? 'bg-sky-500' : 'bg-pink-400'} h-3 rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {tab === 'Appointment Reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card>
            <CardHeader><CardTitle>Appointment Statistics</CardTitle></CardHeader>
            <div className="space-y-2">
              {[
                { label: 'Total Appointments', value: appointments.length },
                { label: 'Completed', value: completedAppts },
                { label: 'Completion Rate', value: `${Math.round((completedAppts / appointments.length) * 100)}%` },
                { label: 'Cancellation Rate', value: `${Math.round((appointments.filter(a=>a.status==='CANCELLED').length / appointments.length) * 100)}%` },
              ].map(s => (
                <div key={s.label} className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-sm text-slate-600">{s.label}</span>
                  <span className="font-bold text-slate-800">{s.value}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader><CardTitle>Appointments by Status</CardTitle></CardHeader>
            <BarChart data={statusCounts} max={Math.max(...statusCounts.map(d => d.value))} colorClass="bg-sky-500" />
          </Card>
        </div>
      )}

      {tab === 'Financial Reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card>
            <CardHeader><CardTitle>Revenue Summary</CardTitle></CardHeader>
            <div className="space-y-2">
              {[
                { label: 'Total Billed', value: invoices.reduce((s, i) => s + i.total, 0).toLocaleString() + ' ETB', color: 'text-slate-800' },
                { label: 'Collected', value: totalRevenue.toLocaleString() + ' ETB', color: 'text-emerald-600' },
                { label: 'Outstanding', value: invoices.reduce((s, i) => s + i.balance, 0).toLocaleString() + ' ETB', color: 'text-red-500' },
                { label: 'Payroll Cost', value: totalPayroll.toLocaleString() + ' ETB', color: 'text-violet-600' },
                { label: 'Collection Rate', value: `${Math.round((totalRevenue / invoices.reduce((s, i) => s + i.total, 0)) * 100)}%`, color: 'text-sky-600' },
              ].map(s => (
                <div key={s.label} className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-sm text-slate-600">{s.label}</span>
                  <span className={`font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader><CardTitle>Monthly Revenue (ETB)</CardTitle></CardHeader>
            <BarChart data={monthRevenue} max={Math.max(...monthRevenue.map(d => d.value))} colorClass="bg-emerald-500" />
          </Card>
        </div>
      )}

      {tab === 'Inventory Reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card>
            <CardHeader><CardTitle>Inventory Summary</CardTitle></CardHeader>
            <div className="space-y-2">
              {[
                { label: 'Total Items', value: inventory.length },
                { label: 'Low Stock Items', value: inventory.filter(i => i.quantity < i.minQuantity).length },
                { label: 'Total Stock Value', value: inventory.reduce((s, i) => s + (i.quantity * i.unitCost), 0).toLocaleString() + ' ETB' },
                { label: 'Categories', value: new Set(inventory.map(i => i.category)).size },
              ].map(s => (
                <div key={s.label} className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-sm text-slate-600">{s.label}</span>
                  <span className="font-bold text-slate-800">{s.value}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader><CardTitle>Stock by Category</CardTitle></CardHeader>
            <BarChart data={categoryStock} max={Math.max(...categoryStock.map(d => d.value))} colorClass="bg-amber-500" />
          </Card>
        </div>
      )}
    </div>
  );
}

