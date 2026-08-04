/** Smoothly scroll to a section by id */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/** Scroll to a section, navigating home first if required */
export function navigateToSection(id: string, pathname: string, navigate: (to: string, opts?: unknown) => void): void {
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
