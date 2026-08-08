import { Link } from 'react-router-dom';

export default function Hero({ brand }) {
  return (
    <section className="hero">
      <span className="eyebrow">{brand.heroBadge}</span>
      <h1>free trial<br /><span>{brand.word}</span></h1>
      <p>{brand.heroLine}</p>
      <Link className="btn" to={`/${brand.key}/shop`}>start the trial — $30</Link>
      <div className="fineprint">ships in 3–5 days. feelings not included.</div>
    </section>
  );
}
