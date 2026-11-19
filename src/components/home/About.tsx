import { Eye, HeartHandshake, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Reveal, { Stagger, StaggerItem } from '../ui/Reveal';
import Button from '../ui/Button';
import CountUpNumber from '../ui/CountUp';

const values = [
  { title: 'Reliability', desc: 'We build networks that stay up — and back them with 99.9% uptime promises.' },
  { title: 'Customer First', desc: 'Real people, real engineers, real answers. Support that actually supports.' },
  { title: 'Innovation', desc: 'FTTH, WiFi 6 and software-defined routing keep us years ahead of the curve.' },
  { title: 'Integrity', desc: 'Honest speeds, transparent pricing and no hidden terms. Ever.' },
];

/** About — split layout with mission, vision and core values */
export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-brand-primary/5 blur-[100px]" aria-hidden="true" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-brand-secondary/5 blur-[100px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Illustration side */}
          <Reveal x={-32} y={0} className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1100&q=80"
                srcSet="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=640&q=75 640w, https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1100&q=80 1100w"
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="DICE WiFi support engineers working in the field"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
            </div>

            {/* Floating glass stat cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-strong absolute -right-4 -top-6 rounded-3xl px-6 py-5 shadow-soft sm:-right-8"
            >
              <p className="font-display text-3xl font-extrabold text-gradient">
                <CountUpNumber end={5000} suffix="+" />
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Happy customers</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="glass-strong absolute -bottom-6 -left-4 rounded-3xl px-6 py-5 shadow-soft sm:-left-8"
            >
              <p className="font-display text-3xl font-extrabold text-gradient">
                <CountUpNumber end={2018} />
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Serving since</p>
            </motion.div>
          </Reveal>

          {/* Content side */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="About DICE WiFi"
              title={
                <>
                  Connecting homes. <span className="text-gradient">Powering businesses.</span>
                </>
              }
              subtitle="DICE WiFi was founded on a simple belief: reliable internet is not a luxury — it is infrastructure for modern life. From family apartments to enterprise offices, we build fibre-grade connections that never let you down."
            />

            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
              {/* Mission */}
              <StaggerItem>
                <div className="group h-full rounded-3xl border border-slate-900/5 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft dark:border-white/10 dark:bg-slate-900/60">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-dark text-brand-lime dark:bg-brand-lime dark:text-brand-dark">
                    <Target className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-dark dark:text-white">Our Mission</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    To deliver fast, affordable and dependable connectivity to every home and business in Kenya.
                  </p>
                </div>
              </StaggerItem>

              {/* Vision */}
              <StaggerItem>
                <div className="group h-full rounded-3xl border border-slate-900/5 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft dark:border-white/10 dark:bg-slate-900/60">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-dark text-brand-lime dark:bg-brand-lime dark:text-brand-dark">
                    <Eye className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-dark dark:text-white">Our Vision</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    A Kenya where distance is irrelevant — where every corner has world-class internet.
                  </p>
                </div>
              </StaggerItem>
            </Stagger>

            {/* Core values */}
            <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
              {values.map((v) => (
                <StaggerItem key={v.title}>
                  <div className="group flex items-start gap-3.5 rounded-2xl border border-slate-900/5 bg-white/60 p-4 transition-all duration-300 hover:border-brand-primary/30 hover:bg-white dark:border-white/10 dark:bg-slate-900/60 dark:hover:bg-slate-900/80">
                    <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary transition-transform duration-300 group-hover:scale-125 dark:text-brand-accent" />
                    <div>
                      <p className="text-sm font-bold text-brand-dark dark:text-white">{v.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{v.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2} className="mt-10">
              <Button to="/about">Discover Our Story</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
