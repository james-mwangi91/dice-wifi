import { COVERAGE_AREAS, COVERAGE_EXTRAS } from '../../constants';

/** Lime marquee of the towns we serve — a loud, local signature strip */
export default function AreaTicker() {
  const items = [
    ...COVERAGE_AREAS.map((a) => ({ name: a.name, soon: a.status !== 'live' })),
    ...COVERAGE_EXTRAS.map((name) => ({ name, soon: true })),
  ];
  /* Two copies back to back so the -50% translate loops seamlessly */
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-brand-dark bg-brand-lime py-4 text-brand-dark" aria-label="Areas we serve">
      <ul className="flex w-max animate-marquee items-center gap-8 motion-reduce:animate-none">
        {loop.map((item, i) => (
          <li
            key={`${item.name}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-8 whitespace-nowrap font-display text-xl font-extrabold uppercase tracking-tight sm:text-2xl"
          >
            <span>
              {item.name}
              {item.soon && <span className="ml-2 align-middle text-xs font-bold tracking-wider opacity-60">SOON</span>}
            </span>
            <span className="pip h-2 w-2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
