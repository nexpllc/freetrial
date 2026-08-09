import { Link } from 'react-router-dom';
import { PAIR_SETS, findProduct } from '../data/brands';
import ProductImage from './ProductImage';

/* The scribbled arrow from the layout sketch, drawn properly. It points the
   label at the pair underneath it, which is the whole job. */
function PairMark() {
  return (
    <svg className="pairmark" viewBox="0 0 26 22" aria-hidden="true">
      <path d="M13,2 C16.5,7 9.5,11 13,18" />
      <path d="M9,13.5 L13,18.5 L17,13.5" />
    </svg>
  );
}

function Half({ id }) {
  const hit = findProduct(id);
  if (!hit) return null;
  const { p, side } = hit;
  const color = p.colors.find((c) => p.images?.[c]) || p.colors[0];

  return (
    <Link className="card" to={`/${side}/product/${p.id}`}>
      <div className="frame"><ProductImage product={p} color={color} side={side} /></div>
      <div className="pairname">{p.name}</div>
    </Link>
  );
}

export default function PairSection() {
  return (
    <section className="pair">
      <h3>get <span>the pair</span></h3>
      <p>one from each side, $50 for both. the discount applies itself in the cart — no code, no minimum.</p>

      <div className="pairsets">
        {PAIR_SETS.map((set) => (
          <div className="pairset" key={set.label}>
            <div className="pairhead">
              <span className="eyebrow">{set.audience}</span>
              <PairMark />
            </div>
            <div className="pairgrid">
              <Half id={set.b} />
              <Half id={set.g} />
            </div>
            <div className="pairtag">{set.label} — <b>$50 together</b></div>
          </div>
        ))}
      </div>
    </section>
  );
}
