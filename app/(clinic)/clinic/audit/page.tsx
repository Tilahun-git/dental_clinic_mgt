import { auditLogs } from '../../../lib/mock-data';
import { Badge } from '../../../components/ui/badge';
import { Shield } from 'lucide-react';

const actionColors: Record<string, string> = {
  CREATE: 'success',
  UPDATE: 'info',
  DELETE: 'danger',
  READ: 'gray',
};

const actionIcons: Record<string, string> = {
  CREATE: 'âœš',
  UPDATE: 'âœŽ',
  DELETE: 'âœ•',
  READ: 'ðŸ‘',
};

export default function AuditPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
          <Shield size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Audit Logs</h1>
          <p className="text-slate-500 text-sm mt-0.5">{auditLogs.length} log entries</p>
        </div>
      </div>

      <div className="space-y-3">
        {auditLogs.map((log, idx) => (
          <div key={log.id} className="flex gap-4 relative">
            {/* Timeline line */}
            {idx < auditLogs.length - 1 && (
              <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200" />
            )}

            {/* Action icon */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm flex-shrink-0 z-10 ${
              log.action === 'CREATE' ? 'bg-emerald-100 text-emerald-700' :
              log.action === 'UPDATE' ? 'bg-sky-100 text-sky-700' :
              log.action === 'DELETE' ? 'bg-red-100 text-red-700' :
              'bg-slate-100 text-slate-600'
            }`}>
              {actionIcons[log.action]}
            </div>

            {/* Content */}
            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={actionColors[log.action] as 'success' | 'info' | 'danger' | 'gray'}>
                    {log.action}
                  </Badge>
                  <span className="text-sm font-semibold text-slate-800">{log.entity}</span>
                  <span className="text-xs text-slate-400 font-mono">{log.entityId}</span>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">{log.timestamp.replace('T', ' ')}</span>
              </div>

              <p className="text-sm text-slate-700 mb-2">{log.description}</p>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center font-bold">
                  {log.userName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <span>{log.userName}</span>
              </div>

              {(log.previousValue || log.newValue) && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {log.previousValue && (
                    <div className="bg-red-50 rounded-lg p-2">
                      <p className="text-xs font-semibold text-red-500 mb-1">Before</p>
                      <p className="text-xs text-red-700 font-mono break-all">{log.previousValue}</p>
                    </div>
                  )}
                  {log.newValue && (
                    <div className="bg-emerald-50 rounded-lg p-2">
                      <p className="text-xs font-semibold text-emerald-500 mb-1">After</p>
                      <p className="text-xs text-emerald-700 font-mono break-all">{log.newValue}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

