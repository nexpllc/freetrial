import { PLUS_SIZE_UPCHARGE } from '../data/brands';
import { VARIANT_PRICES, variantKey } from '../data/variants';

/**
 * What one unit costs, preferring the price Shopify will actually charge.
 *
 * Lives here rather than in brands.js because it has to read the synced variant
 * data, and variants.js already imports the catalog — putting it the other way
 * round would make the two modules circular.
 *
 * The fallback only applies to combinations that have not been synced yet.
 * Don't rely on it: the plus-size rules differ per product (the original
 * boyfriend lockup charges $32 for 2XL, the newer products charge a flat $30),
 * so a computed price is a guess and the synced one is the truth.
 */
export function unitPrice(product, color, size) {
  const exact = VARIANT_PRICES[variantKey(product.id, color, size)];
  if (typeof exact === 'number') return exact;
  return product.price + (PLUS_SIZE_UPCHARGE[size] || 0);
}
