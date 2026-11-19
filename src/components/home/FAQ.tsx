import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, Plus } from 'lucide-react';
import { BRAND, FAQS } from '../../constants';
import { cn } from '../../utils/cn';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

/** FAQ — heading on the left, accordion on the right */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  Straight <span className="text-gradient">answers.</span>
                </>
              }
              subtitle="No jargon, no fine print. If your question isn't here, call us — a person picks up."
            />
            <div className="mt-8">
              <Button href={BRAND.phoneHref} variant="dark" icon={<Phone className="h-4 w-4" />}>
                {BRAND.phone}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900/15 lg:col-span-7 dark:border-white/15">
          {FAQS.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-slate-900/15 dark:border-white/15">
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${index}`}
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-bold text-brand-dark sm:text-xl dark:text-white">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
                        open ? 'bg-brand-lime text-brand-dark' : 'border border-slate-900/15 text-brand-dark dark:border-white/20 dark:text-white'
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-slate-600 dark:text-slate-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
