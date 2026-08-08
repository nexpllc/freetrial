import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';
import './styles/global.css';

/* The single-file build shipped hash URLs (#/b/shop) and those links are out in
   the world — group chats, saved posts, the old QR codes. Rewrite them to the
   path form once, before the router ever reads location. */
const legacy = window.location.hash;
if (/^#\/(b|g)(\/|$)/.test(legacy)) {
  const path = legacy.slice(1).replace(/\/$/, '') || '/b';
  window.history.replaceState(null, '', path + window.location.search);
}

/* Set the side before first paint so the boyfriend accent doesn't flash on a
   girlfriend URL. Layout keeps it in sync after that. */
document.documentElement.dataset.side =
  window.location.pathname.startsWith('/g') ? 'g' : 'b';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UIProvider>
        <CartProvider>
          <App />
          {/* cookieless, no personal data — see the privacy policy copy */}
          <Analytics />
        </CartProvider>
      </UIProvider>
    </BrowserRouter>
  </StrictMode>,
);
