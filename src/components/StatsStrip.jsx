export default function StatsStrip({ brand }) {
  return (
    <div className="terms">
      {brand.stats.map(([value, label]) => (
        <div key={label}>
          {/* the stat values carry an <em> for the accent word — authored copy,
              not user input, so rendering it as markup is safe here */}
          <b dangerouslySetInnerHTML={{ __html: value }} />
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}
