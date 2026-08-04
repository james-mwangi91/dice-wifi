import { WHY_CHOOSE_US } from '../../constants';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';

/** Why Choose Us — 8 feature cards with glow hovers */
export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-brand-primary/5 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why DICE WiFi"
          title={
            <>
              Chosen by <span className="text-gradient">5,000+ customers</span>
            </>
          }
          subtitle="Every detail of our network is engineered around the only metric that matters: your experience."
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
          {WHY_CHOOSE_US.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-900/5 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-soft dark:border-white/10 dark:bg-slate-900/60">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-brand transition-transform duration-500 group-hover:scale-x-100" />
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-brand opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" />

                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-all duration-300 group-hover:bg-gradient-brand group-hover:text-white group-hover:shadow-glow dark:bg-brand-accent/10 dark:text-brand-accent">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-brand-dark dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
