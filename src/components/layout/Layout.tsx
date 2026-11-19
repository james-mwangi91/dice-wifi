import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import BackToTop from '../misc/BackToTop';
import FloatingButtons from '../misc/FloatingButtons';
import CookieNotice from '../misc/CookieNotice';

interface LayoutProps {
  children: ReactNode;
}

/** App shell: nav + route container + footer + global widgets */
export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
      <FloatingButtons />
      <CookieNotice />
    </div>
  );
}
