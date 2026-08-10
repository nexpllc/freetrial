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
    const ids = new Set(lines.map((l) => l.id));

    /* Each matching cross-side set takes its own $10 off, so buying both the
       trial pair and the verified pair discounts twice. */
    const matched = PAIR_SETS.filter((p) => ids.has(p.b) && ids.has(p.g));
    const pairOff = matched.length * PAIR_DISCOUNT;
    const subtotal = gross - pairOff;

    /* Holding exactly one half of a set — the other side is $10 away, which is
       the whole reason the switch exists. */
    const half = PAIR_SETS.find((p) => ids.has(p.b) !== ids.has(p.g));
    const nudge = half
      ? { side: ids.has(half.b) ? 'g' : 'b', id: ids.has(half.b) ? half.g : half.b }
      : null;

    return {
      units, gross, pairOff, subtotal, nudge,
      pairsMatched: matched.length,
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
