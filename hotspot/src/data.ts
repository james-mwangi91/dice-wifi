/* ------------------------------------------------------------------ */
/* Brand & contact                                                     */
/* ------------------------------------------------------------------ */

export const BRAND = {
  name: 'DICE Hotspot',
  ssid: 'DICE Hotspot',
  phone: '+254 700 000 000',
  phoneHref: 'tel:+254700000000',
  whatsappHref:
    'https://wa.me/254700000000?text=Hi%20DICE%20Hotspot%2C%20I%20have%20a%20question.',
  hostWhatsappHref:
    'https://wa.me/254700000000?text=Hi%20DICE%2C%20I%27d%20like%20to%20host%20a%20DICE%20Hotspot%20at%20my%20venue.',
  email: 'hotspot@dicewifi.co.ke',
  /* The home & business fibre site lives one level up on the same host */
  mainSite: '../',
};

/* ------------------------------------------------------------------ */
/* Images — Unsplash, HD, face-aware crops                             */
/* ------------------------------------------------------------------ */

/** Build an Unsplash URL at an exact size; `crop=faces` keeps people in frame */
export function unsplash(id: string, w: number, h: number, q = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces,center&w=${w}&h=${h}&q=${q}`;
}

/** srcset for a fixed aspect ratio, up to 2400px wide for sharp retina screens */
export function unsplashSet(id: string, ratio: number) {
  return [800, 1200, 1600, 2400].map((w) => `${unsplash(id, w, Math.round(w / ratio))} ${w}w`).join(', ');
}

export interface Slide {
  id: string;
  alt: string;
  tag: string;
  caption: string;
}

export const HERO_SLIDES: Slide[] = [
  {
    id: '1522529599102-193c0d76b5b6',
    alt: 'Smiling young man outdoors on a sunny day',
    tag: 'From KES 10',
    caption: 'An hour online costs less than a mandazi.',
  },
  {
    id: '1607748862156-7c548e7e98f4',
    alt: 'Group of friends laughing together on a staircase',
    tag: 'Stream together',
    caption: 'Unlimited data, so nobody has to ration the playlist.',
  },
  {
    id: '1563986768609-322da13575f3',
    alt: 'Person working on a laptop and phone in a café',
    tag: 'Work anywhere',
    caption: 'Cafés, stages and estates — your office is wherever the signal is.',
  },
  {
    id: '1531384441138-2736e62e0919',
    alt: 'Smiling man in glasses and a beret',
    tag: 'Pay with M-Pesa',
    caption: 'Pay, get your code by SMS, and you are on in seconds.',
  },
];

export const VENUE_IMAGES = {
  cafe: { id: '1495474472287-4d71bcdd2085', alt: 'Friends toasting with coffee cups at a café table' },
  shop: { id: '1556740738-b6a63e27c4df', alt: 'Shop owner serving a customer at a tablet till' },
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
  devices: number;
  blurb: string;
  popular?: boolean;
}

export const BUNDLES: Bundle[] = [
  { id: '1h', name: 'Quick', swahili: 'Saa moja', duration: '1 hour', price: 10, devices: 1, blurb: 'Check messages, send that CV, top up your playlist.' },
  { id: '3h', name: 'Chill', swahili: 'Masaa matatu', duration: '3 hours', price: 20, devices: 1, blurb: 'A movie, a match, or an afternoon of assignments.' },
  { id: '24h', name: 'Daily', swahili: 'Siku nzima', duration: '24 hours', price: 40, devices: 1, blurb: 'All day and all night, for less than a bus fare.', popular: true },
  { id: '7d', name: 'Weekly', swahili: 'Wiki nzima', duration: '7 days', price: 199, devices: 2, blurb: 'Phone and laptop online all week long.' },
  { id: '30d', name: 'Monthly', swahili: 'Mwezi mzima', duration: '30 days', price: 599, devices: 3, blurb: 'The whole month for the whole household.' },
];

export const BUNDLE_PERKS = ['Unlimited data — no caps', 'Speeds up to 10 Mbps', 'Pay with M-Pesa'];

/* ------------------------------------------------------------------ */
/* Where to find us                                                    */
/* ------------------------------------------------------------------ */

export const SPOT_AREAS = [
  { name: 'Nairobi CBD', status: 'live' as const },
  { name: 'Kahawa', status: 'live' as const },
  { name: 'Ruiru', status: 'live' as const },
  { name: 'Juja', status: 'live' as const },
  { name: 'Thika', status: 'live' as const },
  { name: 'Kiambu', status: 'live' as const },
  { name: 'Syokimau', status: 'soon' as const },
  { name: 'Kitengela', status: 'soon' as const },
];

export const VENUE_TYPES = [
  { title: 'Estates & apartments', body: 'Courtyards, blocks and gated communities.' },
  { title: 'Cafés & kibandas', body: 'Grab a chai, grab a bundle.' },
  { title: 'Bus & matatu stages', body: 'Waiting time becomes online time.' },
  { title: 'Campuses & hostels', body: 'Student hostels around Juja and Kahawa.' },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const FAQS = [
  {
    q: 'How do I connect?',
    a: 'Turn on WiFi and join the network called "DICE Hotspot". A page opens automatically — pick a bundle, pay with M-Pesa, and you are online. If the page does not open, visit any website and it will appear.',
  },
  {
    q: 'How do I pay?',
    a: 'Enter your M-Pesa number on the portal and confirm the STK push on your phone. Your access code also arrives by SMS so you can reconnect later or use it on another device.',
  },
  {
    q: 'Is the data really unlimited?',
    a: 'Yes. Every bundle is time-based, not data-based — stream, download and video-call as much as you like until your time runs out.',
  },
  {
    q: 'Can I use one bundle on two devices?',
    a: 'Weekly bundles cover 2 devices and Monthly bundles cover 3. Hourly and Daily bundles are for one device at a time.',
  },
  {
    q: 'What happens if I move to another DICE spot?',
    a: 'Your bundle follows you. Join "DICE Hotspot" at any of our locations and you are reconnected automatically for as long as your time lasts.',
  },
  {
    q: 'I paid but I am not connected. What now?',
    a: 'Reconnect to the WiFi and enter the code from your SMS. Still stuck? WhatsApp us your M-Pesa confirmation code and we will sort it out within minutes.',
  },
];
