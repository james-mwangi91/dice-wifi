import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface LogoProps {
  className?: string;
  animated?: boolean;
}

/**
 * DICE WiFi brand mark — a rounded dice die with a WiFi signal
 * integrated into its face, rendered as a flat gradient SVG.
 */
export default function Logo({ className, animated = true }: LogoProps) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-10 w-10', className)}
      aria-hidden="true"
      initial={animated ? { scale: 0, rotate: -120, opacity: 0 } : false}
      animate={animated ? { scale: 1, rotate: 0, opacity: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}
    >
      <defs>
        <linearGradient id="dice-body" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="0.55" stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="dice-edge" x1="0" y1="64" x2="64" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1D4ED8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#0284C7" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* Die body with soft inner depth */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#dice-body)" />
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#dice-edge)" />

      {/* Die pips (dots) at the four corners of the face */}
      {[
        [17, 17],
        [47, 17],
        [17, 47],
        [47, 47],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="white" fillOpacity="0.5" />
      ))}

      {/* WiFi signal integrated in the die face */}
      <g stroke="white" strokeWidth="3.2" strokeLinecap="round" fill="none">
        <motion.path
          d="M22 27.5a10 10 0 0 1 20 0"
          initial={animated ? { pathLength: 0, opacity: 0 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
        />
        <motion.path
          d="M17 22.5a17.7 17.7 0 0 1 30 0"
          initial={animated ? { pathLength: 0, opacity: 0 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.72, ease: 'easeOut' }}
        />
        <motion.path
          d="M12 17.5a25.5 25.5 0 0 1 40 0"
          initial={animated ? { pathLength: 0, opacity: 0 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.89, ease: 'easeOut' }}
        />
      </g>

      {/* Signal dot */}
      <motion.circle
        cx="32"
        cy="38.5"
        r="3.4"
        fill="white"
        initial={animated ? { scale: 0, opacity: 0 } : false}
        animate={animated ? { scale: 1, opacity: 1 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 1.05 }}
      />
    </motion.svg>
  );
}

/** Wordmark companion — logo + brand name */
export function LogoWordmark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Logo className="h-9 w-9" />
      <span className="font-display text-lg font-extrabold tracking-tight">
        <span className={light ? 'text-white' : 'text-brand-dark dark:text-white'}>DICE</span>
        <span className="text-gradient"> WiFi</span>
      </span>
    </span>
  );
}
