import { variantIdFor, variantKey } from '../data/variants';

const DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN;
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-10';
const PAIR_CODE = import.meta.env.VITE_SHOPIFY_PAIR_DISCOUNT_CODE;

export const isConfigured = () => Boolean(DOMAIN && TOKEN);

export class CheckoutError extends Error {}

const CART_CREATE = `
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart { id checkoutUrl }
    userErrors { field message }
  }
}`;

/**
 * Build a Shopify cart from local lines and return its checkoutUrl.
 *
 * The $10 pair discount is priced locally, so Shopify has to be told about it
 * separately or the customer gets charged the undiscounted total. Two ways:
 *   1. (preferred) an automatic discount in Shopify admin that fires when one
 *      lockup tee from each side is in the cart — nothing to pass here.
 *   2. a discount code, set as VITE_SHOPIFY_PAIR_DISCOUNT_CODE, applied below.
 * Verify whichever you pick with a real test order before launch.
 */
export async function createCheckout(lines, { pairDiscount = 0 } = {}) {
  if (!isConfigured()) {
    throw new CheckoutError('checkout is not connected yet');
  }

  const unmapped = lines.filter((l) => !variantIdFor(l));
  if (unmapped.length) {
    const keys = unmapped.map((l) => variantKey(l.id, l.color, l.size)).join(', ');
    throw new CheckoutError(`no shopify variant mapped for: ${keys}`);
  }

  const input = {
    lines: lines.map((l) => ({ merchandiseId: variantIdFor(l), quantity: l.qty })),
  };
  if (pairDiscount > 0 && PAIR_CODE) input.discountCodes = [PAIR_CODE];

  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query: CART_CREATE, variables: { input } }),
  });

  if (!res.ok) throw new CheckoutError(`shopify returned ${res.status}`);

  const body = await res.json();
  if (body.errors?.length) throw new CheckoutError(body.errors[0].message);

  const result = body.data?.cartCreate;
  if (result?.userErrors?.length) throw new CheckoutError(result.userErrors[0].message);

  const url = result?.cart?.checkoutUrl;
  if (!url) throw new CheckoutError('shopify did not return a checkout url');
  return url;
}
