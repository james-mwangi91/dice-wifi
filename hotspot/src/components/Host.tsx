import { ArrowRight, BadgePercent, Palette, Wrench } from 'lucide-react';
import { BRAND, VENUE_IMAGES, unsplash } from '../data';
import Reveal from './Reveal';

const PERKS = [
  { icon: Wrench, title: 'We install it', body: 'Equipment, setup and maintenance handled by DICE engineers.' },
  { icon: BadgePercent, title: 'You earn a share', body: 'A cut of every bundle sold at your venue, paid monthly.' },
  { icon: Palette, title: 'Your name on it', body: 'Customers see your venue on the login page.' },
];

/** For venue owners: host a DICE Hotspot */
export default function Host() {
  return (
    <section id="host" className="py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        {/* Photo collage */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="grid grid-cols-5 gap-4">
            <img
              src={unsplash(VENUE_IMAGES.shop.id, 1200, 1500)}
              srcSet={`${unsplash(VENUE_IMAGES.shop.id, 800, 1000)} 800w, ${unsplash(VENUE_IMAGES.shop.id, 1200, 1500)} 1200w`}
              sizes="(min-width: 1024px) 30vw, 60vw"
              alt={VENUE_IMAGES.shop.alt}
              loading="lazy"
              className="col-span-3 aspect-[4/5] w-full rounded-xl object-cover"
            />
            <div className="col-span-2 flex flex-col gap-4">
              <img
                src={unsplash(VENUE_IMAGES.cafe.id, 900, 900)}
                alt={VENUE_IMAGES.cafe.alt}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <div className="flex flex-1 flex-col justify-end rounded-xl bg-coral p-5 text-white">
                <p className="font-display text-4xl font-bold leading-none">0</p>
                <p className="mt-1 text-sm font-medium text-white/85">KES upfront to get started</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">For venue owners</span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Turn your WiFi into <span className="squiggle">extra income.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Run a café, salon, shop, hostel or apartment block? Host a DICE Hotspot and your customers get reliable WiFi
              while you earn from every bundle they buy.
            </p>
          </Reveal>

          <ul className="mt-9 space-y-5">
            {PERKS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <li className="flex gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sun text-night">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold">{p.title}</span>
                    <span className="block text-ink/65">{p.body}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10 flex flex-wrap gap-3">
            <a href={BRAND.hostWhatsappHref} target="_blank" rel="noreferrer" className="btn-coral">
              Host a hotspot <ArrowRight className="h-4 w-4" />
            </a>
            <a href={BRAND.phoneHref} className="btn-ghost">
              Call {BRAND.phone}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
