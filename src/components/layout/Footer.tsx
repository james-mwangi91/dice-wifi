import { useState, type FormEvent, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter, Youtube } from 'lucide-react';
import { BRAND, NAV_LINKS, PACKAGES } from '../../constants';
import { navigateToSection } from '../../utils/scroll';
import { LogoWordmark } from '../Logo';

const footerSocials = [
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'Twitter', icon: Twitter, href: 'https://x.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

/** Large premium footer with newsletter signup */
export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  /* The footer renders on every route, so section links must be able to
     navigate home first rather than looking for an element that is not there. */
  const goToSection = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    navigateToSection(id, pathname, navigate);
  };

  const handleNewsletter = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    window.setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative overflow-hidden bg-brand-dark text-slate-400">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-brand-primary/20 blur-[110px]" />
      <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-brand-secondary/20 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <LogoWordmark light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Connecting homes. Powering businesses. DICE WiFi delivers lightning-fast,
              unlimited internet with 99.9% uptime across Nairobi and beyond.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a href={BRAND.phoneHref} className="flex items-center gap-3 transition-colors hover:text-brand-accent">
                <Phone className="h-4 w-4 text-brand-accent" /> {BRAND.phone}
              </a>
              <a href={BRAND.emailHref} className="flex items-center gap-3 transition-colors hover:text-brand-accent">
                <Mail className="h-4 w-4 text-brand-accent" /> {BRAND.email}
              </a>
              <span className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-brand-accent" /> {BRAND.address}
              </span>
            </div>

            <div className="mt-7 flex gap-3">
              {footerSocials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent hover:text-brand-accent"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav className="lg:col-span-2" aria-label="Footer quick links">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={`#${link.href}`}
                    onClick={(e) => goToSection(e, link.href)}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-brand-accent"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Packages */}
          <nav className="lg:col-span-2" aria-label="Footer packages">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Packages</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {PACKAGES.map((pkg) => (
                <li key={pkg.id}>
                  <a
                    href="#packages"
                    onClick={(e) => goToSection(e, 'packages')}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-accent"
                  >
                    <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[11px] font-bold text-brand-accent">{pkg.speed}</span>
                    {pkg.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#coverage" onClick={(e) => goToSection(e, 'coverage')} className="transition-colors hover:text-brand-accent">
                  Coverage Areas
                </a>
              </li>
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Stay Connected</h3>
            <p className="mt-5 text-sm leading-relaxed">
              Get launch announcements, coverage updates and exclusive offers — straight to your inbox.
            </p>
            <form onSubmit={handleNewsletter} className="mt-5">
              <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur transition-colors focus-within:border-brand-accent">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Email address for newsletter"
                  className="w-full bg-transparent px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
                >
                  <Send className="h-4 w-4" />
                  <span className="hidden sm:inline">Subscribe</span>
                </button>
              </div>
              <p aria-live="polite" className="mt-3 h-5 text-sm font-medium text-emerald-400">
                {subscribed ? 'You are subscribed. Welcome aboard!' : ''}
              </p>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} DICE WiFi. All rights reserved. · Fast. Reliable. Unlimited.</p>
          {/* These policies have no page yet. Linking them to the homepage would
              look functional while going nowhere, so they point at the contact
              team until real documents exist. */}
          <div className="flex gap-6">
            <a href={BRAND.emailHref} className="transition-colors hover:text-brand-accent">
              Privacy Policy
            </a>
            <a href={BRAND.emailHref} className="transition-colors hover:text-brand-accent">
              Terms of Service
            </a>
            <a href={BRAND.emailHref} className="transition-colors hover:text-brand-accent">
              Fair Usage
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
