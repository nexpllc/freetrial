import { Link } from 'react-router-dom';
import { BRANDS } from '../data/brands';
import ProductImage from './ProductImage';

export default function PairSection() {
  const b = BRANDS.b.products[0];
  const g = BRANDS.g.products[0];

  return (
    <section className="pair">
      <h3>get <span>the pair</span></h3>
      <p>one from each side, $50 for both. the discount applies itself in the cart — no code, no minimum.</p>
      <div className="pairgrid">
        <Link className="card" to="/b/product/b-lockup">
          <div className="frame"><ProductImage product={b} color="trial blue" side="b" /></div>
        </Link>
        <Link className="card" to="/g/product/g-lockup">
          <div className="frame"><ProductImage product={g} color="trial pink" side="g" /></div>
        </Link>
      </div>
      <div className="pairtag">$60 separately — <b>$50 together</b></div>
    </section>
  );
}
