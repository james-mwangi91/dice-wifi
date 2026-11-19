import Hero from '../components/home/Hero';
import AreaTicker from '../components/home/AreaTicker';
import Packages from '../components/home/Packages';
import HowItWorks from '../components/home/HowItWorks';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Coverage from '../components/home/Coverage';
import BusinessSection from '../components/home/BusinessSection';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';

/** Landing page — promise, plans, proof, then the close */
export default function Home() {
  return (
    <>
      <Hero />
      <AreaTicker />
      <Packages />
      <HowItWorks />
      <WhyChooseUs />
      <Coverage />
      <Testimonials />
      <BusinessSection />
      <FAQ />
      <CTA />
    </>
  );
}
