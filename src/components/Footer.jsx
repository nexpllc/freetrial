import { Link } from 'react-router-dom';
import { BRANDS, otherSide } from '../data/brands';

const NAV = ['shop', 'faq', 'about'];

export default function Footer({ brand, onSwitch }) {
  const other = otherSide(brand.key);

  return (
    <footer>
      <div className="fmark">free trial<br /><span>{brand.word}</span></div>
      <div className="frows">
        {NAV.map((n) => <Link key={n} to={`/${brand.key}/${n}`}>{n}</Link>)}
        <button type="button" onClick={() => onSwitch(other)}>
          switch to {BRANDS[other].word}
        </button>
      </div>
      <div className="fine">© 2026 free trial. printed and shipped from cape coral, fl. a nexp brand.</div>
    </footer>
  );
}
