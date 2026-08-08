import SpottedWall from '../components/SpottedWall';
import CrossSell from '../components/CrossSell';
import Signup from '../components/Signup';

export default function Spotted({ brand, onSwitch }) {
  return (
    <>
      <SpottedWall />
      <CrossSell brand={brand} onSwitch={onSwitch} />
      <Signup />
    </>
  );
}
