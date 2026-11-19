import { ArrowRight, Check, ServerCog, ShieldCheck, Users, Zap } from 'lucide-react';
import Button from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';

const businessFeatures = [
  { icon: ShieldCheck, title: 'SLA-backed 99.9% uptime', desc: 'Contractual availability guarantees with service credits.' },
  { icon: Zap, title: 'Symmetric 100 Mbps+', desc: 'Equal upload and download — made for cloud-first operations.' },
  { icon: ServerCog, title: 'Static IP & managed firewall', desc: 'Host services and secure every connection by default.' },
  { icon: Users, title: 'A named account manager', desc: 'One engineer who knows your network inside out.' },
];

/** Business callout section */
export default function BusinessSection() {
  return (
    <section id="business" className="relative border-y border-slate-900/10 bg-white py-24 lg:py-32 dark:border-white/10 dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            eyebrow="For business"
            title={
              <>
                Downtime costs money. <span className="text-gradient">We put that in writing.</span>
              </>
            }
            subtitle="Offices, shops, hotels, schools and estates run on DICE — with dedicated bandwidth, a written SLA and engineers who answer the phone."
          />

          <ul className="mt-8 space-y-3">
            {['Dedicated bandwidth — never shared', 'Priority 24/7 support line', 'Free site survey & network design', 'Scales from 10 to 10,000 users'].map((item) => (
              <li key={item} className="flex items-center gap-3 font-medium text-slate-700 dark:text-slate-300">
                <Check className="h-4 w-4 shrink-0 text-brand-primary dark:text-brand-lime" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/business" variant="dark" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Business internet
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Book a free site survey
            </Button>
          </div>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.08}>
          {businessFeatures.map((f) => (
            <StaggerItem key={f.title} className="h-full">
              <div className="h-full rounded-[1.5rem] bg-brand-light p-6 dark:bg-white/5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark text-brand-lime dark:bg-brand-lime dark:text-brand-dark">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-brand-dark dark:text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
