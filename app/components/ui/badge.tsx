import { cn } from '@/app/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'gray' | 'orange';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-sky-100 text-sky-700',
  purple: 'bg-purple-100 text-purple-700',
  gray: 'bg-gray-100 text-gray-600',
  orange: 'bg-orange-100 text-orange-700',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// Appointment status badge
export function AppointmentBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    REQUESTED: { label: 'Requested', variant: 'warning' },
    CONFIRMED: { label: 'Confirmed', variant: 'info' },
    CHECKED_IN: { label: 'Checked In', variant: 'purple' },
    IN_PROGRESS: { label: 'In Progress', variant: 'orange' },
    COMPLETED: { label: 'Completed', variant: 'success' },
    CANCELLED: { label: 'Cancelled', variant: 'danger' },
    NO_SHOW: { label: 'No Show', variant: 'gray' },
  };
  const { label, variant } = map[status] ?? { label: status, variant: 'default' };
  return <Badge variant={variant}>{label}</Badge>;
}

// Invoice status badge
export function InvoiceBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    UNPAID: { label: 'Unpaid', variant: 'danger' },
    PARTIALLY_PAID: { label: 'Partial', variant: 'warning' },
    PAID: { label: 'Paid', variant: 'success' },
    CANCELLED: { label: 'Cancelled', variant: 'gray' },
  };
  const { label, variant } = map[status] ?? { label: status, variant: 'default' };
  return <Badge variant={variant}>{label}</Badge>;
}

// Role badge
export function RoleBadge({ role }: { role: string }) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    ADMIN: { label: 'Admin', variant: 'purple' },
    DENTIST: { label: 'Dentist', variant: 'info' },
    RECEPTIONIST: { label: 'Receptionist', variant: 'success' },
    INVENTORY_MANAGER: { label: 'Inventory', variant: 'orange' },
    PATIENT: { label: 'Patient', variant: 'gray' },
  };
  const { label, variant } = map[role] ?? { label: role, variant: 'default' };
  return <Badge variant={variant}>{label}</Badge>;
}
