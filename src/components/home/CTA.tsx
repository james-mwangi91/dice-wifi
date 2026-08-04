import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { fadeUp, stagger } from '../../animations/variants';

/** Large centered CTA with animated gradient background */
export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-36">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <motion.div variants={stagger(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary dark:border-brand-accent/20 dark:bg-brand-accent/10 dark:text-brand-accent"
          >
            <Sparkles className="h-4 w-4" /> Get Started Today
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-7 font-display text-4xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-6xl dark:text-white"
          >
            Ready to experience <span className="text-gradient">faster internet?</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Join thousands of happy homes and businesses on the fastest network in Nairobi.
            Most installations are live within 48 hours.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Join Today
            </Button>
            <Button to="/contact" variant="glass" size="lg" icon={<PhoneCall className="h-4 w-4" />}>
              Contact Us
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 text-xs font-semibold uppercase tracking-widest text-slate-400">
            No contracts · Free cancellation · 30-day money-back guarantee
          </motion.p>
        </motion.div>
      </div>

      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full opacity-60 dark:opacity-40">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-40%] bg-[conic-gradient(from_0deg,transparent_0deg,#2563EB_90deg,transparent_180deg,#0EA5E9_270deg,transparent_360deg)] blur-2xl"
          />
        </div>
        <motion.div
          animate={{ y: [0, -24, 0], x: [0, 16, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-primary/15 blur-[90px]"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-brand-secondary/15 blur-[100px]"
        />
      </div>
    </section>
  );
}
