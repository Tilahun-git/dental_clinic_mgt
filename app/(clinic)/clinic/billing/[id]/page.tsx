'use client';

import { useParams } from 'next/navigation';
import { invoices } from '../../../../lib/mock-data';
import { InvoiceBadge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Card } from '../../../../components/ui/card';
import { ArrowLeft, Printer, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const invoice = invoices.find(inv => inv.id === id);

  if (!invoice) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg">Invoice not found</p>
        <Link href="/clinic/billing" className="text-sky-600 mt-2 inline-block hover:underline">Back to Billing</Link>
      </div>
    );
  }

  const paidAmount = invoice.payments.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/clinic/billing" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft size={18} className="text-slate-500" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{invoice.invoiceNumber}</h1>
            <p className="text-sm text-slate-500">{invoice.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm"><Printer size={14} /> Print</Button>
          {invoice.status !== 'PAID' && invoice.status !== 'CANCELLED' && (
            <Button variant="primary" size="sm"><CreditCard size={14} /> Record Payment</Button>
          )}
        </div>
      </div>

      {/* Invoice card */}
      <Card>
        {/* Clinic header */}
        <div className="border-b border-slate-100 pb-5 mb-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-sky-600">SmileCare Dental Clinic</h2>
              <p className="text-sm text-slate-500">Bole Road, Addis Ababa</p>
              <p className="text-sm text-slate-500">+251 911 000000 · info@smilecare.et</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-800 font-mono">{invoice.invoiceNumber}</p>
              <InvoiceBadge status={invoice.status} />
            </div>
          </div>
        </div>

        {/* Patient & Dentist info */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Bill To</p>
            <p className="font-semibold text-slate-800">{invoice.patientName}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Attending Dentist</p>
            <p className="font-semibold text-slate-800">{invoice.dentistName}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Invoice Date</p>
            <p className="text-slate-700">{invoice.date}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Due Date</p>
            <p className="text-slate-700">{invoice.dueDate}</p>
          </div>
        </div>

        {/* Line items */}
        <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Description</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Qty</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Unit Price</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="px-4 py-3 text-sm text-slate-800">{item.description}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 text-right">{item.quantity}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 text-right">{item.unitPrice.toLocaleString()} ETB</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-800 text-right">{item.total.toLocaleString()} ETB</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-72 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span><span>{invoice.subtotal.toLocaleString()} ETB</span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span><span>-{invoice.discount.toLocaleString()} ETB</span>
              </div>
            )}
            {invoice.tax > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Tax (VAT)</span><span>{invoice.tax.toLocaleString()} ETB</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-slate-800 border-t border-slate-200 pt-2 text-base">
              <span>Total</span><span>{invoice.total.toLocaleString()} ETB</span>
            </div>
            {paidAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Amount Paid</span><span>-{paidAmount.toLocaleString()} ETB</span>
              </div>
            )}
            {invoice.balance > 0 && (
              <div className="flex justify-between font-bold text-red-600 text-base bg-red-50 rounded-lg px-3 py-2">
                <span>Balance Due</span><span>{invoice.balance.toLocaleString()} ETB</span>
              </div>
            )}
            {invoice.balance === 0 && (
              <div className="flex justify-center font-bold text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
                PAID IN FULL
              </div>
            )}
          </div>
        </div>

        {/* Payment history */}
        {invoice.payments.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-sm font-semibold text-slate-700 mb-3">Payment History</p>
            <div className="space-y-2">
              {invoice.payments.map(payment => (
                <div key={payment.id} className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-2.5 text-sm">
                  <div className="flex items-center gap-3">
                    <CreditCard size={16} className="text-emerald-600" />
                    <div>
                      <p className="font-medium text-emerald-800">{payment.method}</p>
                      <p className="text-xs text-emerald-600">{payment.reference} · {payment.date}</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-700">{payment.amount.toLocaleString()} ETB</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
