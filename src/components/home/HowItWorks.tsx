import { MapPin, Router, Zap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';

const STEPS = [
  {
    icon: MapPin,
    title: 'Check your area',
    body: 'Type your estate or town. If we are live there, you can book today. If not, we will tell you when we are coming.',
  },
  {
    icon: Zap,
    title: 'Pick a speed',
    body: 'Four plans, all unlimited. Not sure? Call us and a real person will help you choose based on how your home uses the internet.',
  },
  {
    icon: Router,
    title: 'We install, you stream',
    body: 'An engineer runs the fibre, sets up the router and tests every room. Most homes are online within 48 hours of booking.',
  },
];

/** Three-step path from curious to connected */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Getting connected"
          title={
            <>
              Online in <span className="text-gradient">three steps.</span>
            </>
          }
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3" gap={0.1}>
          {STEPS.map((step, i) => (
            <StaggerItem key={step.title} className="h-full">
              <div className="relative h-full rounded-[1.75rem] border border-slate-900/10 bg-white p-8 dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-start justify-between">
                  <span className="font-display text-7xl font-extrabold leading-none tracking-[-0.035em] text-brand-dark dark:text-white">
                    {i + 1}
                  </span>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-lime text-brand-dark">
                    <step.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold text-brand-dark dark:text-white">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{step.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
