import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type ButtonHTMLAttributes, type Ref } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

type Variant = 'primary' | 'outline' | 'ghost' | 'glass' | 'light';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className'> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  to?: string;
  href?: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  fullWidth?: boolean;
  icon?: ReactNode;
}

const base =
  'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight transition-colors duration-300 will-change-transform select-none disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-brand text-white shadow-glow hover:brightness-110 active:brightness-95',
  outline:
    'border-2 border-brand-primary/30 text-brand-primary hover:border-brand-primary hover:bg-brand-primary/5 dark:text-brand-accent dark:border-brand-accent/40 dark:hover:border-brand-accent',
  ghost:
    'text-brand-ink hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10',
  glass:
    'glass text-brand-ink dark:text-slate-100 hover:border-brand-primary/40',
  light: 'bg-white text-brand-dark shadow-soft hover:bg-brand-light',
};

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4 text-base',
};

/** Primary action button with animated ripple effect */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  onClick,
  fullWidth,
  icon,
  ...rest
}: ButtonProps) {
  /* Shared by all three render targets so links ripple too */
  const ref = useRef<HTMLElement | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);
  const timers = useRef<number[]>([]);

  /* Drop pending ripple cleanups if the button unmounts mid-animation */
  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    []
  );

  const spawnRipple = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = ++rippleId.current;
    setRipples((prev) => [...prev, { id, x, y, size }]);
    const timer = window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
      timers.current = timers.current.filter((t) => t !== timer);
    }, 700);
    timers.current.push(timer);
  };

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    spawnRipple(e);
    onClick?.(e);
  };

  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  const content = (
    <>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/40 animate-ripple"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </>
  );

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 22 },
  };

  if (to) {
    return (
      <motion.span {...motionProps} className={cn('inline-flex', fullWidth && 'w-full')}>
        <Link ref={ref as Ref<HTMLAnchorElement>} to={to} onClick={handleClick} className={classes}>
          {content}
        </Link>
      </motion.span>
    );
  }

  if (href) {
    const external = /^https?:\/\//i.test(href);
    return (
      <motion.span {...motionProps} className={cn('inline-flex', fullWidth && 'w-full')}>
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          onClick={handleClick}
          className={classes}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer noopener' : undefined}
        >
          {content}
        </a>
      </motion.span>
    );
  }

  return (
    <motion.span {...motionProps} className={cn('inline-flex', fullWidth && 'w-full')}>
      <button ref={ref as Ref<HTMLButtonElement>} type="button" onClick={handleClick} className={classes} {...rest}>
        {content}
      </button>
    </motion.span>
  );
}
