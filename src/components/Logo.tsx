import { cn } from '../utils/cn';

interface LogoProps {
  className?: string;
}

/**
 * DICE WiFi brand mark — a lime die whose face carries a WiFi signal,
 * with the four corner pips kept as a quiet nod to the name.
 */
export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-10 w-10', className)}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="56" height="56" rx="16" fill="#C5F04A" />
      {[
        [17, 17],
        [47, 17],
        [17, 47],
        [47, 47],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#0C1310" fillOpacity="0.35" />
      ))}
      <g stroke="#0C1310" strokeWidth="3.6" strokeLinecap="round" fill="none">
        <path d="M24 34a11 11 0 0 1 16 0" />
        <path d="M18.5 28a19 19 0 0 1 27 0" />
      </g>
      <circle cx="32" cy="41" r="3.6" fill="#0C1310" />
    </svg>
  );
}

/** Wordmark companion — logo + brand name */
export function LogoWordmark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Logo className="h-9 w-9" />
      <span
        className={cn(
          'font-display text-xl font-extrabold tracking-tight',
          light ? 'text-white' : 'text-brand-dark dark:text-white'
        )}
      >
        DICE<span className="font-semibold opacity-60">WiFi</span>
      </span>
    </span>
  );
}
