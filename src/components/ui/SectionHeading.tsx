import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  dark?: boolean;
  className?: string;
}

/** Consistent animated section header: eyebrow pill + large title + subtitle */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      {eyebrow && (
        <Reveal delay={0}>
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]',
              dark
                ? 'bg-white/10 text-brand-accent border border-white/15'
                : 'bg-brand-primary/10 text-brand-primary border border-brand-primary/15 dark:bg-brand-accent/10 dark:text-brand-accent'
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={cn(
            'mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl',
            dark ? 'text-white' : 'text-brand-dark dark:text-white'
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className={cn('mt-5 text-base leading-relaxed sm:text-lg', dark ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400')}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
