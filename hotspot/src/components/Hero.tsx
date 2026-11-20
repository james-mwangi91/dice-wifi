import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Wifi } from 'lucide-react';
import { BUNDLES } from '../data';
import heroLarge from '../assets/hero-friends-1169.webp';
import heroSmall from '../assets/hero-friends-640.webp';
import thumbsLarge from '../assets/hero-thumbsup-1535.webp';
import thumbsSmall from '../assets/hero-thumbsup-800.webp';
import phoneImg from '../assets/hero-phone-612.webp';

const SLIDE_MS = 6500;
const EASE = [0.22, 1, 0.36, 1] as const;
interface BlobSlide {
  key: string;
  src: string;
  srcSet: string;
  alt: string;
  /** object-position inside the square blob, so faces stay in frame */
  pos: string;
}

/* DICE's own photos, shown in the blob */
const SLIDES: BlobSlide[] = [
  {
    key: 'friends',
    src: heroLarge,
    srcSet: `${heroSmall} 640w, ${heroLarge} 1169w`,
    alt: 'Five friends on a sofa streaming, gaming and browsing on phones, a tablet and laptops',
    pos: '50% 75%',
  },
  {
    key: 'thumbsup',
    src: thumbsLarge,
    srcSet: `${thumbsSmall} 800w, ${thumbsLarge} 1535w`,
    alt: 'Two smiling friends giving a thumbs up, one holding a phone showing a connected WiFi signal',
    pos: '50% 50%',
  },
  {
    key: 'phone',
    src: phoneImg,
    srcSet: `${phoneImg} 612w`,
    alt: 'Hands holding a smartphone with a glowing WiFi signal above it',
    pos: '50% 50%',
  },
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
              className={'inline-block ' + (w.accent ? 'text-accent' : '')}
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
      <div className="animate-float rounded-2xl bg-card/95 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(14,27,77,0.45)] ring-1 ring-ink/5 backdrop-blur motion-reduce:animate-none">
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
  const quick = BUNDLES.filter((b) => ['1h', '5h', '7d'].includes(b.id));

  const go = useCallback((n: number) => setIndex((n + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => go(index + 1), SLIDE_MS);
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

      {/* Phones: title, then the blob, then buttons and prices.
          Desktop: copy on the left (title above actions), blob on the right. */}
      <div className="container-x relative grid gap-y-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-8">
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:self-end">
          <motion.p
            className="eyebrow"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Wifi className="h-3.5 w-3.5" strokeWidth={3} /> Hotspot WiFi · Rongai · Banana · Kiserian
          </motion.p>

          <div className="mt-6">
            <RiseHeadline reduced={reduced} />
          </div>

          <motion.p
            className="mt-6 hidden max-w-lg text-lg leading-relaxed text-ink/70 lg:block"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          >
            Stream, game, study and scroll together. Join <strong className="font-semibold text-ink">DICE WIFI</strong> at
            apartments, cafés, stages and hostels in Rongai, Banana and Kiserian — unlimited data from{' '}
            <strong className="font-semibold text-accent">KES 10 an hour</strong>, paid with M-Pesa.
          </motion.p>
        </div>

        {/* Photo in a breathing blob */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center lg:pl-6">
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
              className="absolute -right-6 -top-6 bottom-6 left-6 animate-blob bg-night/10 motion-reduce:animate-none dark:bg-white/10"
              style={{ animationDelay: '-5s' }}
              aria-hidden="true"
            />

            <div
              className="relative aspect-square animate-blob overflow-hidden bg-night-700 shadow-[0_40px_80px_-35px_rgba(14,27,77,0.6)] motion-reduce:animate-none"
              role="region"
              aria-roledescription="carousel"
              aria-label="DICE WIFI in everyday life"
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
                  style={{ objectPosition: slide.pos }}
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
                Connected in seconds
              </p>
            </FloatBadge>

            <FloatBadge className="-right-2 bottom-[16%] sm:-right-6" delay={1.1}>
              <p className="flex items-center gap-2.5">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <span>
                  <span className="block font-display text-lg font-black leading-none text-ink">KES 20</span>
                  <span className="text-xs text-ink/60">5 hrs Binge Mode · M-Pesa</span>
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

        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start">
          <motion.div
            className="flex flex-wrap items-center gap-3"
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
                  <span className="block font-display text-3xl font-black text-ink transition-colors group-hover:text-accent">
                    <span className="text-base font-bold">KES </span>
                    {b.price}
                  </span>
                  <span className="text-sm text-ink/60">{b.duration}</span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
