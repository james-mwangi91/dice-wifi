import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Clock, Clock3, MapPin, PartyPopper, Search, XCircle } from 'lucide-react';
import { COVERAGE_AREAS, COVERAGE_EXTRAS } from '../../constants';
import { cn } from '../../utils/cn';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';

type ResultState = { status: 'live' | 'expanding' | 'missing'; area: string } | null;

/** Interactive coverage checker with animated location markers */
export default function Coverage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ResultState>(null);
  const [waitlisted, setWaitlisted] = useState(false);

  const normalize = (s: string) => s.trim().toLowerCase();

  const checkCoverage = (e: FormEvent) => {
    e.preventDefault();
    const q = normalize(query);
    if (!q) return;
    const exact = COVERAGE_AREAS.find((a) => normalize(a.name) === q);
    const partial = COVERAGE_AREAS.find((a) => normalize(a.name).includes(q) || q.includes(normalize(a.name)));
    const match = exact ?? partial;
    if (match) {
      /* Report the area's real rollout state — an "expanding" town is not yet
         installable, so claiming full coverage would mislead the visitor. */
      setResult({ status: match.status, area: match.name });
      setWaitlisted(false);
    } else {
      setResult({ status: 'missing', area: query.trim() });
    }
  };

  return (
    <section id="coverage" className="relative overflow-hidden bg-white py-24 lg:py-32 dark:bg-slate-900">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Coverage Map"
          title={
            <>
              Where we <span className="text-gradient">connect Kenya</span>
            </>
          }
          subtitle="Growing fast across Nairobi and its satellite towns. Search your area to check availability."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-5">
          {/* Stylised map */}
          <Stagger className="lg:col-span-3" gap={0.05}>
            <StaggerItem>
              <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-900/5 bg-gradient-to-br from-slate-100 via-white to-sky-50 shadow-soft dark:border-white/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
                <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

                {/* Abstract road lines */}
                <svg viewBox="0 0 600 480" className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
                  <g stroke="currentColor" strokeWidth="2" className="text-brand-primary/40 dark:text-brand-accent/40">
                    <path d="M0 240 C 120 200, 180 300, 300 260 S 480 300, 600 240" fill="none" />
                    <path d="M120 0 C 160 160, 100 320, 180 480" fill="none" />
                    <path d="M420 0 C 380 160, 480 320, 420 480" fill="none" />
                    <path d="M0 120 C 200 100, 400 140, 600 110" fill="none" />
                    <path d="M0 380 C 200 360, 420 400, 600 370" fill="none" />
                  </g>
                </svg>

                <div className="relative h-[420px] w-full sm:h-[480px]">
                  {COVERAGE_AREAS.map((area, i) => {
                    const active = query && (normalize(area.name).includes(normalize(query)) || normalize(query).includes(normalize(area.name)));
                    return (
                      <motion.button
                        key={area.name}
                        type="button"
                        onClick={() => {
                          setQuery(area.name);
                          setResult({ status: area.status, area: area.name });
                          setWaitlisted(false);
                        }}
                        aria-label={`Check coverage in ${area.name}`}
                        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${area.x}%`, top: `${area.y}%` }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 260, damping: 16 }}
                        animate={{
                          scale: active ? 1.35 : 1,
                          zIndex: active ? 20 : 10,
                        }}
                        whileHover={{ scale: 1.25 }}
                      >
                        <span className="relative flex flex-col items-center">
                          <span className={cn('relative inline-flex h-4 w-4 rounded-full border-2 border-white shadow-soft', area.status === 'live' ? 'bg-gradient-brand' : 'bg-amber-400')}>
                            <span className="absolute inset-0 rounded-full bg-current opacity-40 animate-ping-soft" style={{ animationDelay: `${i * 0.35}s` }} />
                          </span>
                          <span className="mt-2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-brand-dark shadow-card backdrop-blur dark:bg-slate-900/90 dark:text-white">
                            {area.name}
                          </span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="absolute bottom-4 left-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold text-slate-600 backdrop-blur dark:bg-slate-900/80 dark:text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-brand" /> Live
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold text-slate-600 backdrop-blur dark:bg-slate-900/80 dark:text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Expanding
                  </span>
                </div>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Checker panel */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <div className="glass-strong rounded-[2rem] p-8 shadow-soft">
              <h3 className="font-display text-xl font-bold text-brand-dark dark:text-white">Check if we cover your area</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Type your estate, town or landmark and we will tell you instantly.
              </p>

              <form onSubmit={checkCoverage} className="mt-6">
                <label htmlFor="coverage-search" className="sr-only">
                  Search your area
                </label>
                <div className="flex overflow-hidden rounded-full border-2 border-brand-primary/20 bg-white transition-colors focus-within:border-brand-primary dark:bg-slate-900">
                  <Search className="ml-4 h-5 w-5 self-center text-slate-400" />
                  <input
                    id="coverage-search"
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setResult(null);
                      /* A fresh search must not keep showing the previous
                         area's waitlist confirmation */
                      setWaitlisted(false);
                    }}
                    placeholder="e.g. Ruiru, Kahawa West…"
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-brand-dark placeholder:text-slate-400 focus:outline-none dark:text-white"
                  />
                  <button
                    type="submit"
                    className="m-1.5 shrink-0 rounded-full bg-gradient-brand px-5 text-sm font-bold text-white transition-all hover:brightness-110"
                  >
                    Check
                  </button>
                </div>
              </form>

              {/* Quick chips */}
              <div className="mt-5 flex flex-wrap gap-2">
                {COVERAGE_AREAS.slice(0, 4).map((area) => (
                  <button
                    key={area.name}
                    type="button"
                    onClick={() => {
                      setQuery(area.name);
                      setResult({ status: area.status, area: area.name });
                      setWaitlisted(false);
                    }}
                    className="rounded-full border border-slate-900/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:border-brand-primary/40 hover:text-brand-primary dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-brand-accent"
                  >
                    {area.name}
                  </button>
                ))}
              </div>

              {/* Result */}
              <div className="mt-6 min-h-[72px]">
                <AnimatePresence mode="wait">
                  {result && (
                    <motion.div
                      key={`${result.status}-${result.area}`}
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className={cn(
                        'rounded-2xl border p-4 text-sm',
                        result.status === 'live'
                          ? 'border-emerald-500/25 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400'
                          : 'border-amber-500/25 bg-amber-500/5 text-amber-700 dark:text-amber-400'
                      )}
                      role="status"
                    >
                      {result.status === 'live' ? (
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                          <div>
                            <p className="font-bold">Great news! {result.area} is fully covered.</p>
                            <p className="mt-1 text-xs leading-relaxed opacity-80">
                              Installation available within 48 hours. Choose a package and get connected today.
                            </p>
                          </div>
                        </div>
                      ) : result.status === 'expanding' ? (
                        <div className="flex items-start gap-3">
                          <Clock className="mt-0.5 h-5 w-5 shrink-0" />
                          <div>
                            <p className="font-bold">{result.area} is rolling out now.</p>
                            <p className="mt-1 text-xs leading-relaxed opacity-80">
                              Our network is being built out here. Talk to our team for the current install timeline in your street.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3">
                          <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
                          <div className="flex-1">
                            <p className="font-bold">Not yet live in {result.area || 'that area'}.</p>
                            <p className="mt-1 text-xs leading-relaxed opacity-80">
                              We are expanding fast. Join the waitlist and we will notify you the moment your area goes live.
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {result?.status === 'missing' && !waitlisted && (
                <button
                  type="button"
                  onClick={() => setWaitlisted(true)}
                  className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-bold text-white shadow-glow transition-all hover:brightness-110"
                >
                  <Clock3 className="h-4 w-4" /> Join Waitlist
                </button>
              )}

              {waitlisted && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400"
                >
                  <PartyPopper className="h-4 w-4" /> You&rsquo;re on the list!
                </motion.p>
              )}

              {/* Extra upcoming areas */}
              <div className="mt-8 border-t border-slate-900/10 pt-6 dark:border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Coming soon</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {COVERAGE_EXTRAS.map((extra) => (
                    <span key={extra} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500 dark:bg-white/5 dark:text-slate-400">
                      <MapPin className="mr-1 inline h-3 w-3" />
                      {extra}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
