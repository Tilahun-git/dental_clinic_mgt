'use client';

/**
 * Shared appointments store — full lifecycle:
 * REQUESTED → CONFIRMED → CHECKED_IN → IN_PROGRESS → COMPLETED
 * Also: CANCELLED, NO_SHOW, REJECTED
 *
 * Role actions:
 *   Receptionist: confirm, reject, checkIn, markNoShow, cancel
 *   Dentist:      startTreatment (CHECKED_IN→IN_PROGRESS), complete (IN_PROGRESS→COMPLETED)
 *   Patient:      cancel (own REQUESTED appointment)
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { appointments as initialAppts, services, dentists } from './mock-data';

export type LifecycleStatus =
  | 'REQUESTED'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'
  | 'REJECTED';

export type AppointmentRecord = {
  id: string;
  appointmentNumber: string;  // APT-XXXX
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: LifecycleStatus;
  room?: string;
  notes?: string;
  reason?: string;            // patient's reason for visit
  // Timestamps
  bookedAt?: string;
  confirmedAt?: string;
  checkedInAt?: string;
  startedAt?: string;
  endedAt?: string;
  cancelledAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  cancellationReason?: string;
};

export type NewBooking = {
  patientId: string;
  patientName: string;
  serviceId: string;
  dentistId: string;
  date: string;
  time: string;
  reason?: string;
  notes?: string;
};

interface StoreContextType {
  appointments: AppointmentRecord[];
  // Lifecycle actions
  bookAppointment:   (booking: NewBooking) => string;
  confirmAppt:       (id: string) => void;
  rejectAppt:        (id: string, reason?: string) => void;
  checkInAppt:       (id: string) => void;
  startTreatment:    (id: string) => void;
  completeAppt:      (id: string) => void;
  markNoShow:        (id: string) => void;
  cancelAppt:        (id: string, reason?: string) => void;
  reset:             () => void;
}

const Ctx = createContext<StoreContextType>({
  appointments: [],
  bookAppointment: () => '',
  confirmAppt: () => {}, rejectAppt: () => {}, checkInAppt: () => {},
  startTreatment: () => {}, completeAppt: () => {}, markNoShow: () => {},
  cancelAppt: () => {}, reset: () => {},
});

const KEY = 'senako_appts_v3';
let aptCounter = 1000;

function load(): AppointmentRecord[] | null {
  try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; }
  catch { return null; }
}
function save(d: AppointmentRecord[]) {
  try { localStorage.setItem(KEY, JSON.stringify(d)); } catch { /**/ }
}

// Seed: convert mock appointments to AppointmentRecord
const seed: AppointmentRecord[] = (initialAppts as AppointmentRecord[]).map((a, i) => ({
  ...a,
  appointmentNumber: `APT-${1001 + i}`,
  status: (a.status as LifecycleStatus) ?? 'REQUESTED',
  bookedAt: a.bookedAt ?? new Date(2025, 6, 1).toISOString(),
}));

export function AppointmentsProvider({ children }: { children: React.ReactNode }) {
  const [appts, setAppts] = useState<AppointmentRecord[]>(seed);

  useEffect(() => {
    const stored = load();
    if (stored && stored.length > 0) setAppts(stored);
  }, []);

  useEffect(() => { save(appts); }, [appts]);

  const update = useCallback((id: string, patch: Partial<AppointmentRecord>) => {
    setAppts(prev => prev.map(a => a.id === id ? { ...a, ...patch } : a));
  }, []);

  const bookAppointment = useCallback((b: NewBooking): string => {
    const svc = services.find(s => s.id === b.serviceId);
    const doc = dentists.find(d => d.id === b.dentistId);
    aptCounter++;
    const id = `appt-${Date.now()}`;
    const rec: AppointmentRecord = {
      id,
      appointmentNumber: `APT-${aptCounter}`,
      patientId: b.patientId,
      patientName: b.patientName,
      dentistId: b.dentistId,
      dentistName: doc?.name ?? 'Unknown Dentist',
      serviceId: b.serviceId,
      serviceName: svc?.name ?? 'Unknown Service',
      date: b.date,
      time: b.time,
      status: 'REQUESTED',
      reason: b.reason ?? '',
      notes: b.notes ?? '',
      bookedAt: new Date().toISOString(),
    };
    setAppts(prev => [rec, ...prev]);
    return id;
  }, []);

  // REQUESTED → CONFIRMED (Receptionist)
  const confirmAppt = useCallback((id: string) => {
    setAppts(prev => prev.map(a => a.id === id && a.status === 'REQUESTED'
      ? { ...a, status: 'CONFIRMED', confirmedAt: new Date().toISOString() }
      : a));
  }, [update]);

  // REQUESTED → REJECTED (Receptionist)
  const rejectAppt = useCallback((id: string, reason = 'Time slot unavailable') => {
    update(id, { status: 'REJECTED', rejectedAt: new Date().toISOString(), rejectionReason: reason });
  }, [update]);

  // CONFIRMED → CHECKED_IN (Receptionist — patient has arrived)
  const checkInAppt = useCallback((id: string) => {
    setAppts(prev => prev.map(a => a.id === id && a.status === 'CONFIRMED'
      ? { ...a, status: 'CHECKED_IN', checkedInAt: new Date().toISOString() }
      : a));
  }, [update]);

  // CHECKED_IN → IN_PROGRESS (Dentist — starts treatment)
  const startTreatment = useCallback((id: string) => {
    setAppts(prev => prev.map(a => a.id === id && a.status === 'CHECKED_IN'
      ? { ...a, status: 'IN_PROGRESS', startedAt: new Date().toISOString() }
      : a));
  }, [update]);

  // IN_PROGRESS → COMPLETED (Dentist)
  const completeAppt = useCallback((id: string) => {
    setAppts(prev => prev.map(a => a.id === id && a.status === 'IN_PROGRESS'
      ? { ...a, status: 'COMPLETED', endedAt: new Date().toISOString() }
      : a));
  }, [update]);

  // CONFIRMED → NO_SHOW (Receptionist — patient didn't show up)
  const markNoShow = useCallback((id: string) => {
    update(id, { status: 'NO_SHOW' });
  }, [update]);

  // Any → CANCELLED
  const cancelAppt = useCallback((id: string, reason = 'Cancelled') => {
    update(id, { status: 'CANCELLED', cancelledAt: new Date().toISOString(), cancellationReason: reason });
  }, [update]);

  const reset = useCallback(() => {
    setAppts(seed.map(a => ({ ...a })));
    localStorage.removeItem(KEY);
  }, []);

  return (
    <Ctx.Provider value={{
      appointments: appts, bookAppointment,
      confirmAppt, rejectAppt, checkInAppt, startTreatment, completeAppt, markNoShow, cancelAppt, reset,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppointments() { return useContext(Ctx); }
