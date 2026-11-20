import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { BRAND } from '../data';
import Logo from './Logo';

const LINKS = [
  { label: 'Bundles', href: '#bundles' },
  { label: 'How it works', href: '#how' },
  { label: 'Find a spot', href: '#spots' },
  { label: 'Host a hotspot', href: '#host' },
  { label: 'FAQ', href: '#faq' },
];

/** Red closing banner, then the footer on a white card over navy (theme pattern) */
export default function Footer() {
  return (
    <footer>
      {/* Closing banner */}
      <div className="relative overflow-hidden bg-coral text-white">
        <div className="pointer-events-none absolute -left-16 top-0 hidden h-full w-64 -skew-x-[20deg] bg-night/90 lg:block" aria-hidden="true" />
        <div className="container-x relative flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:pl-56">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">Ten bob. One hour. Unlimited.</h2>
            <p className="mt-3 text-white/85">
              Find &ldquo;{BRAND.ssid}&rdquo; in your WiFi list and you&rsquo;re a minute away from being online.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a href="#bundles" className="btn bg-night uppercase tracking-wide text-white hover:bg-night-700">
              See bundles
            </a>
            <a href="#spots" className="btn-ghost-light uppercase tracking-wide">
              Find a spot
            </a>
          </div>
        </div>
      </div>

      {/* Footer card */}
      <div className="bg-night py-16 dark:bg-[#060B16]">
        <div className="container-x">
          <div className="grid gap-10 rounded-lg bg-card p-8 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <Logo />
              <p className="mt-4 text-sm leading-relaxed text-ink/60">
                Pay-as-you-go WiFi from DICE WiFi, serving Nairobi and its satellite towns.
              </p>
            </div>
            <nav aria-label="Footer">
              <p className="font-display text-sm font-semibold uppercase tracking-wider">Quick links</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-ink/65 transition-colors hover:text-accent">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-2.5 text-sm">
              <p className="font-display text-sm font-semibold uppercase tracking-wider">Support</p>
              <a href={BRAND.phoneHref} className="mt-4 flex items-center gap-2.5 text-ink/65 hover:text-accent">
                <Phone className="h-4 w-4 text-accent" /> {BRAND.phone}
              </a>
              <a href={BRAND.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-ink/65 hover:text-accent">
                <MessageCircle className="h-4 w-4 text-accent" /> WhatsApp us
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 text-ink/65 hover:text-accent">
                <Mail className="h-4 w-4 text-accent" /> {BRAND.email}
              </a>
            </div>
            <div className="space-y-3 text-sm">
              <p className="font-display text-sm font-semibold uppercase tracking-wider">Need WiFi at home?</p>
              <p className="text-ink/60">DICE fibre gives homes and offices unlimited internet from KES 1,500 a month.</p>
              <a href={BRAND.mainSite} className="btn bg-coral !px-5 !py-3 uppercase tracking-wide text-white hover:bg-coral-600">
                Visit DICE WiFi <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-white/50">© {new Date().getFullYear()} DICE WiFi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
