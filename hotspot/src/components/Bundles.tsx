import { Check, Clock, Smartphone, Zap } from 'lucide-react';
import { BRAND, BUNDLES, BUNDLE_PERKS } from '../data';
import Reveal from './Reveal';

/** Bundle price list — time-based, unlimited data */
export default function Bundles() {
  return (
    <section id="bundles" className="relative bg-night py-24 text-white lg:py-32">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow !bg-white/10 !text-sun">Bundles</span>
            <h2 className="mt-5 font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Pay for time, <span className="text-sun">not megabytes.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Every bundle is unlimited. Buy on the WiFi page when you connect — no app, no sign-up.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {BUNDLE_PERKS.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-sm font-medium">
                <Check className="h-4 w-4 text-sun" strokeWidth={3} /> {p}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Phones: a swipeable row. Larger screens: a grid. */}
        <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {BUNDLES.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.06} className="h-full w-[78%] shrink-0 snap-center sm:w-auto">
              <article
                className={
                  'relative flex h-full flex-col rounded-[2rem] p-6 transition-transform duration-300 hover:-translate-y-1.5 ' +
                  (b.popular ? 'bg-coral text-white ring-4 ring-sun' : 'bg-night-800 ring-1 ring-white/10')
                }
              >
                {b.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sun px-3 py-1 font-display text-[11px] font-black uppercase tracking-wider text-night">
                    Best value
                  </span>
                )}
                <p className="font-display text-lg font-bold">{b.name}</p>
                <p className={'text-sm italic ' + (b.popular ? 'text-white/80' : 'text-white/50')}>{b.swahili}</p>

                <p className="mt-6 font-display font-black leading-none tracking-tight">
                  <span className="text-lg">KES </span>
                  <span className="text-6xl">{b.price}</span>
                </p>

                <ul className={'mt-6 space-y-2.5 border-t pt-5 text-sm ' + (b.popular ? 'border-white/25' : 'border-white/10')}>
                  <li className="flex items-center gap-2">
                    <Clock className={'h-4 w-4 ' + (b.popular ? 'text-sun' : 'text-coral')} /> {b.duration}
                  </li>
                  <li className="flex items-center gap-2">
                    <Smartphone className={'h-4 w-4 ' + (b.popular ? 'text-sun' : 'text-coral')} /> {b.devices} device{b.devices > 1 ? 's' : ''}
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className={'h-4 w-4 ' + (b.popular ? 'text-sun' : 'text-coral')} /> Unlimited data
                  </li>
                </ul>

                <p className={'mt-5 flex-1 text-sm leading-relaxed ' + (b.popular ? 'text-white/85' : 'text-white/60')}>{b.blurb}</p>

                <a
                  href="#how"
                  className={'mt-6 w-full ' + (b.popular ? 'btn-sun' : 'btn !bg-white !text-night hover:!bg-cream')}
                >
                  Get {b.name}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-white/40 sm:hidden">Swipe to see all bundles →</p>

        <p className="mt-10 text-center text-sm text-white/50">
          Need WiFi for a whole building or event?{' '}
          <a href={BRAND.whatsappHref} target="_blank" rel="noreferrer" className="font-semibold text-sun underline underline-offset-4">
            Ask us for a custom plan
          </a>
          .
        </p>
      </div>
    </section>
  );
}
