import { useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { BRANDS, GARMENTS, SIZES, SOLD_OUT_SIZES, findProduct } from '../data/brands';
import { unitPrice as priceFor } from '../lib/pricing';
import { money } from '../lib/format';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import ProductImage from '../components/ProductImage';
import ProductGrid from '../components/ProductGrid';
import StickyAddBar from '../components/StickyAddBar';

function Details({ product }) {
  return (
    <>
      <details open>
        <summary>what's included</summary>
        <div className="bd">
          <ul>
            {product.sticker ? (
              <>
                <li>7 die-cut vinyl stickers <em>included</em></li>
                <li>weatherproof, dishwasher safe <em>included</em></li>
                <li>2–3in each <em>included</em></li>
              </>
            ) : (
              <>
                <li>240gsm ringspun cotton <em>included</em></li>
                <li>boxy relaxed fit <em>included</em></li>
                <li>front print, back badge <em>included</em></li>
                <li>insert + hang tag <em>included</em></li>
              </>
            )}
          </ul>
        </div>
      </details>

      <details>
        <summary>sizing</summary>
        <div className="bd">
          {product.sticker
            ? 'each sticker runs 2–3 inches on the long edge.'
            : 'boxy fit — true to size for relaxed, size down for fitted. unisex sizing. chest in inches: S 20 / M 21.5 / L 23 / XL 24.5.'}
        </div>
      </details>

      <details>
        <summary>shipping &amp; cancellation</summary>
        <div className="bd">printed and shipped from cape coral, fl in 3–5 business days. free over $60. 30-day returns on unworn items — reply to your order email and we'll send a label. no notice period, no exit interview.</div>
      </details>
    </>
  );
}

function ProductView({ product, side }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sticker ? 'one size' : null);
  const [qty, setQty] = useState(1);

  const { add } = useCart();
  const { toast, setSizeGuideOpen } = useUI();
  const addRef = useRef(null);
  const sizesRef = useRef(null);

  const brand = BRANDS[side];
  const others = brand.products.filter((x) => x.id !== product.id).slice(0, 4);

  function submit() {
    if (!size) {
      toast('pick a size first');
      sizesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    add(product, side, color, size, qty);
    toast('trial started — ' + (product.sticker ? product.name : `${color} / ${size}`));
  }

  /* Plus sizes carry an upcharge, so the price shown has to follow the chosen
     size — quoting the base price and letting Shopify correct it at checkout
     is exactly the kind of surprise that loses the sale. */
    const unitPrice = priceFor(product, color, size);

  const addLabel = product.sticker
    ? `add to trial — ${money(unitPrice)}`
    : size ? `start the trial — ${money(unitPrice)}` : 'select a size';

  const variantLabel = product.sticker
    ? 'vinyl pack'
    : size ? `${color} / ${size}` : 'select size';

  return (
    <>
      <div className="pwrap">
        <div>
          <div className="stage">
            <span className="plabel">{product.sticker ? 'vinyl pack' : 'front print'}</span>
            <div><ProductImage product={product} color={color} side={side} /></div>
          </div>
          <div className="thumbs">
            {product.colors.map((c) => (
              <button key={c} className={c === color ? 'on' : ''} onClick={() => setColor(c)} aria-label={c}>
                <ProductImage product={product} color={c} side={side} small />
              </button>
            ))}
          </div>
        </div>

        <div className="pinfo">
          <span className="eyebrow">{product.sticker ? 'weatherproof vinyl' : 'no card required'}</span>
          <h1>{product.name}</h1>
          <div className="price">
            {money(product.price)} USD{product.was && <> <s>{money(product.was)}</s></>}
          </div>
          <p className="blurb">{product.blurb}</p>

          {!product.sticker && (
            <>
              <div className="lbl">color <span className="v">{color}</span></div>
              <div className="swatch">
                {product.colors.map((c) => (
                  <button key={c} className={c === color ? 'on' : ''} onClick={() => setColor(c)} aria-label={c}>
                    <i style={{
                      background: GARMENTS[side][c].fill,
                      ...(c === 'white' ? { boxShadow: 'inset 0 0 0 1px #E2E5EA' } : {}),
                    }} />
                  </button>
                ))}
              </div>

              <div className="lbl">
                size
                <a href="#size-guide" onClick={(e) => { e.preventDefault(); setSizeGuideOpen(true); }}>size guide</a>
              </div>
              <div className="opts" ref={sizesRef}>
                {SIZES.map((s) => (
                  <button
                    key={s}
                    className={'opt' + (s === size ? ' on' : '')}
                    disabled={SOLD_OUT_SIZES.includes(s)}
                    onClick={() => setSize(s)}
                  >{s}</button>
                ))}
              </div>
            </>
          )}

          <div className="lbl">quantity</div>
          <div className="qty">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase">+</button>
          </div>

          <button className="add" ref={addRef} onClick={submit}>{addLabel}</button>
          <div className="micro">ships in 3–5 days. feelings not included.</div>

          <StickyAddBar
            price={unitPrice}
            variantLabel={variantLabel}
            onAdd={submit}
            addButtonRef={addRef}
          />

          <div className="trust">
            <div><b>7 days</b><small>to change your mind</small></div>
            <div><b>$0</b><small>restocking fee</small></div>
            <div><b>1 text</b><small>to cancel</small></div>
          </div>

          <Details product={product} />
        </div>
      </div>

      <section className="sec">
        <div className="sec-head">
          <h2>also on trial</h2>
          <Link to={`/${side}/shop`}>view all</Link>
        </div>
        <ProductGrid products={others} side={side} />
      </section>
    </>
  );
}

export default function ProductPage({ side }) {
  const { id } = useParams();
  const hit = findProduct(id);

  if (!hit) return <Navigate to={`/${side}/shop`} replace />;

  /* A product only ever lives on one side. Reaching it through the other side's
     URL canonicalises rather than rendering the wrong brand theme around it. */
  if (hit.side !== side) return <Navigate to={`/${hit.side}/product/${id}`} replace />;

  return <ProductView key={id} product={hit.p} side={hit.side} />;
}
