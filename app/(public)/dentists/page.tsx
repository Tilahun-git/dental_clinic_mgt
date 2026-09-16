import { dentists } from '../../lib/mock-data';
import { CheckCircle, XCircle, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function DentistsPage() {
  return (
    <div className="page-bg min-h-full text-[var(--text-base)] px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.24em] mb-3">The SENAKO team</p>
        <h1 className="text-4xl font-bold text-[var(--text-heading)]">Our Dental Team</h1>
        <p className="text-[var(--text-muted)] mt-3 text-lg max-w-2xl mx-auto">
          Our team of highly qualified dentists is committed to providing you with the best dental care in Ethiopia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dentists.map((dentist) => (
          <div
            key={dentist.id}
            className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] overflow-hidden hover:border-amber-400/60 transition-colors"
          >
            <div className="bg-[var(--surface-soft)] p-6 flex items-center gap-5">
              <div
                className="w-24 h-24 rounded-full bg-zinc-800 bg-cover bg-center ring-2 ring-amber-400/70 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                style={{ backgroundImage: `url(${dentist.image})` }}
                role="img"
                aria-label={`${dentist.name} portrait`}
              >
                <span className="sr-only">{dentist.avatar}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--text-heading)]">{dentist.name}</h2>
                <p className="text-amber-300 font-medium">{dentist.specialization}</p>
                <div className="flex items-center gap-2 mt-2">
                  {dentist.available ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-sm">
                      <CheckCircle size={14} /> Available
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-400 text-sm">
                      <XCircle size={14} /> Currently Unavailable
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="text-sm font-semibold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full">
                  {dentist.experience} years of experience
                </span>
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed">{dentist.bio}</p>
              {dentist.available && (
                <Link
                  href={`/booking?dentist=${dentist.id}`}
                  className="mt-5 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  <Calendar size={16} /> Book with {dentist.name.split(' ')[1]}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
