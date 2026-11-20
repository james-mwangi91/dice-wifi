import { Wifi } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Bundles from './components/Bundles';
import HowItWorks from './components/HowItWorks';
import Spots from './components/Spots';
import Host from './components/Host';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const PERKS = ['No contract', 'No app to install', 'Unlimited data', 'Pay with M-Pesa', 'Works on any phone'];

/** Single-page site for DICE Hotspot */
export default function App() {
  return (
    <>
      <a href="#bundles" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-night focus:px-4 focus:py-2 focus:text-white">
        Skip to bundles
      </a>
      <Navbar />
      <main>
        <Hero />
        {/* Perks ticker — two copies so the -50% loop is seamless */}
        <div className="overflow-hidden border-y border-ink/10 bg-card py-5" aria-label="Why DICE Hotspot">
          <ul className="flex w-max animate-marquee gap-10 pr-10 hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...PERKS, ...PERKS, ...PERKS, ...PERKS].map((p, i) => (
              <li
                key={i}
                aria-hidden={i >= PERKS.length}
                className="flex items-center gap-2.5 whitespace-nowrap font-display text-lg font-semibold text-ink/80"
              >
                <Wifi className="h-4 w-4 text-coral" strokeWidth={2.5} /> {p}
              </li>
            ))}
          </ul>
        </div>
        <Bundles />
        <HowItWorks />
        <Spots />
        <Host />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
