import { useEffect, useRef, useState } from 'react';
import { NavLink as RouterLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../constants';
import { cn } from '../../utils/cn';
import { useScrolled, useScrollLock } from '../../hooks';
import { LogoWordmark } from '../Logo';
import ThemeToggle from '../misc/ThemeToggle';
import Button from '../ui/Button';

/** Sticky navigation: transparent over the dark page headers, solid once scrolled */
export default function Navbar() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const drawerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  /* Every page opens on a dark header, so the bar reads light until it turns solid */
  const onDark = !scrolled;

  useScrollLock(open);

  /* Close on Escape, trap focus inside the drawer while it is modal */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

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
    const trigger = triggerRef.current;
    const drawer = drawerRef.current;
    return () => {
      window.removeEventListener('keydown', onKey);
      if (trigger && drawer?.contains(document.activeElement)) {
        trigger.focus();
      }
    };
  }, [open]);

  /* Any route change closes the drawer */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-slate-900/10 bg-brand-light/90 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-brand-dark/90'
            : 'border-b border-transparent bg-transparent py-5'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8" aria-label="Main navigation">
          <Link to="/" className="shrink-0" aria-label="DICE WiFi — home">
            <LogoWordmark light={onDark} />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <RouterLink
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      'relative rounded-full px-4 py-2 font-display text-[15px] font-semibold transition-colors duration-200',
                      onDark
                        ? isActive
                          ? 'text-brand-lime'
                          : 'text-white/75 hover:text-white'
                        : isActive
                          ? 'text-brand-dark dark:text-brand-lime'
                          : 'text-slate-600 hover:text-brand-dark dark:text-slate-300 dark:hover:text-white'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-lime"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </>
                  )}
                </RouterLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={BRAND.phoneHref}
              className={cn(
                'hidden items-center gap-2 font-display text-sm font-bold transition-colors xl:inline-flex',
                onDark ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-brand-dark dark:text-slate-300 dark:hover:text-white'
              )}
            >
              <Phone className="h-4 w-4" />
              {BRAND.phone}
            </a>
            <ThemeToggle onDark={onDark} />
            <div className="hidden sm:block">
              <Button to="/contact" size="sm">
                Get connected
              </Button>
            </div>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden',
                onDark
                  ? 'border-white/20 text-white'
                  : 'border-slate-900/15 text-brand-dark dark:border-white/15 dark:text-white'
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

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
              className="fixed inset-y-0 right-0 z-[70] flex w-[88%] max-w-sm flex-col bg-brand-dark p-7 text-white lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <LogoWordmark light />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-10 flex-1 space-y-1 overflow-y-auto">
                {[{ label: 'Home', href: '/' }, ...NAV_LINKS, { label: 'Contact', href: '/contact' }].map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <RouterLink
                      to={link.href}
                      end={link.href === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl font-bold transition-colors',
                          isActive ? 'text-brand-lime' : 'text-white hover:text-brand-lime'
                        )
                      }
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-white/30">→</span>
                    </RouterLink>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 space-y-3">
                <Button to="/contact" fullWidth>
                  Get connected
                </Button>
                <Button href={BRAND.phoneHref} variant="glass" fullWidth icon={<Phone className="h-4 w-4" />}>
                  {BRAND.phone}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
