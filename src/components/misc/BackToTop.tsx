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
          className="fixed bottom-40 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow transition-shadow hover:shadow-glow lg:right-8"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
