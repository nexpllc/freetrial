import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BRANDS, findProduct } from '../data/brands';
import { money } from '../lib/format';
import { CheckoutError, createCheckout } from '../lib/shopify';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import ProductImage from './ProductImage';

function ProgressCopy({ totals }) {
  const { pairOff, bothSides, freeShipLeft } = totals;

  if (pairOff) {
    return (
      <>
        <b>pair discount applied.</b>{' '}
        {freeShipLeft > 0 ? `spend ${money(freeShipLeft)} more for free shipping` : 'free shipping unlocked too.'}
      </>
    );
  }
  if (bothSides && freeShipLeft > 0) {
    return <><b>matching pair detected.</b> spend {money(freeShipLeft)} more for free shipping</>;
  }
  if (freeShipLeft > 0) {
    return <>spend <b>{money(freeShipLeft)}</b> more for free shipping</>;
  }
  return <><b>free shipping unlocked.</b> no upsell, we promise.</>;
}

export default function CartDrawer({ side }) {
  const { lines, open, setOpen, step, remove, totals } = useCart();
  const { toast } = useUI();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function checkout() {
    if (!lines.length || busy) return;
    setBusy(true);
    try {
      const url = await createCheckout(lines, { pairDiscount: totals.pairOff });
      window.location.href = url;
    } catch (err) {
      toast(err instanceof CheckoutError ? err.message : 'checkout is having a moment — try again');
      console.error('[checkout]', err);
      setBusy(false);
    }
  }

  function goToNudge({ side: target, id }) {
    setOpen(false);
    navigate(`/${target}/product/${id}`);
  }

  return (
    <aside className={'drawer' + (open ? ' on' : '')} aria-label="Cart" aria-hidden={!open}>
      <div className="dhead">
        <h2>your trial <span style={{ color: 'var(--ash)', fontWeight: 600 }}>
          {totals.units ? `(${totals.units})` : ''}
        </span></h2>
        <button onClick={() => setOpen(false)} aria-label="Close cart">×</button>
      </div>

      <div className="ditems">
        {!lines.length ? (
          <div className="empty">
            <b>no trial started yet</b>
            pick a size and it's yours for seven days.
            <div>
              <Link className="btn" to={`/${side}/shop`} onClick={() => setOpen(false)}>browse the drop</Link>
            </div>
          </div>
        ) : (
          <>
            {lines.map((l) => {
              const hit = findProduct(l.id);
              if (!hit) return null;
              const bd = BRANDS[l.side];
              return (
                <div className="ci" key={l.key}>
                  <div className="im">
                    <ProductImage product={hit.p} color={l.color} side={l.side} small />
                  </div>
                  <div>
                    <h3>{l.name}</h3>
                    <div className="var">{l.color} / {l.size}</div>
                    <span className="side" style={{ background: bd.soft, color: bd.accent }}>{bd.word}</span>
                    <div className="row">
                      <div className="stp">
                        <button onClick={() => step(l.key, -1)} aria-label="Decrease">−</button>
                        <span>{l.qty}</span>
                        <button onClick={() => step(l.key, 1)} aria-label="Increase">+</button>
                      </div>
                      <button className="rm" onClick={() => remove(l.key)}>remove</button>
                    </div>
                  </div>
                  <div className="amt">{money(l.qty * l.price)}</div>
                </div>
              );
            })}

            {totals.nudge && (
              <div className="nudge">
                <p>
                  add the {findProduct(totals.nudge.id)?.p.name || `${BRANDS[totals.nudge.side].word} tee`}
                  <small>save $10 on the pair, applied automatically</small>
                </p>
                <button onClick={() => goToNudge(totals.nudge)}>add it</button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="dfoot">
        <div className="prog"><i style={{ width: `${totals.progress}%` }} /></div>
        <div className="progtxt"><ProgressCopy totals={totals} /></div>
        {totals.pairOff > 0 && (
          <div className="totals disc">
            <span>pair discount{totals.pairsMatched > 1 ? ` ×${totals.pairsMatched}` : ''}</span>
            <span>−{money(totals.pairOff)}</span>
          </div>
        )}
        <div className="totals"><span>subtotal</span><span>{money(totals.subtotal)}</span></div>
        <div className="totnote">shipping and tax calculated at checkout</div>
        <button className="co" disabled={!lines.length || busy} onClick={checkout}>
          {busy ? 'starting…' : 'checkout'}
        </button>
      </div>
    </aside>
  );
}
