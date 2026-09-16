'use client';

import Link from 'next/link';
import { payrollRecords } from '../../../lib/mock-data';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Banknote, CheckCircle2, Clock3, AlertTriangle, ArrowRight, Download } from 'lucide-react';
import { downloadExcel, downloadPdf, printPayslip } from '../../../lib/document-utils';

const payrollStatusMap: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
  DRAFT: { label: 'Draft', variant: 'default' },
  CALCULATED: { label: 'Calculated', variant: 'info' },
  APPROVED: { label: 'Approved', variant: 'warning' },
  PAID: { label: 'Paid', variant: 'success' },
  FAILED: { label: 'Failed', variant: 'danger' },
};

export default function PayrollPage() {
  const totalGross = payrollRecords.reduce((sum, item) => sum + item.grossSalary, 0);
  const totalDeductions = payrollRecords.reduce((sum, item) => sum + item.totalDeductions, 0);
  const totalNet = payrollRecords.reduce((sum, item) => sum + item.netSalary, 0);
  const paidCount = payrollRecords.filter(item => item.status === 'PAID').length;
  const payrollHeaders = ['Payroll #', 'Employee', 'Position', 'Pay Period', 'Gross', 'Deductions', 'Net', 'Status'];
  const payrollRows = payrollRecords.map(record => [record.payrollNumber, record.employeeName, record.position, record.payPeriod, record.grossSalary, record.totalDeductions, record.netSalary, record.status]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Payroll & Payslips</h1>
          <p className="text-slate-500 text-sm mt-1">Monthly salary cycle for clinic staff</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => downloadPdf('payroll-report.pdf', 'Payroll Report', payrollHeaders, payrollRows)} className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-3 py-2.5 rounded-xl transition-colors">
            <Download size={15} /> PDF
          </button>
          <button onClick={() => downloadExcel('payroll-report.xlsx', 'Payroll', payrollHeaders, payrollRows)} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-3 py-2.5 rounded-xl transition-colors">
            <Download size={15} /> Excel
          </button>
          <Link href="/clinic/payroll" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
            <Banknote size={15} /> Run Payroll
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="text-center">
          <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Banknote size={18} className="text-violet-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{totalGross.toLocaleString()} ETB</p>
          <p className="text-slate-500 text-sm mt-1">Gross Payroll</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Clock3 size={18} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600">{totalDeductions.toLocaleString()} ETB</p>
          <p className="text-slate-500 text-sm mt-1">Deductions</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 size={18} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">{totalNet.toLocaleString()} ETB</p>
          <p className="text-slate-500 text-sm mt-1">Net Payroll</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <AlertTriangle size={18} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-500">{paidCount}</p>
          <p className="text-slate-500 text-sm mt-1">Paid This Cycle</p>
        </Card>
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Employee', 'Position', 'Period', 'Gross', 'Deductions', 'Net', 'Status', 'Payslip'].map((header) => (
                  <th key={header} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payrollRecords.map((record) => (
                <tr key={record.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{record.employeeName}</p>
                      <p className="text-xs text-slate-400 font-mono">{record.payrollNumber}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{record.position}</td>
                  <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{record.payPeriod}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-slate-800">{record.grossSalary.toLocaleString()} ETB</td>
                  <td className="py-3 px-4 text-sm text-amber-600 font-medium">{record.totalDeductions.toLocaleString()} ETB</td>
                  <td className="py-3 px-4 text-sm font-bold text-emerald-700">{record.netSalary.toLocaleString()} ETB</td>
                  <td className="py-3 px-4">
                    <Badge variant={payrollStatusMap[record.status]?.variant ?? 'default'}>{payrollStatusMap[record.status]?.label ?? record.status}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/clinic/payroll/${record.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700">
                        View <ArrowRight size={14} />
                      </Link>
                      <button onClick={() => printPayslip(record)} className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-800" title="Generate payslip">
                        <Download size={14} /> Payslip
                      </button>
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
