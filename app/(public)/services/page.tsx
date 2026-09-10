import { services } from '../../lib/mock-data';
import { Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800">Our Dental Services</h1>
        <p className="text-slate-500 mt-3 text-lg max-w-2xl mx-auto">
          Comprehensive dental care using state-of-the-art technology, delivered by our team of experienced specialists.
        </p>
      </div>

      {categories.map((category) => {
        const categoryServices = services.filter((s) => s.category === category);
        return (
          <div key={category} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 bg-sky-500 rounded-full" />
              <h2 className="text-xl font-bold text-slate-800">{category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{service.icon}</span>
                    <span className="bg-sky-50 text-sky-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">{service.name}</h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">{service.description}</p>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-600 text-sm">
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
                    className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
                  >
                    Book this service
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}

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
  );
}
