import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/** Scrolls to top on route change, or to a section when requested via nav state */
export default function ScrollToTop() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const scrollTo = (state as { scrollTo?: string } | null)?.scrollTo;

    if (!scrollTo) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    /* Wait for the incoming page to paint before locating the section. Retry a
       few frames because route transitions animate in. */
    let frames = 0;
    let raf = 0;

    const tryScroll = () => {
      const el = document.getElementById(scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        /* Clear the state so a refresh or back-navigation does not re-scroll,
           without discarding the current location like history.replaceState({}, '') did. */
        navigate(pathname, { replace: true, state: null });
        return;
      }
      if (frames++ < 60) raf = requestAnimationFrame(tryScroll);
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, state, navigate]);

  return null;
}
