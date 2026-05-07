export type ProductCategory =
  | 'Espresso Machine'
  | 'Grinder'
  | 'Milk Frother'
  | 'Pitcher'
  | 'Scale'
  | 'Milk Alternative'
  | 'Accessory';

export interface AffiliateLink {
  retailer:   string;
  url:        string;
  commission: number; // percentage, e.g. 4 = 4%
}

export interface Product {
  slug:               string;
  name:               string;
  brand:              string;
  category:           ProductCategory;
  priceRange:         string;          // display string, e.g. "$499"
  affiliateLinks:     AffiliateLink[];
  pros:               string[];
  cons:               string[];
  cappuccinoRating:   number;          // 1–10, specific to cappuccino-making
  whoItsFor:          string;
  reviewSlug?:        string;          // links to full gear/[slug] article
  heroImage?:         string;
}

export const products: Product[] = [
  {
    slug:             'breville-bambino-plus',
    name:             'Bambino Plus',
    brand:            'Breville',
    category:         'Espresso Machine',
    priceRange:       '$499',
    affiliateLinks:   [
      { retailer: 'Amazon',           url: 'https://amazon.com/dp/B07K2XBJRV', commission: 4 },
      { retailer: 'Williams-Sonoma',  url: 'https://williams-sonoma.com',       commission: 5 },
      { retailer: 'Breville',         url: 'https://breville.com',              commission: 5 },
    ],
    pros:  [
      'Heats up in 3 seconds',
      'Auto-purge after steaming keeps milk temp right',
      'Compact footprint for a machine with real steam pressure',
    ],
    cons:  [
      'Steam wand requires practice to texture properly',
      'Single boiler means you wait between espresso and steam',
    ],
    cappuccinoRating: 8,
    whoItsFor:        'The home barista who wants real espresso and milk work without a learning cliff.',
    reviewSlug:       'breville-bambino-plus-review',
  },
  {
    slug:             'gaggia-classic-pro',
    name:             'Classic Pro',
    brand:            'Gaggia',
    category:         'Espresso Machine',
    priceRange:       '$499',
    affiliateLinks:   [
      { retailer: 'Whole Latte Love', url: 'https://wholelattelove.com', commission: 8 },
      { retailer: 'Amazon',           url: 'https://amazon.com',         commission: 4 },
    ],
    pros:  [
      'Commercial 58mm portafilter — the same dimension as café machines',
      'Steam wand has the pressure to texture milk properly',
      'Endlessly modifiable; the most upgraded machine in home espresso',
    ],
    cons:  [
      'Stock steam tip is restrictive — most owners swap it within a month',
      'Single boiler with the usual wait between espresso and steam',
    ],
    cappuccinoRating: 8,
    whoItsFor:        'The buyer who wants a real entry into the hobby and is open to small modifications down the line.',
  },
  {
    slug:             'profitec-go',
    name:             'Go',
    brand:            'Profitec',
    category:         'Espresso Machine',
    priceRange:       '$1,099',
    affiliateLinks:   [
      { retailer: 'Clive Coffee',     url: 'https://clivecoffee.com',     commission: 8 },
      { retailer: 'Whole Latte Love', url: 'https://wholelattelove.com',  commission: 8 },
      { retailer: 'Prima Coffee',     url: 'https://prima-coffee.com',    commission: 7 },
    ],
    pros:  [
      'PID temperature control out of the box — pulls are repeatable',
      'Compact German-built single boiler with serious build quality',
      'Steam wand textures milk to café standard once warmed',
    ],
    cons:  [
      'Single boiler workflow — espresso, then switch, then steam',
      'No pre-infusion to speak of',
    ],
    cappuccinoRating: 8,
    whoItsFor:        'The buyer who wants prosumer build at a small footprint and is committed to the workflow.',
  },
  {
    slug:             'lelit-anna',
    name:             'Anna',
    brand:            'Lelit',
    category:         'Espresso Machine',
    priceRange:       '$799',
    affiliateLinks:   [
      { retailer: 'Whole Latte Love', url: 'https://wholelattelove.com', commission: 8 },
      { retailer: 'Clive Coffee',     url: 'https://clivecoffee.com',    commission: 8 },
    ],
    pros:  [
      'PID at this price is unusual and the temperature stability shows',
      'Italian build, simple service, parts are easy to source',
      'Steam pressure is genuine — not the watered-down kind in this tier',
    ],
    cons:  [
      'Steam wand is short; tall pitchers can be awkward',
      'No volumetric control — manual stop only',
    ],
    cappuccinoRating: 8,
    whoItsFor:        'The buyer choosing between Gaggia Classic Pro and a step up — the Anna is the step up.',
  },
  {
    slug:             'la-marzocco-linea-mini',
    name:             'Linea Mini',
    brand:            'La Marzocco',
    category:         'Espresso Machine',
    priceRange:       '$6,500',
    affiliateLinks:   [
      { retailer: 'Clive Coffee',     url: 'https://clivecoffee.com',     commission: 6 },
      { retailer: 'Seattle Coffee Gear', url: 'https://seattlecoffeegear.com', commission: 5 },
    ],
    pros:  [
      'Saturated group head — the same engineering as the café Linea',
      'Dual boiler steam delivery is effectively unlimited at home volume',
      'Built to outlive most kitchens',
    ],
    cons:  [
      'Price; this is the ceiling of home espresso, not the floor',
      'Counter footprint and warm-up time are real',
    ],
    cappuccinoRating: 10,
    whoItsFor:        "The buyer treating this as a kitchen appliance for the next twenty years, not a hobby tool.",
  },
  {
    slug:             'breville-barista-express',
    name:             'Barista Express',
    brand:            'Breville',
    category:         'Espresso Machine',
    priceRange:       '$699',
    affiliateLinks:   [
      { retailer: 'Amazon',           url: 'https://amazon.com/dp/B006MLQHRQ', commission: 4 },
      { retailer: 'Williams-Sonoma',  url: 'https://williams-sonoma.com',       commission: 5 },
    ],
    pros:  [
      'Integrated conical burr grinder removes one variable',
      'Dose-control grinding keeps workflow tight',
    ],
    cons:  [
      'Grinder is competent but not exceptional — serious cappuccino makers usually upgrade',
      'Steam wand less powerful than standalone machines in this price range',
    ],
    cappuccinoRating: 7,
    whoItsFor:        'Someone who wants one machine on the counter and is willing to trade some ceiling for convenience.',
  },
  {
    slug:             'rancilio-silvia-m',
    name:             'Silvia M',
    brand:            'Rancilio',
    category:         'Espresso Machine',
    priceRange:       '$799',
    affiliateLinks:   [
      { retailer: 'Whole Latte Love', url: 'https://wholelattelove.com',        commission: 8 },
      { retailer: 'Amazon',           url: 'https://amazon.com',                commission: 4 },
    ],
    pros:  [
      'Commercial-grade steam wand gives genuine barista-level milk texture',
      'Built to last a decade with basic maintenance',
      'Large boiler means consistent steam pressure throughout',
    ],
    cons:  [
      'Single boiler: 45-second wait between pulling and steaming',
      'No PID temperature control on base model',
    ],
    cappuccinoRating: 9,
    whoItsFor:        'The enthusiast who wants to learn real milk technique and is prepared to pay attention.',
  },
  {
    slug:             'fellow-opus',
    name:             'Opus',
    brand:            'Fellow',
    category:         'Grinder',
    priceRange:       '$195',
    affiliateLinks:   [
      { retailer: 'Fellow',   url: 'https://fellowproducts.com', commission: 8 },
      { retailer: 'Amazon',   url: 'https://amazon.com',         commission: 4 },
    ],
    pros:  [
      'Covers espresso through coarse brew in one grinder',
      'Anti-static coating reduces grind retention',
      'Compact and quiet for home use',
    ],
    cons:  [
      'Espresso range requires fine adjustment — the dial is wide',
      'Not the last grinder you\'ll buy if you go deep on espresso',
    ],
    cappuccinoRating: 7,
    whoItsFor:        'The one-grinder household that pulls espresso but also brews other methods.',
  },
  {
    slug:             'eureka-mignon-silenzio',
    name:             'Mignon Silenzio',
    brand:            'Eureka',
    category:         'Grinder',
    priceRange:       '$345',
    affiliateLinks:   [
      { retailer: 'Whole Latte Love', url: 'https://wholelattelove.com', commission: 8 },
      { retailer: 'Prima Coffee',     url: 'https://prima-coffee.com',   commission: 7 },
    ],
    pros:  [
      'Whisper-quiet — genuinely unobtrusive in a home kitchen',
      'Stepless micrometric adjustment makes dialling in repeatable',
      'Flat burrs produce an even grind that espresso benefits from',
    ],
    cons:  [
      'Espresso-only — don\'t buy this for batch brewing',
      'Doserless design spills occasionally without a good workflow',
    ],
    cappuccinoRating: 9,
    whoItsFor:        'The home barista pairing a mid-range espresso machine with a serious grinder.',
  },
  {
    slug:             'subminimal-nanofoamer-pro',
    name:             'NanoFoamer Pro',
    brand:            'Subminimal',
    category:         'Milk Frother',
    priceRange:       '$79',
    affiliateLinks:   [
      { retailer: 'Subminimal', url: 'https://subminimal.com', commission: 10 },
      { retailer: 'Amazon',     url: 'https://amazon.com',     commission: 4  },
    ],
    pros:  [
      'Produces genuinely texured milk — not the airy foam of cheaper wands',
      'No machine required: works with any heat source',
      'Compact and cheap enough to keep at work',
    ],
    cons:  [
      'Two-hand workflow requires practice',
      'Cannot replicate the texture of a proper steam wand at high volume',
    ],
    cappuccinoRating: 6,
    whoItsFor:        'The espresso machine owner without steam, or someone testing milk technique before upgrading.',
  },
  {
    slug:             'motta-europa-pitcher',
    name:             'Europa Pitcher 350ml',
    brand:            'Motta',
    category:         'Pitcher',
    priceRange:       '$22',
    affiliateLinks:   [
      { retailer: 'Whole Latte Love', url: 'https://wholelattelove.com', commission: 8 },
      { retailer: 'Amazon',           url: 'https://amazon.com',         commission: 4 },
    ],
    pros:  [
      'Industry-standard spout shape for controlled pours',
      '350ml is the right size for a single cappuccino',
      'Stainless construction conducts heat correctly during steaming',
    ],
    cons:  [
      'No handle insulation — gets hot during aggressive steaming',
    ],
    cappuccinoRating: 9,
    whoItsFor:        'Anyone making cappuccino. This is the standard.',
  },
  {
    slug:             'acaia-lunar',
    name:             'Lunar Scale',
    brand:            'Acaia',
    category:         'Scale',
    priceRange:       '$229',
    affiliateLinks:   [
      { retailer: 'Acaia',  url: 'https://acaia.co', commission: 8 },
      { retailer: 'Amazon', url: 'https://amazon.com', commission: 4 },
    ],
    pros:  [
      'Responds in real time — no lag between pour and reading',
      'Water-resistant for the portafilter drip environment',
      'Auto-tare and flow-rate mode in the app',
    ],
    cons:  [
      "Price is hard to justify until you've used one",
      'Battery life shorter than competitors',
    ],
    cappuccinoRating: 9,
    whoItsFor:        'The dialler-in who wants shot-to-shot consistency and doesn\'t want to guess yield.',
  },
  {
    slug:             'oatly-barista-edition',
    name:             'Barista Edition Oat Milk',
    brand:            'Oatly',
    category:         'Milk Alternative',
    priceRange:       '$5/carton',
    affiliateLinks:   [],
    pros:  [
      'Froths to microfoam without separation — most oat milks can\'t do this',
      'Neutral sweetness that doesn\'t compete with the espresso',
      'Widely available',
    ],
    cons:  [
      'Fat and protein profile still produces a thinner texture than whole milk',
      'Some batches vary — inconsistency is real',
    ],
    cappuccinoRating: 8,
    whoItsFor:        'The dairy-free cappuccino drinker who isn\'t willing to compromise on texture.',
  },
  {
    slug:             'urnex-cafiza-tabs',
    name:             'Cafiza Cleaning Tabs',
    brand:            'Urnex',
    category:         'Accessory',
    priceRange:       '$15',
    affiliateLinks:   [
      { retailer: 'Amazon',           url: 'https://amazon.com',         commission: 4 },
      { retailer: 'Whole Latte Love', url: 'https://wholelattelove.com', commission: 8 },
    ],
    pros:  [
      'The standard backflush detergent — used in cafés worldwide',
      'One tab per backflush, a tube lasts a year of weekly cleaning',
    ],
    cons:  [
      'Only relevant on machines with a three-way solenoid (most prosumer)',
    ],
    cappuccinoRating: 8,
    whoItsFor:        'Anyone with a three-way solenoid machine — which is most home prosumer.',
  },
  {
    slug:             'normcore-tamper-v4',
    name:             '58.35mm Tamper V4',
    brand:            'Normcore',
    category:         'Accessory',
    priceRange:       '$45',
    affiliateLinks:   [
      { retailer: 'Amazon',     url: 'https://amazon.com',     commission: 4 },
      { retailer: 'Normcore',   url: 'https://normcorec.com',   commission: 8 },
    ],
    pros:  [
      'Spring-loaded calibrated pressure removes tamp inconsistency',
      '58.35mm fits most commercial baskets snugly',
      'Solid build for the price',
    ],
    cons:  [
      'Spring mechanism can feel odd at first',
    ],
    cappuccinoRating: 8,
    whoItsFor:        'Anyone who wants to remove tamp pressure as a variable without spending $150 on a Decent.',
  },
];

export const productsBySlug = Object.fromEntries(products.map(p => [p.slug, p]));
