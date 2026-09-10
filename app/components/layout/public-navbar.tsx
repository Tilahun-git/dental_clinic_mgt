'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';
import { cn } from '@/app/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/dentists', label: 'Dentists' },
  { href: '/booking', label: 'Book Appointment' },
  { href: '/contact', label: 'Contact' },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-sm" style={{ background: '#DDF3E4', borderBottom: '1px solid #C5E4CF' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-emerald-700 rounded-xl flex items-center justify-center">
              <Stethoscope size={18} className="text-white" />
            </div>
            <span className="font-black text-gray-900 text-xl tracking-tight">SENAKO</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={cn('px-3 py-2 rounded-xl text-sm font-semibold transition-colors',
                  pathname === link.href ? 'bg-white/70 text-emerald-800' : 'text-emerald-950/70 hover:bg-white/60 hover:text-emerald-800')}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/login" className="px-4 py-2 text-sm font-semibold text-emerald-950 hover:bg-white/60 rounded-xl transition-colors">
              Login
            </Link>
            <Link href="/booking" className="px-4 py-2 text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors shadow-sm">
              Book Now
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-xl hover:bg-white/60" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-emerald-200 py-3 space-y-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={cn('block px-3 py-2 rounded-xl text-sm font-semibold',
                  pathname === link.href ? 'bg-white/70 text-emerald-800' : 'text-emerald-950/70 hover:bg-white/60')}
                onClick={() => setMobileOpen(false)}>{link.label}</Link>
            ))}
            <div className="pt-2 flex gap-2">
              <Link href="/login" className="flex-1 text-center px-4 py-2 text-sm font-semibold border-2 border-emerald-200 text-emerald-800 rounded-xl">Login</Link>
              <Link href="/booking" className="flex-1 text-center px-4 py-2 text-sm font-bold bg-emerald-700 text-white rounded-xl">Book Now</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
