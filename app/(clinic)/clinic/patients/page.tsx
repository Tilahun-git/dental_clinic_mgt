'use client';

import { useState } from 'react';
import { patients } from '../../../lib/mock-data';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { SearchInput } from '../../../components/ui/search-input';
import { UserPlus, Eye, Edit, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function PatientsPage() {
  const [search, setSearch] = useState('');

  const filtered = patients.filter((p) =>
    `${p.firstName} ${p.lastName} ${p.patientId} ${p.phone} ${p.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Patients</h1>
          <p className="text-slate-500 text-sm mt-1">{patients.length} registered patients</p>
        </div>
        <Button variant="primary">
          <UserPlus size={16} /> Register New Patient
        </Button>
      </div>

      <Card padding={false}>
        <div className="p-4 border-b border-slate-100">
          <SearchInput
            placeholder="Search by name, ID, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Patient ID', 'Name', 'Phone', 'Email', 'Date of Birth', 'Blood Type', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <tr key={patient.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-mono text-sky-600 font-medium">{patient.patientId}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 text-xs font-bold flex-shrink-0">
                        {patient.firstName[0]}{patient.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{patient.firstName} {patient.lastName}</p>
                        <p className="text-xs text-slate-400">{patient.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <a href={`tel:${patient.phone}`} className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600">
                      <Phone size={12} className="text-slate-400" />
                      {patient.phone}
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <a href={`mailto:${patient.email}`} className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600">
                      <Mail size={12} className="text-slate-400" />
                      {patient.email}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{patient.dob}</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-700">{patient.bloodType}</td>
                  <td className="py-3 px-4">
                    <Badge variant={patient.status === 'Active' ? 'success' : 'gray'}>{patient.status}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Link href={`/clinic/patients/${patient.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye size={14} />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">No patients found matching your search.</div>
          )}
        </div>
        <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} of {patients.length} patients
        </div>
      </Card>
    </div>
  );
}


