import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import { COVERAGE_AREAS, HERO_STATS, PACKAGES } from '../../constants';
import Button from '../ui/Button';
import CountUpNumber from '../ui/CountUp';
import { fadeUp, stagger } from '../../animations/variants';
import { cn } from '../../utils/cn';

const liveAreas = COVERAGE_AREAS.filter((a) => a.status === 'live').map((a) => a.name);

/** Interactive plan picker — the hero's visual is the product itself */
function PlanPicker() {
  const [selected, setSelected] = useState(() => Math.max(0, PACKAGES.findIndex((p) => p.featured)));
  const plan = PACKAGES[selected];
  const speedNumber = plan.speed.replace(/\D/g, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full rounded-[2rem] bg-brand-light p-6 text-brand-dark shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-8 dark:bg-slate-900 dark:text-white"
    >
      <div className="flex items-center justify-between">
        <p className="eyebrow text-slate-500 dark:text-slate-400">
          <span className="pip" /> Pick your speed
        </p>
        {plan.badge && (
          <span className="rounded-full bg-brand-dark px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-brand-lime dark:bg-brand-lime dark:text-brand-dark">
            {plan.badge}
          </span>
        )}
      </div>

      {/* Speed tabs */}
      <div role="tablist" aria-label="Internet plans" className="mt-5 grid grid-cols-4 gap-1.5 rounded-2xl bg-slate-200/70 p-1.5 dark:bg-white/5">
        {PACKAGES.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === selected}
            aria-controls="plan-panel"
            onClick={() => setSelected(i)}
            className={cn(
              'relative rounded-xl px-1 py-2.5 font-display text-sm font-bold transition-colors',
              i === selected ? 'text-brand-dark' : 'text-slate-500 hover:text-brand-dark dark:text-slate-400 dark:hover:text-white'
            )}
          >
            {i === selected && (
              <motion.span
                layoutId="plan-tab"
                className="absolute inset-0 rounded-xl bg-brand-lime"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{p.speed.replace(' Mbps', '')}<span className="text-[10px] font-semibold opacity-70"> Mb</span></span>
          </button>
        ))}
      </div>

      <div id="plan-panel" role="tabpanel" aria-live="polite" className="mt-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{plan.name}</p>
                <p className="font-display text-7xl font-extrabold leading-none tracking-[-0.035em] sm:text-8xl">
                  {speedNumber}
                  <span className="ml-1 text-2xl font-bold tracking-tight text-slate-500 dark:text-slate-400">Mbps</span>
                </p>
              </div>
              <div className="pb-2 text-right">
                <p className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400">KES </span>
                  {plan.price.toLocaleString('en-KE')}
                </p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">per month</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{plan.tagline}</p>

            <ul className="mt-5 grid gap-2.5 border-t border-slate-900/10 pt-5 sm:grid-cols-2 dark:border-white/10">
              {plan.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm font-medium">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary dark:text-brand-lime" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-7">
        <Button to="/contact" variant="dark" fullWidth size="lg" icon={<ArrowRight className="h-4 w-4" />}>
          Get {plan.name}
        </Button>
      </div>
    </motion.div>
  );
}

/** Full-viewport hero: big promise, area check, live plan picker, proof strip */
export default function Hero() {
  const navigate = useNavigate();
  const [area, setArea] = useState('');

  const checkArea = (e: FormEvent) => {
    e.preventDefault();
    const q = area.trim();
    navigate(q ? `/coverage?q=${encodeURIComponent(q)}` : '/coverage');
  };

  return (
    <section id="home" className="relative overflow-hidden bg-brand-dark text-white">
      {/* Signal arcs — the one decorative element */}
      <svg
        viewBox="0 0 800 800"
        className="pointer-events-none absolute -right-64 top-1/2 h-[64rem] w-[64rem] -translate-y-1/2 text-brand-lime opacity-[0.07]"
        aria-hidden="true"
      >
        {[120, 220, 320, 420, 520].map((r) => (
          <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeWidth="28" />
        ))}
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-32 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-20 lg:pt-40">
        {/* Copy */}
        <motion.div className="lg:col-span-7" variants={stagger(0.1)} initial="hidden" animate="visible">
          <motion.p variants={fadeUp} className="eyebrow text-brand-lime">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-lime animate-ping-soft" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-lime" />
            </span>
            Live in {liveAreas.length} towns across Nairobi
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-[3.25rem] font-extrabold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:text-[5.75rem]"
          >
            Internet that keeps up with <span className="text-gradient">Nairobi.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            Unlimited fibre for homes and businesses from{' '}
            <strong className="font-semibold text-white">KES 1,500 a month</strong>. No data caps, no contracts —
            and most homes are online within 48 hours.
          </motion.p>

          {/* Area check */}
          <motion.form variants={fadeUp} onSubmit={checkArea} className="mt-9 max-w-xl">
            <label htmlFor="hero-area" className="mb-2.5 block font-display text-sm font-bold text-white/80">
              Is DICE in your area?
            </label>
            <div className="flex flex-col gap-2 rounded-[1.75rem] border border-white/15 bg-white/5 p-2 transition-colors focus-within:border-brand-lime sm:flex-row sm:rounded-full">
              <div className="flex flex-1 items-center">
                <MapPin className="ml-3 h-5 w-5 shrink-0 text-white/50" />
                <input
                  id="hero-area"
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Your estate or town, e.g. Ruiru"
                  autoComplete="address-level2"
                  className="w-full bg-transparent px-3 py-3 text-base text-white placeholder:text-white/40 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-lime px-6 py-3 font-display text-sm font-bold text-brand-dark transition-colors hover:bg-[#B3E033]"
              >
                Check coverage <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm text-white/50">
              Or{' '}
              <a href="#packages" className="font-semibold text-white underline decoration-brand-lime decoration-2 underline-offset-4 hover:text-brand-lime">
                compare all plans
              </a>
            </p>
          </motion.form>
        </motion.div>

        {/* Plan picker */}
        <div className="lg:col-span-5">
          <PlanPicker />
        </div>
      </div>

      {/* Proof strip */}
      <div className="relative border-t border-white/10">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-6 lg:grid-cols-4 lg:px-8">
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col-reverse gap-1 py-7 lg:py-9',
                i % 2 === 1 && 'border-l border-white/10 pl-6',
                i >= 2 && 'border-t border-white/10 lg:border-t-0',
                i === 2 && 'lg:border-l lg:border-white/10 lg:pl-6',
                i === 3 && 'lg:pl-6'
              )}
            >
              <dt className="text-sm text-slate-400">{stat.label}</dt>
              <dd className="font-display text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
                <CountUpNumber end={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix} duration={2} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
