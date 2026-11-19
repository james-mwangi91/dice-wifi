import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { BRAND } from '../data';
import Logo from './Logo';

/** Closing CTA band + footer */
export default function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="container-x py-20 lg:py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-coral px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-sun sm:-right-16 sm:-top-16 sm:h-64 sm:w-64" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Ten bob. One hour. Unlimited.
            </h2>
            <p className="mt-5 text-lg text-white/85">
              Find &ldquo;{BRAND.ssid}&rdquo; in your WiFi list and you&rsquo;re a minute away from being online.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#bundles" className="btn bg-night text-white hover:bg-night-700">
                See bundles
              </a>
              <a href="#spots" className="btn-ghost-light">
                Find a spot near me
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Pay-as-you-go WiFi from DICE WiFi, serving Nairobi and its satellite towns.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <p className="font-display font-bold uppercase tracking-wider text-white/40">Support</p>
            <a href={BRAND.phoneHref} className="flex items-center gap-2.5 text-white/80 hover:text-sun">
              <Phone className="h-4 w-4" /> {BRAND.phone}
            </a>
            <a href={BRAND.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-white/80 hover:text-sun">
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 text-white/80 hover:text-sun">
              <Mail className="h-4 w-4" /> {BRAND.email}
            </a>
          </div>
          <div className="space-y-3 text-sm">
            <p className="font-display font-bold uppercase tracking-wider text-white/40">Need WiFi at home?</p>
            <p className="text-white/60">DICE fibre gives homes and offices unlimited internet from KES 1,500 a month.</p>
            <a href={BRAND.mainSite} className="inline-flex items-center gap-1.5 font-semibold text-sun hover:underline">
              Visit DICE WiFi <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="mt-14 border-t border-white/10 pt-8 text-xs text-white/40">
          © {new Date().getFullYear()} DICE WiFi. Photos via Unsplash.
        </p>
      </div>
    </footer>
  );
}
