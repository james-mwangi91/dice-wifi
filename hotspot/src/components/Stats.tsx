import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Clock, Headphones, MapPin, Smartphone } from 'lucide-react';
import { BUNDLES, SPOT_AREAS } from '../data';

/* Facts about the service itself — no invented customer numbers */
const STATS = [
  { value: Math.min(...BUNDLES.map((b) => b.price)), prefix: 'KES ', suffix: '', label: 'Cheapest bundle', icon: Clock },
  { value: SPOT_AREAS.filter((a) => a.status === 'live').length, prefix: '', suffix: '', label: 'Areas live now', icon: MapPin },
  { value: Math.max(...BUNDLES.map((b) => b.devices)), prefix: '', suffix: '', label: 'Devices on one bundle', icon: Smartphone },
  { value: 24, prefix: '', suffix: '/7', label: 'WhatsApp support', icon: Headphones },
];

function Count({ to, prefix, suffix }: { to: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

/** Row of four stat cards with red icon badges (theme pattern) */
export default function Stats() {
  return (
    <section aria-label="DICE Hotspot at a glance" className="bg-surface py-16">
      <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between gap-4 rounded-lg bg-card p-5 shadow-[0_14px_34px_-24px_rgba(14,27,77,0.5)] ring-1 ring-ink/5 sm:p-6"
          >
            <div>
              <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
                <Count to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs font-medium text-ink/60 sm:text-sm">{s.label}</p>
            </div>
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-night text-white sm:inline-flex dark:bg-coral">
              <s.icon className="h-5 w-5" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
