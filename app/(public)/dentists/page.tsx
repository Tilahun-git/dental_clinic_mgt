import { dentists } from '../../lib/mock-data';
import { CheckCircle, XCircle, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function DentistsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800">Our Dental Team</h1>
        <p className="text-slate-500 mt-3 text-lg max-w-2xl mx-auto">
          Our team of highly qualified dentists is committed to providing you with the best dental care in Ethiopia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dentists.map((dentist) => (
          <div
            key={dentist.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-8 flex items-center gap-5">
              <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {dentist.avatar}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{dentist.name}</h2>
                <p className="text-sky-100 font-medium">{dentist.specialization}</p>
                <div className="flex items-center gap-2 mt-2">
                  {dentist.available ? (
                    <span className="flex items-center gap-1 text-emerald-200 text-sm">
                      <CheckCircle size={14} /> Available
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-200 text-sm">
                      <XCircle size={14} /> Currently Unavailable
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="text-sm font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                  {dentist.experience} years of experience
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{dentist.bio}</p>
              {dentist.available && (
                <Link
                  href={`/booking?dentist=${dentist.id}`}
                  className="mt-5 inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  <Calendar size={16} /> Book with {dentist.name.split(' ')[1]}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
