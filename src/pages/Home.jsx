import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StatsStrip from '../components/StatsStrip';
import ProductGrid from '../components/ProductGrid';
import PlanList from '../components/PlanList';
import PairSection from '../components/PairSection';
import TakenSection from '../components/TakenSection';
import Quotes from '../components/Quotes';
import SpottedWall from '../components/SpottedWall';
import CrossSell from '../components/CrossSell';
import Signup from '../components/Signup';

export default function Home({ brand, onSwitch }) {
  return (
    <>
      <Hero brand={brand} />
      <StatsStrip brand={brand} />
      <section className="sec">
        <div className="sec-head">
          <h2>the drop</h2>
          <Link to={`/${brand.key}/shop`}>view all {brand.products.length}</Link>
        </div>
        <ProductGrid products={brand.products.slice(0, 4)} side={brand.key} />
      </section>
      <PlanList brand={brand} />
      <PairSection />
      <TakenSection />
      <Quotes brand={brand} />
      <SpottedWall compact />
      <CrossSell brand={brand} onSwitch={onSwitch} />
      <Signup />
    </>
  );
}
