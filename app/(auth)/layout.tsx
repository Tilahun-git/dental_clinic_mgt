import Link from 'next/link';
import { Stethoscope } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #E8EDF2 0%, #DDE4ED 50%, #D3DCE8 100%)' }}>
      <header className="p-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center shadow-md">
            <Stethoscope size={18} className="text-white" />
          </div>
          <span className="font-black text-stone-900 text-xl tracking-tight">SENAKO</span>
        </Link>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </div>
    </div>
  );
}
