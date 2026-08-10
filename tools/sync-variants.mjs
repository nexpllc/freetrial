/**
 * Regenerates src/data/variants.js from the live Shopify store.
 *
 *   npm run sync-variants          report only, writes nothing
 *   npm run sync-variants -- --write
 *
 * Reading the ids beats typing them. There are 175 sellable combinations and a
 * single transposed digit sends a real order to the wrong garment, which you
 * would only discover when it shipped.
 *
 * Matching is by explicit handle only. An earlier version fell back to a loose
 * title match and silently bound "boyfriend ✓ tee" to the free trial boyfriend
 * product, because the word "boyfriend" is in both titles — every verified tee
 * order would have shipped the wrong shirt. Product identity is not something
 * to infer. Unlisted products are reported, never guessed.
 *
 * Colour and size come from the variant's own selectedOptions, compared
 * case-insensitively, so "Forest Green / 2XL" lines up with "forest green" + "2XL".
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BRANDS, SIDES, SIZES, SOLD_OUT_SIZES, sizePrice } from '../src/data/brands.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, '..', 'src', 'data', 'variants.js');

const DOMAIN = process.env.VITE_SHOPIFY_DOMAIN || 'nexp-5.myshopify.com';
const TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '4ed19351597140bf4ef7c4039fdbe21b';
const API = process.env.VITE_SHOPIFY_API_VERSION || '2024-10';

/* Catalog id -> Shopify handle. Add a line as each product is created; the
   script prints the available handles when one is missing. */
const HANDLES = {
  'b-lockup': 'nexp-free-trial-boyfriend-tee',
  // 'b-expired':   '',
  // 'b-taken':     '',
  // 'g-lockup':    '',
  // 'g-subscribe': '',
  // 'g-taken':     '',
};

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

async function gql(query, variables) {
  const res = await fetch(`https://${DOMAIN}/api/${API}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': TOKEN },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json();
  if (body.errors?.length) throw new Error(body.errors.map((e) => e.message).join('; '));
  return body.data;
}

async function fetchProducts() {
  const out = [];
  let cursor = null;
  do {
    const data = await gql(`
      query($c: String) {
        products(first: 100, after: $c) {
          pageInfo { hasNextPage endCursor }
          edges { node {
            title handle
            variants(first: 100) {
              edges { node { id price { amount } selectedOptions { name value } } }
            }
          } }
        }
      }`, { c: cursor });
    out.push(...data.products.edges.map((e) => e.node));
    cursor = data.products.pageInfo.endCursor;
    if (!data.products.pageInfo.hasNextPage) break;
  } while (cursor);
  return out;
}

function matchProduct(product, shopifyProducts) {
  const handle = HANDLES[product.id];
  if (!handle) return { error: 'no handle configured in HANDLES' };
  const hit = shopifyProducts.find((p) => p.handle === handle);
  if (!hit) return { error: `handle "${handle}" not found on the store` };
  return { product: hit };
}

function optionOf(variant, name) {
  const o = variant.selectedOptions.find((s) => s.name.toLowerCase() === name);
  return o ? o.value : null;
}

const sellableSizes = (p) => (p.sticker ? ['one size'] : SIZES.filter((s) => !SOLD_OUT_SIZES.includes(s)));

async function main() {
  const write = process.argv.includes('--write');
  const shopify = await fetchProducts();
  console.log(`storefront sees ${shopify.length} products on ${DOMAIN}\n`);

  const mapping = {};
  const problems = [];
  let matchedProducts = 0;

  for (const side of SIDES) {
    for (const p of BRANDS[side].products) {
      const m = matchProduct(p, shopify);
      if (m.error) {
        problems.push(`${p.id} ("${p.name}"): ${m.error}`);
        console.log(`  ${p.id.padEnd(12)} UNMAPPED — ${m.error}`);
        continue;
      }
      const sp = m.product;
      matchedProducts++;

      let mapped = 0;
      for (const color of p.colors) {
        for (const size of sellableSizes(p)) {
          const v = sp.variants.edges.find((e) => {
            const c = optionOf(e.node, 'color');
            const s = optionOf(e.node, 'size');
            return c && s && norm(c) === norm(color) && norm(s) === norm(size);
          });
          if (!v) {
            problems.push(`${p.id}: no variant for ${color} / ${size} in "${sp.title}"`);
            continue;
          }
          const expected = sizePrice(p, size);
          const actual = Number(v.node.price.amount);
          if (actual !== expected) {
            problems.push(`${p.id} ${color}/${size}: site says $${expected}, Shopify says $${actual}`);
          }
          mapping[`${p.id}|${color}|${size}`] = v.node.id;
          mapped++;
        }
      }
      console.log(`  ${p.id.padEnd(12)} ${String(mapped).padStart(3)} / ${p.colors.length * sellableSizes(p).length}  ← ${sp.title}`);
    }
  }

  console.log(`\nproducts matched: ${matchedProducts} / ${SIDES.reduce((a, s) => a + BRANDS[s].products.length, 0)}`);
  console.log(`variants mapped:  ${Object.keys(mapping).length}`);

  if (problems.length) {
    console.log(`\n${problems.length} problem(s):`);
    for (const p of problems.slice(0, 40)) console.log(`  - ${p}`);
    if (problems.length > 40) console.log(`  … ${problems.length - 40} more`);
  }

  const unclaimed = shopify.filter((p) => !Object.values(HANDLES).includes(p.handle));
  if (unclaimed.length) {
    console.log('\nhandles on the store not claimed by any catalog product:');
    for (const p of unclaimed) console.log(`  ${p.handle.padEnd(34)} ${p.title}`);
    console.log('add the right one to HANDLES in this file to map a product.');
  }

  if (!write) {
    console.log('\nreport only. re-run with --write to update src/data/variants.js');
    return;
  }

  const grouped = {};
  for (const [k, v] of Object.entries(mapping)) {
    const id = k.split('|')[0];
    (grouped[id] ||= []).push([k, v]);
  }
  const body = Object.entries(grouped)
    .map(([id, rows]) => `  // ${id}\n${rows.map(([k, v]) => `  '${k}': '${v}',`).join('\n')}`)
    .join('\n\n');

  const file = `/* GENERATED by tools/sync-variants.mjs — do not edit by hand.
 * Regenerate with: npm run sync-variants -- --write
 * Last synced: ${new Date().toISOString()} from ${DOMAIN}
 */
import { BRANDS, SIDES, SIZES, SOLD_OUT_SIZES } from './brands.js';

export const VARIANT_IDS = {
${body}
};

export const variantKey = (id, color, size) => \`\${id}|\${color}|\${size}\`;

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
`;

  fs.writeFileSync(OUT, file);
  console.log(`\nwrote ${OUT}`);
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
