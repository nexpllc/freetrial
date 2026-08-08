# Free Trial — handoff to Claude Code

## What you have

`free-trial-site.html` — a complete, working single-file storefront. No build step, no dependencies except the Poppins webfont. Open it in a browser and everything works except checkout.

**Already built:**
- Two-sided store (boyfriend / girlfriend) with a header toggle
- Hash routing: `#/b/`, `#/b/shop`, `#/b/product/b-lockup`, `#/b/faq`, `#/b/about`, and the `#/g/` equivalents
- 10 products (5 per side) rendered from a single `BRANDS` object
- Cart drawer with quantity stepping, remove, shared across both sides
- Automatic $10 pair discount when one lockup tee from each side is in the cart
- Cross-sell nudge in cart, free-shipping progress bar at $60
- Size guide modal, sticky mobile add-to-cart, review quotes, email capture

**Not built (deliberately):**
- Real checkout — the button fires a toast
- Real product photography — shirts are inline SVG mockups
- Email/SMS capture backend — validates format, then discards

---

## Paste this into Claude Code

> I have a single-file HTML storefront at `free-trial-site.html`. I want to take it live.
>
> Convert it to a Vite + React project, preserving the exact visual design, copy, and behavior. Split into components: Header, BrandToggle, Hero, StatsStrip, ProductGrid, ProductPage, CartDrawer, SizeGuideModal, Footer. Keep the `BRANDS` data object as a single source of truth in `src/data/brands.js`.
>
> Requirements:
> - Cart state in React Context, persisted to localStorage
> - Keep hash routing behavior but use React Router with the same URL shapes (`/b/shop`, `/g/product/g-lockup`)
> - Keep the `<meta name="color-scheme" content="light only">` tag and the `!important` background locks — iOS in-app browsers force dark mode and break the page without them
> - Wire checkout to the Shopify Storefront API (`cartCreate` mutation), mapping cart line items to Shopify variant IDs
> - Replace the inline SVG shirt mockups with `<img>` tags reading from a product image array, falling back to the SVG when no image exists
> - Deploy target is Vercel
>
> Start by scaffolding the project and porting the data layer, then components one at a time. Don't change any copy.

---

## Steps to actually go live

These are in dependency order. Steps marked **(you)** need your accounts and payment details — I can't do those, and neither can Claude Code.

1. **(you)** Buy the domain. `freetrial.shop` was the pick; grab `freetrialboyfriend.com` too and 301 it over.
2. **(you)** Create the Shopify store, or add these as a new collection on your existing one. Shopify Basic is the cheapest plan with a real checkout.
3. **(you)** Connect Printful to Shopify, upload the print files from `ftb-assets/shirt-prints/`, and create the product variants. Do this before touching code — you need the variant IDs.
4. **(you)** Generate a Shopify Storefront API access token (Settings → Apps → Develop apps → Storefront API).
5. Claude Code: scaffold the Vite project using the prompt above.
6. Claude Code: paste the variant IDs into the product data and wire `cartCreate`.
7. **(you)** Push to GitHub, connect the repo to Vercel, point the domain at it.
8. **(you)** Place one real test order end to end. Cancel and refund it yourself. Do not skip this — it's the only way to catch a broken variant mapping before a customer does.

## Before you flip it on

- **Replace the review quotes.** They're placeholder copy with invented cities. Fake reviews are an FTC problem and the fastest way to lose a customer who notices.
- **Shoot real product photos.** The SVG mockups are good enough to design against and not good enough to sell with. One flat-lay and one on-body shot per design.
- **Check the light-mode lock on a real phone** by opening the live URL from an Instagram DM. That's the exact path most of your traffic will take, and it's the one that broke before.
- **Test the pair discount** with a real order. It's the only pricing logic on the site, so it's the only thing that can undercharge you.

## Files to bring across

```
free-trial-site.html          the site
ftb-assets/shirt-prints/      8 print files, 300 DPI transparent PNG
ftb-assets/stickers/          7 sticker files, die-cut ready
ftb-assets/brand-kit/logos/   logos, monograms, favicon source
ftb-assets/brand-kit/packaging/  insert card + hang tag
ftb-launch-content.md         TikTok, IG, email, SMS copy
```
