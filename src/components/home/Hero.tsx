import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Wifi } from 'lucide-react';
import { HERO_STATS } from '../../constants';
import Button from '../ui/Button';
import CountUpNumber from '../ui/CountUp';
import { fadeUp, stagger } from '../../animations/variants';
import { navigateToSection } from '../../utils/scroll';
import { cn } from '../../utils/cn';

/** Carousel slides for the hero visual */
const HERO_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=1400&q=80',
    alt: 'Family relaxing together while streaming and browsing on their devices',
  },
  {
    src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=80',
    alt: 'Modern WiFi router keeping a home connected',
  },
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    alt: 'High-speed network connecting people around the world',
  },
];

/** Hero visual — D-shaped carousel of ISP imagery with a smooth crossfade */
function NetworkVisual() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-xl"
    >
      {/* Glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-brand-primary/25 blur-[90px]" />

      {/* D-shaped carousel */}
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="What DICE WiFi does"
        className="relative overflow-hidden rounded-r-[13rem] shadow-soft ring-1 ring-white/15 sm:rounded-r-[15rem]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative h-[26rem] w-full sm:h-[30rem]">
          <AnimatePresence>
            {HERO_SLIDES.map(
              (slide, i) =>
                i === index && (
                  <motion.img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    loading="eager"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 1.4, ease: 'easeInOut' }, scale: { duration: 1.4, ease: 'easeInOut' } }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )
            )}
          </AnimatePresence>
        </div>

        {/* Soft bottom blend into the hero background */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-dark/80 to-transparent" />

        {/* Slide indicators */}
        <div className="absolute bottom-5 left-6 flex items-center gap-2.5">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1} of ${HERO_SLIDES.length}`}
              className={cn(
                'h-2.5 rounded-full transition-all duration-500',
                i === index ? 'w-7 bg-brand-accent shadow-glow' : 'w-2.5 bg-white/40 hover:bg-white/80'
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/** Full-viewport hero with stats and animated network visual */
export default function Hero() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-brand-dark">
      {/* Background image + overlays */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80"
          alt=""
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/90 to-brand-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60" />
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-noise" />
        {/* Floating gradient orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand-primary/30 blur-[120px]"
        />
        <motion.div
          animate={{ y: [0, 24, 0], x: [0, -16, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -right-24 bottom-10 h-[28rem] w-[28rem] rounded-full bg-brand-secondary/25 blur-[130px]"
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-6 pb-24 pt-32 lg:grid-cols-2 lg:px-8 lg:pt-36">
        {/* Copy */}
        <motion.div variants={stagger(0.14)} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200 backdrop-blur">
            <Wifi className="h-4 w-4 text-brand-accent" />
            Nairobi&rsquo;s Premium Internet Provider
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping-soft" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]"
          >
            Lightning Fast
            <br />
            Internet for{' '}
            <span className="relative inline-block">
              <span className="text-gradient">Home &amp; Business</span>
              <motion.svg viewBox="0 0 300 14" className="absolute -bottom-2 left-0 w-full" aria-hidden="true">
                <motion.path
                  d="M4 10 C 80 3, 220 3, 296 9"
                  stroke="url(#hero-underline)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 1.2, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="hero-underline" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563EB" />
                    <stop offset="1" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300">
            Experience seamless streaming, gaming, remote work and business connectivity with
            reliable high-speed internet — backed by 99.9% uptime and 24/7 support.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Button to="/contact" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Get Connected
            </Button>
            <Button
              size="lg"
              variant="glass"
              onClick={() => navigateToSection('packages', pathname, navigate)}
            >
              View Packages
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.dl variants={fadeUp} className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="order-2 mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</dt>
                <dd className="order-1 font-display text-3xl font-extrabold text-white">
                  <CountUpNumber end={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix} duration={2.4} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Visual */}
        <NetworkVisual />
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          navigateToSection('about', pathname, navigate);
        }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-400 transition-colors hover:text-brand-accent lg:flex"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
