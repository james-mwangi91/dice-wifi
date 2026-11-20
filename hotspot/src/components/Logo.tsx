import logo1x from '../assets/logo-96.png';
import logo2x from '../assets/logo-192.png';

/**
 * DICE WIFI logo: the owner's artwork, shown at a fixed height with
 * automatic width so it always keeps its own proportions (never stretched).
 */
export default function Logo({ light = false, variant }: { light?: boolean; variant?: 'nav' }) {
  /* "nav" sits on the inverted navbar: white text on navy (light mode), navy on light (dark mode) */
  const nav = variant === 'nav';
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src={logo1x}
        srcSet={`${logo1x} 1x, ${logo2x} 2x`}
        width={100}
        height={96}
        alt=""
        aria-hidden="true"
        className="h-11 w-auto shrink-0 object-contain"
      />
      <span
        className={
          'font-display text-xl font-black leading-none tracking-tight ' +
          (nav ? 'text-white dark:text-night' : light ? 'text-white' : 'text-ink')
        }
      >
        DICE{' '}
        <span className={nav ? 'text-[rgb(232_88_98)] dark:text-[rgb(146_0_10)]' : light ? 'text-[rgb(232_88_98)]' : 'text-accent'}>
          WIFI
        </span>
      </span>
    </span>
  );
}
