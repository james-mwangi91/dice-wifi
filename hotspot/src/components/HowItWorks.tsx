import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Lock, MoreVertical, Wifi } from 'lucide-react';
import { BRAND, BUNDLES } from '../data';
import Reveal from './Reveal';

/* The real purchase flow, as on the DICE WIFI sign-in page */
const STEPS = [
  { title: `Join "${BRAND.ssid}"`, body: `Open your WiFi settings and tap "${BRAND.ssid}". The sign-in page opens by itself.` },
  { title: 'Tap your package', body: 'From KES 10 for an hour up to KES 250 for a whole week.' },
  { title: 'Enter your phone number', body: 'Type your M-Pesa number and tap PAY NOW.' },
  { title: 'Enter your M-Pesa PIN', body: 'Confirm the prompt and wait about 30 seconds for M-Pesa — then you are connected.' },
];

const STEP_MS = [3200, 3600, 3600, 5200];
/* The package the demo "buys" */
const DEMO = BUNDLES.find((b) => b.popular) ?? BUNDLES[0];
/* Tile border colours, echoing the portal */
const TILE_BORDERS = ['border-blue-700', 'border-blue-700', 'border-purple-700', 'border-green-600', 'border-purple-700'];

/** Dark textured background used by the DICE WIFI sign-in page */
function Portal({ children }: { children: ReactNode }) {
  return (
    <div
      className="absolute inset-0 flex flex-col bg-[#141414] text-white"
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 7px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 7px)',
      }}
    >
      {/* Browser-style header, as the phone shows it */}
      <div className="flex items-start justify-between bg-[#1b1b1b] px-4 pb-2 pt-9">
        <div>
          <p className="text-[13px] font-semibold leading-tight">Sign in to {BRAND.ssid}</p>
          <p className="text-[10px] text-white/50">dice.spot</p>
        </div>
        <MoreVertical className="mt-0.5 h-4 w-4 text-white/70" />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-4 pt-3">{children}</div>
    </div>
  );
}

function Tile({ b, i, selected }: { b: (typeof BUNDLES)[number]; i: number; selected?: boolean }) {
  return (
    <div
      className={
        'flex flex-col items-center justify-center rounded-sm border-2 bg-white py-3 text-center transition-transform ' +
        TILE_BORDERS[i % TILE_BORDERS.length] +
        (selected ? ' scale-[1.06] ring-2 ring-white ring-offset-2 ring-offset-[#141414]' : '')
      }
    >
      <span className="text-[11px] font-bold text-green-600">{b.duration.replace(' hours', ' Hours').replace(' hour', ' hour')}</span>
      <span className="mt-1 text-[11px] font-bold text-red-600">KSH:{b.price}/-</span>
    </div>
  );
}

