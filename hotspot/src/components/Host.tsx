import { ArrowRight, Building2, Phone, Scissors, Wrench } from 'lucide-react';
import { BRAND, VENUE_IMAGES, unsplash } from '../data';
import Reveal from './Reveal';

const PERKS = [
  { icon: Wrench, title: 'Free installation', body: 'We install and maintain the hotspot at no cost to you.' },
  { icon: Building2, title: 'WiFi for your tenants', body: 'Apartments and rentals get affordable WiFi for every unit.' },
  { icon: Scissors, title: 'WiFi for your customers', body: 'Salons, cafés and shops keep customers connected while they wait.' },
];

/** For landlords and business owners: request a free DICE WIFI installation */
export default function Host() {
  return (
    <section id="host" className="py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        {/* Photo collage */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="grid grid-cols-5 gap-4">
            <img
              src={unsplash(VENUE_IMAGES.apartments.id, 1200, 1500)}
              srcSet={`${unsplash(VENUE_IMAGES.apartments.id, 800, 1000)} 800w, ${unsplash(VENUE_IMAGES.apartments.id, 1200, 1500)} 1200w`}
              sizes="(min-width: 1024px) 30vw, 60vw"
              alt={VENUE_IMAGES.apartments.alt}
              loading="lazy"
              className="col-span-3 aspect-[4/5] w-full rounded-xl object-cover"
            />
            <div className="col-span-2 flex flex-col gap-4">
              <img
                src={unsplash(VENUE_IMAGES.salon.id, 900, 900)}
                srcSet={`${unsplash(VENUE_IMAGES.salon.id, 600, 600)} 600w, ${unsplash(VENUE_IMAGES.salon.id, 900, 900)} 900w`}
                sizes="(min-width: 1024px) 20vw, 40vw"
                alt={VENUE_IMAGES.salon.alt}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <div className="flex flex-1 flex-col justify-end rounded-xl bg-coral p-5 text-white">
                <p className="font-display text-3xl font-black leading-none">FREE</p>
                <p className="mt-1 text-sm font-medium text-white/85">installation for landlords &amp; businesses</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">For landlords &amp; businesses</span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Free WiFi installation <span className="squiggle">for your place.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Own apartments or rentals, or run a salon, café or shop in {BRAND.areas.join(', ').replace(/, ([^,]*)$/, ' or $1')}?
              Call us and we&rsquo;ll install DICE WIFI for your tenants and customers — free of charge.
            </p>
          </Reveal>

          <ul className="mt-9 space-y-5">
            {PERKS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <li className="flex gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-coral-100 text-accent dark:bg-coral/20">
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
            <a href={BRAND.phoneHref} className="btn-coral">
              <Phone className="h-4 w-4" /> Call {BRAND.phone}
            </a>
            <a href={BRAND.hostWhatsappHref} target="_blank" rel="noreferrer" className="btn-ghost">
              Request on WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
