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
    <header className="relative overflow-hidden bg-brand-dark pt-36 pb-20 lg:pt-44 lg:pb-24">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-primary/30 blur-[120px]" />
      <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-brand-secondary/25 blur-[120px]" />
      <div className="absolute inset-0 bg-noise" />

      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl px-6 lg:px-8"
      >
        <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-400">
          <Link to="/" className="transition-colors hover:text-brand-accent">
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              <span className="text-brand-accent">{crumb}</span>
            </span>
          ))}
        </motion.nav>

        <motion.h1
          variants={fadeUp}
          transition={{ ease: EASE }}
          className="max-w-4xl font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
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
