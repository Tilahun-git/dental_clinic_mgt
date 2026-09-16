import { staff } from '../../../lib/mock-data';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { RoleBadge, Badge } from '../../../components/ui/badge';
import { UserPlus, Phone, Mail } from 'lucide-react';

export default function StaffPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Staff Management</h1>
          <p className="text-slate-500 text-sm mt-1">{staff.length} team members</p>
        </div>
        <Button variant="primary"><UserPlus size={16} /> Add Staff</Button>
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Staff Member', 'Role', 'Department', 'Phone', 'Email', 'Hire Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 text-xs font-bold shrink-0">
                        {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4"><RoleBadge role={member.role} /></td>
                  <td className="py-3 px-4 text-sm text-slate-600">{member.department}</td>
                  <td className="py-3 px-4">
                    <a href={`tel:${member.phone}`} className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600">
                      <Phone size={12} className="text-slate-400" />{member.phone}
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <a href={`mailto:${member.email}`} className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600">
                      <Mail size={12} className="text-slate-400" />{member.email}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{member.hireDate}</td>
                  <td className="py-3 px-4">
                    <Badge variant={member.status === 'Active' ? 'success' : member.status === 'On Leave' ? 'warning' : 'gray'}>
                      {member.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

