import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Crown, X } from 'lucide-react';
import { PACKAGES, PACKAGE_COMPARE_ROWS } from '../../constants';
import type { Plan } from '../../types';
import { formatKes } from '../../utils/scroll';
import { cn } from '../../utils/cn';
import { useScrollLock } from '../../hooks';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';
import Button from '../ui/Button';

/** Pricing card — speed is the headline, price second */
function PlanCard({ plan }: { plan: Plan }) {
  const speed = plan.speed.replace(/\D/g, '');
  const f = plan.featured;

  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-[1.75rem] p-7 transition-transform duration-300 hover:-translate-y-1',
        f
          ? 'bg-brand-dark text-white ring-2 ring-brand-lime dark:bg-black'
          : 'border border-slate-900/10 bg-white dark:border-white/10 dark:bg-slate-900'
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className={cn('font-display text-lg font-bold', f ? 'text-white' : 'text-brand-dark dark:text-white')}>{plan.name}</h3>
        {plan.badge && (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-lime px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-brand-dark">
            <Crown className="h-3 w-3" /> {plan.badge}
          </span>
        )}
      </div>

      <p className={cn('mt-6 font-display text-7xl font-extrabold leading-none tracking-[-0.035em]', f ? 'text-brand-lime' : 'text-brand-dark dark:text-white')}>
        {speed}
        <span className={cn('ml-1 text-xl font-bold tracking-tight', f ? 'text-white/60' : 'text-slate-400')}>Mbps</span>
      </p>

      <p className={cn('mt-5 min-h-[2.75rem] text-sm leading-relaxed', f ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400')}>
        {plan.tagline}
      </p>

      <p className={cn('mt-5 flex items-baseline gap-1.5 border-t pt-5', f ? 'border-white/15' : 'border-slate-900/10 dark:border-white/10')}>
        <span className={cn('text-sm font-bold', f ? 'text-white/60' : 'text-slate-500')}>KES</span>
        <span className={cn('font-display text-3xl font-extrabold tracking-tight', f ? 'text-white' : 'text-brand-dark dark:text-white')}>
          {plan.price.toLocaleString('en-KE')}
        </span>
        <span className={cn('text-sm', f ? 'text-white/60' : 'text-slate-500 dark:text-slate-400')}>/ month</span>
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check className={cn('mt-0.5 h-4 w-4 shrink-0', f ? 'text-brand-lime' : 'text-brand-primary dark:text-brand-lime')} strokeWidth={3} />
            <span className={f ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'}>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button to="/contact" variant={f ? 'primary' : 'dark'} fullWidth>
          Choose {plan.name}
        </Button>
      </div>
    </article>
  );
}

/** Packages section with comparison modal */
export default function Packages() {
  const [compareOpen, setCompareOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useScrollLock(compareOpen);

  useEffect(() => {
    if (!compareOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCompareOpen(false);
    };
    window.addEventListener('keydown', onKey);
    /* Move focus into the dialog so keyboard and screen-reader users land there */
    closeRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [compareOpen]);

  return (
    <section id="packages" className="relative py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Plans & pricing"
            title={
              <>
                Pick a speed. <span className="text-gradient">That&rsquo;s it.</span>
              </>
            }
            subtitle="Every plan is truly unlimited, includes a router and installation where available, and can be changed any month."
          />
          <div className="shrink-0">
            <Button variant="outline" onClick={() => setCompareOpen(true)} icon={<ArrowRight className="h-4 w-4" />}>
              Compare side by side
            </Button>
          </div>
        </div>

        <Stagger className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
          {PACKAGES.map((plan) => (
            <StaggerItem key={plan.id} className="h-full">
              <PlanCard plan={plan} />
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
          <span>Pay with M-Pesa, card or bank</span>
          <span className="pip text-slate-300 dark:text-slate-600" />
          <span>30-day money-back guarantee</span>
        </p>
      </div>

      {/* Comparison modal */}
      <AnimatePresence>
        {compareOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-dark/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCompareOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Compare packages"
          >
            <motion.div
              className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-8 shadow-soft dark:bg-slate-900 lg:p-10"
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-2xl font-extrabold text-brand-dark dark:text-white">Compare Packages</h3>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">Everything included, side by side.</p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setCompareOpen(false)}
                  aria-label="Close comparison"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[560px] border-separate border-spacing-0 text-left text-sm">
                  <thead>
                    <tr>
                      <th className="rounded-tl-2xl border-b border-slate-900/10 bg-slate-50 px-4 py-4 font-display text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                        Feature
                      </th>
                      {PACKAGES.map((pkg) => (
                        <th
                          key={pkg.id}
                          className={cn(
                            'border-b border-slate-900/10 px-4 py-4 text-center font-display text-sm font-bold',
                            pkg.featured
                              ? 'bg-brand-lime text-brand-dark'
                              : 'bg-slate-50 text-brand-dark dark:bg-white/5 dark:text-white'
                          )}
                        >
                          <span className="block">{pkg.name}</span>
                          <span className={cn('mt-0.5 block text-xs font-semibold', pkg.featured ? 'text-brand-dark/70' : 'text-slate-400')}>
                            {pkg.speed} · {formatKes(pkg.price)}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PACKAGE_COMPARE_ROWS.map((row) => (
                      <tr key={row.label}>
                        <td className="border-b border-slate-900/5 px-4 py-3.5 font-semibold text-slate-600 dark:border-white/5 dark:text-slate-300">
                          {row.label}
                        </td>
                        {row.values.map((v, i) => (
                          <td
                            key={PACKAGES[i]?.id ?? i}
                            className={cn(
                              'border-b border-slate-900/5 px-4 py-3.5 text-center text-xs',
                              PACKAGES[i]?.featured ? 'font-bold text-brand-primary dark:text-brand-accent' : 'text-slate-500 dark:text-slate-400'
                            )}
                          >
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex flex-wrap justify-end gap-3">
                <Button variant="ghost" onClick={() => setCompareOpen(false)}>
                  Close
                </Button>
                <Button to="/contact" onClick={() => setCompareOpen(false)}>
                  Apply Now
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
