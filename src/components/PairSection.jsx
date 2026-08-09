import { Link } from 'react-router-dom';
import { PAIR_SETS, findProduct } from '../data/brands';
import ProductImage from './ProductImage';

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
            <span className="eyebrow">{set.audience}</span>
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
