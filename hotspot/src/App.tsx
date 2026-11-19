import { Check } from 'lucide-react';
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
        <div className="border-y border-night/10 bg-white">
          <ul className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5">
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-2 font-display font-semibold text-night/80">
                <Check className="h-4 w-4 text-coral" strokeWidth={3} /> {p}
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
