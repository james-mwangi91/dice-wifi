import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../Logo';
import { useReducedMotion, useScrollLock } from '../../hooks';

/** Full-screen brand loading screen shown on first mount */
export default function Loader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useScrollLock(visible);

  useEffect(() => {
    /* Respect reduced-motion by cutting the splash short rather than removing it */
    const t = window.setTimeout(() => setVisible(false), reduced ? 200 : 1900);
    return () => window.clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-dark"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading DICE WiFi"
        >
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute h-80 w-80 rounded-full bg-brand-primary/25 blur-[100px]" />

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="relative"
          >
            <Logo className="h-24 w-24 drop-shadow-glow" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="relative mt-8 font-display text-xl font-extrabold tracking-tight text-white"
          >
            DICE <span className="text-brand-accent">WiFi</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            className="relative mt-2 text-xs font-medium uppercase tracking-[0.35em] text-slate-400"
          >
            Fast · Reliable · Unlimited
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="relative mt-10 h-0.5 w-48 origin-left overflow-hidden rounded-full bg-white/10"
          >
            <div className="h-full w-full bg-gradient-brand shimmer" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
