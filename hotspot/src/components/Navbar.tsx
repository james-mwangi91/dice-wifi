import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { label: 'Bundles', href: '#bundles' },
  { label: 'How it works', href: '#how' },
  { label: 'Find a spot', href: '#spots' },
  { label: 'Free installation', href: '#host' },
  { label: 'FAQ', href: '#faq' },
];

/** Sticky nav; single page, so links are in-page anchors */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /* Thin coral line across the top that fills as you read down the page */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={
          'fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ' +
          (scrolled ? 'shadow-[0_10px_30px_-14px_rgba(14,27,77,0.45)]' : '')
        }
      >
        {/* Main bar inverts the page: navy in light mode, light in dark mode */}
        <div className="border-b border-white/10 bg-night/95 text-white backdrop-blur-xl dark:border-night/10 dark:bg-[#F4F6FB]/95 dark:text-night">
        <motion.div
          className="absolute inset-x-0 top-0 h-[3px] origin-left bg-coral"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
        <nav className="container-x flex items-center justify-between gap-6 py-3.5" aria-label="Main navigation">
          <a href="#top" aria-label="DICE WIFI — back to top">
            <Logo variant="nav" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={
                    'relative px-3.5 py-2 font-display text-sm font-semibold uppercase tracking-wide text-white/85 transition-colors hover:text-white dark:text-night/80 dark:hover:text-accent ' +
                    "after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-coral after:transition-transform after:content-[''] hover:after:scale-x-100"
                  }
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle variant="nav" />
            <a href="#bundles" className="btn-coral hidden !px-5 !py-2.5 !text-sm sm:inline-flex">
              Buy a bundle
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={
                'inline-flex h-11 w-11 items-center justify-center rounded-full border-2 lg:hidden ' +
                'border-white/25 text-white dark:border-night/20 dark:text-night'
              }
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-night p-6 text-white lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between">
              <Logo light />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                autoFocus
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-lg font-medium text-white/90 transition-colors hover:text-sun"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href="#bundles" onClick={() => setOpen(false)} className="btn-coral mt-auto w-full">
              Buy a bundle
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
