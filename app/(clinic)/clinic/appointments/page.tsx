'use client';

import { useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import { useAppointments } from '../../../lib/appointments-store';
import type { LifecycleStatus } from '../../../lib/appointments-store';
import { CheckCircle, X, UserCheck, Play, Flag, AlertTriangle } from 'lucide-react';

// Status badge config
const STATUS: Record<LifecycleStatus, { label: string; bg: string; text: string }> = {
  REQUESTED:  { label: 'Requested',   bg: 'bg-amber-100',   text: 'text-amber-800'  },
  CONFIRMED:  { label: 'Confirmed',   bg: 'bg-teal-100',    text: 'text-teal-800'   },
  CHECKED_IN: { label: 'Checked In',  bg: 'bg-indigo-100',  text: 'text-indigo-800' },
  IN_PROGRESS:{ label: 'In Progress', bg: 'bg-orange-100',  text: 'text-orange-800' },
  COMPLETED:  { label: 'Completed',   bg: 'bg-emerald-100', text: 'text-emerald-800'},
  CANCELLED:  { label: 'Cancelled',   bg: 'bg-red-100',     text: 'text-red-800'    },
  NO_SHOW:    { label: 'No Show',     bg: 'bg-stone-100',   text: 'text-stone-600'  },
  REJECTED:   { label: 'Rejected',    bg: 'bg-rose-100',    text: 'text-rose-800'   },
};

function StatusBadge({ status }: { status: LifecycleStatus }) {
  const s = STATUS[status] ?? { label: status, bg: 'bg-stone-100', text: 'text-stone-600' };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${s.bg} ${s.text}`}>{s.label}</span>;
}

const ALL_STATUSES: LifecycleStatus[] = ['REQUESTED','CONFIRMED','CHECKED_IN','IN_PROGRESS','COMPLETED','CANCELLED','NO_SHOW','REJECTED'];

type RejectModalState = { open: boolean; id: string; name: string };

export default function AppointmentsPage() {
  const { user } = useAuth();
  const role = user?.role ?? '';
  const {
    appointments, confirmAppt, rejectAppt,
    checkInAppt, startTreatment, completeAppt,
    markNoShow, cancelAppt,
  } = useAppointments();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<LifecycleStatus | 'ALL'>('ALL');
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [rejectModal, setRejectModal] = useState<RejectModalState>({ open: false, id: '', name: '' });
  const [rejectReason, setRejectReason] = useState('Time slot unavailable');

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = appointments.filter(a => {
    const canSeeAppointment = role !== 'DENTIST'
      || a.dentistName === user?.name;
    const matchSearch = `${a.patientName} ${a.dentistName} ${a.serviceName} ${a.date} ${a.appointmentNumber}`
      .toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === 'ALL' || a.status === filter;
    return canSeeAppointment && matchSearch && matchStatus;
  });

  // Count by status
  const counts = ALL_STATUSES.reduce((acc, s) => {
    acc[s] = appointments.filter(a =>
      a.status === s && (role !== 'DENTIST' || a.dentistName === user?.name)
    ).length;
    return acc;
  }, {} as Record<LifecycleStatus, number>);

  // Lifecycle action buttons — what each role can do per status
  const getActions = (appt: { id: string; patientName: string; status: LifecycleStatus }) => {
    const { id, patientName, status } = appt;
    const actions: React.ReactNode[] = [];

    if (role === 'RECEPTIONIST' || role === 'ADMIN') {
      if (status === 'REQUESTED') {
        actions.push(
          <button key="confirm" onClick={() => { confirmAppt(id); showToast(`✓ Confirmed for ${patientName}`); }}
            className="flex items-center gap-1 bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors">
            <CheckCircle size={12}/> Confirm
          </button>,
          <button key="reject" onClick={() => setRejectModal({ open: true, id, name: patientName })}
            className="flex items-center gap-1 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors">
            <X size={12}/> Reject
          </button>
        );
      }
      if (status === 'CONFIRMED') {
        actions.push(
          <button key="checkin" onClick={() => { checkInAppt(id); showToast(`✓ ${patientName} checked in`); }}
            className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors">
            <UserCheck size={12}/> Check In
          </button>,
          <button key="noshow" onClick={() => { markNoShow(id); showToast(`Marked no-show: ${patientName}`, false); }}
            className="flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors">
            <AlertTriangle size={12}/> No Show
          </button>
        );
      }
      if (status === 'REQUESTED' || status === 'CONFIRMED') {
        actions.push(
          <button key="cancel" onClick={() => { cancelAppt(id); showToast(`Cancelled: ${patientName}`, false); }}
            className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors">
            <X size={12}/> Cancel
          </button>
        );
      }
    }

    if (role === 'DENTIST' || role === 'ADMIN') {
      if (status === 'CHECKED_IN') {
        actions.push(
          <button key="start" onClick={() => { startTreatment(id); showToast(`▶ Treatment started for ${patientName}`); }}
            className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors">
            <Play size={12}/> Start Treatment
          </button>
        );
      }
      if (status === 'IN_PROGRESS') {
        actions.push(
          <button key="complete" onClick={() => { completeAppt(id); showToast(`✓ Completed: ${patientName}`); }}
            className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors">
            <Flag size={12}/> Complete
          </button>
        );
      }
    }

    return actions;
  };

  return (
    <div className="relative">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-semibold ${toast.ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {toast.ok ? <CheckCircle size={15}/> : <X size={15}/>} {toast.msg}
        </div>
      )}

      {/* Rejection reason modal */}
      {rejectModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl mx-4">
            <h3 className="font-black text-stone-900 mb-1">Reject Appointment</h3>
            <p className="text-stone-500 text-sm mb-4">Rejecting appointment for <strong>{rejectModal.name}</strong>. Please provide a reason.</p>
            <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={3}
              className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none mb-4" />
            <div className="flex gap-2">
              <button onClick={() => setRejectModal({ open: false, id: '', name: '' })}
                className="flex-1 border-2 border-stone-200 text-stone-600 font-semibold py-2.5 rounded-2xl text-sm">Cancel</button>
              <button onClick={() => {
                rejectAppt(rejectModal.id, rejectReason);
                showToast(`Rejected: ${rejectModal.name}`, false);
                setRejectModal({ open: false, id: '', name: '' });
              }} className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 rounded-2xl text-sm">
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-stone-900">Appointments</h1>
          <p className="text-stone-400 text-sm mt-0.5">{appointments.length} total</p>
        </div>
      </div>

      {/* Lifecycle flow diagram */}
      <div className="bg-white rounded-2xl p-4 mb-5 shadow-sm" style={{ border: '1px solid #E8E0D8' }}>
        <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-3">Appointment Lifecycle</p>
        <div className="flex items-center gap-1 flex-wrap">
          {(['REQUESTED','CONFIRMED','CHECKED_IN','IN_PROGRESS','COMPLETED'] as LifecycleStatus[]).map((s, i, arr) => (
            <div key={s} className="flex items-center gap-1">
              <button onClick={() => setFilter(filter === s ? 'ALL' : s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === s ? `${STATUS[s].bg} ${STATUS[s].text} ring-2 ring-offset-1 ring-current` : `${STATUS[s].bg} ${STATUS[s].text} opacity-70 hover:opacity-100`}`}>
                {STATUS[s].label} <span className="ml-1 opacity-60">({counts[s]})</span>
              </button>
              {i < arr.length - 1 && <span className="text-stone-300 text-xs font-bold">→</span>}
            </div>
          ))}
          <span className="text-stone-300 text-xs ml-2">|</span>
          {(['CANCELLED','NO_SHOW','REJECTED'] as LifecycleStatus[]).map(s => (
            <button key={s} onClick={() => setFilter(filter === s ? 'ALL' : s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ml-1 ${filter === s ? `${STATUS[s].bg} ${STATUS[s].text} ring-2 ring-offset-1 ring-current` : `${STATUS[s].bg} ${STATUS[s].text} opacity-70 hover:opacity-100`}`}>
              {STATUS[s].label} <span className="ml-1 opacity-60">({counts[s]})</span>
            </button>
          ))}
          {filter !== 'ALL' && (
            <button onClick={() => setFilter('ALL')} className="ml-2 text-xs text-stone-400 hover:text-stone-600 underline">Clear filter</button>
          )}
        </div>
      </div>

      {/* Search + table */}
      <div className="bg-white rounded-2xl shadow-sm" style={{ border: '1px solid #E8E0D8' }}>
        <div className="p-4" style={{ borderBottom: '1px solid #E8E0D8' }}>
          <input type="text" placeholder="Search by patient, dentist, service, or APT number..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8F5F2', borderBottom: '1px solid #E8E0D8' }}>
                {['Ref #','Patient','Dentist','Service','Date','Time','Status','Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-bold text-stone-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(appt => {
                const actions = getActions(appt);
                return (
                  <tr key={appt.id} style={{ borderBottom: '1px solid #F5F0EB' }} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-4 text-xs font-mono font-bold text-teal-600">{appt.appointmentNumber}</td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-bold text-stone-800">{appt.patientName}</p>
                      {appt.reason && <p className="text-xs text-stone-400 truncate max-w-[120px]" title={appt.reason}>{appt.reason}</p>}
                    </td>
                    <td className="py-3 px-4 text-sm text-stone-600 whitespace-nowrap">{appt.dentistName}</td>
                    <td className="py-3 px-4 text-sm text-stone-600">{appt.serviceName}</td>
                    <td className="py-3 px-4 text-sm text-stone-600 whitespace-nowrap">{appt.date}</td>
                    <td className="py-3 px-4 text-sm font-mono font-bold text-stone-700">{appt.time}</td>
                    <td className="py-3 px-4">
                      <div>
                        <StatusBadge status={appt.status} />
                        {/* Show timestamps for audit trail */}
                        {appt.status === 'CONFIRMED' && appt.confirmedAt && (
                          <p className="text-xs text-stone-300 mt-0.5">{new Date(appt.confirmedAt).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}</p>
                        )}
                        {appt.status === 'IN_PROGRESS' && appt.startedAt && (
                          <p className="text-xs text-orange-400 mt-0.5">Started {new Date(appt.startedAt).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}</p>
                        )}
                        {appt.status === 'COMPLETED' && appt.endedAt && (
                          <p className="text-xs text-emerald-500 mt-0.5">Ended {new Date(appt.endedAt).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}</p>
                        )}
                        {appt.status === 'REJECTED' && appt.rejectionReason && (
                          <p className="text-xs text-rose-400 mt-0.5 truncate max-w-[120px]" title={appt.rejectionReason}>{appt.rejectionReason}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {actions.length > 0 ? actions : <span className="text-xs text-stone-300">—</span>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-stone-400">
              <p className="font-semibold">No appointments found</p>
              {filter !== 'ALL' && <p className="text-sm mt-1">Try clearing the status filter</p>}
            </div>
          )}
        </div>
        <div className="px-4 py-3 text-xs text-stone-400" style={{ borderTop: '1px solid #E8E0D8' }}>
          Showing {filtered.length} of {appointments.length}
        </div>
      </div>
    </div>
  );
}
