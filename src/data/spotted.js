/* Community wall — real customer photos.
 *
 * Fill `image` with e.g. "/spotted/fan1.jpg" as submissions come in. An empty
 * image renders a pending tile, so the wall reads as "waiting for yours"
 * rather than looking broken before the first photo lands.
 *
 * These are placeholder handles. Replace them with real submissions before
 * launch — a wall of invented customers is the same problem as invented
 * reviews, see the quotes in brands.js. */

export const SPOTTED = [
  { id: 1, handle: '@pending', loc: 'day 3 of 7', image: '' },
  { id: 2, handle: '@pending', loc: 'trial expired', image: '' },
  { id: 3, handle: '@pending', loc: 'the pair', image: '' },
  { id: 4, handle: '@pending', loc: 'upgraded to premium', image: '' },
  { id: 5, handle: '@pending', loc: 'cancelled anytime', image: '' },
  { id: 6, handle: '@pending', loc: 'still on trial', image: '' },
];
