import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

/** Custom dot + trailing ring cursor for precision pointers */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    /* Must be able to turn *off* again — a user who switches on reduced motion
       mid-session was previously stuck with the custom cursor. */
    setEnabled(fine && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]'));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-9 w-9 items-center justify-center rounded-full border-2 border-brand-primary/60 dark:border-brand-accent/70 md:flex"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovering ? 1.8 : 1,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? 'rgba(37, 99, 235, 0.12)' : 'rgba(37, 99, 235, 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <span className="h-1 w-1 rounded-full bg-white" />
      </motion.div>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[96] h-2 w-2 rounded-full bg-gradient-brand md:block"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 0.4 : 1, opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
