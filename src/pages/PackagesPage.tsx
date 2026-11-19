import { Gift, ShieldCheck, Wallet, Zap } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Packages from '../components/home/Packages';
import SpeedTest from '../components/home/SpeedTest';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';
import { Stagger, StaggerItem } from '../components/ui/Reveal';

const guarantees = [
  { icon: Wallet, title: 'No hidden fees', desc: 'The price you see is the price you pay. Billing is transparent, monthly and paperless.' },
  { icon: Zap, title: 'Speed you can feel', desc: 'We over-provision every node so your speeds stay real — even at peak evening hours.' },
  { icon: ShieldCheck, title: '30-day guarantee', desc: 'Not satisfied in the first month? We will refund you in full, no questions asked.' },
  { icon: Gift, title: 'Referral rewards', desc: 'Refer a friend or neighbour and both of you get a free month. Ask support for details.' },
];

/** Packages page */
export default function PackagesPage() {
  return (
    <>
      <PageHeader
        crumbs={['Packages']}
        title={
          <>
            Packages for <span className="text-gradient">every lifestyle</span>
          </>
        }
        subtitle="Unlimited data on every plan. Free installation where applicable. Router included. That's it — simple."
      />
      <Packages />

      <section className="relative overflow-hidden py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {guarantees.map((g) => (
              <StaggerItem key={g.title}>
                <div className="group h-full rounded-3xl border border-slate-900/10 bg-white p-7 text-center transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900">
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-dark text-brand-lime dark:bg-brand-lime dark:text-brand-dark">
                    <g.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold text-brand-dark dark:text-white">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{g.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <SpeedTest />
      <FAQ />
      <CTA />
    </>
  );
}
