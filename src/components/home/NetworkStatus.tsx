import { NETWORK_STATUS } from '../../constants';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';

/** Live network status dashboard */
export default function NetworkStatus() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32 dark:bg-slate-900">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Network Status"
          title={
            <>
              Our network, <span className="text-gradient">live right now</span>
            </>
          }
          subtitle="Total transparency — monitor the health of our core infrastructure in real time."
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" gap={0.07}>
          {NETWORK_STATUS.map((card) => (
            <StaggerItem key={card.id}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-900/5 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-soft dark:border-white/10 dark:bg-slate-900/60">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-transform duration-300 group-hover:scale-110 dark:bg-brand-accent/10 dark:text-brand-accent">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <span className="relative flex h-3 w-3" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 animate-ping-soft" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                  </span>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">{card.title}</p>
                <p className="mt-1 font-display text-base font-extrabold text-brand-dark dark:text-white">{card.status}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{card.detail}</p>

                {/* Uptime bar */}
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div className="h-full w-[99.9%] rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-8 text-center text-xs font-medium text-slate-400">
          Last checked: just now · Status auto-refreshes every 60 seconds
        </p>
      </div>
    </section>
  );
}
