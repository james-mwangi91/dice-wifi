import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { BRAND } from '../../constants';

/** Floating WhatsApp + Call action buttons */
export default function FloatingButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 lg:right-8"
    >
      <motion.a
        href={BRAND.phoneHref}
        aria-label="Call DICE WiFi"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow"
      >
        <span className="absolute inset-0 rounded-full bg-brand-primary/60 animate-ping-soft" />
        <Phone className="relative h-5 w-5" />
      </motion.a>

      <motion.a
        href={BRAND.whatsappHref}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_10px_30px_-8px_rgba(16,185,129,0.6)]"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/60 animate-ping-soft" style={{ animationDelay: '0.5s' }} />
        <MessageCircle className="relative h-5 w-5" />
      </motion.a>
    </motion.div>
  );
}