/** M-Pesa PIN prompt that fills its PIN, then turns into the connected screen */
function PayAndConnect({ reduced }: { reduced: boolean }) {
  const [pin, setPin] = useState(reduced ? 4 : 0);
  const connected = pin >= 4;
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    if (pin < 4) {
      const t = window.setTimeout(() => setPin((p) => p + 1), 380);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setDone(true), 900);
    return () => window.clearTimeout(t);
  }, [pin, reduced]);

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key="stk"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-lg bg-white p-4 text-night shadow-xl"
          >
            <p className="font-display text-sm font-black text-[#3FA535]">M-PESA</p>
            <p className="mt-2 text-xs leading-snug text-night/80">
              Do you want to pay Ksh {DEMO.price}.00 to {BRAND.ssid}? Enter M-PESA PIN:
            </p>
            <div className="mt-3 flex gap-1.5">
              {[0, 1, 2, 3].map((d) => (
                <span key={d} className="flex h-8 flex-1 items-center justify-center rounded border border-night/20 text-lg leading-none">
                  {d < pin ? '•' : ''}
                </span>
              ))}
            </div>
            <div className="mt-3 flex justify-end gap-4 text-xs font-semibold text-[#3FA535]">
              <span>CANCEL</span>
              <span className={connected ? 'opacity-100' : 'opacity-50'}>OK</span>
            </div>
            {connected && <p className="mt-2 text-center text-[10px] text-night/60">Confirming with M-Pesa…</p>}
          </motion.div>
        ) : (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center text-center"
          >
            <span className="relative flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping-soft" />
              <CheckCircle2 className="relative h-16 w-16 text-green-500" />
            </span>
            <p className="mt-4 font-display text-xl font-black">Connected!</p>
            <p className="mt-1 text-xs text-white/70">
              {DEMO.duration} · unlimited data
            </p>
            <p className="mt-6 rounded bg-white/10 px-3 py-2 text-[10px] text-white/70">
              Customer care: {BRAND.phone}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

/** The phone screen for each step, drawn in code so it is crisp at any size */
function PhoneScreen({ step, reduced }: { step: number; reduced: boolean }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
      >
        {step === 0 && (
          <div className="absolute inset-0 flex flex-col px-5 pb-6 pt-12">
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
          </div>
        )}

        {step === 1 && (
          <Portal>
            <div className="rounded-md bg-white/10 p-3 text-[10px] leading-relaxed text-white/85">
              <p className="text-center text-[12px] font-semibold text-white">How To Purchase:</p>
              <p>1. Tap on your preferred package.</p>
              <p>2. Enter your phone number.</p>
              <p>3. Click &ldquo;PAY NOW&rdquo;.</p>
              <p>4. Enter your M-Pesa PIN, wait 30 sec.</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {BUNDLES.map((b, i) => (
                <Tile key={b.id} b={b} i={i} selected={b.id === DEMO.id} />
              ))}
            </div>
          </Portal>
        )}

        {step === 2 && (
          <Portal>
            <div className="grid grid-cols-2 gap-2.5">
              <Tile b={DEMO} i={BUNDLES.indexOf(DEMO)} selected />
              <div className="flex items-center text-[11px] leading-snug text-white/80">
                {DEMO.duration} of unlimited WiFi for KSH {DEMO.price}
              </div>
            </div>
            <label className="mt-5 text-[11px] text-white/70">Enter your phone number</label>
            <div className="mt-1.5 rounded bg-white px-3 py-2.5 text-sm text-night">
              <motion.span
                initial={reduced ? false : { width: 0 }}
                animate={{ width: 'auto' }}
                transition={{ duration: 1.2, ease: 'linear' }}
                className="inline-block overflow-hidden whitespace-nowrap align-bottom"
              >
                0712 345 678
              </motion.span>
              <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-night align-middle" />
            </div>
            <motion.div
              initial={reduced ? false : { scale: 1 }}
              animate={reduced ? undefined : { scale: [1, 1, 0.94, 1] }}
              transition={{ duration: 2.2, times: [0, 0.75, 0.85, 1] }}
              className="mt-4 rounded bg-coral py-2.5 text-center text-sm font-bold tracking-wide"
            >
              PAY NOW
            </motion.div>
          </Portal>
        )}

        {step === 3 && <PayAndConnect reduced={reduced} />}
      </motion.div>
    </AnimatePresence>
  );
}

/** Four steps with an interactive phone that mirrors the real sign-in page */
export default function HowItWorks() {
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduced = !!useReducedMotion();

  /* Play the walkthrough on its own while it's on screen; a tap takes over */
  useEffect(() => {
    if (!inView || manual || reduced) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEP_MS[step]);
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
            <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-sun/70" aria-hidden="true" />
            <div className="absolute -right-10 bottom-6 h-40 w-40 rounded-full bg-coral/80" aria-hidden="true" />
            <div className="relative aspect-[9/19] animate-float rounded-[3rem] bg-night p-3 shadow-[0_40px_80px_-30px_rgba(14,27,77,0.7)] ring-1 ring-white/10 motion-reduce:animate-none">
              <div className="relative h-full overflow-hidden rounded-[2.4rem] bg-cream text-night">
                <PhoneScreen step={step} reduced={reduced} />
                <div className="absolute left-1/2 top-3 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-night" aria-hidden="true" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
