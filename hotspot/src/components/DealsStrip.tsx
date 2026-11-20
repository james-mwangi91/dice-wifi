import { useState, type FormEvent } from 'react';
import { MapPin, Search } from 'lucide-react';

/** Name of the event the Spots section listens for, so this strip can drive its search */
export const SPOT_SEARCH_EVENT = 'dice:spot-search';

/** Navy "find us near you" band with an inline search (theme's deals strip) */
export default function DealsStrip() {
  const [q, setQ] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent(SPOT_SEARCH_EVENT, { detail: q.trim() }));
    document.getElementById('spots')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section aria-label="Find DICE Hotspot near you" className="relative overflow-hidden bg-night py-14 text-white dark:bg-night">
      {/* Angled red slice on the right, echoing the theme */}
      <div className="pointer-events-none absolute -right-24 top-0 hidden h-full w-72 -skew-x-[20deg] bg-coral/90 lg:block" aria-hidden="true" />
      <div className="container-x relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="max-w-md font-display text-2xl font-semibold leading-snug sm:text-3xl">
          Let&rsquo;s find DICE Hotspot <span className="text-sun">near you.</span>
        </h2>
        <form onSubmit={submit} className="flex w-full max-w-xl flex-col gap-2 sm:flex-row lg:mr-24">
          <label htmlFor="deal-area" className="sr-only">
            Your estate or town
          </label>
          <div className="flex flex-1 items-center rounded-md bg-white px-4 text-night">
            <MapPin className="h-5 w-5 text-accent" />
            <input
              id="deal-area"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Your estate or town, e.g. Ruiru"
              className="w-full bg-transparent px-3 py-3.5 text-sm focus:outline-none"
            />
          </div>
          <button type="submit" className="btn-coral !py-3.5">
            <Search className="h-4 w-4" /> Check my area
          </button>
        </form>
      </div>
    </section>
  );
}
