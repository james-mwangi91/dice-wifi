import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { fadeUp, stagger } from '../../animations/variants';
import { EASE } from '../../animations/variants';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: string;
  crumbs: string[];
}

/** Animated page hero used at the top of inner pages */
export default function PageHeader({ title, subtitle, crumbs }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-brand-dark pt-36 pb-16 lg:pt-44 lg:pb-24">
      <svg
        viewBox="0 0 800 800"
        className="pointer-events-none absolute -right-72 top-1/2 h-[52rem] w-[52rem] -translate-y-1/2 text-brand-lime opacity-[0.07]"
        aria-hidden="true"
      >
        {[120, 220, 320, 420].map((r) => (
          <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeWidth="28" />
        ))}
      </svg>

      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"
      >
        <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-400">
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              <span className="text-brand-lime">{crumb}</span>
            </span>
          ))}
        </motion.nav>

        <motion.h1
          variants={fadeUp}
          transition={{ ease: EASE }}
          className="max-w-4xl font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </header>
  );
}
