import { useMemo, useState } from 'react';
import { Coffee, GraduationCap, Building2, Bus, MapPin, Search } from 'lucide-react';
import { SPOT_AREAS, VENUE_TYPES } from '../data';
import Reveal from './Reveal';

const VENUE_ICONS = [Building2, Coffee, Bus, GraduationCap];

/** Where to find DICE WIFI — searchable area list + venue types */
export default function Spots() {
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? SPOT_AREAS.filter((a) => a.name.toLowerCase().includes(s)) : SPOT_AREAS;
  }, [q]);

  return (
    <section id="spots" className="bg-soft py-24 lg:py-32">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className="eyebrow !bg-card">Find a spot</span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            Look for the <span className="text-accent">DICE sign.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            DICE WIFI hotspots are live in Rongai, Banana and Kiserian. Look for &ldquo;DICE WIFI&rdquo; in your WiFi list.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className="rounded-xl bg-card p-6 sm:p-8 lg:col-span-2">
            <label htmlFor="spot-search" className="font-display text-lg font-bold">
              Search your area
            </label>
            <div className="mt-3 flex items-center rounded-full border-2 border-ink/10 px-4 focus-within:border-coral">
              <Search className="h-5 w-5 text-ink/40" />
              <input
                id="spot-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="e.g. Rongai"
                className="w-full bg-transparent px-3 py-3.5 focus:outline-none"
              />
            </div>
            <ul className="mt-5 divide-y divide-ink/10" aria-live="polite">
              {results.map((a) => (
                <li key={a.name} className="flex items-center justify-between py-3.5">
                  <span className="flex items-center gap-2.5 font-semibold">
                    <MapPin className="h-4 w-4 text-accent" /> {a.name}
                  </span>
                  <span
                    className={
                      'rounded-full px-3 py-1 font-display text-xs font-bold ' +
                      (a.status === 'live' ? 'bg-mpesa/15 text-[#2C7A25] dark:text-[#7BD672]' : 'bg-sun text-night')
                    }
                  >
                    {a.status === 'live' ? 'Live' : 'Coming soon'}
                  </span>
                </li>
              ))}
              {results.length === 0 && (
                <li className="py-4 text-ink/70">
                  Not there yet. WhatsApp us your area and we&rsquo;ll tell you when DICE switches on near you.
                </li>
              )}
            </ul>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {VENUE_TYPES.map((v, i) => {
              const Icon = VENUE_ICONS[i];
              return (
                <Reveal key={v.title} delay={i * 0.06} className="h-full">
                  <div className="flex h-full flex-col rounded-xl bg-card p-7">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-night text-sun dark:bg-sun dark:text-night">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-auto pt-10 font-display text-2xl font-bold">{v.title}</h3>
                    <p className="mt-1 text-ink/65">{v.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
