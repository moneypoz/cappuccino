export type PartnerTier     = 'featured' | 'listed';
export type PartnerCategory = 'Roaster' | 'Machine' | 'Accessory' | 'Subscription' | 'Education';

export interface Partner {
  tier:        PartnerTier;
  name:        string;
  descriptor:  string;   // one sentence, ~12 words max
  category:    PartnerCategory;
  url:         string;   // base affiliate/partner URL — tracking params appended at render
  slug:        string;   // used for ?partner= tracking param
  live:        boolean;  // false = staged, excluded from render
}

export const partners: Partner[] = [
  // ── Featured (one only) ───────────────────────────────────────────────────
  {
    tier:       'featured',
    name:       'Onyx Coffee Lab',
    descriptor: 'Precision-roasted specialty coffee shipped from Rogers, Arkansas.',
    category:   'Roaster',
    url:        'https://onyxcoffeelab.com',
    slug:       'onyx-coffee-lab',
    live:       true,
  },

  // ── Listed ────────────────────────────────────────────────────────────────
  {
    tier:       'listed',
    name:       'Sey Coffee',
    descriptor: 'Small-batch roasting in Bushwick, focused on traceable single origins.',
    category:   'Roaster',
    url:        'https://seycoffee.com',
    slug:       'sey-coffee',
    live:       true,
  },
  {
    tier:       'listed',
    name:       'Sump Coffee',
    descriptor: 'St. Louis roaster known for meticulous sourcing and restrained roast profiles.',
    category:   'Roaster',
    url:        'https://sumpcoffee.com',
    slug:       'sump-coffee',
    live:       true,
  },
  {
    tier:       'listed',
    name:       'Passenger Coffee',
    descriptor: 'Lancaster, Pennsylvania roaster with a particular focus on washed Ethiopians.',
    category:   'Roaster',
    url:        'https://passengercoffee.com',
    slug:       'passenger-coffee',
    live:       true,
  },
  {
    tier:       'listed',
    name:       'Acaia',
    descriptor: 'Precision scales built for espresso and pour-over workflows.',
    category:   'Accessory',
    url:        'https://acaia.co',
    slug:       'acaia',
    live:       true,
  },
  {
    tier:       'listed',
    name:       'Fellow',
    descriptor: 'Kettles, grinders, and canisters designed around how coffee is actually used.',
    category:   'Accessory',
    url:        'https://fellowproducts.com',
    slug:       'fellow',
    live:       true,
  },
  {
    tier:       'listed',
    name:       'Weber Workshops',
    descriptor: 'Hand-built burr grinders made in small runs for people who notice the difference.',
    category:   'Accessory',
    url:        'https://weberworkshops.com',
    slug:       'weber-workshops',
    live:       true,
  },
  {
    tier:       'listed',
    name:       'Timemore',
    descriptor: 'Hand grinders and gooseneck kettles designed for the home brewing ritual.',
    category:   'Machine',
    url:        'https://www.timemore.com',
    slug:       'timemore',
    live:       true,
  },
  {
    tier:       'listed',
    name:       'Option-O',
    descriptor: 'Flat-burr espresso grinders engineered for repeatability at the home scale.',
    category:   'Machine',
    url:        'https://option-o.com',
    slug:       'option-o',
    live:       true,
  },
  {
    tier:       'listed',
    name:       'Trade Coffee',
    descriptor: 'A subscription that learns your taste and sources from top roasters.',
    category:   'Subscription',
    url:        'https://www.tradecoffee.com',
    slug:       'trade-coffee',
    live:       true,
  },
];

export const featuredPartner = partners.find(p => p.live && p.tier === 'featured');
export const listedPartners  = partners.filter(p => p.live && p.tier === 'listed');

/** Appends UTM-style tracking params to an outbound partner URL. */
export function trackUrl(url: string, slug: string): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}ref=cappuccino&partner=${slug}`;
}
