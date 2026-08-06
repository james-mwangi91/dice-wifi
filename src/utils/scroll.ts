import type { NavigateFunction } from 'react-router-dom';

/** Smoothly scroll to a section by id */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/** Scroll to a section, navigating home first if required */
export function navigateToSection(id: string, pathname: string, navigate: NavigateFunction): void {
  if (pathname === '/') {
    scrollToId(id);
  } else {
    navigate('/', { state: { scrollTo: id } });
  }
}

/** Format a number as KES */
export function formatKes(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}
