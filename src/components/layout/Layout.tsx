import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import Loader from '../misc/Loader';
import CustomCursor from '../misc/CustomCursor';
import BackToTop from '../misc/BackToTop';
import FloatingButtons from '../misc/FloatingButtons';
import CookieNotice from '../misc/CookieNotice';

interface LayoutProps {
  children: ReactNode;
}

/** App shell: nav + animated route container + footer + global widgets */
export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Loader />
      <CustomCursor />
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
