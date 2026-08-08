import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import Ticker from './Ticker';
import BrandToggle from './BrandToggle';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import SizeGuideModal from './SizeGuideModal';
import Toast from './Toast';

export default function Layout({ brand, activeNav, onSwitch, children }) {
  const { open, setOpen } = useCart();
  const { setSizeGuideOpen } = useUI();
  const { pathname } = useLocation();

  /* The accent drives everything themed — ticker, buttons, swatch borders —
     through two custom properties, same as the original. */
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', brand.accent);
    root.style.setProperty('--soft', brand.soft);
  }, [brand]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setSizeGuideOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setOpen, setSizeGuideOpen]);

  return (
    <>
      <Ticker brand={brand} />
      <BrandToggle side={brand.key} onSwitch={onSwitch} />
      <Header brand={brand} activeNav={activeNav} />

      {/* keyed so the fade-in replays on every navigation, like the old
          innerHTML swap did */}
      <main id="app" key={pathname}>{children}</main>

      <Footer brand={brand} onSwitch={onSwitch} />

      <div className={'scrim' + (open ? ' on' : '')} onClick={() => setOpen(false)} />
      <CartDrawer side={brand.key} />
      <SizeGuideModal />
      <Toast />
    </>
  );
}
