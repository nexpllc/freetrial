import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BRANDS, FREE_SHIP, PAIR_DISCOUNT, PAIR_SETS, findProduct } from '../data/brands';
import { unitPrice } from '../lib/pricing';

const CartContext = createContext(null);
const STORAGE_KEY = 'freetrial.cart.v1';
const MAX_QTY = 10;

const lineKey = (id, color, size) => `${id}|${color}|${size}`;

/* A line that survived in localStorage past a catalog change would blow up the
   drawer on render, so anything that no longer resolves gets dropped on load. */
function isLive(line) {
  if (!line || typeof line !== 'object') return false;
  const hit = findProduct(line.id);
  if (!hit) return false;
  if (!hit.p.colors.includes(line.color)) return false;
  return typeof line.qty === 'number' && line.qty > 0;
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    /* Re-price on load rather than trusting what was stored. A cart saved
       before the plus-size upcharge existed would otherwise keep quoting the
       old total forever. */
    return parsed.filter(isLive).map((l) => ({
      ...l,
      qty: Math.min(MAX_QTY, l.qty),
      price: unitPrice(findProduct(l.id).p, l.color, l.size),
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* private mode / quota — the cart still works for this session */
    }
  }, [lines]);

  const add = useCallback((product, side, color, size, qty) => {
    const key = lineKey(product.id, color, size);
    setLines((prev) => {
      const hit = prev.find((l) => l.key === key);
      if (hit) {
        return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
      }
      return [...prev, {
        key, id: product.id, side, name: product.name,
        color, size, qty, price: unitPrice(product, color, size),
      }];
    });
    setOpen(true);
  }, []);

  const step = useCallback((key, delta) => {
    setLines((prev) => prev
      .map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + delta) } : l))
      .filter((l) => l.qty > 0));
  }, []);

  const remove = useCallback((key) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const totals = useMemo(() => {
    const units = lines.reduce((a, l) => a + l.qty, 0);
    const gross = lines.reduce((a, l) => a + l.qty * l.price, 0);
    /* Any one from each side makes a pair, and it repeats: three boyfriend tees
       against two girlfriend tees is two pairs. This deliberately matches what
       Shopify can express — a single Buy X Get Y across the two sides — because
       Shopify will not stack two product discounts on one order, so anything
       narrower here would promise a total the checkout then refused to honour. */
    const bUnits = lines.filter((l) => l.side === 'b').reduce((a, l) => a + l.qty, 0);
    const gUnits = lines.filter((l) => l.side === 'g').reduce((a, l) => a + l.qty, 0);
    const pairsMatched = Math.min(bUnits, gUnits);
    const pairOff = pairsMatched * PAIR_DISCOUNT;
    const subtotal = gross - pairOff;

    /* One side outnumbers the other, so the next tee over there is $10 off.
       Prefer the designed counterpart of something already in the cart. */
    const short = bUnits === gUnits ? null : (bUnits > gUnits ? 'g' : 'b');
    let nudge = null;
    if (short && lines.length) {
      const ids = new Set(lines.map((l) => l.id));
      const set = PAIR_SETS.find((p) => ids.has(p[short === 'b' ? 'g' : 'b']));
      nudge = { side: short, id: set ? set[short] : BRANDS[short].products[0].id };
    }

    return {
      units, gross, pairOff, subtotal, nudge, pairsMatched,
      bothSides: new Set(lines.map((l) => l.side)).size === 2,
      freeShipLeft: Math.max(0, FREE_SHIP - subtotal),
      progress: Math.min(100, (subtotal / FREE_SHIP) * 100),
    };
  }, [lines]);

  const value = useMemo(
    () => ({ lines, open, setOpen, add, step, remove, clear, totals, BRANDS }),
    [lines, open, add, step, remove, clear, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
