/** DICE Hotspot mark: coral tile, signal arcs, a little sun */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
        <rect x="4" y="4" width="56" height="56" rx="18" fill="#E11D2E" />
        <g stroke="#0E1B4D" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M23 34a12.5 12.5 0 0 1 18 0" />
          <path d="M16.5 27.5a21.5 21.5 0 0 1 31 0" />
        </g>
        <circle cx="32" cy="42" r="4" fill="#0E1B4D" />
        <circle cx="48" cy="16" r="5" fill="#FFFFFF" />
      </svg>
      <span className={'font-display text-xl font-black leading-none tracking-tight ' + (light ? 'text-white' : 'text-ink')}>
        DICE<span className="text-coral"> Hotspot</span>
      </span>
    </span>
  );
}
