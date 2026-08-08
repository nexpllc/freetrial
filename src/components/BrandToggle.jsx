import { BRANDS, SIDES } from '../data/brands';

export default function BrandToggle({ side, onSwitch }) {
  return (
    <div className="switchbar">
      <div className={'switch' + (side === 'g' ? ' g' : '')}>
        <span className="glide" />
        {SIDES.map((k) => (
          <button
            key={k}
            type="button"
            className={k === side ? 'on' : ''}
            onClick={() => k !== side && onSwitch(k)}
          >
            {BRANDS[k].word}
          </button>
        ))}
      </div>
    </div>
  );
}
