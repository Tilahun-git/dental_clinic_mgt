import { cn } from '@/app/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button as PrimeButton } from '@primereact/ui/button';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm',
  secondary: 'bg-slate-800 hover:bg-slate-900 text-white shadow-sm',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  ghost: 'bg-transparent hover:bg-emerald-50 text-slate-700',
  outline: 'border border-emerald-200 bg-white hover:bg-emerald-50 text-slate-700 shadow-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <PrimeButton
        ref={ref}
        type={props.type ?? 'button'}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
        label={undefined}
      >{children}</PrimeButton>
    );
  }
);
Button.displayName = 'Button';
