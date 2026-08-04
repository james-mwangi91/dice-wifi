import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';
import Logo from '../components/Logo';

/** 404 page */
export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-dark px-6">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div className="absolute h-96 w-96 rounded-full bg-brand-primary/25 blur-[120px]" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative text-center"
      >
        <motion.div
          animate={{ rotate: [0, -6, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto w-fit"
        >
          <Logo className="h-24 w-24" />
        </motion.div>
        <p className="mt-8 font-display text-7xl font-extrabold text-gradient sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Signal lost — page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you back online.
        </p>
        <div className="mt-8">
          <Button to="/" size="lg" icon={<Home className="h-4 w-4" />}>
            Back to Home
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
