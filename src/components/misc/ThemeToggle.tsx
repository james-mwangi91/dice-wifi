import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../utils/cn';

/** Light/dark theme switcher. `onDark` styles it for the transparent nav over a dark header. */
export default function ThemeToggle({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200',
        onDark
          ? 'border-white/20 text-white hover:bg-white/10'
          : 'border-slate-900/15 text-brand-dark hover:bg-slate-900/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10',
        className
      )}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="inline-flex"
      >
        {isDark ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
      </motion.span>
    </button>
  );
}
