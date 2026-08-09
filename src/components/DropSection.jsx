import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';

const MAX_COLS = 4;

/**
 * The trial line on the left, the verified line on the right.
 *
 * They are two different pitches — one is "start something", the other is
 * "you're past that" — so they get their own column and their own heading
 * rather than sitting in one undifferentiated grid.
 *
 * Both the split ratio and the left column count are driven by how many
 * products there actually are. A fixed 4-column grid left a two-product drop
 * sitting against a third of a screen of nothing, and made the single verified
 * card twice the size of its neighbours. Deriving both keeps every card on the
 * row the same width however the catalog grows.
 */
export default function DropSection({ brand, title, limit, viewAll }) {
  const trial = brand.products.filter((p) => !p.taken);
  const taken = brand.products.filter((p) => p.taken);
  const left = limit ? trial.slice(0, limit) : trial;

  const mainCols = Math.min(left.length, MAX_COLS);
  const sideCols = Math.min(taken.length, 2);

  return (
    /* One track per card across the whole row, with each block spanning its own
       share. Because the container gap matches the inner grid gap, every card
       resolves to exactly the same width — a 2fr/1fr split cannot, since the
       wider block has to absorb an internal gap the narrow one doesn't have. */
    <section
      className="sec split"
      style={{
        '--tpl': `repeat(${mainCols + sideCols}, minmax(0, 1fr))`,
        '--main': mainCols,
        '--side': sideCols,
      }}
    >
      <div className="split-main">
        <div className="sec-head">
          <h2>{title}</h2>
          {viewAll
            ? <Link to={`/${brand.key}/shop`}>view all {brand.products.length}</Link>
            : <span className="c">{brand.products.length} items</span>}
        </div>
        <ProductGrid products={left} side={brand.key} cols={mainCols} />
      </div>

      <aside className="split-side">
        <div className="sec-head">
          <h2>already <span>taken</span>?</h2>
        </div>
        <p className="split-note">we've got shirts for that too.</p>
        <ProductGrid products={taken} side={brand.key} cols={sideCols} />
      </aside>
    </section>
  );
}
