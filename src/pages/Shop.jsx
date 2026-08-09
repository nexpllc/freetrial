import DropSection from '../components/DropSection';
import CrossSell from '../components/CrossSell';
import Signup from '../components/Signup';

export default function Shop({ brand, onSwitch }) {
  return (
    <>
      <DropSection brand={brand} title="everything" />
      <CrossSell brand={brand} onSwitch={onSwitch} />
      <Signup />
    </>
  );
}
