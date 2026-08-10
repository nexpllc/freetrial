/**
 * Renders nothing until there are real reviews.
 *
 * This shipped with three invented customers per side, complete with invented
 * cities. Made-up reviews are an FTC problem and the fastest way to lose a
 * customer who notices, so the copy is gone rather than rewritten. Drop real
 * ones into `quotes` in brands.js and the strip comes back on its own.
 */
export default function Quotes({ brand }) {
  if (!brand.quotes?.length) return null;

  return (
    <div className="quotes">
      {brand.quotes.map(([quote, cite]) => (
        <div key={cite}>
          <p>{quote}</p>
          <cite>{cite}</cite>
        </div>
      ))}
    </div>
  );
}
