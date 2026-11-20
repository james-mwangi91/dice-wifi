import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Bundles from './components/Bundles';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import Spots from './components/Spots';
import Host from './components/Host';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

/** Single-page site for DICE WIFI hotspot */
export default function App() {
  return (
    <>
      <a href="#bundles" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-night focus:px-4 focus:py-2 focus:text-white">
        Skip to bundles
      </a>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Bundles />
        <HowItWorks />
        <Stats />
        <Spots />
        <Host />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
