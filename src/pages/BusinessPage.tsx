import { ArrowRight, Building2, Check, LayoutGrid, School, Store } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BusinessSection from '../components/home/BusinessSection';
import CTA from '../components/home/CTA';
import Reveal, { Stagger, StaggerItem } from '../components/ui/Reveal';
import Button from '../components/ui/Button';

const segments = [
  {
    icon: Building2,
    title: 'Offices & Co-working',
    desc: 'Symmetric speeds, static IPs and VPN-ready connections that keep every seat productive.',
  },
  {
    icon: Store,
    title: 'Retail & Hospitality',
    desc: 'Customer WiFi, POS and CCTV on one reliable pipe — with a captive portal that looks like you.',
  },
  {
    icon: School,
    title: 'Schools & Universities',
    desc: 'Managed campus networks with content filtering, quotas and safe browsing for every student.',
  },
  {
    icon: LayoutGrid,
    title: 'Apartments & Estates',
    desc: 'Bulk connections with per-unit billing — or full managed networks for your management team.',
  },
];

const process = [
  { step: '01', title: 'Free Site Survey', desc: 'We assess your premises and design the perfect network — at no cost.' },
  { step: '02', title: 'Proposal & SLA', desc: 'A clear proposal with pricing, speeds and a written uptime guarantee.' },
  { step: '03', title: 'Rapid Deployment', desc: 'Engineers install, configure and test — typically within 72 hours.' },
  { step: '04', title: 'Monitor & Optimise', desc: '24/7 monitoring, proactive alerts and a dedicated account manager.' },
];

/** Business page */
export default function BusinessPage() {
  return (
    <>
      <PageHeader
        crumbs={['Business']}
        title={
          <>
            Internet that <span className="text-gradient">means business</span>
          </>
        }
        subtitle="Enterprise-grade connectivity with SLA-backed uptime, dedicated bandwidth and a support team that answers."
      />

      {/* Segments */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center">
            <span className="eyebrow text-brand-primary dark:text-brand-lime">
              <span className="pip" /> Built For Every Business
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl lg:text-5xl dark:text-white">
              One network. <span className="text-gradient">Every use case.</span>
            </h2>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {segments.map((s) => (
              <StaggerItem key={s.title}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-900/10 bg-white p-7 transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-dark text-brand-lime dark:bg-brand-lime dark:text-brand-dark">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-brand-dark dark:text-white">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-white py-24 lg:py-32 dark:bg-slate-900">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center">
            <span className="eyebrow text-brand-primary dark:text-brand-lime">
              <span className="pip" /> How It Works
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl dark:text-white">
              From survey to <span className="text-gradient">sign-off</span> — in four steps
            </h2>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-brand-primary/10 via-brand-secondary/40 to-brand-accent/10 lg:block" aria-hidden="true" />
            <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
              {process.map((p) => (
                <StaggerItem key={p.step}>
                  <div className="relative rounded-3xl border border-slate-900/10 bg-white p-7 dark:border-white/10 dark:bg-slate-900">
                    <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-lime font-display text-lg font-extrabold text-brand-dark">
                      {p.step}
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-brand-dark dark:text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Request a Site Survey
            </Button>
            <Button to="/packages" variant="outline" size="lg" icon={<Check className="h-4 w-4" />}>
              View Business Package
            </Button>
          </Reveal>
        </div>
      </section>

      <BusinessSection />
      <CTA />
    </>
  );
}
