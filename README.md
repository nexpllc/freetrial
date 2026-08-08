# free trial

Two-sided storefront (boyfriend / girlfriend) for the *free trial* shirt brand.
Ported from the original single-file `free-trial-site.html` to Vite + React with
the visual design, copy, and behavior preserved.

**This is what goes on shopnexp.com.** The previous Shop Nexp site is preserved
at `github.com/nexpllc/shopnexp` and can be redeployed any time — nothing about
this repo destroys it.

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

**Accent theming is an attribute, not a JS-written variable.** `<html>` carries
`data-side="b"` or `"g"`, and the accent pair is defined per-side in CSS.
Writing `--accent` from JS looks like it works and doesn't: Chromium freezes a
declaration whose value is `var(--x)` when a transition is declared on that same
property and `--x` later changes on an ancestor, so the ticker, the toggle pill
and both wordmarks kept the boyfriend blue on the girlfriend side. The
accent-driven declarations therefore have `transition:none` (see the fix block
at the bottom of `global.css`). Hover transitions are untouched. If you add a
new accent-coloured element, don't put a transition on that property.

## Going live

Steps marked **(you)** need accounts and payment details.

The domain and the Shopify store are already handled: this ships to
**shopnexp.com**, and checkout points at the existing **nexp-5** store, whose
Storefront token is already live. That removes four steps from the original
plan. What's left:

1. **(you)** Add the 10 free trial products to nexp-5 as their own collection,
   and connect them to Printful using the print files in `public/shirt-prints/`.
2. Paste the variant IDs into `src/data/variants.js`. Every sellable combination
   needs one. Checkout refuses to run and names the missing key rather than
   silently dropping a line item.
3. **(you)** Set up the pair discount in Shopify — see below.
4. **(you)** In Vercel, point shopnexp.com at this repo instead of the old one.
   The old deployment can be taken down; the code stays on GitHub.
5. **(you)** Place one real test order end to end. Cancel and refund it yourself.

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
- **Replace the spotted wall placeholders** in `src/data/spotted.js`. Same
  problem as the quotes — invented customers. Real submissions come in through
  the form; until then the tiles read "pending", which is honest.
- **Shoot real product photos.** One flat-lay and one on-body shot per design.
  The SVG mockups are good enough to design against, not to sell with.
- **Add `public/share.jpg`** at 1200×630. The og:image tag already points at it.
- **Read the legal docs** in `src/data/legal.js` before they go live. They were
  adapted from the Shop Nexp versions and describe how this store actually
  operates, but they are not a lawyer's work.
- **Check the light-mode lock on a real phone** by opening the live URL from an
  Instagram DM. That's the path most traffic takes, and the one that broke before.

## What came over from Shop Nexp

Contact form and spotted submissions both deliver through Web3Forms to the same
inbox the nexp store used. The list signup writes to Shopify with
`customerCreate` and marketing consent — the same call the old site made, so
subscribers land in one place. Security headers, share tags and Vercel Analytics
carried over as-is. Everything was restyled into the b/g design language rather
than pasted in; there is no green field-department styling anywhere in here.
