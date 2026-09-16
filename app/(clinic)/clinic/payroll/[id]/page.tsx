'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { payrollRecords } from '../../../../lib/mock-data';
import { Badge } from '../../../../components/ui/badge';
import { Card } from '../../../../components/ui/card';
import { ArrowLeft, Download, CreditCard } from 'lucide-react';
import { printPayslip } from '../../../../lib/document-utils';

const statusMap: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
  DRAFT: { label: 'Draft', variant: 'default' },
  CALCULATED: { label: 'Calculated', variant: 'info' },
  APPROVED: { label: 'Approved', variant: 'warning' },
  PAID: { label: 'Paid', variant: 'success' },
  FAILED: { label: 'Failed', variant: 'danger' },
};

export default function PayrollDetailPage() {
  const { id } = useParams<{ id: string }>();
  const payroll = payrollRecords.find((item) => item.id === id);

  if (!payroll) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg">Payroll record not found</p>
        <Link href="/clinic/payroll" className="text-violet-600 mt-2 inline-block hover:underline">Back to Payroll</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/clinic/payroll" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft size={18} className="text-slate-500" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{payroll.payrollNumber}</h1>
            <p className="text-sm text-slate-500">Pay period: {payroll.payPeriod}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => printPayslip(payroll)} className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-2 rounded-xl text-sm font-semibold">
            <Download size={14} /> Generate Payslip
          </button>
          <button className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 rounded-xl text-sm font-semibold">
            <CreditCard size={14} /> Approve
          </button>
        </div>
      </div>

      <Card>
        <div className="border-b border-slate-100 pb-5 mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-violet-600">SmileCare Dental Clinic</h2>
            <p className="text-sm text-slate-500">Payroll department · Addis Ababa</p>
          </div>
          <Badge variant={statusMap[payroll.status]?.variant ?? 'default'}>{statusMap[payroll.status]?.label ?? payroll.status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">Employee</p>
            <p className="font-semibold text-slate-800">{payroll.employeeName}</p>
            <p className="text-sm text-slate-500">{payroll.position}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">Bank Account</p>
            <p className="font-semibold text-slate-800">{payroll.bankAccount ?? 'Not available'}</p>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Earnings</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 text-sm text-slate-700">Basic Salary</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{payroll.basicSalary.toLocaleString()} ETB</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 text-sm text-slate-700">Overtime</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{payroll.overtime.toLocaleString()} ETB</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 text-sm text-slate-700">Bonus</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{payroll.bonus.toLocaleString()} ETB</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 text-sm text-slate-700">Allowance</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{payroll.allowance.toLocaleString()} ETB</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-bold text-slate-800">Gross Salary</td>
                <td className="px-4 py-3 text-sm font-bold text-slate-800 text-right">{payroll.grossSalary.toLocaleString()} ETB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Deductions</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 text-sm text-slate-700">Income Tax</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{payroll.tax.toLocaleString()} ETB</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 text-sm text-slate-700">Pension</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{payroll.pension.toLocaleString()} ETB</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700">Other Deductions</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right">{payroll.otherDeductions.toLocaleString()} ETB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-72 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Total Deductions</span>
              <span>{payroll.totalDeductions.toLocaleString()} ETB</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800 border-t border-slate-200 pt-2 text-base">
              <span>Net Salary</span>
              <span>{payroll.netSalary.toLocaleString()} ETB</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
