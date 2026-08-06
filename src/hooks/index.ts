import { useEffect, useState } from 'react';

/** Returns true once the window has been scrolled past the given offset */
export function useScrolled(offset = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return scrolled;
}

/** Returns whether the user prefers reduced motion */
export function useReducedMotion(): boolean {
  /* Read synchronously on first render so motion-sensitive UI never flashes on */
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/** Persisted state hook (localStorage-backed) */
export function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [key, value]);

  return [value, setValue];
}

/* Several components (loader, nav drawer, compare modal) can want the page
   frozen at once. A single counter keeps them from clearing each other's lock —
   the scrollbar is only restored when the last holder releases. */
let scrollLocks = 0;

/** Freeze page scrolling while `locked` is true */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    if (scrollLocks === 0) {
      /* Compensate for the vanishing scrollbar so the layout does not shift */
      const gap = window.innerWidth - document.documentElement.clientWidth;
      body.dataset.prevOverflow = body.style.overflow;
      body.dataset.prevPaddingRight = body.style.paddingRight;
      body.style.overflow = 'hidden';
      if (gap > 0) body.style.paddingRight = `${gap}px`;
    }
    scrollLocks++;

    return () => {
      scrollLocks--;
      if (scrollLocks === 0) {
        body.style.overflow = body.dataset.prevOverflow ?? '';
        body.style.paddingRight = body.dataset.prevPaddingRight ?? '';
        delete body.dataset.prevOverflow;
        delete body.dataset.prevPaddingRight;
      }
    };
  }, [locked]);
}
