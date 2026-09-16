import { cn } from '@/app/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; up: boolean };
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'orange';
  className?: string;
}

const colorMap = {
  blue:   { iconBg: 'bg-blue-100',   icon: 'text-blue-600'   },
  green:  { iconBg: 'bg-emerald-100', icon: 'text-emerald-600' },
  amber:  { iconBg: 'bg-amber-100',  icon: 'text-amber-600'  },
  red:    { iconBg: 'bg-red-100',    icon: 'text-red-600'    },
  purple: { iconBg: 'bg-purple-100', icon: 'text-purple-600' },
  orange: { iconBg: 'bg-orange-100', icon: 'text-orange-600' },
};

export function StatCard({ title, value, icon: Icon, trend, color = 'orange', className }: StatCardProps) {
  const c = colorMap[color] ?? colorMap.orange;
  return (
    <div
      className={cn('bg-[var(--bg-card)] rounded-2xl shadow-sm p-5', className)}
      style={{ border: '1px solid var(--border)' }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--text-muted)] font-medium">{title}</p>
          <p className="text-2xl font-black text-[var(--text-heading)] mt-1">{value}</p>
          {trend && (
            <div className={cn('flex items-center gap-1 mt-1.5 text-xs font-semibold',
              trend.up ? 'text-emerald-600' : 'text-red-500')}>
              {trend.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', c.iconBg)}>
          <Icon size={20} className={c.icon} />
        </div>
      </div>
    </div>
  );
}
