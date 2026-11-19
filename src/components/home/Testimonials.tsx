import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../../constants';
import type { Testimonial } from '../../types';
import { cn } from '../../utils/cn';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { Stagger, StaggerItem } from '../ui/Reveal';

function Stars({ count, className }: { count: number; className?: string }) {
  return (
    <div className={cn('flex gap-0.5', className)} role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn('h-4 w-4', i < count ? 'fill-current' : 'opacity-25')} />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
}

function Author({ t, dark }: { t: Testimonial; dark?: boolean }) {
  return (
    <figcaption className="flex items-center gap-3.5">
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold',
          dark ? 'bg-brand-lime text-brand-dark' : 'bg-brand-dark text-brand-lime dark:bg-brand-lime dark:text-brand-dark'
        )}
      >
        {initials(t.name)}
      </span>
      <span>
        <span className={cn('block font-display font-bold', dark ? 'text-white' : 'text-brand-dark dark:text-white')}>{t.name}</span>
        <span className={cn('block text-sm', dark ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400')}>{t.role}</span>
      </span>
    </figcaption>
  );
}

function QuoteCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-[1.75rem] border border-slate-900/10 bg-white p-7 dark:border-white/10 dark:bg-slate-900">
      <Stars count={t.rating} className="text-brand-primary dark:text-brand-lime" />
      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">&ldquo;{t.quote}&rdquo;</blockquote>
      <div className="mt-7 border-t border-slate-900/10 pt-6 dark:border-white/10">
        <Author t={t} />
      </div>
    </figure>
  );
}

interface TestimonialsProps {
  /** `featured` = one large quote + two cards (homepage); `wall` = every review */
  variant?: 'featured' | 'wall';
}

/** Customer reviews */
export default function Testimonials({ variant = 'featured' }: TestimonialsProps) {
  const [lead, ...rest] = TESTIMONIALS;

  if (variant === 'wall') {
    return (
      <section id="testimonials" className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Stagger className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid" gap={0.05}>
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.id}>
                <QuoteCard t={t} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Reviews"
            title={
              <>
                Neighbours who <span className="text-gradient">switched.</span>
              </>
            }
          />
          <div className="shrink-0">
            <Button to="/testimonials" variant="outline">
              Read all reviews
            </Button>
          </div>
        </div>

        <Stagger className="mt-14 grid gap-5 lg:grid-cols-12" gap={0.08}>
          <StaggerItem className="lg:col-span-6">
            <figure className="flex h-full flex-col justify-between rounded-[1.75rem] bg-brand-dark p-8 text-white sm:p-10">
              <div>
                <Stars count={lead.rating} className="text-brand-lime" />
                <blockquote className="mt-6 font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                  &ldquo;{lead.quote}&rdquo;
                </blockquote>
              </div>
              <div className="mt-10">
                <Author t={lead} dark />
              </div>
            </figure>
          </StaggerItem>
          {rest.slice(0, 2).map((t) => (
            <StaggerItem key={t.id} className="lg:col-span-3">
              <QuoteCard t={t} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
