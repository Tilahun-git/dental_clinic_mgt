import { services } from '../../lib/mock-data';
import { Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="page-bg min-h-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.24em] mb-3">Care made personal</p>
        <h1 className="text-4xl font-bold text-[var(--text-heading)]">Our Dental Services</h1>
        <p className="text-[var(--text-muted)] mt-3 text-lg max-w-2xl mx-auto">
          Comprehensive dental care using state-of-the-art technology, delivered by our team of experienced specialists.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-7 bg-sky-500 rounded-full" />
        <h2 className="text-xl font-bold text-[var(--text-heading)]">All Services</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
        {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-md transition-shadow md:flex md:min-h-56"
                >
                  <div className="h-40 md:h-auto md:w-2/5 shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }} role="img" aria-label={`${service.name} service`} />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="text-3xl" aria-hidden="true">{service.icon}</span>
                      <span className="bg-sky-500/10 text-sky-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-[var(--text-heading)] text-lg">{service.name}</h3>
                    <p className="text-[var(--text-muted)] text-sm mt-2 leading-relaxed flex-1">{service.description}</p>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--border)]">
                      <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-sm">
                        <Clock size={14} className="text-slate-400" />
                        <span>{service.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sky-600 text-sm font-semibold">
                        <DollarSign size={14} />
                        <span>{service.price.toLocaleString()} ETB</span>
                      </div>
                    </div>
                    <Link
                      href={`/booking?service=${service.id}`}
                      className="mt-4 inline-flex w-fit items-center rounded-xl bg-sky-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
                    >
                      Book this service
                    </Link>
                  </div>
                </div>
        ))}
      </div>

      <div className="bg-sky-600 rounded-3xl p-10 text-center text-white mt-8">
        <h2 className="text-2xl font-bold mb-2">Need a specific treatment?</h2>
        <p className="text-sky-100 mb-6">Contact us to discuss your dental needs. We offer customized treatment plans.</p>
        <a
          href="/booking"
          className="inline-block bg-white text-sky-600 hover:bg-sky-50 font-bold px-8 py-3 rounded-xl transition-colors"
        >
          Book a Consultation
        </a>
      </div>
      </div>
    </div>
  );
}
