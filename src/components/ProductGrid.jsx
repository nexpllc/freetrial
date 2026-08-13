import ProductCard from './ProductCard';

/**
 * `cols` fixes the column count so a short row doesn't leave a hole where the
 * missing cards would be.
 *
 * `--mcols` is the narrow-screen count, capped at two. Mobile used to be hard
 * coded to two columns whatever the product count, so a single-product column
 * rendered its shirt at half the screen width with dead space beside it.
 */
export default function ProductGrid({ products, side, cols }) {
  const style = cols
    ? { '--cols': cols, '--mcols': Math.min(cols, 2) }
    : undefined;

  return (
    <div className="grid" style={style}>
      {products.map((p) => <ProductCard key={p.id} product={p} side={side} />)}
    </div>
  );
}
