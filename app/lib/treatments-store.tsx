'use client';

/**
 * Shared treatment plans store.
 * Dentist creates plans → patient portal shows them immediately.
 * Persisted in localStorage for the demo.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { treatmentPlans as initial } from './mock-data';
import type { TreatmentStatus } from './mock-data';

export type TreatmentItem = {
  id: string;
  service: string;
  quantity: number;
  unitPrice: number;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
};

export type TreatmentPlan = {
  id: string;
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  diagnosis: string;
  notes: string;
  status: TreatmentStatus;
  items: TreatmentItem[];
  totalCost: number;
  createdAt: string;
};

export type NewPlanInput = {
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  diagnosis: string;
  notes: string;
  items: Omit<TreatmentItem, 'id'>[];
};

interface StoreCtx {
  plans: TreatmentPlan[];
  addPlan: (input: NewPlanInput) => string;
  addItem: (planId: string, item: Omit<TreatmentItem, 'id'>) => void;
  updateStatus: (planId: string, status: TreatmentStatus) => void;
  updateItemStatus: (planId: string, itemId: string, status: TreatmentItem['status']) => void;
}

const Ctx = createContext<StoreCtx>({
  plans: [], addPlan: () => '', addItem: () => {},
  updateStatus: () => {}, updateItemStatus: () => {},
});

const KEY = 'senako_treatments_v1';

// Seed from mock data
const seed: TreatmentPlan[] = (initial as TreatmentPlan[]).map(p => ({
  ...p,
  items: p.items.map(i => ({ ...i, unitPrice: (i as {unitPrice?: number}).unitPrice ?? 0 })),
}));

export function TreatmentsProvider({ children }: { children: React.ReactNode }) {
  const [plans, setPlans] = useState<TreatmentPlan[]>(seed);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPlans(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(plans)); } catch { /* ignore */ }
  }, [plans]);

  const addPlan = useCallback((input: NewPlanInput): string => {
    const id = `tp-${Date.now()}`;
    const total = input.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    const plan: TreatmentPlan = {
      id,
      patientId: input.patientId,
      patientName: input.patientName,
      dentistId: input.dentistId,
      dentistName: input.dentistName,
      diagnosis: input.diagnosis,
      notes: input.notes,
      status: 'PLANNED',
      items: input.items.map((i, idx) => ({ ...i, id: `ti-${Date.now()}-${idx}` })),
      totalCost: total,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPlans(prev => [plan, ...prev]);
    return id;
  }, []);

  const addItem = useCallback((planId: string, item: Omit<TreatmentItem, 'id'>) => {
    setPlans(prev => prev.map(p => {
      if (p.id !== planId) return p;
      const newItem = { ...item, id: `ti-${Date.now()}` };
      const items = [...p.items, newItem];
      return { ...p, items, totalCost: items.reduce((s, i) => s + i.unitPrice * i.quantity, 0) };
    }));
  }, []);

  const updateStatus = useCallback((planId: string, status: TreatmentStatus) => {
    setPlans(prev => prev.map(p => p.id === planId ? { ...p, status } : p));
  }, []);

  const updateItemStatus = useCallback((planId: string, itemId: string, status: TreatmentItem['status']) => {
    setPlans(prev => prev.map(p => {
      if (p.id !== planId) return p;
      return { ...p, items: p.items.map(i => i.id === itemId ? { ...i, status } : i) };
    }));
  }, []);

  return (
    <Ctx.Provider value={{ plans, addPlan, addItem, updateStatus, updateItemStatus }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTreatments() { return useContext(Ctx); }
