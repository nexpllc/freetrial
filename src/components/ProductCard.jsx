import { Link } from 'react-router-dom';
import { GARMENTS } from '../data/brands';
import { money } from '../lib/format';
import ProductImage from './ProductImage';

export default function ProductCard({ product, side }) {
  return (
    <Link className="card" to={`/${side}/product/${product.id}`}>
      <div className="frame">
        {product.flag && <span className="flag">{product.flag}</span>}
        <ProductImage product={product} color={product.colors[0]} side={side} />
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
