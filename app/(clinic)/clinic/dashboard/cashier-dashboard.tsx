'use client';

import { useAuth } from '../../../lib/auth-context';
import { invoices, patients } from '../../../lib/mock-data';
import { Card, CardHeader, CardTitle } from '../../../components/ui/card';
import { InvoiceBadge } from '../../../components/ui/badge';
import { DollarSign, TrendingUp, CreditCard, AlertCircle, Receipt, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { RevenueChart, StatusDonut } from '../../../components/dashboard-charts';

const paymentMethodColors: Record<string, string> = {
  Cash: 'bg-emerald-100 text-emerald-700',
  'Bank Transfer': 'bg-teal-100 text-teal-700',
  'Mobile Banking': 'bg-indigo-100 text-indigo-700',
  Card: 'bg-violet-100 text-violet-700',
};

export default function CashierDashboard() {
  const { user } = useAuth();
  const unpaid = invoices.filter(i => i.status === 'UNPAID');
  const partial = invoices.filter(i => i.status === 'PARTIALLY_PAID');
  const paid = invoices.filter(i => i.status === 'PAID');
  const totalCollected = paid.reduce((s, i) => s + i.total, 0);
  const totalOutstanding = [...unpaid, ...partial].reduce((s, i) => s + i.balance, 0);
  const allPayments = invoices.flatMap(i => i.payments).sort((a, b) => b.date.localeCompare(a.date));

  const revenueByDay = [
    { day: 'Mon', amount: 32000 },
    { day: 'Tue', amount: 28500 },
    { day: 'Wed', amount: 41000 },
    { day: 'Thu', amount: 38000 },
    { day: 'Fri', amount: 45600 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Cashier Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome, {user?.name} — Financial overview for today</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Collected', value: `${(totalCollected / 1000).toFixed(1)}k ETB`, icon: TrendingUp, color: 'from-emerald-500 to-emerald-600', sub: `${paid.length} paid invoices` },
          { label: 'Outstanding Balance', value: `${(totalOutstanding / 1000).toFixed(1)}k ETB`, icon: AlertCircle, color: 'from-red-500 to-rose-600', sub: `${unpaid.length} unpaid, ${partial.length} partial` },
          { label: 'Unpaid Invoices', value: unpaid.length, icon: Receipt, color: 'from-amber-500 to-orange-500', sub: 'awaiting payment' },
          { label: 'Partial Payments', value: partial.length, icon: CreditCard, color: 'from-violet-500 to-purple-600', sub: 'partially settled' },
        ].map(stat => (
          <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white shadow-lg`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/80 text-xs font-medium">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-white/70 text-xs mt-1">{stat.sub}</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <stat.icon size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Weekly revenue chart */}
        <Card>
          <CardHeader>
            <CardTitle>This Week&apos;s Revenue</CardTitle>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-lg">ETB</span>
          </CardHeader>
          <RevenueChart categories={revenueByDay.map(d => d.day)} values={revenueByDay.map(d => d.amount)} />
        </Card>

        {/* Unpaid invoices needing attention */}
        <Card className="lg:col-span-2" padding={false}>
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500" />
              <CardTitle>Unpaid Invoices</CardTitle>
            </div>
            <Link href="/clinic/billing" className="text-teal-600 text-sm font-semibold hover:underline flex items-center gap-1">
              All Invoices <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {unpaid.concat(partial).map(inv => (
              <div key={inv.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-800">{inv.patientName}</p>
                    <InvoiceBadge status={inv.status} />
                  </div>
                  <p className="text-xs text-gray-400 font-mono">{inv.invoiceNumber} · Due {inv.dueDate}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-red-600">{inv.balance.toLocaleString()} ETB</p>
                  <p className="text-xs text-gray-400">of {inv.total.toLocaleString()}</p>
                </div>
                <Link href={`/clinic/billing/${inv.id}`}
                  className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0">
                  Pay
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardTitle className="mb-1">Invoice Status</CardTitle>
          <p className="text-xs text-gray-400">Current billing distribution</p>
          <StatusDonut labels={['Paid', 'Unpaid', 'Partial']} values={[paid.length, unpaid.length, partial.length]} colors={['#18794E', '#EF4444', '#F59E0B']} />
        </Card>
      </div>

      {/* Recent payments */}
      <Card padding={false}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-500" />
            <CardTitle>Recent Payments Received</CardTitle>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Patient', 'Invoice', 'Amount', 'Method', 'Date', 'Reference'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPayments.map(pay => {
                const inv = invoices.find(i => i.payments.some(p => p.id === pay.id));
                return (
                  <tr key={pay.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">{inv?.patientName ?? '—'}</td>
                    <td className="px-4 py-3 text-xs font-mono text-teal-600">{inv?.invoiceNumber ?? '—'}</td>
                    <td className="px-4 py-3 text-sm font-bold text-emerald-700">{pay.amount.toLocaleString()} ETB</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${paymentMethodColors[pay.method] ?? 'bg-gray-100 text-gray-600'}`}>
                        {pay.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{pay.date}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono">{pay.reference}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {allPayments.length === 0 && (
            <p className="text-center py-8 text-gray-400 text-sm">No payments recorded yet</p>
          )}
        </div>
      </Card>
    </div>
  );
}
