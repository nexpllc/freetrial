import ProductGrid from '../components/ProductGrid';
import CrossSell from '../components/CrossSell';
import Signup from '../components/Signup';

export default function Shop({ brand, onSwitch }) {
  return (
    <>
      <section className="sec">
        <div className="sec-head">
          <h2>everything</h2>
          <span className="c">{brand.products.length} items</span>
        </div>
        <ProductGrid products={brand.products} side={brand.key} />
      </section>
      <CrossSell brand={brand} onSwitch={onSwitch} />
      <Signup />
    </>
  );
}
