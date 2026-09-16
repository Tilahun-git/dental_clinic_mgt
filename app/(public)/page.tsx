import Link from 'next/link';
import { services, dentists } from '../lib/mock-data';
import { Star, Shield, Clock, Award, ChevronRight, Phone } from 'lucide-react';

export default function HomePage() {
  const previewServices = services.slice(0, 6);
  const previewDentists = dentists.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#eef3ef] text-[#17231d] overflow-hidden border-b border-[#d8e4dc]">
        <div className="absolute right-0 top-0 h-full w-2/5 bg-[#dce9df] opacity-70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#176b49] text-sm font-bold uppercase tracking-[0.18em] mb-6">
              <span className="h-px w-8 bg-[#c28b32]" />
              <span>Dental care, thoughtfully delivered</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-[#17231d]">
              Trusted care,<br />
              <span className="text-[#176b49]">made personal.</span>
            </h1>
            <p className="text-xl text-[#64736a] mb-8 leading-relaxed max-w-xl">
              Modern dentistry in Addis Ababa, with a calm experience and a team that takes time to understand your needs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-[#176b49] text-white hover:bg-[#12583c] px-6 py-3 rounded-xl font-bold text-base shadow-lg transition-colors"
              >
                Book Appointment <ChevronRight size={18} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border border-[#b9cfc0] hover:bg-white text-[#176b49] px-6 py-3 rounded-xl font-bold text-base transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#17231d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '500+', label: 'Happy Patients' },
              { value: '10+', label: 'Expert Dentists' },
              { value: '15 Yrs', label: 'Experience' },
              { value: '98%', label: 'Satisfaction Rate' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-[#d7b36a]">{stat.value}</p>
                <p className="text-[#aebdb3] text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#17231d]">Our Services</h2>
          <p className="text-[#64736a] mt-2">Focused care for every stage of your dental health</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewServices.map((service) => (
            <div key={service.id} className="bg-[#fbfcfa] rounded-2xl border border-[#d8e4dc] p-6 hover:shadow-lg transition-shadow group">
              <div className="text-4xl mb-3 grayscale">{service.icon}</div>
              <h3 className="font-semibold text-[#17231d] text-lg">{service.name}</h3>
              <p className="text-[#64736a] text-sm mt-1 mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[#176b49] font-bold">from {service.price.toLocaleString()} ETB</span>
                <span className="text-[#87968d] text-xs">{service.duration} min</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#176b49] font-semibold hover:text-[#12583c]"
          >
            View All Services <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* Dentists */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800">Meet Our Dentists</h2>
            <p className="text-slate-500 mt-2">Experienced specialists dedicated to your oral health</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewDentists.map((dentist) => (
              <div key={dentist.id} className="bg-white rounded-2xl border border-slate-200 p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {dentist.avatar}
                </div>
                <h3 className="font-bold text-slate-800 text-lg">{dentist.name}</h3>
                <p className="text-sky-600 text-sm font-medium mt-1">{dentist.specialization}</p>
                <p className="text-slate-500 text-sm mt-2">{dentist.experience} years experience</p>
                <p className="text-slate-500 text-sm mt-3 line-clamp-2">{dentist.bio}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/dentists"
              className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700"
            >
              View All Dentists <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800">Why Choose SmileCare?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Shield className="text-sky-500" size={28} />, title: 'Certified Experts', desc: 'All dentists are board-certified with international training' },
            { icon: <Award className="text-emerald-500" size={28} />, title: 'Modern Equipment', desc: 'Digital X-rays, laser dentistry, and 3D imaging technology' },
            { icon: <Clock className="text-amber-500" size={28} />, title: 'Flexible Hours', desc: 'Open 7 days a week with emergency services available 24/7' },
            { icon: <Star className="text-purple-500" size={28} />, title: 'Patient Comfort', desc: 'Anxiety-free environment with sedation options available' },
          ].map((feature) => (
            <div key={feature.title} className="text-center p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sky-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">What Our Patients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Abebe K.', text: 'The team at SmileCare is absolutely wonderful! My implant procedure was painless and the results are perfect. I highly recommend them to anyone.', rating: 5 },
              { name: 'Marta W.', text: "I was terrified of dentists before SmileCare. Dr. Marta made me feel so comfortable during my braces treatment. Best dental experience I've ever had!", rating: 5 },
              { name: 'Daniel T.', text: 'Professional, clean, and caring. My teeth whitening results were beyond my expectations. The staff is friendly and the clinic is state-of-the-art.', rating: 5 },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-2xl p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">&quot;{testimonial.text}&quot;</p>
                <p className="font-semibold text-slate-800">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-3">Ready to Book?</h2>
          <p className="text-slate-300 text-lg mb-8">Schedule your appointment today and take the first step toward a healthier smile.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-3 rounded-xl font-bold text-base transition-colors"
            >
              Book Online Now <ChevronRight size={18} />
            </Link>
            <a
              href="tel:+251911000000"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-bold text-base transition-colors"
            >
              <Phone size={18} /> Call +251 911 000000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
