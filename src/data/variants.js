/* Explicit .js extension so this module also loads under plain Node, which is
   how the variant audit below gets run outside the app. */
import { BRANDS, SIDES, SIZES, SOLD_OUT_SIZES } from './brands.js';

/* Shopify variant IDs, keyed `${productId}|${color}|${size}`.
 *
 * Where to get them: Shopify admin > Products > pick the product > click a
 * variant. The URL ends in the numeric id. The Storefront API wants the GID
 * form, so wrap it: gid://shopify/ProductVariant/1234567890
 *
 * This map is intentionally sparse — the catalog is the source of truth for
 * which combinations exist, and listing ~180 empty strings here would rot the
 * moment a colourway changes. Fill in the ones you have; `missingVariantKeys()`
 * below tells you what is still outstanding, and checkout refuses to run while
 * anything in the cart is unmapped rather than silently dropping the line.
 */
export const VARIANT_IDS = {
  // 'b-taken|black|M': 'gid://shopify/ProductVariant/1234567890',
};

export const variantKey = (id, color, size) => `${id}|${color}|${size}`;

export function variantIdFor(line) {
  return VARIANT_IDS[variantKey(line.id, line.color, line.size)] || '';
}

/** Every sellable combination in the catalog, derived rather than hand-listed. */
export function allVariantKeys() {
  const keys = [];
  for (const side of SIDES) {
    for (const p of BRANDS[side].products) {
      const sizes = p.sticker ? ['one size'] : SIZES.filter((s) => !SOLD_OUT_SIZES.includes(s));
      for (const color of p.colors) {
        for (const size of sizes) keys.push(variantKey(p.id, color, size));
      }
    }
  }
  return keys;
}

/** What still needs a Shopify id. Run this before flipping checkout on. */
export function missingVariantKeys() {
  return allVariantKeys().filter((k) => !VARIANT_IDS[k]);
}
