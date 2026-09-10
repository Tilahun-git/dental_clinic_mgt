'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800">Contact Us</h1>
        <p className="text-slate-500 mt-3 text-lg">We'd love to hear from you. Get in touch with our team.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact info */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-bold text-slate-800 text-lg mb-4">Clinic Information</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-sky-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-700 text-sm">Address</p>
                  <p className="text-slate-500 text-sm">Bole Road, Near Edna Mall<br/>Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-700 text-sm">Phone</p>
                  <p className="text-slate-500 text-sm">+251 911 000 000<br/>+251 922 000 000</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-700 text-sm">Email</p>
                  <p className="text-slate-500 text-sm">info@smilecare.et<br/>appointments@smilecare.et</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex gap-2 mb-4">
              <Clock size={18} className="text-sky-500" />
              <h2 className="font-bold text-slate-800">Clinic Hours</h2>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { day: 'Monday – Friday', hours: '8:00 AM – 7:00 PM' },
                { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
                { day: 'Sunday', hours: '10:00 AM – 2:00 PM' },
                { day: 'Emergency', hours: '24/7', em: true },
              ].map((h) => (
                <div key={h.day} className="flex justify-between">
                  <span className="text-slate-600">{h.day}</span>
                  <span className={`font-medium ${h.em ? 'text-emerald-600' : 'text-slate-800'}`}>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-slate-100 rounded-2xl overflow-hidden h-48 flex items-center justify-center border border-slate-200">
            <div className="text-center text-slate-400">
              <MapPin size={32} className="mx-auto mb-2" />
              <p className="text-sm font-medium">Bole Road, Addis Ababa</p>
              <p className="text-xs">Interactive map unavailable in demo</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                <p className="text-slate-500 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', subject:'', message:'' }); }}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Send Us a Message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Abebe Kebede"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="+251 9XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option>Appointment Inquiry</option>
                      <option>Pricing & Services</option>
                      <option>Insurance Coverage</option>
                      <option>Emergency Dental</option>
                      <option>Feedback / Complaint</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>
                <button
                  onClick={() => { if (form.name && form.email && form.message) setSubmitted(true); }}
                  className="mt-5 w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Send Message
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
