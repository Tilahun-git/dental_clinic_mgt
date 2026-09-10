'use client';

import { useAuth } from '../../../lib/auth-context';
import { invoices } from '../../../lib/mock-data';
import { Card, CardHeader, CardTitle } from '../../../components/ui/card';
import { InvoiceBadge } from '../../../components/ui/badge';
import { Receipt, CreditCard } from 'lucide-react';

export default function MyInvoicesPage() {
  const { user } = useAuth();
  const patientId = user?.patientId ?? 'p1';
  const myInvoices = invoices.filter(inv => inv.patientId === patientId);
  const totalOwed = myInvoices.reduce((s, inv) => s + inv.balance, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Invoices</h1>
        <p className="text-slate-500 text-sm mt-1">{myInvoices.length} invoices</p>
      </div>

      <div className={`rounded-2xl p-5 mb-6 flex items-center gap-4 ${totalOwed > 0 ? 'bg-red-50 border border-red-200' : 'bg-emerald-50 border border-emerald-200'}`}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${totalOwed > 0 ? 'bg-red-100' : 'bg-emerald-100'}`}>
          <CreditCard size={22} className={totalOwed > 0 ? 'text-red-600' : 'text-emerald-600'} />
        </div>
        <div>
          <p className={`text-2xl font-bold ${totalOwed > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
            {totalOwed.toLocaleString()} ETB
          </p>
          <p className={`text-sm ${totalOwed > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
            {totalOwed > 0 ? 'Total outstanding balance' : 'All invoices cleared'}
          </p>
        </div>
      </div>

      {myInvoices.length === 0 ? (
        <Card><p className="text-center text-slate-400 py-8 text-sm">No invoices found.</p></Card>
      ) : (
        <div className="space-y-4">
          {myInvoices.map(inv => (
            <Card key={inv.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Receipt size={18} className="text-slate-500" />
                  </div>
                  <div>
                    <CardTitle>{inv.invoiceNumber}</CardTitle>
                    <p className="text-xs text-slate-500 mt-0.5">{inv.date}</p>
                  </div>
                </div>
                <InvoiceBadge status={inv.status} />
              </CardHeader>
              <div className="mt-3 border border-slate-100 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500">Service</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-slate-500">Qty</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-slate-500">Price</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-slate-500">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inv.items.map((item, i) => (
                      <tr key={i} className="border-b border-slate-50">
                        <td className="px-4 py-2 text-slate-700">{item.description}</td>
                        <td className="px-4 py-2 text-slate-500 text-right">{item.quantity}</td>
                        <td className="px-4 py-2 text-slate-500 text-right">{item.unitPrice.toLocaleString()}</td>
                        <td className="px-4 py-2 text-slate-800 font-medium text-right">{item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{inv.subtotal.toLocaleString()} ETB</span></div>
                {inv.discount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-{inv.discount.toLocaleString()} ETB</span></div>}
                {inv.tax > 0 && <div className="flex justify-between text-slate-500"><span>Tax</span><span>{inv.tax.toLocaleString()} ETB</span></div>}
                <div className="flex justify-between font-bold text-slate-800 border-t border-slate-200 pt-2"><span>Total</span><span>{inv.total.toLocaleString()} ETB</span></div>
                {inv.payments.length > 0 && <div className="flex justify-between text-emerald-600"><span>Paid</span><span>-{inv.payments.reduce((s,p)=>s+p.amount,0).toLocaleString()} ETB</span></div>}
                {inv.balance > 0 && <div className="flex justify-between font-bold text-red-600"><span>Balance Due</span><span>{inv.balance.toLocaleString()} ETB</span></div>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
