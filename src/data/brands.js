/* Single source of truth for both sides of the store.
   Copy is ported verbatim from the original single-file build — don't rewrite it. */

export const FREE_SHIP = 60;
export const PAIR_DISCOUNT = 10;
export const SIZES = ['S', 'M', 'L', 'XL', '2XL'];
export const SOLD_OUT_SIZES = ['2XL'];

/* ================= colorways ================= */
export const GARMENTS = {
  b: {
    'white':      { fill: '#FCFCFC', stroke: '#E2E5EA', main: '#101114', accent: '#2F6BFF', sub: '#8B9099' },
    'black':      { fill: '#101114', stroke: null,      main: '#FFFFFF', accent: '#BCD0FF', sub: '#C4CAD4' },
    'trial blue': { fill: '#2F6BFF', stroke: null,      main: '#FFFFFF', accent: '#DCE8FF', sub: '#D3E0FF' },
  },
  g: {
    'white':      { fill: '#FCFCFC', stroke: '#E2E5EA', main: '#101114', accent: '#F0338A', sub: '#8B9099' },
    'black':      { fill: '#101114', stroke: null,      main: '#FFFFFF', accent: '#FFAFD2', sub: '#C4CAD4' },
    'trial pink': { fill: '#F0338A', stroke: null,      main: '#FFFFFF', accent: '#FFDCEC', sub: '#FFD0E4' },
  },
};

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
        colors: ['white', 'black', 'trial blue'], images: {} },
      { id: 'b-expired', name: 'trial expired tee', price: 30,
        lines: ['trial expired'], tag: "(she didn't renew)",
        blurb: 'for the ones who got downgraded. wear it with dignity or without, your call.',
        colors: ['white', 'black'], images: {},
        prints: { 'black': '/prints/bf-expired.png' } },
      { id: 'b-premium', name: 'upgrade to premium tee', price: 30,
        lines: ['upgrade to', 'premium'], tag: "(i'll fold the laundry)",
        blurb: 'the paid tier. same cotton, better attitude, folds things without being asked.',
        colors: ['white', 'black', 'trial blue'], images: {},
        prints: { 'black': '/prints/bf-upgrade.png' } },
      { id: 'b-terms', name: 'terms & conditions tee', price: 30, flag: '2 for $50',
        lines: ['terms &', 'conditions'], tag: "(i'll listen to the whole story)",
        blurb: 'nobody reads them. this one you can.',
        colors: ['white', 'black'], images: {},
        prints: { 'white': '/prints/bf-terms.png' } },
      { id: 'b-taken', name: 'boyfriend ✓ tee', price: 30, flag: 'new', taken: true,
        lines: ['boyfriend'], tag: "(i'm taken)",
        blurb: 'the checkmark does the talking. black only — the badge only reads right on dark.',
        colors: ['black'], images: {},
        prints: { 'black': '/prints/bf-taken.png' } },
      { id: 'b-stickers', name: 'sticker pack (7)', price: 12, flag: 'new', sticker: true,
        lines: ['7 stickers'], tag: '(the whole trial)',
        blurb: 'all seven: lockup, no card required, trial expired stamp, 0% renewal, cancel anytime, 7 days left, terms bumper. weatherproof vinyl.',
        colors: ['white'], images: {} },
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
        colors: ['white', 'black', 'trial pink'], images: {},
        prints: { 'black': '/prints/gf-lockup-dark.png', 'trial pink': '/prints/gf-lockup-pink.png' } },
      { id: 'g-expired', name: 'trial expired tee', price: 30,
        lines: ['trial expired'], tag: "(he didn't renew)",
        blurb: 'downgraded, not defeated. still the best tier they had.',
        colors: ['white', 'black'], images: {} },
      { id: 'g-premium', name: 'upgrade to premium tee', price: 30,
        lines: ['upgrade to', 'premium'], tag: "(i'll pick the restaurant)",
        blurb: 'the paid tier. decisive, on time, already made the reservation.',
        colors: ['white', 'black', 'trial pink'], images: {} },
      { id: 'g-terms', name: 'terms & conditions tee', price: 30, flag: '2 for $50',
        lines: ['terms &', 'conditions'], tag: "(i said i'm fine)",
        blurb: 'the shortest terms ever written. still legally binding.',
        colors: ['white', 'black'], images: {} },
      { id: 'g-taken', name: 'girlfriend ✓ tee', price: 30, flag: 'new', taken: true,
        lines: ['girlfriend'], tag: "(i'm taken)",
        blurb: 'the checkmark does the talking. black only — the badge only reads right on dark.',
        colors: ['black'], images: {},
        prints: { 'black': '/prints/gf-taken.png' } },
      { id: 'g-stickers', name: 'sticker pack (7)', price: 12, flag: 'new', sticker: true,
        lines: ['7 stickers'], tag: '(the whole trial)',
        blurb: 'all seven in pink: lockup, no card required, trial expired stamp, read receipts, cancel anytime, 7 days left, terms bumper. weatherproof vinyl.',
        colors: ['white'], images: {} },
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
