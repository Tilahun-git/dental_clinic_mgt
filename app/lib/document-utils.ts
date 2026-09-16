import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

type InvoiceDocument = {
  invoiceNumber: string;
  patientName: string;
  dentistName: string;
  date: string;
  dueDate: string;
  items: { description: string; quantity: number; unitPrice: number; total: number }[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  balance: number;
  payments: { date: string; amount: number; method: string; reference: string }[];
  status: string;
};

type PayrollDocument = {
  payrollNumber: string;
  employeeName: string;
  position: string;
  payPeriod: string;
  basicSalary: number;
  overtime: number;
  bonus: number;
  allowance: number;
  grossSalary: number;
  tax: number;
  pension: number;
  otherDeductions: number;
  totalDeductions: number;
  netSalary: number;
  status: string;
  paymentDate?: string;
  paymentMethod?: string;
  paymentReference?: string;
  bankAccount?: string;
};

const money = (value: number) => `${value.toLocaleString()} ETB`;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character);
}

function downloadHtml(filename: string, html: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function openDocument(title: string, content: string) {
  const html = `<!doctype html><html><head><title>${escapeHtml(title)}</title><style>
    body{font-family:Arial,sans-serif;color:#17231d;margin:40px;line-height:1.45}
    h1{color:#176b49;margin-bottom:4px} h2{margin-top:28px;border-bottom:2px solid #176b49;padding-bottom:6px}
    .muted{color:#64736a}.header{display:flex;justify-content:space-between;border-bottom:1px solid #d8e4dc;padding-bottom:18px}
    table{width:100%;border-collapse:collapse;margin-top:14px}th{background:#176b49;color:#fff;text-align:left;padding:9px}td{border-bottom:1px solid #d8e4dc;padding:9px}td:last-child,th:last-child{text-align:right}
    .summary{margin:20px 0 0 auto;width:280px}.row{display:flex;justify-content:space-between;padding:5px 0}.total{font-weight:bold;font-size:1.1em;border-top:2px solid #176b49;padding-top:9px}.status{display:inline-block;background:#eaf5ee;color:#176b49;padding:4px 9px;border-radius:12px;font-weight:bold}
    @media print{body{margin:15mm}.no-print{display:none}}
  </style></head><body>${content}</body></html>`;
  const documentWindow = window.open('', '_blank', 'noopener,noreferrer');
  if (!documentWindow) {
    downloadHtml(`${title}.html`, html);
    return;
  }
  documentWindow.document.write(html);
  documentWindow.document.close();
  documentWindow.focus();
  window.setTimeout(() => {
    if (!documentWindow.closed) documentWindow.print();
  }, 500);
}

export function printInvoice(invoice: InvoiceDocument) {
  const items = invoice.items.map(item => `<tr><td>${escapeHtml(item.description)}</td><td>${item.quantity}</td><td>${money(item.unitPrice)}</td><td>${money(item.total)}</td></tr>`).join('');
  const payments = invoice.payments.length === 0
    ? '<p class="muted">No payments recorded.</p>'
    : `<table><thead><tr><th>Date</th><th>Method</th><th>Reference</th><th>Amount</th></tr></thead><tbody>${invoice.payments.map(payment => `<tr><td>${payment.date}</td><td>${escapeHtml(payment.method)}</td><td>${escapeHtml(payment.reference)}</td><td>${money(payment.amount)}</td></tr>`).join('')}</tbody></table>`;
  openDocument(invoice.invoiceNumber, `<div class="header"><div><h1>SmileCare Dental Clinic</h1><p class="muted">Bole Road, Addis Ababa<br>+251 911 000000 · info@smilecare.et</p></div><div><h1>${escapeHtml(invoice.invoiceNumber)}</h1><p class="status">${escapeHtml(invoice.status)}</p></div></div><p><strong>Bill to:</strong> ${escapeHtml(invoice.patientName)}<br><strong>Attending dentist:</strong> ${escapeHtml(invoice.dentistName)}<br><strong>Invoice date:</strong> ${invoice.date} &nbsp; <strong>Due date:</strong> ${invoice.dueDate}</p><h2>Services</h2><table><thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Total</th></tr></thead><tbody>${items}</tbody></table><div class="summary"><div class="row"><span>Subtotal</span><span>${money(invoice.subtotal)}</span></div>${invoice.discount > 0 ? `<div class="row"><span>Discount</span><span>-${money(invoice.discount)}</span></div>` : ''}<div class="row"><span>Tax (VAT)</span><span>${money(invoice.tax)}</span></div><div class="row total"><span>Total</span><span>${money(invoice.total)}</span></div><div class="row"><span>Balance due</span><strong>${money(invoice.balance)}</strong></div></div><h2>Payment History</h2>${payments}`);
}

export function printPayslip(payroll: PayrollDocument) {
  openDocument(payroll.payrollNumber, `<div class="header"><div><h1>SmileCare Dental Clinic</h1><p class="muted">Payroll department · Addis Ababa</p></div><div><h1>${escapeHtml(payroll.payrollNumber)}</h1><p class="status">${escapeHtml(payroll.status)}</p></div></div><p><strong>Employee:</strong> ${escapeHtml(payroll.employeeName)}<br><strong>Position:</strong> ${escapeHtml(payroll.position)}<br><strong>Pay period:</strong> ${payroll.payPeriod}<br><strong>Bank account:</strong> ${escapeHtml(payroll.bankAccount ?? 'Not available')}</p><h2>Earnings</h2><table><tbody><tr><td>Basic salary</td><td>${money(payroll.basicSalary)}</td></tr><tr><td>Overtime</td><td>${money(payroll.overtime)}</td></tr><tr><td>Bonus</td><td>${money(payroll.bonus)}</td></tr><tr><td>Allowance</td><td>${money(payroll.allowance)}</td></tr><tr><td><strong>Gross salary</strong></td><td><strong>${money(payroll.grossSalary)}</strong></td></tr></tbody></table><h2>Deductions</h2><table><tbody><tr><td>Income tax</td><td>${money(payroll.tax)}</td></tr><tr><td>Pension</td><td>${money(payroll.pension)}</td></tr><tr><td>Other deductions</td><td>${money(payroll.otherDeductions)}</td></tr><tr><td><strong>Total deductions</strong></td><td><strong>${money(payroll.totalDeductions)}</strong></td></tr></tbody></table><div class="summary"><div class="row total"><span>Net salary</span><span>${money(payroll.netSalary)}</span></div></div><p class="muted">Payment date: ${payroll.paymentDate ?? 'Pending'}<br>Payment method: ${escapeHtml(payroll.paymentMethod ?? 'Pending')}<br>Payment reference: ${escapeHtml(payroll.paymentReference ?? 'Pending')}</p>`);
}

export function downloadCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const csv = [headers, ...rows].map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadPdf(filename: string, title: string, headers: string[], rows: (string | number)[][]) {
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 40;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const usableWidth = pageWidth - margin * 2;
  const columnWidth = usableWidth / headers.length;
  let y = 48;

  pdf.setFontSize(18);
  pdf.setTextColor(24, 121, 78);
  pdf.text(title, margin, y);
  y += 24;
  pdf.setFontSize(9);
  pdf.setTextColor(100, 117, 106);
  pdf.text(`Generated ${new Date().toLocaleString()}`, margin, y);
  y += 20;

  const drawHeader = () => {
    pdf.setFillColor(24, 121, 78);
    pdf.rect(margin, y, usableWidth, 22, 'F');
    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    headers.forEach((header, index) => pdf.text(String(header), margin + index * columnWidth + 6, y + 14, { maxWidth: columnWidth - 12 }));
    y += 22;
  };

  drawHeader();
  rows.forEach((row, rowIndex) => {
    if (y > 760) {
      pdf.addPage();
      y = 48;
      drawHeader();
    }
    if (rowIndex % 2 === 0) {
      pdf.setFillColor(242, 248, 245);
      pdf.rect(margin, y, usableWidth, 20, 'F');
    }
    pdf.setFontSize(8);
    pdf.setTextColor(23, 35, 29);
    row.forEach((value, index) => pdf.text(String(value), margin + index * columnWidth + 6, y + 13, { maxWidth: columnWidth - 12 }));
    y += 20;
  });

  pdf.save(filename);
}

export function downloadExcel(filename: string, sheetName: string, headers: string[], rows: (string | number)[][]) {
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  worksheet['!cols'] = headers.map(() => ({ wch: 22 }));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName.slice(0, 31));
  XLSX.writeFile(workbook, filename);
}

export function downloadInvoicePdf(invoice: InvoiceDocument) {
  downloadPdf(
    `${invoice.invoiceNumber}.pdf`,
    `SENAKO Dental Clinic - ${invoice.invoiceNumber}`,
    ['Description', 'Qty', 'Unit Price', 'Total'],
    invoice.items.map(item => [item.description, item.quantity, money(item.unitPrice), money(item.total)])
  );
}