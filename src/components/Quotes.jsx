export default function Quotes({ brand }) {
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
