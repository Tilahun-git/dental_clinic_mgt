import { cn } from '@/app/lib/utils';
import { CardRoot as PrimeCard } from '@primereact/ui/card';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className, padding = true }: CardProps) {
  return (
    <PrimeCard
      className={cn(
        'bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-base)]',
        padding && 'p-5',
        className
      )}
    >
      {children}
    </PrimeCard>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-base font-bold text-stone-800', className)}>{children}</h3>
  );
}
