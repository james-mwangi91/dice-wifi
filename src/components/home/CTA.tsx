import { ArrowRight, MessageCircle } from 'lucide-react';
import { BRAND } from '../../constants';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';

/** Closing call to action — a full lime slab */
export default function CTA() {
  return (
    <section className="px-3 py-3 sm:px-4 sm:py-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-lime px-6 py-20 text-brand-dark sm:rounded-[2.5rem] sm:px-12 lg:px-16 lg:py-28">
        {/* Signal arcs echo the hero */}
        <svg viewBox="0 0 400 400" className="pointer-events-none absolute -bottom-40 -right-24 h-[34rem] w-[34rem] opacity-[0.12]" aria-hidden="true">
          {[60, 110, 160].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeWidth="18" />
          ))}
          <circle cx="200" cy="200" r="22" fill="currentColor" />
        </svg>

        <Reveal className="relative mx-auto max-w-7xl">
          <h2 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.035em] sm:text-6xl lg:text-8xl">
            Stop refreshing. Start streaming.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-brand-dark/75">
            Book an install today and you could be online by the weekend. No contracts, and a full refund in your first
            30 days if we don&rsquo;t deliver.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button to="/contact" variant="dark" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Book my installation
            </Button>
            <Button href={BRAND.whatsappHref} variant="outline" size="lg" icon={<MessageCircle className="h-4 w-4" />} className="!border-brand-dark/25 !text-brand-dark hover:!border-brand-dark">
              Chat on WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
