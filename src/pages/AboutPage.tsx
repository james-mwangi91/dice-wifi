import { Activity, Award, Building2, Handshake, Leaf, Rocket } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import About from '../components/home/About';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CTA from '../components/home/CTA';
import Reveal, { Stagger, StaggerItem } from '../components/ui/Reveal';

const milestones = [
  { icon: Rocket, year: '2018', title: 'Founded in Westlands', desc: 'Started with 12 fibre connections and one simple promise — internet that never fails.' },
  { icon: Building2, year: '2020', title: '1,000 Customers', desc: 'Expanded beyond Nairobi CBD to estates across Kiambu County.' },
  { icon: Activity, year: '2022', title: 'Enterprise Launch', desc: 'Introduced dedicated internet and managed networks for businesses.' },
  { icon: Award, year: '2024', title: '5,000 Strong', desc: 'Became one of the fastest-growing ISPs in the greater Nairobi region.' },
  { icon: Handshake, year: '2026', title: '100+ Km of Fibre', desc: 'Redundant backbone rings connecting homes and businesses at scale.' },
  { icon: Leaf, year: 'Today', title: 'Always Improving', desc: 'Expanding coverage monthly with the community at the centre of every rollout.' },
];

/** About page */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={['About']}
        title={
          <>
            The story behind <span className="text-gradient">DICE WiFi</span>
          </>
        }
        subtitle="We started with a simple frustration — slow, unreliable internet that held Kenya back. Today we power thousands of homes and businesses."
      />
      <About />

      {/* Milestones */}
      <section className="relative overflow-hidden bg-white py-24 lg:py-32 dark:bg-slate-900">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary dark:bg-brand-accent/10 dark:text-brand-accent">
              <Leaf className="h-4 w-4" /> Our Journey
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl dark:text-white">
              Milestones that <span className="text-gradient">matter</span>
            </h2>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
            {milestones.map((m) => (
              <StaggerItem key={m.year}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-900/5 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-soft dark:border-white/10 dark:bg-slate-900/60">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <m.icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-sm font-extrabold text-brand-primary/40 dark:text-brand-accent/40">{m.year}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-brand-dark dark:text-white">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{m.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <WhyChooseUs />
      <CTA />
    </>
  );
}
