# free trial

Two-sided storefront (boyfriend / girlfriend) for the *free trial* shirt brand.
Ported from the original single-file `free-trial-site.html` to Vite + React with
the visual design, copy, and behavior preserved.

```bash
npm install
npm run dev
```

## Layout

```
src/
  data/brands.js      BRANDS / GARMENTS / SIZES — single source of truth for copy + catalog
  data/variants.js    Shopify variant IDs, one per product|color|size (empty until you fill them)
  context/CartContext cart state, localStorage persistence, pair discount, free-ship math
  context/UIContext   toast + size guide modal
  lib/shopify.js      Storefront API cartCreate
  components/         Header, BrandToggle, Hero, StatsStrip, ProductGrid, CartDrawer,
                      SizeGuideModal, Footer, ShirtArt, ProductImage, …
  pages/              Home, Shop, ProductPage, FAQ, About
  styles/global.css   the original stylesheet, unchanged
public/               brand kit, shirt prints, stickers, preview sheets
docs/                 launch content (TikTok/IG/email/SMS) and the original handoff
```

## Things that were deliberate

**Routing.** `BrowserRouter` on the URL shapes from the handoff — `/b/shop`,
`/g/product/g-lockup`. The old hash links (`#/b/shop`) still work: `src/main.jsx`
rewrites them to the path form before the router reads location, so anything
already shared in a group chat or printed on a card keeps resolving.
`vercel.json` has the SPA rewrite that makes deep links work on refresh.

**Light-mode lock.** `<meta name="color-scheme" content="light only">` and the
`!important` background declarations are load-bearing — iOS in-app browsers
(Instagram, TikTok) force dark mode and wreck the page without them. Don't
"clean up" those `!important`s.

**Product art.** `ProductImage` renders a real photo when
`product.images[color]` has a path and falls back to the SVG mockup otherwise —
including when the photo 404s. Add photos to `public/` and reference them per
colorway as they get shot; no code change needed.

**Side switching.** The toggle holds your place: `/b/shop` → `/g/shop`. On a
product page it appears to do nothing, because a product only lives on one side
and the route canonicalises back. That matches the original's behavior.

## Going live

Steps marked **(you)** need accounts and payment details.

1. **(you)** Buy the domain. `freetrial.shop` was the pick; grab
   `freetrialboyfriend.com` too and 301 it over.
2. **(you)** Create the Shopify store (Basic is the cheapest plan with a real checkout).
3. **(you)** Connect Printful, upload the print files from `public/shirt-prints/`,
   create the variants. Do this before touching code — you need the variant IDs.
4. **(you)** Generate a Storefront API token: Settings → Apps → Develop apps →
   Storefront API. Copy `.env.example` to `.env` and fill it in.
5. Paste the variant IDs into `src/data/variants.js`. Every sellable combination
   needs one. Checkout refuses to run and names the missing key rather than
   silently dropping a line item.
6. **(you)** Set up the pair discount in Shopify — see below.
7. **(you)** Push to GitHub, connect the repo to Vercel, point the domain at it.
   Add the `VITE_*` env vars in the Vercel project settings.
8. **(you)** Place one real test order end to end. Cancel and refund it yourself.

### The pair discount needs a Shopify counterpart

The $10 pair discount is priced **in this app**. Shopify knows nothing about it,
so if you do nothing, the cart shows $50 and the customer gets charged $60.

Two ways to close that gap:

- **Automatic discount (preferred).** Create one in Shopify admin that fires when
  one lockup tee from each side is in the cart. Nothing to configure here.
- **Discount code.** Create the code, then set `VITE_SHOPIFY_PAIR_DISCOUNT_CODE`
  and `src/lib/shopify.js` applies it when the discount is active.

Either way, verify it with a real test order. This is the only pricing logic on
the site, so it's the only thing that can undercharge you.

## Before you flip it on

- **Replace the review quotes** in `src/data/brands.js` (`quotes` on each side).
  They're placeholder copy with invented cities. Fake reviews are an FTC problem.
- **Shoot real product photos.** One flat-lay and one on-body shot per design.
  The SVG mockups are good enough to design against, not to sell with.
- **Wire the email capture.** `Signup.jsx` validates the format and drops it.
  Right now signups go nowhere.
- **Check the light-mode lock on a real phone** by opening the live URL from an
  Instagram DM. That's the path most traffic takes, and the one that broke before.
