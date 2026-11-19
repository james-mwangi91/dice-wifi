import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Plus } from 'lucide-react';
import { BRAND, FAQS } from '../data';
import Reveal from './Reveal';

/** Accordion FAQ */
export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-card py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-5 font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">Quick answers.</h2>
          <p className="mt-5 text-lg text-ink/70">Stuck on the WiFi page? We reply on WhatsApp within minutes.</p>
          <a href={BRAND.whatsappHref} target="_blank" rel="noreferrer" className="btn mt-8 bg-[#25D366] text-night hover:brightness-95">
            <MessageCircle className="h-4 w-4" /> WhatsApp support
          </a>
        </Reveal>

        <div className="space-y-3 lg:col-span-8">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={'rounded-[1.5rem] transition-colors ' + (isOpen ? 'bg-surface' : 'bg-surface/50 hover:bg-surface')}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="font-display text-lg font-bold">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className={
                        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ' +
                        (isOpen ? 'bg-coral text-white' : 'bg-card text-ink')
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 leading-relaxed text-ink/70">{f.a}</p>
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
