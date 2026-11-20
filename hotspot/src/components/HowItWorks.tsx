import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Lock, Wifi } from 'lucide-react';
import { BRAND, BUNDLES } from '../data';
import Reveal from './Reveal';

const STEPS = [
  { title: 'Join the WiFi', body: `Open your WiFi settings and tap "${BRAND.ssid}". No password needed.` },
  { title: 'Pick a bundle', body: 'The DICE page pops up by itself. Choose an hour, a day, a week or a month.' },
  { title: 'Pay with M-Pesa', body: 'Confirm the prompt on your phone. You are online instantly, and your code arrives by SMS.' },
];

/** The phone screen for each step, drawn in CSS so it is crisp at any size */
function PhoneScreen({ step }: { step: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex flex-col px-5 pb-6 pt-12"
      >
        {step === 0 && (
          <>
            <p className="font-display text-2xl font-black">Wi-Fi</p>
            <div className="mt-5 rounded-2xl bg-white p-1.5 shadow-sm">
              <div className="flex items-center justify-between rounded-xl bg-coral-100 px-3 py-3">
                <span className="flex items-center gap-2 font-semibold text-night">
                  <Wifi className="h-4 w-4 text-coral" /> {BRAND.ssid}
                </span>
                <span className="text-[11px] font-bold text-coral">Tap to join</span>
              </div>
              {['Home_5G', 'Office-Guest', 'TECNO SPARK'].map((n) => (
                <div key={n} className="flex items-center justify-between px-3 py-3 text-sm text-night/60">
                  <span className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" /> {n}
                  </span>
                  <Lock className="h-3.5 w-3.5" />
                </div>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <p className="text-center font-display text-sm font-black text-coral">DICE Hotspot</p>
            <p className="mt-1 text-center font-display text-lg font-black">Choose your bundle</p>
            <div className="mt-4 space-y-2">
              {BUNDLES.slice(0, 4).map((b) => (
                <div
                  key={b.id}
                  className={
                    'flex items-center justify-between rounded-xl px-3.5 py-3 text-sm ' +
                    (b.popular ? 'bg-night text-white' : 'bg-white text-night')
                  }
                >
                  <span className="font-semibold">{b.duration}</span>
                  <span className="font-display font-black">KES {b.price}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <div className="flex flex-1 flex-col">
            <div className="rounded-2xl bg-white p-4 text-sm shadow-sm">
              <p className="font-display font-black text-mpesa">M-PESA</p>
              <p className="mt-2 leading-snug text-night/80">Pay KES 40 to DICE HOTSPOT? Enter your M-PESA PIN.</p>
              <div className="mt-3 flex gap-1.5">
                {[0, 1, 2, 3].map((d) => (
                  <span key={d} className="h-8 flex-1 rounded-lg bg-night/10 text-center leading-8">•</span>
                ))}
              </div>
            </div>
            <div className="mt-auto rounded-2xl bg-night p-5 text-center text-white">
              <CheckCircle2 className="mx-auto h-9 w-9 text-sun" />
              <p className="mt-2 font-display text-lg font-black">You&rsquo;re online!</p>
              <p className="text-xs text-white/60">24 hours · Unlimited</p>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/** Three steps with an interactive phone that shows each one */
export default function HowItWorks() {
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduced = useReducedMotion();

  /* Play the walkthrough on its own while it's on screen; a tap takes over */
  useEffect(() => {
    if (!inView || manual || reduced) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % STEPS.length), 3200);
    return () => window.clearTimeout(t);
  }, [step, inView, manual, reduced]);

  return (
    <section id="how" className="py-24 lg:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="eyebrow">How it works</span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Online in <span className="squiggle">30 seconds.</span>
            </h2>
          </Reveal>

          <ol className="mt-10 space-y-3">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => {
                    setManual(true);
                    setStep(i);
                  }}
                  aria-pressed={step === i}
                  className={
                    'flex w-full items-start gap-5 rounded-xl p-5 text-left transition-all duration-200 sm:p-6 ' +
                    (step === i ? 'bg-card shadow-[0_20px_40px_-24px_rgba(14,27,77,0.35)]' : 'hover:bg-card/60')
                  }
                >
                  <span
                    className={
                      'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-display text-xl font-black transition-colors ' +
                      (step === i ? 'bg-coral text-white' : 'bg-ink/5 text-ink/50')
                    }
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-display text-xl font-bold">{s.title}</span>
                    <span className="mt-1 block leading-relaxed text-ink/65">{s.body}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div ref={ref}>
        <Reveal className="relative mx-auto w-full max-w-[20rem]">
          <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-sun/70 blur-0" aria-hidden="true" />
          <div className="absolute -right-10 bottom-6 h-40 w-40 rounded-full bg-coral/80" aria-hidden="true" />
          <div className="relative aspect-[9/19] animate-float rounded-[3rem] bg-night p-3 ring-1 ring-white/10 motion-reduce:animate-none shadow-[0_40px_80px_-30px_rgba(14,27,77,0.7)]">
            <div className="relative h-full overflow-hidden rounded-[2.4rem] bg-cream text-night">
              <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-night" aria-hidden="true" />
              <PhoneScreen step={step} />
            </div>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
