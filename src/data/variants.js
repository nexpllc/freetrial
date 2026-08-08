/* Shopify variant IDs.
 *
 * One entry per sellable combination, keyed `${productId}|${color}|${size}`.
 * Stickers use the size `one size`.
 *
 * Where to get these: Shopify admin > Products > pick the product > click a
 * variant. The URL ends in the numeric variant id. The Storefront API wants the
 * GID form, so wrap it: gid://shopify/ProductVariant/1234567890.
 *
 * Until a key is filled in, checkout refuses to run and says which line is
 * unmapped — that's deliberate. A missing mapping should never silently drop a
 * line item from a real order.
 */

export const VARIANT_IDS = {
  // free trial boyfriend tee
  'b-lockup|white|S': '',
  'b-lockup|white|M': '',
  'b-lockup|white|L': '',
  'b-lockup|white|XL': '',
  'b-lockup|black|S': '',
  'b-lockup|black|M': '',
  'b-lockup|black|L': '',
  'b-lockup|black|XL': '',
  'b-lockup|trial blue|S': '',
  'b-lockup|trial blue|M': '',
  'b-lockup|trial blue|L': '',
  'b-lockup|trial blue|XL': '',

  // trial expired tee (boyfriend)
  'b-expired|white|S': '',
  'b-expired|white|M': '',
  'b-expired|white|L': '',
  'b-expired|white|XL': '',
  'b-expired|black|S': '',
  'b-expired|black|M': '',
  'b-expired|black|L': '',
  'b-expired|black|XL': '',

  // upgrade to premium tee (boyfriend)
  'b-premium|white|S': '',
  'b-premium|white|M': '',
  'b-premium|white|L': '',
  'b-premium|white|XL': '',
  'b-premium|black|S': '',
  'b-premium|black|M': '',
  'b-premium|black|L': '',
  'b-premium|black|XL': '',
  'b-premium|trial blue|S': '',
  'b-premium|trial blue|M': '',
  'b-premium|trial blue|L': '',
  'b-premium|trial blue|XL': '',

  // terms & conditions tee (boyfriend)
  'b-terms|white|S': '',
  'b-terms|white|M': '',
  'b-terms|white|L': '',
  'b-terms|white|XL': '',
  'b-terms|black|S': '',
  'b-terms|black|M': '',
  'b-terms|black|L': '',
  'b-terms|black|XL': '',

  // sticker pack (boyfriend)
  'b-stickers|white|one size': '',

  // free trial girlfriend tee
  'g-lockup|white|S': '',
  'g-lockup|white|M': '',
  'g-lockup|white|L': '',
  'g-lockup|white|XL': '',
  'g-lockup|black|S': '',
  'g-lockup|black|M': '',
  'g-lockup|black|L': '',
  'g-lockup|black|XL': '',
  'g-lockup|trial pink|S': '',
  'g-lockup|trial pink|M': '',
  'g-lockup|trial pink|L': '',
  'g-lockup|trial pink|XL': '',

  // trial expired tee (girlfriend)
  'g-expired|white|S': '',
  'g-expired|white|M': '',
  'g-expired|white|L': '',
  'g-expired|white|XL': '',
  'g-expired|black|S': '',
  'g-expired|black|M': '',
  'g-expired|black|L': '',
  'g-expired|black|XL': '',

  // upgrade to premium tee (girlfriend)
  'g-premium|white|S': '',
  'g-premium|white|M': '',
  'g-premium|white|L': '',
  'g-premium|white|XL': '',
  'g-premium|black|S': '',
  'g-premium|black|M': '',
  'g-premium|black|L': '',
  'g-premium|black|XL': '',
  'g-premium|trial pink|S': '',
  'g-premium|trial pink|M': '',
  'g-premium|trial pink|L': '',
  'g-premium|trial pink|XL': '',

  // terms & conditions tee (girlfriend)
  'g-terms|white|S': '',
  'g-terms|white|M': '',
  'g-terms|white|L': '',
  'g-terms|white|XL': '',
  'g-terms|black|S': '',
  'g-terms|black|M': '',
  'g-terms|black|L': '',
  'g-terms|black|XL': '',

  // sticker pack (girlfriend)
  'g-stickers|white|one size': '',
};

export const variantKey = (id, color, size) => `${id}|${color}|${size}`;

export function variantIdFor(line) {
  return VARIANT_IDS[variantKey(line.id, line.color, line.size)] || '';
}
