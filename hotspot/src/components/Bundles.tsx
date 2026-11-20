import { Check } from 'lucide-react';
import { BUNDLES } from '../data';
import Reveal from './Reveal';

/** Short label for the circle on each card: "1 hr", "24 hrs", "7 days" */
function shortDuration(d: string) {
  return d.replace(' hours', ' hrs').replace(' hour', ' hr');
}

/** Bundle price list in the theme's pricing-card style */
export default function Bundles() {
  return (
    <section id="bundles" className="relative bg-card py-24 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Bundles &amp; pricing</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Choose your bundle
          </h2>
          <p className="mt-4 text-ink/65">
            Every bundle is unlimited. Buy on the WiFi page when you connect — no app, no sign-up.
          </p>
        </Reveal>

        {/* Phones: a swipeable row. Larger screens: a grid. */}
        <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 pt-5 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-3 xl:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {BUNDLES.map((b, i) => {
            const hot = !!b.popular;
            return (
              <Reveal key={b.id} delay={i * 0.06} className="h-full w-[74%] shrink-0 snap-center sm:w-auto">
                <article
                  className={
                    'relative flex h-full flex-col overflow-hidden rounded-lg bg-card text-ink shadow-[0_20px_44px_-26px_rgba(14,27,77,0.55)] ring-1 transition-transform duration-300 hover:-translate-y-1.5 ' +
                    (hot ? 'ring-2 ring-coral' : 'ring-ink/10')
                  }
                >
                  {/* Coloured top with a curved lower edge */}
                  <div className={'relative px-6 pb-14 pt-10 text-center text-white ' + (hot ? 'bg-coral' : 'bg-night')}>
                    <span
                      className={
                        'absolute left-1/2 top-0 -translate-x-1/2 rounded-b-md px-4 py-1 font-display text-[11px] font-semibold uppercase tracking-wider ' +
                        (hot ? 'bg-night text-white' : 'bg-coral text-white')
                      }
                    >
                      {hot ? 'Best value' : b.duration}
                    </span>
                    <p className="font-display text-lg font-semibold">{b.name}</p>
                    <svg className="absolute inset-x-0 -bottom-px h-8 w-full text-card" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M0 20 C 30 0, 70 0, 100 20 Z" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Duration in a ringed circle, overlapping the curve */}
                  <div className="relative -mt-12 flex justify-center">
                    <span
                      className={
                        'inline-flex h-20 w-20 flex-col items-center justify-center rounded-full bg-card font-display ring-4 ' +
                        (hot ? 'text-accent ring-coral' : 'text-night ring-night dark:text-white dark:ring-white/70')
                      }
                    >
                      <span className="text-lg font-bold leading-none">{shortDuration(b.duration).split(' ')[0]}</span>
                      <span className="text-[11px] font-semibold uppercase">{shortDuration(b.duration).split(' ')[1]}</span>
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-6 pb-7 pt-5 text-center">
                    <p className="font-display text-3xl font-bold tracking-tight">
                      <span className="text-base font-semibold text-ink/60">KES </span>
                      {b.price}
                    </p>
                    <p className="mt-1 text-xs text-ink/55">{b.blurb}</p>

                    <ul className="mt-6 flex-1 space-y-2.5 text-left text-sm">
                      {[b.duration + ' of access', 'Unlimited data', 'Pay with M-Pesa', 'No app, no sign-up'].map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-ink/75">
                          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral/10 text-accent">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#how"
                      aria-label={`Buy ${b.name}, ${b.duration} for KES ${b.price}`}
                      className={'btn mt-7 w-full uppercase tracking-wide text-white ' + (hot ? 'bg-coral hover:bg-coral-600' : 'bg-night hover:bg-night-700 dark:bg-white dark:text-night')}
                    >
                      Buy now
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-3 text-center text-xs text-ink/45 sm:hidden">Swipe to see all bundles →</p>

        <p className="mt-10 text-center text-sm text-ink/60">
          Own apartments or a business?{' '}
          <a href="#host" className="font-semibold text-accent underline underline-offset-4">
            We install DICE WIFI for free
          </a>
          .
        </p>
      </div>
    </section>
  );
}
