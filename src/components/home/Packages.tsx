import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Crown, X } from 'lucide-react';
import { PACKAGES, PACKAGE_COMPARE_ROWS } from '../../constants';
import type { Plan } from '../../types';
import { formatKes } from '../../utils/scroll';
import { cn } from '../../utils/cn';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';
import Button from '../ui/Button';

/** Pricing card */
function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-[2rem] p-8 transition-all duration-300',
        plan.featured
          ? 'z-10 bg-brand-dark text-white shadow-soft lg:-translate-y-4 lg:scale-[1.04] lg:hover:-translate-y-6'
          : 'border border-slate-900/5 bg-white shadow-card hover:-translate-y-2 hover:shadow-soft dark:border-white/10 dark:bg-slate-900/60'
      )}
    >
      {plan.badge && (
        <span className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-glow">
          <Crown className="h-3.5 w-3.5" /> {plan.badge}
        </span>
      )}

      <div>
        <h3 className={cn('font-display text-xl font-bold', plan.featured ? 'text-white' : 'text-brand-dark dark:text-white')}>
          {plan.name}
        </h3>
        <p className={cn('mt-1.5 text-xs font-semibold uppercase tracking-widest', plan.featured ? 'text-brand-accent' : 'text-brand-primary dark:text-brand-accent')}>
          {plan.speed}
        </p>
      </div>

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className={cn('font-display text-4xl font-extrabold tracking-tight', plan.featured ? 'text-white' : 'text-brand-dark dark:text-white')}>
          {formatKes(plan.price)}
        </span>
        <span className={cn('text-sm font-medium', plan.featured ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400')}>/month</span>
      </p>
      <p className={cn('mt-3 text-sm leading-relaxed', plan.featured ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400')}>
        {plan.tagline}
      </p>

      <ul className="mt-7 flex-1 space-y-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span
              className={cn(
                'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                plan.featured ? 'bg-brand-accent/20 text-brand-accent' : 'bg-brand-primary/10 text-brand-primary dark:bg-brand-accent/10 dark:text-brand-accent'
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className={plan.featured ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'}>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {plan.featured ? (
          <Button to="/contact" fullWidth>
            Apply Now
          </Button>
        ) : (
          <Button to="/contact" variant="outline" fullWidth>
            Apply Now
          </Button>
        )}
      </div>
    </article>
  );
}

/** Packages section with comparison modal */
export default function Packages() {
  const [compareOpen, setCompareOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCompareOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = compareOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [compareOpen]);

  return (
    <section id="packages" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-primary/5 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Packages & Pricing"
          title={
            <>
              Simple plans. <span className="text-gradient">Serious speeds.</span>
            </>
          }
          subtitle="Transparent monthly pricing with unlimited data on every plan — no fair usage policies, no hidden fees, no surprises."
        />

        <Stagger className="mt-20 grid items-stretch gap-8 lg:grid-cols-4" gap={0.1}>
          {PACKAGES.map((plan) => (
            <StaggerItem key={plan.id} className={cn(plan.featured && 'lg:-mt-4')}>
              <PlanCard plan={plan} />
            </StaggerItem>
          ))}
        </Stagger>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Button variant="glass" onClick={() => setCompareOpen(true)} icon={<ArrowRight className="h-4 w-4 rotate-90" />}>
            Compare Packages
          </Button>
        </motion.div>
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
                              ? 'rounded-tr-2xl bg-gradient-brand text-white'
                              : 'bg-slate-50 text-brand-dark dark:bg-white/5 dark:text-white'
                          )}
                        >
                          <span className="block">{pkg.name}</span>
                          <span className={cn('mt-0.5 block text-xs font-semibold', pkg.featured ? 'text-white/85' : 'text-slate-400')}>
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
                            key={i}
                            className={cn(
                              'border-b border-slate-900/5 px-4 py-3.5 text-center text-xs',
                              PACKAGES[i].featured ? 'font-bold text-brand-primary dark:text-brand-accent' : 'text-slate-500 dark:text-slate-400'
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
