import { invoices } from '../../../lib/mock-data';
import { Card } from '../../../components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function PaymentsPage() {
  const allPayments = invoices.flatMap(inv =>
    inv.payments.map(pay => ({
      ...pay,
      invoiceNumber: inv.invoiceNumber,
      patientName: inv.patientName,
    }))
  ).sort((a, b) => b.date.localeCompare(a.date));

  const total = allPayments.reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Payments</h1>
      <p className="text-slate-500 text-sm mb-6">All received payments</p>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
          <CheckCircle size={24} className="text-white" />
        </div>
        <div>
          <p className="text-emerald-700 font-semibold text-lg">{total.toLocaleString()} ETB</p>
          <p className="text-emerald-600 text-sm">Total payments collected ({allPayments.length} transactions)</p>
        </div>
      </div>

      <Card padding={false}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Invoice', 'Patient', 'Date', 'Method', 'Reference', 'Amount'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPayments.map(pay => (
              <tr key={pay.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm font-mono text-sky-600">{pay.invoiceNumber}</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-800">{pay.patientName}</td>
                <td className="py-3 px-4 text-sm text-slate-600">{pay.date}</td>
                <td className="py-3 px-4 text-sm text-slate-600">{pay.method}</td>
                <td className="py-3 px-4 text-sm text-slate-500 font-mono text-xs">{pay.reference}</td>
                <td className="py-3 px-4 text-sm font-bold text-emerald-600">{pay.amount.toLocaleString()} ETB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

