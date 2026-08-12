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
import ContactModal from './ContactModal';
import LegalModal from './LegalModal';
import SightingModal from './SightingModal';
import VideoModal from './VideoModal';
import EmailPopup from './EmailPopup';
import Toast from './Toast';

export default function Layout({ brand, activeNav, onSwitch, children }) {
  const { open, setOpen } = useCart();
  const { closeAllModals } = useUI();
  const { pathname } = useLocation();

  /* Theming is one attribute; the accent pair lives in CSS keyed off it. See
     the data-side rules in global.css for why it isn't setProperty. */
  useEffect(() => {
    document.documentElement.dataset.side = brand.key;
  }, [brand]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        closeAllModals();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setOpen, closeAllModals]);

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
      <ContactModal />
      <LegalModal />
      <SightingModal />
      <VideoModal />
      <EmailPopup />
      <Toast />
    </>
  );
}
