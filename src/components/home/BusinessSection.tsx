import { ArrowRight, Check, ServerCog, ShieldCheck, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Stagger, StaggerItem } from '../ui/Reveal';

const businessFeatures = [
  { icon: ShieldCheck, title: 'SLA-Backed 99.9% Uptime', desc: 'Contractual availability guarantees with service credits.' },
  { icon: Zap, title: 'Symmetric 100 Mbps+', desc: 'Equal upload and download — made for cloud-first operations.' },
  { icon: ServerCog, title: 'Static IP & Managed Firewall', desc: 'Host services and secure every connection by default.' },
  { icon: Users, title: 'Dedicated Account Manager', desc: 'A named engineer who knows your network inside out.' },
];

/** Business callout section */
export default function BusinessSection() {
  return (
    <section id="business" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-brand-dark px-6 py-16 shadow-soft sm:px-12 lg:px-16 lg:py-20">
          {/* Backdrop */}
          <div className="absolute inset-0" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/92 to-brand-primary/50" />
            <div className="absolute inset-0 bg-grid opacity-40" />
            <motion.div
              animate={{ x: [0, 30, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-secondary/30 blur-[110px]"
            />
          </div>

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-accent backdrop-blur">
                For Business
              </span>
              <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Reliable internet that keeps your{' '}
                <span className="text-gradient">business moving.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                From offices and hotels to schools and estates — we deliver enterprise-grade
                connectivity with the service a growing company deserves.
              </p>

              <ul className="mt-8 space-y-3">
                {['Dedicated bandwidth — never shared', 'Priority 24/7 enterprise support', 'Free site survey & network design', 'Scales from 10 to 10,000 users'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-200">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-accent/20 text-brand-accent">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button to="/business" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                  Explore Business Plans
                </Button>
                <Button to="/contact" variant="glass" size="lg">
                  Talk to Sales
                </Button>
              </div>
            </div>

            <Stagger className="grid gap-5 sm:grid-cols-2" gap={0.12}>
              {businessFeatures.map((f) => (
                <StaggerItem key={f.title}>
                  <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/40 hover:bg-white/10">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                      <f.icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
