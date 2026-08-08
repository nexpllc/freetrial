import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const NAV = ['shop', 'spotted', 'faq', 'about'];

export default function Header({ brand, activeNav }) {
  const { totals, setOpen } = useCart();

  return (
    <header>
      <nav className="nav">
        {NAV.map((n) => (
          <Link key={n} to={`/${brand.key}/${n}`} className={n === activeNav ? 'on' : ''}>{n}</Link>
        ))}
      </nav>

      <Link className="brand" to={`/${brand.key}`}>
        free trial<br /><span>{brand.word}</span>
      </Link>

      <button className="cartbtn" onClick={() => setOpen(true)} aria-label="Open cart">
        <svg viewBox="0 0 24 24">
          <path d="M4 8h16l-1.4 12H5.4L4 8z" />
          <path d="M9 8a3 3 0 0 1 6 0" />
        </svg>
        <span className="count" hidden={totals.units === 0}>{totals.units}</span>
      </button>
    </header>
  );
}
