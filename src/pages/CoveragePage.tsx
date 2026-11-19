import PageHeader from '../components/ui/PageHeader';
import Coverage from '../components/home/Coverage';
import NetworkStatus from '../components/home/NetworkStatus';
import CTA from '../components/home/CTA';
import Reveal from '../components/ui/Reveal';

/** Coverage page with full map embed */
export default function CoveragePage() {
  return (
    <>
      <PageHeader
        crumbs={['Coverage']}
        title={
          <>
            Growing across <span className="text-gradient">greater Nairobi</span>
          </>
        }
        subtitle="From the CBD to the fastest-growing satellite towns — check your area and join the waitlist if we're not there yet."
      />
      <Coverage />

      <section className="relative overflow-hidden pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-[2.5rem] border border-slate-900/5 shadow-soft dark:border-white/10">
            <iframe
              title="DICE WiFi coverage region — Nairobi and Kiambu counties"
              src="https://maps.google.com/maps?q=Nairobi%2C%20Kiambu%2C%20Ruiru%2C%20Thika&z=10&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0 sm:h-[520px]"
            />
          </Reveal>
        </div>
      </section>

      <NetworkStatus />
      <CTA />
    </>
  );
}
