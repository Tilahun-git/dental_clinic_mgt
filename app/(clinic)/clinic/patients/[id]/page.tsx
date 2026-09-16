'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppointments } from '../../../../lib/appointments-store';
import { patients, invoices, treatmentPlans, prescriptions, medicalRecords } from '../../../../lib/mock-data';
import { Card, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Badge, AppointmentBadge, InvoiceBadge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Phone, Mail, MapPin, Heart, AlertCircle, Calendar, ArrowLeft, FileDown, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';
import { downloadExcel, downloadPdf } from '../../../../lib/document-utils';

const tabs = ['Overview', 'Appointments', 'Records', 'Treatments', 'Prescriptions', 'Invoices'] as const;
type Tab = typeof tabs[number];

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const { appointments } = useAppointments();

  const patient = patients.find(p => p.id === id);
  const patientAppts = appointments.filter(a => a.patientId === id);
  const patientInvoices = invoices.filter(inv => inv.patientId === id);
  const patientPlans = treatmentPlans.filter(t => t.patientId === id);
  const patientRx = prescriptions.filter(r => r.patientId === id);
  const patientRecords = medicalRecords.filter(r => r.patientId === id);
  const treatmentExportHeaders = ['Patient', 'Diagnosis', 'Dentist', 'Created', 'Treatment', 'Quantity', 'Unit Price', 'Status'];
  const treatmentExportRows = patientPlans.flatMap(plan => plan.items.map(item => [
    `${patient?.firstName ?? ''} ${patient?.lastName ?? ''}`.trim(), plan.diagnosis, plan.dentistName, plan.createdAt,
    item.service, item.quantity, item.unitPrice, item.status,
  ]));

  if (!patient) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg">Patient not found</p>
        <Link href="/clinic/patients" className="text-sky-600 mt-2 inline-block hover:underline">Back to Patients</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <Link href="/clinic/patients" className="p-2 hover:bg-slate-100 rounded-lg transition-colors mt-1">
          <ArrowLeft size={18} className="text-slate-500" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 text-xl font-bold flex-shrink-0">
              {patient.firstName[0]}{patient.lastName[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{patient.firstName} {patient.lastName}</h1>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-sm text-slate-500 font-mono">{patient.patientId}</span>
                <Badge variant={patient.status === 'Active' ? 'success' : 'gray'}>{patient.status}</Badge>
                <span className="text-sm text-slate-400">{patient.gender} · {patient.dob}</span>
              </div>
            </div>
          </div>
        </div>
        <Link href={`/booking?patient=${patient.id}`}>
          <Button variant="primary" size="sm">
            <Calendar size={14} /> New Appointment
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
            <div className="mt-3 space-y-3">
              {[
                { icon: Phone, label: 'Phone', value: patient.phone },
                { icon: Mail, label: 'Email', value: patient.email },
                { icon: MapPin, label: 'Address', value: patient.address },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-sm text-slate-700">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader><CardTitle>Medical Information</CardTitle></CardHeader>
            <div className="mt-3 space-y-3">
              <div className="flex items-start gap-3">
                <Heart size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Blood Type</p>
                  <p className="text-sm font-bold text-red-600">{patient.bloodType}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Allergies</p>
                  <p className="text-sm text-slate-700">{patient.allergies || 'None known'}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Emergency Contact</p>
                <p className="text-sm text-slate-700">Not on file</p>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Quick Stats</CardTitle></CardHeader>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              {[
                { label: 'Total Appointments', value: patientAppts.length, color: 'text-sky-600 bg-sky-50' },
                { label: 'Active Treatments', value: patientPlans.filter(p => p.status === 'IN_PROGRESS').length, color: 'text-orange-600 bg-orange-50' },
                { label: 'Prescriptions', value: patientRx.length, color: 'text-purple-600 bg-purple-50' },
                { label: 'Outstanding (ETB)', value: patientInvoices.reduce((s,i) => s+i.balance,0).toLocaleString(), color: 'text-red-600 bg-red-50' },
              ].map(stat => (
                <div key={stat.label} className={`${stat.color} rounded-xl p-4`}>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs mt-0.5 opacity-70">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Appointments Tab */}
      {activeTab === 'Appointments' && (
        <Card padding={false}>
          <div className="p-4 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-700">{patientAppts.length} appointments</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Date', 'Time', 'Service', 'Dentist', 'Status'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patientAppts.map(appt => (
                  <tr key={appt.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm text-slate-700">{appt.date}</td>
                    <td className="py-3 px-4 text-sm font-mono text-slate-800">{appt.time}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{appt.serviceName}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{appt.dentistName}</td>
                    <td className="py-3 px-4"><AppointmentBadge status={appt.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {patientAppts.length === 0 && <p className="text-center py-8 text-slate-400 text-sm">No appointments</p>}
          </div>
        </Card>
      )}

      {/* Records Tab */}
      {activeTab === 'Records' && (
        <div className="space-y-4">
          {patientRecords.length === 0 ? (
            <Card><p className="text-center py-8 text-slate-400 text-sm">No records found</p></Card>
          ) : patientRecords.map(rec => (
            <Card key={rec.id}>
              <CardHeader>
                <CardTitle>{rec.chiefComplaint}</CardTitle>
                <span className="text-xs text-slate-500">{rec.dentistName} · {rec.date}</span>
              </CardHeader>
              {rec.diagnosis && <p className="text-sm text-amber-700 mt-2 bg-amber-50 rounded-lg px-3 py-2">{rec.diagnosis}</p>}
              {rec.clinicalNotes && <p className="text-sm text-slate-600 mt-2">{rec.clinicalNotes}</p>}
              {rec.followUpInstructions && <p className="text-xs text-emerald-700 mt-2 bg-emerald-50 rounded-lg px-3 py-2">Follow-up: {rec.followUpInstructions}</p>}
            </Card>
          ))}
        </div>
      )}

      {/* Treatments Tab */}
      {activeTab === 'Treatments' && (
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <button onClick={() => downloadPdf(`${patient.patientId}-treatment-plans.pdf`, `${patient.firstName} ${patient.lastName} - Treatment Plans`, treatmentExportHeaders, treatmentExportRows)} className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-3 py-2 rounded-xl">
              <FileDown size={14} /> PDF
            </button>
            <button onClick={() => downloadExcel(`${patient.patientId}-treatment-plans.xlsx`, 'Treatment Plans', treatmentExportHeaders, treatmentExportRows)} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-3 py-2 rounded-xl">
              <FileSpreadsheet size={14} /> Excel
            </button>
          </div>
          {patientPlans.length === 0 ? (
            <Card><p className="text-center py-8 text-slate-400 text-sm">No treatment plans</p></Card>
          ) : patientPlans.map(plan => (
            <Card key={plan.id}>
              <CardHeader>
                <CardTitle>{plan.diagnosis}</CardTitle>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  plan.status === 'IN_PROGRESS' ? 'bg-orange-100 text-orange-700' :
                  plan.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                  plan.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                  'bg-slate-100 text-slate-700'
                }`}>{plan.status.replace('_', ' ')}</span>
              </CardHeader>
              <p className="text-sm text-slate-500 mt-2">{plan.dentistName} · Started {plan.createdAt}</p>
              <div className="mt-3 space-y-1.5">
                {plan.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm py-1">
                    <span className={item.status === 'COMPLETED' ? 'line-through text-slate-400' : 'text-slate-700'}>{item.service}</span>
                    <span className="text-slate-500">{item.unitPrice.toLocaleString()} ETB</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-sm font-bold">
                <span className="text-slate-600">Total</span>
                <span className="text-slate-800">{plan.totalCost.toLocaleString()} ETB</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Prescriptions Tab */}
      {activeTab === 'Prescriptions' && (
        <div className="space-y-4">
          {patientRx.length === 0 ? (
            <Card><p className="text-center py-8 text-slate-400 text-sm">No prescriptions</p></Card>
          ) : patientRx.map(rx => (
            <Card key={rx.id}>
              <CardHeader>
                <CardTitle>Prescription – {rx.date}</CardTitle>
                <span className="text-xs text-slate-500">{rx.dentistName}</span>
              </CardHeader>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {rx.medications.map((med, i) => (
                  <div key={i} className="bg-purple-50 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-purple-800">{med.name}</p>
                    <p className="text-purple-600 text-xs mt-0.5">{med.dosage} · {med.frequency} · {med.duration}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'Invoices' && (
        <Card padding={false}>
          <div className="p-4 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-700">{patientInvoices.length} invoices · Outstanding: {patientInvoices.reduce((s,i)=>s+i.balance,0).toLocaleString()} ETB</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Invoice #', 'Date', 'Total', 'Paid', 'Balance', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patientInvoices.map(inv => (
                  <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm font-mono text-sky-600">{inv.invoiceNumber}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{inv.date}</td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-800">{inv.total.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-emerald-600">{inv.payments.reduce((s,p)=>s+p.amount,0).toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm font-bold text-red-600">{inv.balance.toLocaleString()}</td>
                    <td className="py-3 px-4"><InvoiceBadge status={inv.status} /></td>
                    <td className="py-3 px-4">
                      <Link href={`/clinic/billing/${inv.id}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {patientInvoices.length === 0 && <p className="text-center py-8 text-slate-400 text-sm">No invoices</p>}
          </div>
        </Card>
      )}
    </div>
  );
}
