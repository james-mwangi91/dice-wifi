import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme';

/** Sun/moon switch. `onDark` styles it for the transparent nav over the hero photo. */
export default function ThemeToggle({ onDark = false }: { onDark?: boolean }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}
      className={
        'relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 transition-colors ' +
        (onDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-ink/15 text-ink hover:border-ink/40')
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="inline-flex"
        >
          {dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-sun" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
