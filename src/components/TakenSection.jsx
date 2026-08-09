import { Link } from 'react-router-dom';
import { BRANDS, findProduct } from '../data/brands';
import ProductImage from './ProductImage';

/**
 * The counterpart to PairSection. That one sells the trial to people starting
 * out; this one sells the checkmark to people who are past it.
 */
export default function TakenSection() {
  const b = findProduct('b-taken').p;
  const g = findProduct('g-taken').p;

  return (
    <section className="pair taken">
      <h3>already <span>taken</span>?</h3>
      <p>the trial converted. no longer accepting applications.</p>

      <div className="pairgrid">
        <Link className="card" to="/b/product/b-taken">
          <div className="frame"><ProductImage product={b} color="black" side="b" /></div>
        </Link>
        <Link className="card" to="/g/product/g-taken">
          <div className="frame"><ProductImage product={g} color="black" side="g" /></div>
        </Link>
      </div>

      <div className="pairtag">verified. unavailable. <b>$30 each</b></div>
    </section>
  );
}
