import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocalStorage } from '../../hooks';

const STORAGE_KEY = 'dice-cookie-consent';

/** Compact cookie consent bar, shown once per visitor without covering the page */
export default function CookieNotice() {
  const [consent, setConsent] = useLocalStorage<boolean | null>(STORAGE_KEY, null);
  const [dismissed, setDismissed] = useState(false);

  const decide = (value: boolean) => {
    setConsent(value);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {consent === null && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ delay: 2.5, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-5 left-5 right-24 z-40 flex max-w-md flex-col gap-3 rounded-2xl bg-brand-dark p-4 text-sm text-slate-300 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/10 sm:right-auto sm:flex-row sm:items-center"
        >
          <p className="flex-1 leading-snug">We use a few cookies to remember your preferences.</p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => decide(false)}
              className="rounded-full px-3 py-2 font-display text-xs font-bold text-white/70 transition-colors hover:text-white"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => decide(true)}
              className="rounded-full bg-brand-lime px-4 py-2 font-display text-xs font-bold text-brand-dark transition-colors hover:bg-[#B3E033]"
            >
              OK
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
