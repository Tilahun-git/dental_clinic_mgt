import { PublicNavbar } from '../components/layout/public-navbar';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <footer className="bg-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-black text-xl mb-2 text-orange-400">SENAKO</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Expert dental care in Addis Ababa with the latest technology and a compassionate team.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-stone-200 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li><a href="/services" className="hover:text-orange-400 transition-colors">Services</a></li>
                <li><a href="/dentists" className="hover:text-orange-400 transition-colors">Our Dentists</a></li>
                <li><a href="/booking" className="hover:text-orange-400 transition-colors">Book Appointment</a></li>
                <li><a href="/contact" className="hover:text-orange-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-stone-200 mb-3">Clinic Hours</h4>
              <ul className="space-y-1 text-stone-400 text-sm">
                <li>Mon – Fri: 8:00 AM – 7:00 PM</li>
                <li>Saturday: 9:00 AM – 5:00 PM</li>
                <li>Sunday: 10:00 AM – 2:00 PM</li>
                <li className="text-emerald-400 font-semibold">Emergency: 24/7</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-stone-200 mb-3">Contact</h4>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>📍 Bole Road, Addis Ababa</li>
                <li>📞 +251 911 000000</li>
                <li>✉️ info@senako.et</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 text-slate-300 text-sm border-t border-slate-600">
            <p>© 2025 SENAKO Dental Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
