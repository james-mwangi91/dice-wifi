import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircle, Plus } from 'lucide-react';
import { FAQS } from '../../constants';
import { cn } from '../../utils/cn';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';

/** FAQ accordion with smooth height animations */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-24 lg:py-32 dark:bg-slate-900">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions? <span className="text-gradient">Answered.</span>
            </>
          }
          subtitle="Everything you need to know before you get connected. Still curious? Our team is one call away."
        />

        <Stagger className="mt-14 space-y-4" gap={0.05}>
          {FAQS.map((faq, index) => {
            const open = openIndex === index;
            return (
              <StaggerItem key={faq.question}>
                <div
                  className={cn(
                    'overflow-hidden rounded-3xl border transition-all duration-300',
                    open
                      ? 'border-brand-primary/30 bg-white shadow-soft dark:border-brand-accent/30 dark:bg-slate-900/80'
                      : 'border-slate-900/5 bg-white/70 hover:border-brand-primary/20 dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-brand-accent/20'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8 sm:py-6"
                  >
                    <span className="flex items-center gap-3.5">
                      <span className={cn('inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300', open ? 'bg-gradient-brand text-white' : 'bg-brand-primary/10 text-brand-primary dark:bg-brand-accent/10 dark:text-brand-accent')}>
                        <HelpCircle className="h-4 w-4" />
                      </span>
                      <span className="font-display text-sm font-bold text-brand-dark sm:text-base dark:text-white">{faq.question}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={cn('inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300', open ? 'bg-gradient-brand text-white' : 'bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300')}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-panel-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 pl-[4.4rem] pr-8 text-sm leading-relaxed text-slate-600 sm:pl-[4.6rem] dark:text-slate-400">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
