'use client';

import { invoices } from '../../../lib/mock-data';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { InvoiceBadge } from '../../../components/ui/badge';
import { Receipt, Plus, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function BillingPage() {
  const totalRevenue = invoices.reduce((s, inv) => s + (inv.total - inv.balance), 0);
  const totalOutstanding = invoices.reduce((s, inv) => s + inv.balance, 0);
  const totalBilled = invoices.reduce((s, inv) => s + inv.total, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Billing & Invoices</h1>
          <p className="text-slate-500 text-sm mt-1">{invoices.length} invoices</p>
        </div>
        <Button variant="primary"><Plus size={16} /> Create Invoice</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <Card className="text-center">
          <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <DollarSign size={20} className="text-sky-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{totalBilled.toLocaleString()} ETB</p>
          <p className="text-slate-500 text-sm mt-1">Total Billed</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Receipt size={20} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">{totalRevenue.toLocaleString()} ETB</p>
          <p className="text-slate-500 text-sm mt-1">Collected</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Receipt size={20} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-500">{totalOutstanding.toLocaleString()} ETB</p>
          <p className="text-slate-500 text-sm mt-1">Outstanding Balance</p>
        </Card>
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Invoice #', 'Patient', 'Dentist', 'Date', 'Due', 'Total', 'Paid', 'Balance', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-mono text-sky-600 font-medium">{inv.invoiceNumber}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-slate-800">{inv.patientName}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{inv.dentistName}</td>
                  <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{inv.date}</td>
                  <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{inv.dueDate}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-slate-800">{inv.total.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-emerald-600 font-medium">{(inv.total - inv.balance).toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-red-500 font-medium">{inv.balance.toLocaleString()}</td>
                  <td className="py-3 px-4"><InvoiceBadge status={inv.status} /></td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <Link href={`/billing/${inv.id}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

