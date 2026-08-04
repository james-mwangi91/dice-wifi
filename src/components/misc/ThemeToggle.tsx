import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

/** Animated light/dark theme switcher */
export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${
        isDark
          ? 'border-white/15 bg-white/10 text-amber-300 hover:bg-white/20'
          : 'border-slate-900/10 bg-white/80 text-brand-primary shadow-card hover:bg-white'
      } ${className ?? ''}`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -120, scale: 0, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        className="inline-flex"
      >
        {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </motion.span>
    </motion.button>
  );
}
