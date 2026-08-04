import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../constants';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import 'swiper/css';
import 'swiper/css/pagination';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'}`}
        />
      ))}
    </div>
  );
}

/** Testimonials carousel powered by Swiper */
export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 -z-10 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved by <span className="text-gradient">5,000+ customers</span>
            </>
          }
          subtitle="Real stories from the homes and businesses we power every single day."
        />

        <Reveal className="mt-14" delay={0.1}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={28}
            slidesPerView={1}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id} className="h-auto">
                <figure className="group relative flex h-full flex-col rounded-[2rem] border border-slate-900/5 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-soft dark:border-white/10 dark:bg-slate-900/60">
                  <Quote className="absolute right-7 top-7 h-8 w-8 text-brand-primary/15 transition-colors duration-300 group-hover:text-brand-primary/30 dark:text-brand-accent/15" />

                  <Stars count={t.rating} />

                  <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-7 flex items-center gap-4 border-t border-slate-900/5 pt-6 dark:border-white/10">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      decoding="async"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-primary/20"
                    />
                    <div>
                      <p className="font-display text-sm font-bold text-brand-dark dark:text-white">{t.name}</p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  );
}
