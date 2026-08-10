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
**shopnexp.com**, and checkout points at the existing **nexp-5** store. The
connection is verified end to end — `cartCreate` returns a live checkout on
`checkout.shopnexp.com` and the site's own checkout button lands there.

What's left:

1. **(you)** Create the five missing products. Only `NEXP Free Trial Boyfriend
   Tee` exists on nexp-5; `trial expired`, `boyfriend ✓`, `free trial
   girlfriend`, `subscribe now` and `girlfriend ✓` are not there.

   If you made them in Printful, they still have to be **pushed to Shopify and
   published to the sales channel this app's Storefront token can read**. A
   product that is only a draft, or published to Online Store but not to the
   custom app, is invisible here — which is exactly what the API reports today.
   `npm run sync-variants` tells you what the token can actually see.

2. Map them. Add each new handle to `HANDLES` in `tools/sync-variants.mjs`, then:

   ```
   npm run sync-variants            # report only
   npm run sync-variants -- --write # regenerate src/data/variants.js
   ```

   The script reads ids off the live store, checks every price against the site,
   and lists store handles no catalog product has claimed. Matching is by
   explicit handle and never by name — an earlier fuzzy version bound
   `boyfriend ✓ tee` to the free trial boyfriend product because both titles
   contain "boyfriend", which would have shipped the wrong shirt on every order.

3. **(you)** Set up the pair discount in Shopify — see below.
4. **(you)** In Vercel, point shopnexp.com at this repo instead of the old one.
   The old deployment can be taken down; the code stays on GitHub.
5. **(you)** Place one real test order end to end. Cancel and refund it yourself.

### The pair discount needs a Shopify counterpart

The $10 pair discount is priced **in this app**. Shopify knows nothing about it,
so if you do nothing, the cart shows $50 and the customer gets charged $60.

It can now fire **more than once**: `PAIR_SETS` in `brands.js` defines the trial
pair and the verified pair, and each matched set takes its own $10. Four shirts
that complete both pairs discount $20. Whatever you build in Shopify has to be
per-matched-pair, not a flat $10 per order.

Two ways to close the gap:

- **Automatic discount (preferred).** Create one in Shopify admin that fires per
  matching pair. Nothing to configure here.
- **Discount code.** Create the code, set `VITE_SHOPIFY_PAIR_DISCOUNT_CODE`, and
  `src/lib/shopify.js` applies it whenever a pair discount is active.

Either way, verify it with a real test order. This is the only pricing logic on
the site, so it's the only thing that can undercharge you.

### Sizes and prices come from Shopify

`PLUS_SIZE_UPCHARGE` in `brands.js` mirrors the live variants: 2XL is $32
against a $30 base, and 3XL–5XL run $34/$36/$38. If you change a price in
Shopify, change it here too — `npm run sync-variants` flags any disagreement.

The site sells S–2XL. Shopify also carries **3XL, 4XL and 5XL**, plus **White**
on the boyfriend lockup. They're left off because the size guide has no
measurements above XL and there is no white mockup. Supply either and they can
be listed.

## Before you flip it on

- ~~Replace the review quotes~~ — the invented ones are gone. `quotes` is empty
  on both sides in `src/data/brands.js` and the strip renders nothing until you
  add real ones as `[quote, attribution]`.
- ~~Replace the spotted wall placeholders~~ — also gone. `src/data/spotted.js`
  is empty and the section shows a call for the first photo instead of a grid
  of invented customers. Add real submissions and the wall renders itself.
- **Shoot real product photos.** One flat-lay and one on-body shot per design.
  The SVG mockups are good enough to design against, not to sell with.
- ~~Add `public/share.jpg`~~ — done, 1200×630, generated from the real mockups.
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
