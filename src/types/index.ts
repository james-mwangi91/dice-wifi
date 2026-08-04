import type { LucideIcon } from 'lucide-react';

/** Navigation link pointing to a section id */
export interface NavLink {
  label: string;
  href: string;
}

/** Internet package plan */
export interface Plan {
  id: string;
  name: string;
  speed: string;
  price: number;
  tagline: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

/** Service offering */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Coverage area */
export interface CoverageArea {
  name: string;
  x: number;
  y: number;
  status: 'live' | 'expanding';
}

/** Customer testimonial */
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

/** FAQ item */
export interface FaqItem {
  question: string;
  answer: string;
}

/** Feature card for "Why Choose Us" */
export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Network status card */
export interface NetworkStatusCard {
  id: string;
  title: string;
  status: string;
  detail: string;
  icon: LucideIcon;
}
