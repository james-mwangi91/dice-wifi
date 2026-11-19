import { ArrowUpRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SERVICES } from '../../constants';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';
import { navigateToSection } from '../../utils/scroll';

/** Services grid — 8 offerings with hover interactions */
export default function Services() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 lg:py-32 dark:bg-slate-900">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Offer"
          title={
            <>
              Services built around <span className="text-gradient">your life</span>
            </>
          }
          subtitle="From single-room apartments to multi-site enterprises — we design, install and manage connectivity that simply works."
        />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
          {SERVICES.map((service) => (
            <StaggerItem key={service.id}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-slate-900/5 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-brand-primary/25 hover:shadow-soft dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-brand-accent/30">
                {/* Hover glow */}

                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-dark text-brand-lime dark:bg-brand-lime dark:text-brand-dark">
                  <service.icon className="h-7 w-7" />
                </span>

                <h3 className="mt-5 font-display text-lg font-bold text-brand-dark dark:text-white">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{service.description}</p>

                <button
                  type="button"
                  onClick={() => navigateToSection('contact', pathname, navigate)}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary transition-all duration-300 group-hover:gap-3 dark:text-brand-accent"
                >
                  Learn more <ArrowUpRight className="h-4 w-4" />
                </button>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
