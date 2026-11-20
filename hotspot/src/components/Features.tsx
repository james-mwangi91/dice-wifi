import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, Smartphone } from 'lucide-react';

const FEATURES = [
  { icon: Smartphone, title: 'All for mobiles', body: 'Any phone, tablet or laptop. No app, no SIM, no sign-up.' },
  { icon: Gamepad2, title: 'Stream & play', body: 'Unlimited data for YouTube, Netflix, Showmax and online games.' },
  { icon: BookOpen, title: 'Study & work', body: 'Assignments, video calls and job applications without watching your bundle.' },
];

/** Three navy feature cards that lift over the bottom of the hero (theme pattern) */
export default function Features() {
  return (
    <section aria-label="What you can do on DICE Hotspot" className="relative z-10 -mt-10 bg-[linear-gradient(to_bottom,transparent_2.5rem,rgb(var(--card))_2.5rem)] pb-6 lg:-mt-16 lg:bg-[linear-gradient(to_bottom,transparent_4rem,rgb(var(--card))_4rem)]">
      <div className="container-x grid gap-5 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.article
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex items-center gap-5 overflow-hidden rounded-lg bg-night p-7 text-white shadow-[0_24px_50px_-28px_rgba(14,27,77,0.8)] transition-transform duration-300 hover:-translate-y-1.5 dark:ring-1 dark:ring-white/10"
          >
            {/* Red accent bar that sweeps in on hover */}
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-coral transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{f.body}</p>
            </div>
            <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-accent ring-4 ring-coral/40 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              <f.icon className="h-7 w-7" />
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
