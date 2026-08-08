import { Link } from 'react-router-dom';
import { BRANDS, otherSide } from '../data/brands';
import { useUI } from '../context/UIContext';

const NAV = ['shop', 'spotted', 'faq', 'about'];

const SOCIAL = [
  ['instagram', 'https://instagram.com/nexpyt'],
  ['tiktok', 'https://tiktok.com/@nexpyt'],
  ['youtube', 'https://youtube.com/@Nexp'],
];

export default function Footer({ brand, onSwitch }) {
  const { setContactOpen, setLegalDoc } = useUI();
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

      <div className="frows">
        {SOCIAL.map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
        ))}
        <button type="button" onClick={() => setContactOpen(true)}>contact</button>
      </div>

      <div className="frows flegal">
        <button type="button" onClick={() => setLegalDoc('privacy')}>privacy</button>
        <button type="button" onClick={() => setLegalDoc('terms')}>terms</button>
        <button type="button" onClick={() => setLegalDoc('shipping')}>shipping &amp; returns</button>
      </div>

      <div className="fine">© 2026 free trial. printed and shipped from cape coral, fl. a nexp brand.</div>
    </footer>
  );
}
