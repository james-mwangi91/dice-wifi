import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Wifi } from 'lucide-react';
import { BUNDLES, HERO_SLIDES, unsplash, unsplashSet } from '../data';
import heroLarge from '../assets/hero-friends-1169.webp';
import heroSmall from '../assets/hero-friends-640.webp';

const SLIDE_MS = 6500;
const EASE = [0.22, 1, 0.36, 1] as const;
/* The blob frame is a touch taller than wide, like the hero photo */
const RATIO = 1169 / 1345;

interface BlobSlide {
  key: string;
  src: string;
  srcSet: string;
  alt: string;
}

/* Our own photo leads; the stock photos follow in the same frame */
const SLIDES: BlobSlide[] = [
  {
    key: 'friends',
    src: heroLarge,
    srcSet: `${heroSmall} 640w, ${heroLarge} 1169w`,
    alt: 'Five friends on a sofa streaming, gaming and browsing on phones, a tablet and laptops',
  },
  ...HERO_SLIDES.filter((s) => s.id !== '1611348524140-53c9a25263d6').map((s) => ({
    key: s.id,
    src: unsplash(s.id, 1200, Math.round(1200 / RATIO)),
    srcSet: unsplashSet(s.id, RATIO, [640, 900, 1200]),
    alt: s.alt,
  })),
];

/** Headline that rises in word by word */
function RiseHeadline({ reduced }: { reduced: boolean }) {
  const words: { text: string; accent?: boolean; br?: boolean }[] = [
    { text: 'Fast' },
    { text: 'WiFi,', br: true },
    { text: 'pocket', accent: true },
    { text: 'prices.', accent: true },
  ];
  return (
    <h1 className="font-display text-5xl font-black leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
      {words.map((w, i) => (
        <span key={w.text}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={'inline-block ' + (w.accent ? 'text-coral' : '')}
              initial={reduced ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 + i * 0.09, ease: EASE }}
            >
              {w.text}
            </motion.span>
          </span>
          {w.br ? <br /> : ' '}
        </span>
      ))}
    </h1>
  );
}

/** Small frosted badge that floats over the photo */
function FloatBadge({ className, delay, children }: { className: string; delay: number; children: ReactNode }) {
  return (
    <motion.div
      className={'absolute z-20 ' + className}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <div className="animate-float rounded-2xl bg-card/95 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(30,11,58,0.45)] ring-1 ring-ink/5 backdrop-blur motion-reduce:animate-none">
        {children}
      </div>
    </motion.div>
  );
}

/** Split hero in the style of the brief: copy left, photo in an organic blob right */
export default function Hero() {
  const reduced = !!useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const playing = !hovering && !reduced;
  const slide = SLIDES[index];
  const quick = BUNDLES.filter((b) => ['1h', '24h', '7d'].includes(b.id));

  const go = useCallback((n: number) => setIndex((n + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (!playing) return;
    /* Our own photo stays up a little longer than the rest */
    const t = window.setTimeout(() => go(index + 1), index === 0 ? SLIDE_MS * 1.5 : SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, playing, go]);

  useEffect(() => {
    const next = SLIDES[(index + 1) % SLIDES.length];
    const img = new Image();
    img.sizes = '(min-width: 1024px) 560px, 90vw';
    img.srcset = next.srcSet;
  }, [index]);

  return (
    <section id="top" className="relative overflow-hidden bg-surface pb-24 pt-28 lg:pb-32 lg:pt-36">
      {/* Soft panel behind the copy with a sweeping lower edge, as in the brief */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] w-full text-card"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill="currentColor" d="M0 140 C 260 40, 520 300, 860 220 S 1300 120, 1440 180 L 1440 320 L 0 320 Z" />
      </svg>

      {/* Decorative striped discs */}
      <div className="stripe-disc pointer-events-none absolute -left-28 bottom-6 h-56 w-56 opacity-60" aria-hidden="true" />
      <div className="stripe-disc pointer-events-none absolute right-[6%] top-24 hidden h-24 w-24 animate-spin-slow opacity-80 md:block" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-6">
          <motion.p
            className="eyebrow"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Wifi className="h-3.5 w-3.5" strokeWidth={3} /> Pay-as-you-go WiFi · Nairobi
          </motion.p>

          <div className="mt-6">
            <RiseHeadline reduced={reduced} />
          </div>

          <motion.p
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink/70"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          >
            Stream, game, study and scroll together. Join <strong className="font-semibold text-ink">DICE Hotspot</strong> at
            estates, cafés and stages across Nairobi — unlimited data from{' '}
            <strong className="font-semibold text-coral">KES 10 an hour</strong>, paid with M-Pesa.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          >
            <a href="#bundles" className="btn-coral">
              Buy a bundle <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#how" className="btn-ghost">
              How to connect
            </a>
          </motion.div>

          {/* Quick prices */}
          <motion.ul
            className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-ink/10 pt-6"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {quick.map((b) => (
              <li key={b.id}>
                <a href="#bundles" className="group block">
                  <span className="block font-display text-3xl font-black text-ink transition-colors group-hover:text-coral">
                    <span className="text-base font-bold">KES </span>
                    {b.price}
                  </span>
                  <span className="text-sm text-ink/60">{b.duration}</span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Photo in a breathing blob */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-6 lg:max-w-none lg:pl-6">
          <motion.div
            className="relative"
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* Offset tinted blob behind the photo */}
            <div
              className="absolute -right-6 -top-6 bottom-6 left-6 animate-blob bg-sun/60 motion-reduce:animate-none dark:bg-sun/25"
              style={{ animationDelay: '-5s' }}
              aria-hidden="true"
            />

            <div
              className="relative aspect-[1169/1345] animate-blob overflow-hidden bg-night-700 shadow-[0_40px_80px_-35px_rgba(30,11,58,0.6)] motion-reduce:animate-none"
              role="region"
              aria-roledescription="carousel"
              aria-label="DICE Hotspot in everyday life"
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={slide.key}
                  src={slide.src}
                  srcSet={slide.srcSet}
                  sizes="(min-width: 1024px) 560px, 90vw"
                  alt={slide.alt}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                  initial={{ opacity: 0, scale: reduced ? 1 : 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 1.1 }, scale: { duration: 6, ease: 'easeOut' } }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Small solid accent, like the dark dot in the brief */}
            <div className="absolute -bottom-3 left-[38%] h-14 w-14 rounded-full bg-night ring-8 ring-surface dark:bg-coral" aria-hidden="true" />

            <FloatBadge className="-left-4 top-[14%] sm:-left-10" delay={0.9}>
              <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-mpesa animate-ping-soft" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mpesa" />
                </span>
                5 devices online
              </p>
            </FloatBadge>

            <FloatBadge className="-right-2 bottom-[16%] sm:-right-6" delay={1.1}>
              <p className="flex items-center gap-2.5">
                <CheckCircle2 className="h-6 w-6 text-coral" />
                <span>
                  <span className="block font-display text-lg font-black leading-none text-ink">KES 40</span>
                  <span className="text-xs text-ink/60">24 hrs · paid via M-Pesa</span>
                </span>
              </p>
            </FloatBadge>
          </motion.div>

          {/* Slide dots */}
          <div className="mt-8 flex justify-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show photo ${i + 1} of ${SLIDES.length}`}
                aria-current={i === index}
                className="flex h-6 items-center"
              >
                <span
                  className={
                    'block h-2 rounded-full transition-all duration-500 ' +
                    (i === index ? 'w-8 bg-coral' : 'w-2 bg-ink/20 hover:bg-ink/40')
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
