import { SHOPIFY } from './shopify';

/* Web3Forms delivers straight to the store inbox — no backend, no account.
   Same key the nexp storefront uses, so submissions land in the same place. */
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || 'aff9392d-e05c-4485-876a-ed57b0d9abcf';

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function postToWeb3Forms(payload) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...payload }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'failed to send');
}

export function sendContactMessage({ name, email, message }) {
  return postToWeb3Forms({
    subject: 'New message from free trial',
    from_name: 'free trial contact form',
    name,
    email,
    message,
  });
}

export function sendSighting({ handle, email, link, note }) {
  return postToWeb3Forms({
    subject: 'New spotted submission from free trial',
    from_name: 'free trial spotted wall',
    handle,
    email: email || '(not provided)',
    'link to post': link,
    note: note || '(none)',
  });
}

/**
 * Adds the address to the Shopify customer list with marketing consent.
 *
 * Shopify requires a password on customerCreate even though nobody will ever
 * log in with it, so we throw away a random one. An address that already
 * exists comes back as TAKEN — that means they're on the list already, which
 * is the outcome we wanted, not an error worth showing anyone.
 */
export async function subscribeEmail(email) {
  if (!SHOPIFY.domain || !SHOPIFY.token) {
    throw new Error('storefront not configured');
  }

  const password = crypto.getRandomValues(new Uint32Array(2)).join('') + 'Aa1!';

  const res = await fetch(`https://${SHOPIFY.domain}/api/${SHOPIFY.apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY.token,
    },
    body: JSON.stringify({
      query: `mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) { customer { id } customerUserErrors { code message } }
      }`,
      variables: { input: { email, password, acceptsMarketing: true } },
    }),
  });

  const data = await res.json();
  const errors = data?.data?.customerCreate?.customerUserErrors || [];
  if (errors.length && !errors.some((e) => e.code === 'TAKEN')) {
    throw new Error(errors[0].message);
  }
}
