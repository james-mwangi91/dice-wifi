import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const LINKS = [
  { label: 'Bundles', href: '#bundles' },
  { label: 'How it works', href: '#how' },
  { label: 'Find a spot', href: '#spots' },
  { label: 'Host a hotspot', href: '#host' },
  { label: 'FAQ', href: '#faq' },
];

/** Sticky nav; single page, so links are in-page anchors */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ' +
          (scrolled ? 'bg-cream/90 py-3 shadow-[0_1px_0_rgba(30,11,58,0.08)] backdrop-blur-xl' : 'py-5')
        }
      >
        <nav className="container-x flex items-center justify-between gap-6" aria-label="Main navigation">
          <a href="#top" aria-label="DICE Hotspot — back to top">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 font-display text-[15px] font-semibold text-night/70 transition-colors hover:bg-night/5 hover:text-night"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#bundles" className="btn-coral hidden !px-5 !py-2.5 !text-sm sm:inline-flex">
              Buy a bundle
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-night/15 text-night lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
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
            <ul className="mt-12 space-y-2">
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
                    className="block py-3 font-display text-4xl font-black tracking-tight transition-colors hover:text-sun"
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
