/* ------------------------------------------------------------------ */
/* Brand & contact                                                     */
/* ------------------------------------------------------------------ */

export const BRAND = {
  name: 'DICE WIFI',
  /* The WiFi network customers join; the portal greets them as "Sign in to DICE WIFI" */
  ssid: 'DICE WIFI',
  phone: '0769 051 010',
  phoneHref: 'tel:+254769051010',
  whatsappHref: 'https://wa.me/254769051010?text=Hi%20DICE%20WIFI%2C%20I%20have%20a%20question.',
  hostWhatsappHref:
    'https://wa.me/254769051010?text=Hi%20DICE%20WIFI%2C%20I%27d%20like%20free%20WiFi%20installation%20for%20my%20tenants%20or%20customers.',
  /* Where we operate */
  areas: ['Rongai', 'Banana', 'Kiserian'],
};

/* ------------------------------------------------------------------ */
/* Images — Unsplash, HD, face-aware crops                             */
/* ------------------------------------------------------------------ */

/** Build an Unsplash URL at an exact size; `crop=faces` keeps people in frame */
export function unsplash(id: string, w: number, h: number, q = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces,center&w=${w}&h=${h}&q=${q}`;
}

/** srcset for a fixed aspect ratio. Defaults go up to 2400px for sharp retina screens. */
export function unsplashSet(id: string, ratio: number, widths = [800, 1200, 1600, 2400], q = 80) {
  return widths.map((w) => `${unsplash(id, w, Math.round(w / ratio), q)} ${w}w`).join(', ');
}

/** Full-bleed hero backgrounds: 16:9 up to 3200px wide (crisp on 1440px retina), 9:16 portrait for phones */
export const HERO_DESKTOP_WIDTHS = [1280, 1920, 2560, 3200];
export const HERO_MOBILE_WIDTHS = [720, 1080, 1440];

export interface Slide {
  id: string;
  alt: string;
  tag: string;
  caption: string;
  /** CSS object-position on wide screens — keeps the subject clear of the text column */
  pos: string;
  /** Mirror the photo so its subject faces into the frame, away from the text */
  flip?: boolean;
}

export const HERO_SLIDES: Slide[] = [
  {
    id: '1611348524140-53c9a25263d6',
    alt: 'Nairobi skyline at golden hour',
    tag: 'Live across Nairobi',
    caption: 'From the CBD to Juja — look for “DICE Hotspot” in your WiFi list.',
    pos: '70% 45%',
  },
  {
    id: '1522529599102-193c0d76b5b6',
    alt: 'Smiling young man outdoors on a sunny day',
    tag: 'From KES 10',
    caption: 'An hour online costs less than a mandazi.',
    pos: '50% 30%',
    flip: true,
  },
  {
    id: '1531482615713-2afd69097998',
    alt: 'Two young professionals working together at a laptop',
    tag: 'Work anywhere',
    caption: 'Cafés, hostels and estates — your office is wherever the signal is.',
    pos: '75% 40%',
  },
  {
    id: '1563986768609-322da13575f3',
    alt: 'Person using a phone and laptop in a café',
    tag: 'Pay with M-Pesa',
    caption: 'Pay, get your code by SMS, and you are on in seconds.',
    pos: '70% 50%',
  },
];

export const VENUE_IMAGES = {
  apartments: { id: '1574362848149-11496d93a7c7', alt: 'Block of rental apartments with balconies on a sunny day' },
  salon: { id: '1562322140-8baeececf3df', alt: 'Hairdresser styling a customer’s hair in a bright salon' },
};

/* ------------------------------------------------------------------ */
/* Bundles                                                             */
/* ------------------------------------------------------------------ */

export interface Bundle {
  id: string;
  name: string;
  swahili: string;
  duration: string;
  price: number;
  blurb: string;
  popular?: boolean;
}

/* The packages sold on the DICE WIFI portal */
export const BUNDLES: Bundle[] = [
  { id: '1h', name: 'Sharp Sharp', swahili: 'Saa moja', duration: '1 hour', price: 10, blurb: 'Check messages, send that CV, top up your playlist.' },
  { id: '3h', name: 'Chill Session', swahili: 'Masaa matatu', duration: '3 hours', price: 15, blurb: 'A movie, a match, or an afternoon of assignments.' },
  { id: '5h', name: 'Binge Mode', swahili: 'Masaa matano', duration: '5 hours', price: 20, blurb: 'A full evening of streaming and gaming.', popular: true },
  { id: '24h', name: 'All-Day Pass', swahili: 'Siku nzima', duration: '24 hours', price: 50, blurb: 'All day and all night online.' },
  { id: '7d', name: 'Weekly Boss', swahili: 'Wiki nzima', duration: '7 days', price: 250, blurb: 'A whole week online, from Monday to Monday.' },
];

export const BUNDLE_PERKS = ['Unlimited data — no caps', 'Pay with M-Pesa', 'No app, no sign-up'];

/* ------------------------------------------------------------------ */
/* Where to find us                                                    */
/* ------------------------------------------------------------------ */

export const SPOT_AREAS = [
  { name: 'Rongai', status: 'live' as const },
  { name: 'Banana', status: 'live' as const },
  { name: 'Kiserian', status: 'live' as const },
];

export const VENUE_TYPES = [
  { title: 'Apartments & rentals', body: 'WiFi for tenants in blocks and rental homes.' },
  { title: 'Cafés & kibandas', body: 'Grab a chai, grab a bundle.' },
  { title: 'Bus & matatu stages', body: 'Waiting time becomes online time.' },
  { title: 'Hostels', body: 'Affordable WiFi for students and young workers.' },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const FAQS = [
  {
    q: 'How do I connect?',
    a: 'Turn on WiFi and join "DICE WIFI". The sign-in page opens by itself — tap your package, enter your phone number and tap PAY NOW. If the page does not open, visit any website and it will appear.',
  },
  {
    q: 'How do I pay?',
    a: 'With M-Pesa. After you tap PAY NOW, an M-Pesa prompt pops up on your phone — enter your PIN and wait about 30 seconds while the payment is confirmed. You are then online.',
  },
  {
    q: 'Is the data really unlimited?',
    a: 'Yes. Every package is time-based, not data-based — stream, download and video-call as much as you like until your time runs out.',
  },
  {
    q: 'Where is DICE WIFI available?',
    a: 'In Rongai, Banana and Kiserian — at apartments and rentals, cafés and kibandas, bus and matatu stages, and hostels. Look for "DICE WIFI" in your WiFi list.',
  },
  {
    q: 'I paid but I am not connected. What now?',
    a: 'Open the sign-in page and use "Reconnect account" — enter the M-Pesa code from your payment SMS (e.g. QAH9QWWZRR). Still stuck? Call or WhatsApp customer care on 0769 051 010.',
  },
];
