import {
  Home,
  Briefcase,
  Server,
  Wifi,
  Router,
  Network,
  Cable,
  ShieldCheck,
  Zap,
  Infinity as InfinityIcon,
  Headphones,
  Wallet,
  Rocket,
  Lock,
  Activity,
  Gauge,
  Cpu,
} from 'lucide-react';
import type {
  NavLink,
  Plan,
  Service,
  CoverageArea,
  Testimonial,
  FaqItem,
  Feature,
  NetworkStatusCard,
} from '../types';

/* ------------------------------------------------------------------ */
/* Brand                                                               */
/* ------------------------------------------------------------------ */

export const BRAND = {
  name: 'DICE WiFi',
  tagline: 'Fast. Reliable. Unlimited.',
  phone: '+254 700 000 000',
  phoneHref: 'tel:+254700000000',
  whatsappHref:
    'https://wa.me/254700000000?text=Hi%20DICE%20WiFi%2C%20I%27d%20like%20to%20connect%20to%20your%20internet%20service.',
  email: 'hello@dicewifi.co.ke',
  emailHref: 'mailto:hello@dicewifi.co.ke',
  address: 'Westlands Business Park, Nairobi, Kenya',
  hours: 'Mon – Sat · 8:00 AM – 8:00 PM',
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: 'about' },
  { label: 'Packages', href: 'packages' },
  { label: 'Coverage', href: 'coverage' },
  { label: 'Business', href: 'business' },
  { label: 'Testimonials', href: 'testimonials' },
  { label: 'FAQ', href: 'faq' },
  { label: 'Contact', href: 'contact' },
];

/* ------------------------------------------------------------------ */
/* Hero statistics                                                    */
/* ------------------------------------------------------------------ */

