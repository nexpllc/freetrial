import ProductCard from './ProductCard';

/**
 * `cols` fixes the column count so a short row doesn't leave a hole where the
 * missing cards would be. Left unset, the CSS default applies.
 */
export default function ProductGrid({ products, side, cols }) {
  return (
    <div className="grid" style={cols ? { '--cols': cols } : undefined}>
      {products.map((p) => <ProductCard key={p.id} product={p} side={side} />)}
    </div>
  );
}
