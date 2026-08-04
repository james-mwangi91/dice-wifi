import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import Packages from '../components/home/Packages';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Coverage from '../components/home/Coverage';
import BusinessSection from '../components/home/BusinessSection';
import SpeedTest from '../components/home/SpeedTest';
import NetworkStatus from '../components/home/NetworkStatus';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';
import Contact from '../components/home/Contact';

/** Landing page — the full section flow */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Packages />
      <WhyChooseUs />
      <Coverage />
      <BusinessSection />
      <SpeedTest />
      <NetworkStatus />
      <Testimonials />
      <FAQ />
      <CTA />
      <Contact />
    </>
  );
}
