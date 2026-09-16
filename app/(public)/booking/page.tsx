'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { services, dentists } from '../../lib/mock-data';
import { useAuth } from '../../lib/auth-context';
import { useAppointments } from '../../lib/appointments-store';
import { CheckCircle, ChevronRight, ChevronLeft, Calendar, Clock, Lock, Stethoscope } from 'lucide-react';
import Link from 'next/link';

const timeSlots = [
  '08:00','08:30','09:00','09:30','10:00','10:30',
  '11:00','11:30','13:00','13:30','14:00','14:30',
  '15:00','15:30','16:00','16:30',
];
const steps = ['Service','Dentist','Date & Time','Confirm'];

function BookingPageContent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { bookAppointment } = useAppointments();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState('');
  const [dentistId, setDentistId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bookedId, setBookedId] = useState('');

  useEffect(() => {
    const requestedService = searchParams.get('service');
    const requestedDentist = searchParams.get('dentist');

    if (requestedService && services.some(service => service.id === requestedService)) {
      setServiceId(requestedService);
    }

    if (requestedDentist && dentists.some(dentist => dentist.id === requestedDentist)) {
      setDentistId(requestedDentist);
    }
  }, [searchParams]);

  useEffect(() => {
    if (serviceId && dentistId) {
      setStep(2);
      return;
    }
    if (serviceId || dentistId) {
      setStep(1);
      return;
    }
    setStep(0);
  }, [serviceId, dentistId]);

  const today = new Date().toISOString().split('T')[0];

  // ─── Not authenticated ────────────────────────────────────────────────
  if (!isLoading && (!isAuthenticated || user?.role !== 'PATIENT')) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl shadow-xl p-10" style={{ border: '1px solid #E8E0D8' }}>
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <Lock size={36} className="text-teal-600" />
          </div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">
            {isAuthenticated ? 'Patient Account Required' : 'Login Required'}
          </h2>
          <p className="text-stone-500 mb-2">
            {isAuthenticated
              ? 'Only patient accounts can request appointments at '
              : 'Please log in to book an appointment at '}
            <span className="font-bold text-teal-600">SENAKO Dental Clinic</span>.
          </p>
          <p className="text-stone-400 text-sm mb-8">Don&apos;t have an account? Register for free.</p>
          <div className="flex flex-col gap-3">
            <Link href={isAuthenticated ? '/portal/dashboard' : '/login?returnTo=%2Fbooking'} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md text-center">
              {isAuthenticated ? 'Go to Patient Portal' : 'Login to Book Appointment'}
            </Link>
            <Link href="/register" className="w-full border-2 border-teal-200 text-teal-600 hover:bg-teal-50 font-semibold py-3 rounded-2xl transition-colors text-center">
              Create New Account
            </Link>
            <Link href="/" className="text-sm text-stone-400 hover:text-stone-600 mt-1 transition-colors">← Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
        <Stethoscope size={22} className="text-white" />
      </div>
    </div>
  );

  // ─── Submitted ────────────────────────────────────────────────────────
  if (submitted) {
    const svc = services.find(s => s.id === serviceId);
    const doc = dentists.find(d => d.id === dentistId);
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl shadow-xl p-10" style={{ border: '1px solid #E8E0D8' }}>
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={38} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">Appointment Requested!</h2>
          <p className="text-stone-500 mb-1">
            Hi <strong>{user?.name.split(' ')[0]}</strong>! Your request has been sent to our front desk.
          </p>
          <p className="text-stone-400 text-sm mb-6">We&apos;ll confirm your appointment within 24 hours.</p>
          <div className="bg-teal-50 rounded-2xl p-5 text-left space-y-2.5 mb-7 text-sm" style={{ border: '1px solid #CCECE9' }}>
            <div className="flex justify-between"><span className="text-stone-400">Service</span><span className="font-semibold text-stone-800">{svc?.name}</span></div>
            <div className="flex justify-between"><span className="text-stone-400">Dentist</span><span className="font-semibold text-stone-800">{doc?.name}</span></div>
            <div className="flex justify-between"><span className="text-stone-400">Date</span><span className="font-semibold text-stone-800">{date}</span></div>
            <div className="flex justify-between"><span className="text-stone-400">Time</span><span className="font-semibold text-stone-800">{time}</span></div>
            <div className="flex justify-between border-t pt-2.5" style={{ borderColor: '#CCECE9' }}>
              <span className="text-stone-400">Status</span>
              <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg text-xs">REQUESTED — awaiting confirmation</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/portal/appointments"
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-2xl transition-colors text-center">
              View My Appointments
            </Link>
            <button
              onClick={() => { setSubmitted(false); setStep(0); setServiceId(''); setDentistId(''); setDate(''); setTime(''); }}
              className="flex-1 border-2 border-teal-200 text-teal-600 hover:bg-teal-50 font-semibold py-3 rounded-2xl transition-colors">
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  const canNext = (
    (step === 0 && !!serviceId) ||
    (step === 1 && !!dentistId) ||
    (step === 2 && !!date && !!time) ||
    step === 3
  );

  const handleSubmit = () => {
    if (!user) return;
    const id = bookAppointment({
      patientId: user.patientId ?? user.id,
      patientName: user.name,
      serviceId,
      dentistId,
      date,
      time,
    });
    setBookedId(id);
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-stone-900">Book an Appointment</h1>
        <p className="text-stone-400 mt-1 text-sm">Logged in as <span className="text-teal-600 font-semibold">{user?.name}</span></p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center mb-8 gap-1">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border-2 transition-all ${
              i < step ? 'bg-teal-600 border-teal-600 text-white' :
              i === step ? 'border-teal-600 text-teal-600 bg-white' :
              'border-stone-300 text-stone-300 bg-white'}`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`mx-1.5 text-xs font-medium hidden sm:block ${i <= step ? 'text-stone-700' : 'text-stone-300'}`}>{s}</span>
            {i < steps.length - 1 && <div className={`w-6 h-0.5 ${i < step ? 'bg-teal-600' : 'bg-stone-200'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm p-7" style={{ border: '1px solid #E8E0D8' }}>

        {/* Step 0: Service */}
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-5">Select a Service</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map(svc => (
                <button key={svc.id} onClick={() => setServiceId(svc.id)}
                  className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                    serviceId === svc.id ? 'border-teal-500 bg-teal-50' : 'border-stone-200 hover:border-teal-200 hover:bg-teal-50/30'}`}>
                  <span className="text-2xl">{svc.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-stone-800 text-sm">{svc.name}</p>
                    <p className="text-stone-400 text-xs mt-0.5">{svc.duration} min · {svc.price.toLocaleString()} ETB</p>
                  </div>
                  {serviceId === svc.id && <CheckCircle size={16} className="text-teal-500 shrink-0 mt-0.5" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Dentist */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-5">Choose a Dentist</h2>
            <div className="space-y-3">
              {dentists.filter(d => d.available).map(doc => (
                <button key={doc.id} onClick={() => setDentistId(doc.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                    dentistId === doc.id ? 'border-teal-500 bg-teal-50' : 'border-stone-200 hover:border-teal-200'}`}>
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    {doc.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-800">{doc.name}</p>
                    <p className="text-teal-600 text-sm">{doc.specialization}</p>
                    <p className="text-stone-400 text-xs">{doc.experience} years experience</p>
                  </div>
                  {dentistId === doc.id && <CheckCircle size={18} className="text-teal-500 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-5">Choose Date & Time</h2>
            <div className="mb-5">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-stone-700 mb-2">
                <Calendar size={14} className="text-teal-600" /> Select Date
              </label>
              <input type="date" min={today} value={date}
                onChange={e => { setDate(e.target.value); setTime(''); }}
                className="w-full border-2 border-stone-200 rounded-2xl px-4 py-3 text-stone-800 focus:outline-none focus:border-teal-500" />
            </div>
            {date && (
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-stone-700 mb-3">
                  <Clock size={14} className="text-teal-600" /> Available Slots
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(slot => (
                    <button key={slot} onClick={() => setTime(slot)}
                      className={`py-2.5 text-sm rounded-xl border-2 font-medium transition-all ${
                        time === slot ? 'bg-teal-600 border-teal-600 text-white shadow-sm' : 'border-stone-200 hover:border-teal-300 text-stone-600'}`}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-5">Confirm Appointment</h2>
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 space-y-3 text-sm mb-5">
              {[
                { label: 'Patient', value: user?.name },
                { label: 'Service', value: services.find(s => s.id === serviceId)?.name },
                { label: 'Dentist', value: dentists.find(d => d.id === dentistId)?.name },
                { label: 'Date', value: date },
                { label: 'Time', value: time },
                { label: 'Est. Cost', value: `${services.find(s => s.id === serviceId)?.price.toLocaleString()} ETB`, bold: true },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-stone-400">{item.label}</span>
                  <span className={`${item.bold ? 'font-black text-teal-700 text-base' : 'font-semibold text-stone-800'}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 flex items-start gap-2">
              <span className="text-base">📋</span>
              <span>Your appointment will be <strong>REQUESTED</strong> status. Our receptionist will confirm it and you&apos;ll see the update in your portal.</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid #E8E0D8' }}>
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-stone-500 hover:text-stone-800 disabled:opacity-30 transition-colors">
            <ChevronLeft size={16} /> Back
          </button>

          {step < steps.length - 1 ? (
            <button onClick={() => setStep(step + 1)} disabled={!canNext}
              className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-2xl text-sm font-bold transition-all disabled:opacity-40 shadow-sm">
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-sm">
              <CheckCircle size={16} /> Submit Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-sm text-stone-500">Loading booking...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
