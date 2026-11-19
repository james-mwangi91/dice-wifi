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

/** Section header: numbered-style eyebrow + large display title + subtitle */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      {eyebrow && (
        <Reveal delay={0}>
          <span
            className={cn(
              'eyebrow',
              dark ? 'text-brand-lime' : 'text-brand-primary dark:text-brand-lime'
            )}
          >
            <span className="pip" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2
          className={cn(
            'mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl',
            dark ? 'text-white' : 'text-brand-dark dark:text-white'
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              'mt-5 max-w-2xl text-base leading-relaxed sm:text-lg',
              align === 'center' && 'mx-auto',
              dark ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
