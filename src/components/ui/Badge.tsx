import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: ReactNode;
  tone?: 'blue' | 'green' | 'amber' | 'red';
  className?: string;
  pulse?: boolean;
}

/** Small pill badge with an optional status dot */
export default function Badge({ children, tone = 'blue', className, pulse }: BadgeProps) {
  const tones = {
    blue: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20 dark:bg-brand-accent/10 dark:text-brand-accent',
    green: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
    red: 'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400',
  };

  return (
    <span className={cn('inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold', tones[tone], className)}>
      {pulse && <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-current animate-ping-soft" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
      </span>}
      {children}
    </span>
  );
}
