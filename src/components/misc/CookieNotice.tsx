import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { useLocalStorage } from '../../hooks';

const STORAGE_KEY = 'dice-cookie-consent';

/** Cookie consent notice, shown once per visitor */
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
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ delay: 1.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          className="glass-strong fixed bottom-6 left-6 z-40 max-w-sm rounded-3xl p-6 shadow-soft"
        >
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white">
              <Cookie className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-brand-dark dark:text-white">We value your privacy</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                We use cookies to enhance your browsing experience, analyze traffic and personalise content. Read our{' '}
                <span className="cursor-pointer font-semibold text-brand-primary dark:text-brand-accent">Privacy Policy</span>.
              </p>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => decide(true)}
              className="flex-1 rounded-full bg-gradient-brand px-4 py-2.5 text-xs font-bold text-white transition-all hover:brightness-110"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={() => decide(false)}
              className="flex-1 rounded-full border-2 border-slate-900/10 px-4 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-900/5 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/10"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
