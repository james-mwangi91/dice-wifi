import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrolled } from '../../hooks';

/** Floating back-to-top button, appears after scrolling */
export default function BackToTop() {
  const scrolled = useScrolled(600);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-24 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-900/10 bg-white text-brand-dark shadow-card dark:border-white/10 dark:bg-slate-900 dark:text-white lg:right-8"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
