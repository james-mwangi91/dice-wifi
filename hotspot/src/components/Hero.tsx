import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Wifi } from 'lucide-react';
import { BUNDLES, HERO_SLIDES, unsplash, unsplashSet } from '../data';

const SLIDE_MS = 6000;
const RATIO = 4 / 5;

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/** HD photo carousel: autoplay with progress bars, swipe, arrows and keyboard */
function Carousel() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const playing = !paused && !hovering && !reduced;
  const slide = HERO_SLIDES[index];

  const go = useCallback((next: number) => {
    setIndex((cur) => {
      const n = (next + HERO_SLIDES.length) % HERO_SLIDES.length;
      setDir(n > cur || (cur === HERO_SLIDES.length - 1 && n === 0) ? 1 : -1);
      return n;
    });
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => go(index + 1), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, playing, go]);

  /* Warm the cache for the next slide so transitions never show a blank frame */
  useEffect(() => {
    const next = HERO_SLIDES[(index + 1) % HERO_SLIDES.length];
    const img = new Image();
    img.src = unsplash(next.id, 1200, Math.round(1200 / RATIO));
  }, [index]);

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="DICE Hotspot highlights"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1);
        if (e.key === 'ArrowLeft') go(index - 1);
      }}
    >
      {/* Sun disc behind the frame */}
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sun sm:h-64 sm:w-64" aria-hidden="true" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-night-700 shadow-[0_40px_80px_-30px_rgba(30,11,58,0.7)] sm:aspect-[5/5] lg:aspect-[4/5]">
        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={slide.id}
            src={unsplash(slide.id, 1600, Math.round(1600 / RATIO))}
            srcSet={unsplashSet(slide.id, RATIO)}
            sizes="(min-width: 1024px) 40vw, 92vw"
            alt={slide.alt}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * 60, scale: reduced ? 1 : 1.06 }),
              center: { opacity: 1, x: 0, scale: 1 },
              exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * -60 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduced ? 0.2 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            drag={reduced ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(index + 1);
              else if (info.offset.x > 60) go(index - 1);
            }}
            draggable={false}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            className="absolute inset-0 h-full w-full cursor-grab touch-pan-y select-none object-cover active:cursor-grabbing"
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/85 via-night/30 to-transparent" />

        {/* Caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <span className="inline-block rounded-full bg-sun px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-night">
                {slide.tag}
              </span>
              <p className="mt-3 max-w-sm font-display text-xl font-semibold leading-snug text-white sm:text-2xl">{slide.caption}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bars */}
        <div className="absolute inset-x-6 top-6 flex gap-2 sm:inset-x-8">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show slide ${i + 1} of ${HERO_SLIDES.length}`}
              aria-current={i === index}
              className="group relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/35">
                <span
                  key={`${i}-${index}-${playing}`}
                  className="block h-full origin-left rounded-full bg-white"
                  style={{
                    transform: i < index ? 'scaleX(1)' : 'scaleX(0)',
                    animation:
                      i === index
                        ? playing
                          ? `progress ${SLIDE_MS}ms linear forwards`
                          : undefined
                        : undefined,
                    ...(i === index && !playing ? { transform: 'scaleX(1)' } : {}),
                  }}
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-between">
        <p className="font-display text-sm font-bold text-night/60">
          <span className="text-night">{String(index + 1).padStart(2, '0')}</span> / {String(HERO_SLIDES.length).padStart(2, '0')}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-night/15 text-night transition-colors hover:border-night"
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-night/15 text-night transition-colors hover:border-night"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-night text-white transition-colors hover:bg-night-700"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Split hero: promise + quick bundle picks on the left, HD carousel on the right */
export default function Hero() {
  const quick = BUNDLES.filter((b) => ['1h', '24h', '7d'].includes(b.id));

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28 lg:pb-28 lg:pt-36">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-coral animate-ping-soft" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
            </span>
            Pay-as-you-go WiFi · Nairobi
          </span>

          <h1 className="mt-6 font-display text-5xl font-black leading-[0.98] tracking-tight text-night sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            Fast WiFi,
            <br />
            <span className="squiggle">pocket</span> prices.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-night/70 sm:text-xl">
            Join <strong className="font-semibold text-night">DICE Hotspot</strong> at estates, cafés and stages across Nairobi.
            Unlimited data from <strong className="font-semibold text-night">KES 10 an hour</strong> — pay with M-Pesa and you&rsquo;re on.
          </p>

          {/* Quick-pick bundles */}
          <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {quick.map((b) => (
              <a
                key={b.id}
                href="#bundles"
                className={
                  'group relative rounded-3xl border-2 p-4 transition-all duration-200 hover:-translate-y-1 sm:p-5 ' +
                  (b.popular ? 'border-night bg-night text-white' : 'border-night/10 bg-white text-night hover:border-night/30')
                }
              >
                {b.popular && (
                  <span className="absolute -top-3 left-4 rounded-full bg-coral px-2.5 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-white">
                    Popular
                  </span>
                )}
                <span className={'block text-xs font-semibold ' + (b.popular ? 'text-white/60' : 'text-night/50')}>{b.duration}</span>
                <span className="mt-1 block font-display text-2xl font-black sm:text-3xl">
                  <span className="text-sm font-bold">KES </span>
                  {b.price}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#bundles" className="btn-coral">
              See all bundles <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#how" className="btn-ghost">
              <Wifi className="h-4 w-4" /> How to connect
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Carousel />
        </motion.div>
      </div>
    </section>
  );
}
