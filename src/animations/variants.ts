import type { Variants } from 'framer-motion';

/** Signature easing curve used across the site */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise reveal */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

/** Fade + slide from direction */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay, ease: EASE },
  }),
};

/** Slide from left / right */
export const slideIn = (from: 'left' | 'right'): Variants => ({
  hidden: { opacity: 0, x: from === 'left' ? -48 : 48 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: EASE },
  }),
});

/** Scale entrance */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
};

/** Stagger container helper */
export const stagger = (staggerChildren: number = 0.08, delayChildren: number = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Navbar / drawer link items */
export const listItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: EASE },
  }),
};

/** Shared viewport config */
export const viewportOnce = { once: true, margin: '-60px' } as const;
