import { BRANDS, otherSide } from '../data/brands';

export default function CrossSell({ brand, onSwitch }) {
  const other = otherSide(brand.key);
  const [before, after] = brand.crossHead.split('other tier');

  return (
    <section className="cross">
      <h3>{before}other <span>tier</span>{after}</h3>
      <p>{brand.crossLine}</p>
      <button type="button" onClick={() => onSwitch(other)}>
        switch to {BRANDS[other].word}
      </button>
    </section>
  );
}
