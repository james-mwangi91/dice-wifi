import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Wifi } from 'lucide-react';
import {
  BUNDLES,
  HERO_DESKTOP_WIDTHS,
  HERO_MOBILE_WIDTHS,
  HERO_SLIDES,
  unsplash,
  unsplashSet,
  type Slide,
} from '../data';

const SLIDE_MS = 7000;
const EASE = [0.22, 1, 0.36, 1] as const;

/** One full-bleed slide: 16:9 HD on wide screens, 9:16 portrait crop on phones */
function SlideImage({ slide, first, reduced }: { slide: Slide; first: boolean; reduced: boolean }) {
  return (
    /* The mirror lives on a wrapper: the Ken Burns animation owns the img's transform */
    <div className={'h-full w-full ' + (slide.flip ? '-scale-x-100' : '')}>
    <picture className="block h-full w-full">
      <source
        media="(max-width: 767px)"
        srcSet={unsplashSet(slide.id, 9 / 16, HERO_MOBILE_WIDTHS, 82)}
        sizes="100vw"
      />
      <img
        src={unsplash(slide.id, 1920, 1080, 82)}
        srcSet={unsplashSet(slide.id, 16 / 9, HERO_DESKTOP_WIDTHS, 82)}
        sizes="100vw"
        alt={slide.alt}
        fetchPriority={first ? 'high' : 'auto'}
        decoding="async"
        draggable={false}
        style={{ objectPosition: slide.pos }}
        className={'h-full w-full select-none object-cover ' + (reduced ? '' : 'animate-kenburns')}
      />
    </picture>
    </div>
  );
}

