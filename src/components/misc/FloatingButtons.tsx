import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { BRAND } from '../../constants';
import { useScrolled } from '../../hooks';

/** Floating WhatsApp button — the way most Kenyan customers want to reach us */
export default function FloatingButtons() {
  /* Hidden over the hero so it never sits on top of the area-check form */
  const scrolled = useScrolled(500);

  return (
    <AnimatePresence>
      {scrolled && (
    <motion.a
      href={BRAND.whatsappHref}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with DICE WiFi on WhatsApp"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2.5 rounded-full bg-[#25D366] pl-4 pr-5 font-display text-sm font-bold text-brand-dark shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)] lg:right-8"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </motion.a>
      )}
    </AnimatePresence>
  );
}
