/* Single source of truth for both sides of the store.
   Copy is ported verbatim from the original single-file build — don't rewrite it. */

export const FREE_SHIP = 60;
export const PAIR_DISCOUNT = 10;
export const SIZES = ['S', 'M', 'L', 'XL', '2XL'];

/* Nothing is disabled any more. 2XL was hard-coded as sold out back when the
   catalog was a mock; the live Shopify product has every size in stock. */
export const SOLD_OUT_SIZES = [];

/* Plus sizes cost more to print, and the Shopify variants are already priced
   that way — 2XL is $32 against a $30 base. Read straight off the live store;
   if you change it there, change it here or the cart quotes the wrong total. */
export const PLUS_SIZE_UPCHARGE = { '2XL': 2, '3XL': 4, '4XL': 6, '5XL': 8 };

export const sizePrice = (product, size) => product.price + (PLUS_SIZE_UPCHARGE[size] || 0);

/* ================= colorways =================
   These are the real Gildan/unisex-classic-tee colours carried by Printful, and
   every `fill` was sampled off the actual mockup photograph rather than picked
   by eye, so a swatch dot matches the garment beside it. The earlier "trial
   blue" and "trial pink" are gone — they looked good but no printer stocks
   them, so nothing in that colour could ever have shipped. */
const SHELL = {
  'white':          { fill: '#F2F1EF', stroke: '#E2E5EA', light: true },
  'black':          { fill: '#1A1919', stroke: null },
  'charcoal':       { fill: '#605F5D', stroke: null },
  'navy':           { fill: '#1F2631', stroke: null },
  'royal':          { fill: '#1D53AB', stroke: null },
  'maroon':         { fill: '#430A20', stroke: null },
  'forest green':   { fill: '#1F3A26', stroke: null },
  'dark heather':   { fill: '#4D4D4D', stroke: null },
  'military green': { fill: '#737961', stroke: null },
};

/* Ink colours for the drawn fallback mockup, which is still what renders for
   any product that has no photography yet. */
const INK = {
  b: { onLight: '#2F6BFF', onDark: '#BCD0FF' },
  g: { onLight: '#F0338A', onDark: '#FFAFD2' },
};

const garmentsFor = (side) => Object.fromEntries(
  Object.entries(SHELL).map(([name, s]) => [name, {
    fill: s.fill,
    stroke: s.stroke,
    main: s.light ? '#101114' : '#FFFFFF',
    accent: s.light ? INK[side].onLight : INK[side].onDark,
    sub: s.light ? '#8B9099' : '#C4CAD4',
  }]),
);

export const GARMENTS = { b: garmentsFor('b'), g: garmentsFor('g') };

/** Build an images map for a product that has a full mockup set. */
const mockups = (id, colors) => Object.fromEntries(
  colors.map((c) => [c, `/mockups/${id}/${c.replace(/ /g, '-')}.webp`]),
);

const TEE_COLORS = ['black', 'charcoal', 'forest green', 'maroon', 'navy', 'royal'];
const EXPIRED_COLORS = [...TEE_COLORS, 'white'];
const LOCKUP_COLORS = ['black', 'charcoal', 'dark heather', 'forest green', 'maroon', 'military green', 'navy', 'royal'];
/* Only two colourways came back photographed for the boyfriend lockup so far. */
const B_LOCKUP_COLORS = ['black', 'maroon'];

/* Every product listed below is photographed. Designs without a mockup —
   upgrade to premium, terms & conditions, the girlfriend expired tee, and both
   sticker packs — are deliberately out of the catalog rather than sitting in
   the grid as drawn placeholders. Add them back with their `images` map the
   day the mockups exist; nothing else needs to change. */

/* Cross-side pairs that earn the discount. Both halves must be in the cart. */
export const PAIR_SETS = [
  { label: 'the trial pair', audience: 'for singles', b: 'b-lockup', g: 'g-lockup' },
  { label: 'the verified pair', audience: 'for couples', b: 'b-taken', g: 'g-taken' },
];

