import { Link } from 'react-router-dom';
import { GARMENTS } from '../data/brands';
import { money } from '../lib/format';
import ProductImage from './ProductImage';

export default function ProductCard({ product, side }) {
  /* Lead with a colorway we have real artwork for. Several prints only exist
     for black, and defaulting to colors[0] showed those products as blank
     mockups in the grid while the real art sat one swatch away. */
  const preview = product.colors.find((c) => product.prints?.[c]) || product.colors[0];

  return (
    <Link className="card" to={`/${side}/product/${product.id}`}>
      <div className="frame">
        {product.flag && <span className="flag">{product.flag}</span>}
        <ProductImage product={product} color={preview} side={side} />
        <span className="quick">view</span>
      </div>
      <div className="meta">
        <h3>{product.name}</h3>
        <div className="pr">{money(product.price)} USD</div>
        <div className="sw">
          {product.colors.map((c) => (
            <i key={c} style={{ background: GARMENTS[side][c].fill }} />
          ))}
        </div>
      </div>
    </Link>
  );
}
