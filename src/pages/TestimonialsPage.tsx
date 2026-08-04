import PageHeader from '../components/ui/PageHeader';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';
import Reveal from '../components/ui/Reveal';
import CountUpNumber from '../components/ui/CountUp';

const proof = [
  { value: 4.9, decimals: 1, suffix: '/5', label: 'Average customer rating' },
  { value: 5000, suffix: '+', label: 'Connected customers' },
  { value: 97, suffix: '%', label: 'Would recommend DICE' },
  { value: 10, suffix: ' min', label: 'Average support response' },
];

/** Testimonials page */
export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        crumbs={['Testimonials']}
        title={
          <>
            Don&rsquo;t take <span className="text-gradient">our word for it</span>
          </>
        }
        subtitle="Thousands of customers — gamers, founders, families and teachers — trust DICE WiFi every single day."
      />

      <section className="relative overflow-hidden py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 rounded-[2.5rem] border border-slate-900/5 bg-white p-8 shadow-card sm:grid-cols-2 lg:grid-cols-4 lg:p-10 dark:border-white/10 dark:bg-slate-900/60">
            {proof.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.08} className="text-center">
                <p className="font-display text-4xl font-extrabold text-gradient">
                  <CountUpNumber end={p.value} decimals={p.decimals ?? 0} suffix={p.suffix} />
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{p.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </>
  );
}
