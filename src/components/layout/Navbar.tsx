import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../constants';
import { cn } from '../../utils/cn';
import { navigateToSection } from '../../utils/scroll';
import { useScrolled, useScrollLock } from '../../hooks';
import { LogoWordmark } from '../Logo';
import ThemeToggle from '../misc/ThemeToggle';
import Button from '../ui/Button';

/** Sticky navigation with blur-on-scroll, scrollspy and mobile drawer */
export default function Navbar() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  /* Scrollspy — highlight the section currently in view */
  useEffect(() => {
    if (pathname !== '/') {
      setActive('');
      return;
    }

    const sections = NAV_LINKS.map((l) => document.getElementById(l.href)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    /* Track every section's ratio and pick the most-visible one, rather than
       letting whichever entry happens to fire last win the highlight. */
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let best = '';
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        setActive(best);
      },
      { rootMargin: '-25% 0px -35% 0px', threshold: [0, 0.15, 0.35, 0.6, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  /* Lock body scroll while the drawer is open */
  useScrollLock(open);

  /* Close the drawer on Escape and after any route change */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      /* Keep focus inside the drawer while it is modal */
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    /* Capture both nodes now — by cleanup time the drawer is unmounting and
       the refs may already be null. */
    const trigger = triggerRef.current;
    const drawer = drawerRef.current;
    return () => {
      window.removeEventListener('keydown', onKey);
      /* Return focus to the hamburger, but only if focus is still inside the
         drawer — otherwise closing would yank focus away from wherever the
         user has already moved (e.g. a link they just activated). */
      if (trigger && drawer?.contains(document.activeElement)) {
        trigger.focus();
      }
    };
  }, [open]);

  /* Any route change closes the drawer */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleNav = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    navigateToSection(href, pathname, navigate);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass-strong shadow-card py-3'
            : 'bg-transparent py-5'
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <a href="#home" onClick={(e) => handleNav(e, 'home')} className="shrink-0" aria-label="DICE WiFi — home">
            <LogoWordmark light={!scrolled && pathname === '/'} className={cn(scrolled && 'drop-shadow-sm')} />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={`#${link.href}`}
                  onClick={(e) => handleNav(e, link.href)}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                    active === link.href && pathname === '/'
                      ? 'text-brand-primary dark:text-brand-accent'
                      : 'text-slate-600 hover:text-brand-primary dark:text-slate-300 dark:hover:text-brand-accent'
                  )}
                >
                  {link.label}
                  {active === link.href && pathname === '/' && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-primary/10 dark:bg-brand-accent/10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden md:block">
              <Button to="/contact" size="sm">
                Get Connected
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 bg-white/80 text-brand-dark shadow-card dark:border-white/15 dark:bg-white/10 dark:text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-brand-dark/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="mobile-menu"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col bg-white p-8 dark:bg-slate-950 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className="flex items-center justify-between">
                <LogoWordmark />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 bg-slate-50 text-brand-dark dark:border-white/10 dark:bg-white/10 dark:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-10 flex-1 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={`#${link.href}`}
                      onClick={(e) => handleNav(e, link.href)}
                      className="group flex items-center justify-between rounded-2xl px-5 py-3.5 text-lg font-semibold text-slate-700 transition-colors hover:bg-brand-primary/5 hover:text-brand-primary dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-brand-accent"
                    >
                      {link.label}
                      <span className="text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-primary dark:text-slate-600">
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 space-y-4 border-t border-slate-900/10 pt-6 dark:border-white/10">
                <Button to="/contact" fullWidth onClick={() => setOpen(false)}>
                  Get Connected
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
