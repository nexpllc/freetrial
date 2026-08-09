import Hero from '../components/Hero';
import StatsStrip from '../components/StatsStrip';
import DropSection from '../components/DropSection';
import PlanList from '../components/PlanList';
import PairSection from '../components/PairSection';
import Quotes from '../components/Quotes';
import SpottedWall from '../components/SpottedWall';
import CrossSell from '../components/CrossSell';
import Signup from '../components/Signup';

export default function Home({ brand, onSwitch }) {
  return (
    <>
      <Hero brand={brand} />
      <StatsStrip brand={brand} />
      <DropSection brand={brand} title="the drop" limit={4} viewAll />
      <PlanList brand={brand} />
      <PairSection />
      <Quotes brand={brand} />
      <SpottedWall compact />
      <CrossSell brand={brand} onSwitch={onSwitch} />
      <Signup />
    </>
  );
}
