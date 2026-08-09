import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';

/**
 * The trial line on the left, the verified line on the right.
 *
 * They are two different pitches — one is "start something", the other is
 * "you're past that" — so they get their own column and their own heading
 * rather than sitting in one undifferentiated grid.
 */
export default function DropSection({ brand, title, limit, viewAll }) {
  const trial = brand.products.filter((p) => !p.taken);
  const taken = brand.products.filter((p) => p.taken);
  const left = limit ? trial.slice(0, limit) : trial;

  return (
    <section className="sec split">
      <div className="split-main">
        <div className="sec-head">
          <h2>{title}</h2>
          {viewAll
            ? <Link to={`/${brand.key}/shop`}>view all {brand.products.length}</Link>
            : <span className="c">{brand.products.length} items</span>}
        </div>
        <ProductGrid products={left} side={brand.key} />
      </div>

      <aside className="split-side">
        <div className="sec-head">
          <h2>already <span>taken</span>?</h2>
        </div>
        <p className="split-note">we've got shirts for that too.</p>
        <ProductGrid products={taken} side={brand.key} />
      </aside>
    </section>
  );
}
