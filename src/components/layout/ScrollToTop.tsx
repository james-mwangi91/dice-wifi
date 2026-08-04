import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to top on route change, or to a section when requested via nav state */
export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const scrollTo = (state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTo) {
      const t = window.setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState({}, '');
      }, 350);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, state]);

  return null;
}
