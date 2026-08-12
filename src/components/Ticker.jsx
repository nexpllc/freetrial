export default function Ticker({ brand }) {
  const beats = [
    brand.ticker,
    'printed to order, never restocked',
    'one from each side — $50',
    '30-day returns, no exit interview',
  ];
  /* doubled so the -50% keyframe loops seamlessly */
  const run = beats.concat(beats);

  return (
    <div className="ticker">
      <div className="tick">
        {run.map((t, i) => <b key={i}>{t}</b>)}
      </div>
    </div>
  );
}
