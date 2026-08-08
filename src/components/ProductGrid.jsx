import ProductCard from './ProductCard';

export default function ProductGrid({ products, side }) {
  return (
    <div className="grid">
      {products.map((p) => <ProductCard key={p.id} product={p} side={side} />)}
    </div>
  );
}
