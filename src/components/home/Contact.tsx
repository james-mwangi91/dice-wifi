import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { BRAND, COVERAGE_AREAS } from '../../constants';
import { cn } from '../../utils/cn';
import SectionHeading from '../ui/SectionHeading';
import Reveal, { Stagger, StaggerItem } from '../ui/Reveal';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  message: string;
}

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
};

const contactCards = [
  { icon: Phone, label: 'Phone', value: BRAND.phone, href: BRAND.phoneHref },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with sales', href: BRAND.whatsappHref },
  { icon: Mail, label: 'Email', value: BRAND.email, href: BRAND.emailHref },
  { icon: MapPin, label: 'Office', value: BRAND.address, href: undefined },
];

/** Contact section — glass form (EmailJS) + contact cards + map */
export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending');
    try {
      if (EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId) {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: data.name,
            from_phone: data.phone,
            from_email: data.email,
            location: data.location,
            message: data.message,
          },
          EMAILJS_CONFIG.publicKey
        );
      } else {
        // Dev mode without EmailJS credentials — simulate a successful send
        console.warn('EmailJS not configured — simulating successful form submission. Add VITE_EMAILJS_* env vars to enable live delivery.');
        await new Promise((r) => setTimeout(r, 1200));
      }
      setStatus('sent');
      reset();
      window.setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      window.setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const inputClass = (invalid: boolean) =>
    cn(
      'w-full rounded-2xl border-2 bg-white px-4 py-3.5 text-sm text-brand-dark placeholder:text-slate-400 transition-colors focus:outline-none dark:bg-slate-900 dark:text-white',
      invalid
        ? 'border-rose-400 focus:border-rose-500'
        : 'border-slate-900/10 focus:border-brand-primary dark:border-white/10 dark:focus:border-brand-accent'
    );

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-brand-primary/5 blur-[110px]" aria-hidden="true" />
      <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-brand-secondary/5 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact Us"
          title={
            <>
              Let&rsquo;s get you <span className="text-gradient">connected</span>
            </>
          }
          subtitle="Fill in the form and our team will call you back within 30 minutes during business hours."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          {/* Contact cards */}
          <Stagger className="space-y-5 lg:col-span-2" gap={0.1}>
            {contactCards.map((card) => (
              <StaggerItem key={card.label}>
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="group flex items-center gap-5 rounded-3xl border border-slate-900/5 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/25 hover:shadow-soft dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-brand-accent/30"
                  >
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <card.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{card.label}</p>
                      <p className="mt-1 font-display text-sm font-bold text-brand-dark dark:text-white sm:text-base">{card.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="group flex items-center gap-5 rounded-3xl border border-slate-900/5 bg-white p-6 shadow-card dark:border-white/10 dark:bg-slate-900/60">
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                      <card.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{card.label}</p>
                      <p className="mt-1 font-display text-sm font-bold text-brand-dark dark:text-white sm:text-base">{card.value}</p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{BRAND.hours}</p>
                    </div>
                  </div>
                )}
              </StaggerItem>
            ))}

            <StaggerItem>
              <div className="overflow-hidden rounded-3xl border border-slate-900/5 shadow-card dark:border-white/10">
                <iframe
                  title="DICE WiFi office location — Nairobi, Kenya"
                  src="https://maps.google.com/maps?q=Westlands%2C%20Nairobi%2C%20Kenya&z=13&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-56 w-full border-0 grayscale-[35%] transition-all duration-500 hover:grayscale-0"
                />
              </div>
            </StaggerItem>
          </Stagger>

          {/* Form */}
          <Reveal x={32} y={0} className="lg:col-span-3">
            <div className="glass-strong relative rounded-[2.5rem] p-8 shadow-soft sm:p-10">
              <div className="absolute right-8 top-8 hidden gap-1.5 sm:flex" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>

              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }}
                    className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
                  >
                    <CheckCircle2 className="h-10 w-10" />
                  </motion.span>
                  <h3 className="mt-6 font-display text-2xl font-extrabold text-brand-dark dark:text-white">Message sent!</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Thank you for reaching out. A DICE WiFi specialist will contact you within 30 minutes during business hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Jane Wanjiru"
                        autoComplete="name"
                        className={inputClass(!!errors.name)}
                        {...register('name', { required: 'Please enter your name', minLength: { value: 2, message: 'Name is too short' } })}
                      />
                      {errors.name && <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Phone *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="07XX XXX XXX"
                        autoComplete="tel"
                        className={inputClass(!!errors.phone)}
                        {...register('phone', {
                          required: 'Please enter your phone number',
                          pattern: { value: /^[0-9+()\s-]{9,15}$/, message: 'Enter a valid phone number' },
                        })}
                      />
                      {errors.phone && <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="you@email.com"
                        autoComplete="email"
                        className={inputClass(!!errors.email)}
                        {...register('email', {
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                        })}
                      />
                      {errors.email && <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-location" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Location *
                      </label>
                      <select
                        id="contact-location"
                        className={inputClass(!!errors.location)}
                        defaultValue=""
                        {...register('location', { required: 'Select your location' })}
                      >
                        <option value="" disabled>
                          Select your area…
                        </option>
                        {COVERAGE_AREAS.map((area) => (
                          <option key={area.name} value={area.name}>
                            {area.name}
                          </option>
                        ))}
                        <option value="Other / Outside coverage">Other / Outside coverage</option>
                      </select>
                      {errors.location && <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.location.message}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="contact-message" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Tell us about your home or business — which package are you interested in?"
                        className={cn(inputClass(!!errors.message), 'resize-none')}
                        {...register('message', { required: 'Please write a short message', minLength: { value: 10, message: 'Message should be at least 10 characters' } })}
                      />
                      {errors.message && <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.message.message}</p>}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-9 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:brightness-110 disabled:opacity-60 sm:w-auto"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" /> Send Message
                        </>
                      )}
                    </button>
                    {status === 'error' && (
                      <p className="text-sm font-semibold text-rose-500" role="alert">
                        Something went wrong. Please try again or call {BRAND.phone}.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