export const HERO_STATS = [
  { label: 'Uptime', value: 99.9, decimals: 1, suffix: '%' },
  { label: 'Customers', value: 5000, suffix: '+' },
  { label: 'Support', value: 24, suffix: '/7' },
  { label: 'Coverage', value: 100, suffix: '+ Km' },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const SERVICES: Service[] = [
  {
    id: 'residential',
    title: 'Residential Internet',
    description:
      'Unlimited high-speed fibre for streaming, gaming and remote work — tailored to how your family lives online.',
    icon: Home,
  },
  {
    id: 'business',
    title: 'Business Internet',
    description:
      'Symmetric speeds and business-grade reliability that keep your operations, VoIP and cloud tools always on.',
    icon: Briefcase,
  },
  {
    id: 'dedicated',
    title: 'Dedicated Internet',
    description:
      'Exclusive bandwidth with an SLA-backed guarantee for enterprises that cannot afford any downtime.',
    icon: Server,
  },
  {
    id: 'hotspot',
    title: 'Hotspot Solutions',
    description:
      'Public and private WiFi hotspots for estates, malls, hotels and event venues with captive portal support.',
    icon: Wifi,
  },
  {
    id: 'installation',
    title: 'WiFi Installation',
    description:
      'Whole-home mesh coverage with professional installation — dead zones eliminated, every corner connected.',
    icon: Router,
  },
  {
    id: 'consulting',
    title: 'Network Consulting',
    description:
      'Site surveys, network design and optimization from certified engineers who understand Kenyan infrastructure.',
    icon: Network,
  },
  {
    id: 'fiber-install',
    title: 'Fiber Installation',
    description:
      'FTTH rollout, splicing, termination and testing to bring true fibre capacity to your door.',
    icon: Cable,
  },
  {
    id: 'managed',
    title: 'Managed Networks',
    description:
      'We design, deploy and monitor your network end-to-end so you focus on business, not bandwidth.',
    icon: ShieldCheck,
  },
];

/* ------------------------------------------------------------------ */
/* Packages                                                            */
/* ------------------------------------------------------------------ */

export const PACKAGES: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    speed: '10 Mbps',
    price: 1500,
    tagline: 'Perfect for browsing, social media & light streaming.',
    features: [
      'Unlimited data — no FUP',
      '24/7 customer support',
      'Free installation where applicable',
      'Router included',
    ],
  },
  {
    id: 'family',
    name: 'Family',
    speed: '20 Mbps',
    price: 2500,
    tagline: 'Built for streaming households & remote work.',
    features: [
      'Unlimited data — no FUP',
      '4K streaming ready',
      '24/7 customer support',
      'Free installation where applicable',
      'Router included',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    speed: '40 Mbps',
    price: 3500,
    tagline: 'Heavy gaming, streaming & smart homes.',
    featured: true,
    badge: 'Most Popular',
    features: [
      'Unlimited data — no FUP',
      'Low latency gaming (8ms)',
      'Priority technical support',
      'Free installation where applicable',
      'Premium router included',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    speed: '100 Mbps',
    price: 8000,
    tagline: 'Symmetric speeds for serious enterprises.',
    features: [
      'Unlimited data — no FUP',
      'Symmetric 100/100 Mbps',
      'Static IP (optional)',
      'SLA-backed 99.9% uptime',
      'Dedicated account manager',
    ],
  },
];

export const PACKAGE_COMPARE_ROWS = [
  { label: 'Speed', values: ['10 Mbps', '20 Mbps', '40 Mbps', '100 Mbps'] },
  { label: 'Unlimited (No FUP)', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Router included', values: ['Yes', 'Yes', 'Premium', 'Business'] },
  { label: 'Free installation', values: ['Where applicable', 'Where applicable', 'Where applicable', 'Where applicable'] },
  { label: 'Support', values: ['24/7', '24/7', 'Priority 24/7', 'Dedicated manager'] },
  { label: 'Static IP', values: ['—', '—', '—', 'Optional'] },
  { label: 'Uptime SLA', values: ['Best effort', 'Best effort', '99.5%', '99.9%'] },
];

/* ------------------------------------------------------------------ */
/* Coverage areas (percent positions on the stylised map)              */
/* ------------------------------------------------------------------ */

export const COVERAGE_AREAS: CoverageArea[] = [
  { name: 'Nairobi', x: 36, y: 46, status: 'live' },
  { name: 'Kiambu', x: 27, y: 31, status: 'live' },
  { name: 'Ruiru', x: 45, y: 29, status: 'live' },
  { name: 'Thika', x: 60, y: 23, status: 'live' },
  { name: 'Juja', x: 51, y: 17, status: 'live' },
  { name: 'Kahawa', x: 42, y: 36, status: 'live' },
  { name: 'Syokimau', x: 38, y: 60, status: 'expanding' },
  { name: 'Kitengela', x: 44, y: 70, status: 'expanding' },
];

export const COVERAGE_EXTRAS = ['Nakuru', 'Naivasha', 'Machakos', 'Ongata Rongai', 'Kikuyu', 'Limuru'];

/* ------------------------------------------------------------------ */
/* Why choose us                                                       */
/* ------------------------------------------------------------------ */

export const WHY_CHOOSE_US: Feature[] = [
  {
    title: '99.9% Uptime',
    description: 'Enterprise-grade fibre backbone monitored 24/7 so your internet simply never drops.',
    icon: ShieldCheck,
  },
  {
    title: 'Low Latency',
    description: 'Ultra-low ping for gaming, video calls and cloud apps that feel instant.',
    icon: Zap,
  },
  {
    title: 'Unlimited Data',
    description: 'Stream, game and work all month long — no fair usage policies, ever.',
    icon: InfinityIcon,
  },
  {
    title: 'Professional Support',
    description: 'Real engineers on the line, 24/7, with an average response time under 10 minutes.',
    icon: Headphones,
  },
  {
    title: 'Affordable Packages',
    description: 'Transparent pricing from KES 1,500/month with no hidden charges, ever.',
    icon: Wallet,
  },
  {
    title: 'Fast Installation',
    description: 'Most homes are connected within 48 hours of application approval.',
    icon: Rocket,
  },
  {
    title: 'Secure Network',
    description: 'Encrypted connectivity and managed firewalls keep your data safe by default.',
    icon: Lock,
  },
  {
    title: 'Modern Infrastructure',
    description: 'FTTH, high-density radios and a redundant core built for the next decade.',
    icon: Cpu,
  },
];

/* ------------------------------------------------------------------ */
/* Network status                                                      */
/* ------------------------------------------------------------------ */

export const NETWORK_STATUS: NetworkStatusCard[] = [
  {
    id: 'internet',
    title: 'Internet',
    status: 'Operational',
    detail: 'All regions online · 0 outages today',
    icon: Wifi,
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    status: 'None Scheduled',
    detail: 'Next window: Sunday 2:00 – 4:00 AM',
    icon: Activity,
  },
  {
    id: 'latency',
    title: 'Latency',
    status: 'Low · 9ms',
    detail: 'Average core round-trip time',
    icon: Gauge,
  },
  {
    id: 'servers',
    title: 'Core Servers',
    status: 'All Online',
    detail: '24 / 24 nodes healthy',
    icon: Server,
  },
  {
    id: 'backbone',
    title: 'Backbone',
    status: '100 Gbps',
    detail: 'Redundant rings fully active',
    icon: Network,
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Wanjiru Kamau',
    role: 'Remote Product Designer · Nairobi',
    quote:
      'I run three video calls a day and stream 4K at night. DICE WiFi has not dropped a single call since installation. The 40 Mbps Premium plan is a total game changer.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Brian Otieno',
    role: 'Esports Player · Ruiru',
    quote:
      'Ping dropped from 60ms to 8ms. I now play ranked matches without a single complaint from my teammates. Best decision I made this year.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Amina Hassan',
    role: 'Café Owner · Westlands',
    quote:
      'We run POS, CCTV and customer WiFi all on the Business plan. DICE engineers set everything up in one afternoon. Zero downtime in 8 months.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 4,
    name: 'David Mwangi',
    role: 'Software Engineer · Kiambu',
    quote:
      'Upload speeds matter to me more than downloads. DICE gives me real symmetric speeds that my old provider only advertised. Fantastic value.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    id: 5,
    name: 'Grace Njeri',
    role: 'Mother of three · Thika',
    quote:
      'Kids stream, I work from home, and my husband games — all at once, smoothly. Installation was quick and the team was so professional.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: 6,
    name: 'Samuel Kiprop',
    role: 'Startup Founder · Nairobi',
    quote:
      'We moved our whole office to DICE. Their dedicated support line answers in minutes and they proactively monitor our connection.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    id: 7,
    name: 'Faith Wambui',
    role: 'Landlady · Syokimau',
    quote:
      'I installed DICE in my apartment block and the tenants are thrilled. The hotspot solution pays for itself through the service charge.',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
  },
  {
    id: 8,
    name: 'James Ochieng',
    role: 'Logistics Manager · Kitengela',
    quote:
      'Our tracking system never goes offline. That reliability alone saves us thousands every month. DICE is the partner we needed.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const FAQS: FaqItem[] = [
  {
    question: 'Where is DICE WiFi available?',
    answer:
      'We currently serve Nairobi, Kiambu, Ruiru, Thika, Juja, Kahawa, Syokimau and Kitengela, with new areas added monthly. Enter your location in our coverage checker to confirm availability — if you are in an expanding zone, join the waitlist and we will reach out the moment your area goes live.',
  },
  {
    question: 'Is the data really unlimited?',
    answer:
      'Yes. All home and business packages are truly unlimited with no fair usage policy (FUP), no throttling and no surprise top-up fees — regardless of how much you stream, download or game.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'Most installations are completed within 48 hours of approval, depending on your location and whether fibre is already available at your premises. Our engineers handle all cabling, configuration and testing before they leave.',
  },
  {
    question: 'What speeds can I expect?',
    answer:
      'Home packages start at 10 Mbps and scale to 40 Mbps, while business packages offer symmetric 100 Mbps. Real-world speeds typically match advertised speeds because we over-provision capacity on every node — no evening slowdowns.',
  },
  {
    question: 'Is a router included?',
    answer:
      'Yes. Every plan includes a high-performance router — Premium plans include a WiFi 6 router and Business plans include enterprise-grade equipment with the option of mesh extenders.',
  },
  {
    question: 'Can I upgrade or downgrade my package?',
    answer:
      'Anytime. Upgrades take effect immediately with no penalty. Downgrades apply from the start of your next billing cycle. Just contact support and we will handle it.',
  },
  {
    question: 'Do you support business / corporate installations?',
    answer:
      'Absolutely. We offer dedicated internet with static IPs, SLA-backed uptime guarantees, managed networks, and priority on-site support for offices, hotels, estates and schools.',
  },
  {
    question: 'How do I pay my monthly bill?',
    answer:
      'We accept M-Pesa, bank transfer and card payments, with automated receipts. You can also set up automatic billing so your connection never lapses. Payments are managed through a self-service portal.',
  },
];

/* ------------------------------------------------------------------ */
/* Socials                                                             */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Socials                                                             */
/* ------------------------------------------------------------------ */

/* Social links live in Footer.tsx, which pairs each network with its correct
   brand icon. The former SOCIALS constant here was unused and mapped Facebook
   to a handshake and Twitter to an eye, so it has been removed. */