/** WiFi glyph with radiating rings — the hero's signature motion */
function SignalPulse() {
  return (
    <span className="relative inline-flex h-9 w-9 items-center justify-center" aria-hidden="true">
      {[0, 1.2, 2.4].map((d) => (
        <span
          key={d}
          className="absolute inset-0 rounded-full border-2 border-sun animate-ripple"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-sun text-night">
        <Wifi className="h-4 w-4" strokeWidth={2.5} />
      </span>
    </span>
  );
}

/** Headline that rises in word by word */
function RiseHeadline({ reduced }: { reduced: boolean }) {
  const lines: { text: string; mark?: boolean }[][] = [
    [{ text: 'Fast' }, { text: 'WiFi,' }],
    [{ text: 'pocket', mark: true }, { text: 'prices.' }],
  ];
  let i = 0;
  return (
    <h1 className="font-display text-[3.4rem] font-black leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-[6.5rem]">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((w) => {
            const delay = 0.15 + i++ * 0.09;
            return (
              <span key={w.text} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
                <motion.span
                  className={'inline-block ' + (w.mark ? 'squiggle' : '')}
                  initial={reduced ? false : { y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay, ease: EASE }}
                >
                  {w.text}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

/** Full-viewport hero: HD photo carousel as the background, copy in front */
export default function Hero() {
  const reduced = !!useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const playing = !paused && !hidden && !reduced;
  const slide = HERO_SLIDES[index];
  const quick = BUNDLES.filter((b) => ['1h', '24h', '7d'].includes(b.id));

  const go = useCallback((n: number) => setIndex((n + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => go(index + 1), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, playing, go]);

  /* Don't burn cycles (or data) while the tab is in the background */
  useEffect(() => {
    const on = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);

  /* Preload the next slide at the size this screen will request */
  useEffect(() => {
    const next = HERO_SLIDES[(index + 1) % HERO_SLIDES.length];
    const img = new Image();
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    img.sizes = '100vw';
    img.srcset = mobile
      ? unsplashSet(next.id, 9 / 16, HERO_MOBILE_WIDTHS, 82)
      : unsplashSet(next.id, 16 / 9, HERO_DESKTOP_WIDTHS, 82);
  }, [index]);

  return (
    <motion.section
      id="top"
      role="region"
      aria-roledescription="carousel"
      aria-label="DICE Hotspot"
      className="relative flex min-h-[100svh] touch-pan-y flex-col overflow-hidden bg-night text-white"
      onPanEnd={(_, info) => {
        if (Math.abs(info.offset.x) < 70 || Math.abs(info.offset.y) > Math.abs(info.offset.x)) return;
        go(index + (info.offset.x < 0 ? 1 : -1));
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1);
        if (e.key === 'ArrowLeft') go(index - 1);
      }}
    >
      {/* Background slides — crossfade, each with a slow Ken Burns push */}
      <div className="absolute inset-0" aria-live={playing ? 'off' : 'polite'}>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.2 : 1.4, ease: 'easeInOut' }}
          >
            <SlideImage slide={slide} first={index === 0} reduced={reduced} />
          </motion.div>
        </AnimatePresence>

        {/* Legibility: violet wash from the text side, plus top and bottom fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent md:bg-[linear-gradient(90deg,rgba(30,11,58,0.9)_0%,rgba(30,11,58,0.6)_38%,rgba(30,11,58,0)_70%)]" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-night/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-night/80 to-transparent" />
      </div>

      {/* Copy */}
      <div className="container-x relative flex flex-1 flex-col justify-end pb-10 pt-32 md:justify-center md:pb-24">
        <div className="max-w-2xl">
          <motion.p
            className="inline-flex items-center gap-3 font-display text-sm font-bold uppercase tracking-[0.16em] text-sun"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <SignalPulse /> Pay-as-you-go WiFi · Nairobi
          </motion.p>

          <div className="mt-6">
            <RiseHeadline reduced={reduced} />
          </div>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          >
            Join <strong className="font-semibold text-white">DICE Hotspot</strong> at estates, cafés and stages across Nairobi.
            Unlimited data from <strong className="font-semibold text-sun">KES 10 an hour</strong> — pay with M-Pesa and you&rsquo;re on.
          </motion.p>

          {/* Quick-pick bundles, frosted over the photo */}
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-2.5 sm:gap-3">
            {quick.map((b, i) => (
              <motion.a
                key={b.id}
                href="#bundles"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.08, ease: EASE }}
                whileHover={reduced ? undefined : { y: -4 }}
                className={
                  'relative rounded-2xl border p-3.5 backdrop-blur-md transition-colors sm:p-4 ' +
                  (b.popular
                    ? 'border-sun bg-sun text-night'
                    : 'border-white/25 bg-white/10 text-white hover:bg-white/20')
                }
              >
                {b.popular && (
                  <span className="absolute -top-2.5 left-3 rounded-full bg-coral px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-white">
                    Popular
                  </span>
                )}
                <span className={'block text-xs font-semibold ' + (b.popular ? 'text-night/70' : 'text-white/70')}>{b.duration}</span>
                <span className="mt-0.5 block font-display text-2xl font-black sm:text-3xl">
                  <span className="text-xs font-bold sm:text-sm">KES </span>
                  {b.price}
                </span>
              </motion.a>
            ))}
          </div>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
          >
            <a href="#bundles" className="btn-coral">
              See all bundles <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#how" className="btn-ghost-light">
              <Wifi className="h-4 w-4" /> How to connect
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slide caption, progress and controls */}
      <div className="container-x relative pb-8">
        <div className="flex flex-col gap-5 border-t border-white/15 pt-5 md:flex-row md:items-end md:justify-between">
          <div className="hidden min-h-[3.5rem] md:block" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4"
              >
                <span className="rounded-full bg-sun px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-night">
                  {slide.tag}
                </span>
                <span className="max-w-md font-display text-lg font-semibold text-white/90">{slide.caption}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-1 gap-2 md:w-56 md:flex-none">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show slide ${i + 1} of ${HERO_SLIDES.length}: ${s.tag}`}
                  aria-current={i === index}
                  className="relative h-6 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
                    <span
                      key={`${i}-${index}-${playing}`}
                      className="block h-full origin-left rounded-full bg-sun"
                      style={{
                        transform: i < index || (i === index && !playing) ? 'scaleX(1)' : 'scaleX(0)',
                        animation: i === index && playing ? `progress ${SLIDE_MS}ms linear forwards` : undefined,
                      }}
                    />
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/25 transition-colors hover:border-white hover:bg-white/10"
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/25 transition-colors hover:border-white hover:bg-white/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-night transition-colors hover:bg-sun"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </motion.section>
  );
}
