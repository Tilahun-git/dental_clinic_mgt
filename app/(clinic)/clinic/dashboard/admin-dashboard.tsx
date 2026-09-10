'use client';

import { useAppointments } from '../../../lib/appointments-store';
import { invoices, inventory, patients, auditLogs } from '../../../lib/mock-data';
import { AppointmentBadge } from '../../../components/ui/badge';
import { Users, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { RevenueChart, StatusDonut } from '../../../components/dashboard-charts';

const revenueData = [
  { month: 'Feb', amount: 38500 },
  { month: 'Mar', amount: 52000 },
  { month: 'Apr', amount: 44000 },
  { month: 'May', amount: 61000 },
  { month: 'Jun', amount: 55000 },
  { month: 'Jul', amount: 45600 },
];

export default function AdminDashboard() {
  const { appointments } = useAppointments();
  const todayAppts = appointments
    .filter(a => ['REQUESTED', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS'].includes(a.status))
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const lowStock = inventory.filter(i => i.quantity < i.minQuantity).length;
  const revenue = invoices.filter(i => i.status === 'PAID').reduce((s, i) => s + i.total, 0);
  const activePatients = patients.filter(p => p.status === 'Active').length;
  const statusLabels = ['Requested', 'Confirmed', 'Checked in', 'In progress', 'Completed'];
  const statusValues = ['REQUESTED', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS', 'COMPLETED'].map(status =>
    appointments.filter(a => a.status === status).length
  );

  const stats = [
    { label: 'Total Patients', value: activePatients, icon: Users, color: 'from-orange-500 to-orange-600', href: '/clinic/patients' },
    { label: "Today's Appointments", value: todayAppts.length, icon: Calendar, color: 'from-indigo-500 to-indigo-600', href: '/clinic/appointments' },
    { label: 'Revenue Collected', value: `${(revenue/1000).toFixed(0)}k ETB`, icon: DollarSign, color: 'from-emerald-500 to-emerald-600', href: '/clinic/billing' },
    { label: 'Low Stock Alerts', value: lowStock, icon: AlertTriangle, color: 'from-red-500 to-red-600', href: '/clinic/inventory' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm mt-0.5">Monday, July 14, 2025</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {stats.map(s => (
          <Link key={s.label} href={s.href}
            className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white shadow-md hover:shadow-lg transition-shadow`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/75 text-xs font-medium">{s.label}</p>
                <p className="text-3xl font-black mt-1">{s.value}</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <s.icon size={20} className="text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue chart */}
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 lg:col-span-2">
          <h2 className="font-bold text-gray-800 mb-4">Monthly Revenue</h2>
          <RevenueChart categories={revenueData.map(d => d.month)} values={revenueData.map(d => d.amount)} />
        </div>

        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-1">Appointment Mix</h2>
          <p className="text-xs text-gray-400 mb-2">Live totals from the shared appointment store</p>
          <StatusDonut labels={statusLabels} values={statusValues} colors={['#F59E0B', '#18794E', '#0EA5A4', '#6366F1', '#94A3B8']} />
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: '+ New Appointment', href: '/clinic/appointments', color: 'bg-orange-500 hover:bg-orange-600' },
              { label: '+ Register Patient', href: '/clinic/patients', color: 'bg-indigo-500 hover:bg-indigo-600' },
              { label: 'Create Invoice', href: '/clinic/billing', color: 'bg-emerald-500 hover:bg-emerald-600' },
              { label: 'Process Payroll', href: '/clinic/payroll', color: 'bg-violet-500 hover:bg-violet-600' },
              { label: 'View Inventory', href: '/clinic/inventory', color: 'bg-red-500 hover:bg-red-600' },
              { label: 'Audit Logs', href: '/clinic/audit', color: 'bg-gray-600 hover:bg-gray-700' },
            ].map(a => (
              <Link key={a.href} href={a.href}
                className={`block ${a.color} text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors`}>
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Today's appointments */}
      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-800">Today&apos;s Appointments</h2>
          <Link href="/clinic/appointments" className="text-orange-500 text-sm font-semibold hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-50">
                {['Time','Patient','Dentist','Service','Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {todayAppts.slice(0,8).map(a => (
                <tr key={a.id} className="border-t border-gray-50 hover:bg-orange-50/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono font-bold text-gray-700">{a.time}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{a.patientName}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{a.dentistName}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{a.serviceName}</td>
                  <td className="px-4 py-3"><AppointmentBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {todayAppts.length === 0 && <p className="text-center py-8 text-gray-400 text-sm">No appointments today</p>}
        </div>
      </div>
    </div>
  );
}