/* ================= brands ================= */
export const BRANDS = {
  b: {
    key: 'b', word: 'boyfriend', accent: '#2F6BFF', soft: '#DCE8FF',
    ticker: 'free shipping over $60 — trial ends when the shirt wears out',
    heroBadge: 'no card required',
    heroLine: 'seven days of holding bags, opening jars, and pretending to like her show. cancel anytime. he will not take it well.',
    stats: [['7 <em>days</em>', 'trial length'], ['$0', 'upfront'], ['1 <em>text</em>', 'to cancel'], ['0%', 'renewal rate']],
    plan: [['opens the jar', 'included'], ['holds the bag', 'included'], ['drives at 2am', 'included'],
           ['likes her friends', 'included'], ['texts back fast', 'beta'], ['talks about feelings', 'coming soon']],
    crossHead: 'looking for the other tier?',
    crossLine: 'the girlfriend trial has its own terms. same cotton, different complaints.',
    aboutLede: 'a streetwear brand written like a pricing page.',
    about: ['free trial boyfriend started as one line on one shirt. the idea is simple: everything in your life is a subscription now, so why not the guy holding your bag at target.',
            "every design is a straight statement with a punchline in parentheses. front print, no logo on the back, nothing that needs explaining. if it needs explaining, it doesn't get made.",
            "drops are produced once and not restocked. that's not a scarcity tactic — it's a one-person operation printing what it can actually ship."],
    quotes: [['bought it as a joke. he wears it four days a week.', 'verified — dallas, tx'],
             ['my boyfriend read the hang tag out loud in the car.', 'verified — tampa, fl'],
             ['three people at the gym asked where i got it.', 'verified — columbus, oh']],
    products: [
      { id: 'b-lockup', name: 'free trial boyfriend tee', price: 30, was: 38, flag: 'best seller',
        lines: ['free trial', 'boyfriend'], tag: '(cancel anytime)',
        blurb: 'heavyweight cotton, boxy fit. front print, small badge on the back. he comes with the shirt.',
        colors: B_LOCKUP_COLORS, images: mockups('b-lockup', B_LOCKUP_COLORS) },
      { id: 'b-expired', name: 'trial expired tee', price: 30,
        lines: ['trial expired'], tag: "(she didn't renew)",
        blurb: 'for the ones who got downgraded. wear it with dignity or without, your call.',
        colors: EXPIRED_COLORS, images: mockups('b-expired', EXPIRED_COLORS) },
      { id: 'b-taken', name: 'boyfriend ✓ tee', price: 30, flag: 'new', taken: true,
        lines: ['boyfriend'], tag: "(i'm taken)",
        blurb: 'the checkmark does the talking. six colourways, all dark — the badge needs a deep ground to read.',
        colors: TEE_COLORS, images: mockups('b-taken', TEE_COLORS) },
    ],
  },
  g: {
    key: 'g', word: 'girlfriend', accent: '#F0338A', soft: '#FFDCEC',
    ticker: 'free shipping over $60 — she saw this ticker three days ago',
    heroBadge: 'no card required',
    heroLine: "seven days of stealing your hoodie, picking the restaurant, and asking what you're thinking about. cancel anytime. she already knows.",
    stats: [['7 <em>days</em>', 'trial length'], ['$0', 'upfront'], ['0 <em>secrets</em>', 'kept from her'], ['100%', 'read receipts']],
    plan: [['picks the restaurant', 'included'], ['steals the hoodie', 'included'], ['remembers everything', 'included'],
           ['reads the receipts', 'included'], ['says "i\'m fine"', 'beta'], ["says what's actually wrong", 'coming soon']],
    crossHead: 'looking for the other tier?',
    crossLine: 'the boyfriend trial has its own terms. same cotton, different complaints.',
    aboutLede: 'the other half of the pricing page.',
    about: ["free trial girlfriend runs on the same joke from the other side. everything is a subscription, so here's the tier where she picks the restaurant and remembers what you said in march.",
            'same rules as the boyfriend line: one statement, one parenthetical, front print only. the punchline lands on the person wearing it, never on anyone else.',
            "drops are produced once and not restocked. buy the pair if you're that couple."],
    quotes: [['wore it to brunch and started an argument. worth it.', 'verified — phoenix, az'],
             ['the "i said i\'m fine" one is too accurate to be legal.', 'verified — nashville, tn'],
             ['got the pair. we are insufferable now.', 'verified — miami, fl']],
    products: [
      { id: 'g-lockup', name: 'free trial girlfriend tee', price: 30, was: 38, flag: 'best seller',
        lines: ['free trial', 'girlfriend'], tag: '(cancel anytime)',
        blurb: 'heavyweight cotton, boxy fit. front print, small badge on the back. she comes with the shirt.',
        colors: LOCKUP_COLORS, images: mockups('g-lockup', LOCKUP_COLORS) },
      { id: 'g-subscribe', name: 'subscribe now tee', price: 30, flag: 'new',
        lines: ['subscribe now'], tag: '(auto-renews monthly)',
        blurb: 'the trial converted itself. no confirmation email, no cancellation window, no way out.',
        colors: TEE_COLORS, images: mockups('g-subscribe', TEE_COLORS) },
      { id: 'g-taken', name: 'girlfriend ✓ tee', price: 30, flag: 'new', taken: true,
        lines: ['girlfriend'], tag: "(i'm taken)",
        blurb: 'the checkmark does the talking. six colourways, all dark — the badge needs a deep ground to read.',
        colors: TEE_COLORS, images: mockups('g-taken', TEE_COLORS) },
    ],
  },
};

export const SIDES = ['b', 'g'];
export const isSide = (k) => k === 'b' || k === 'g';
export const otherSide = (k) => (k === 'b' ? 'g' : 'b');

/** Find a product by id across both sides. Returns { p, side } or null. */
export function findProduct(id) {
  for (const k of SIDES) {
    const hit = BRANDS[k].products.find((p) => p.id === id);
    if (hit) return { p: hit, side: k };
  }
  return null;
}
