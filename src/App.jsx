import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BRANDS, isSide } from './data/brands';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import Spotted from './pages/Spotted';
import FAQ from './pages/FAQ';
import About from './pages/About';

function activeNavFor(pathname) {
  const seg = pathname.split('/').filter(Boolean)[1];
  if (seg === 'faq' || seg === 'about' || seg === 'spotted') return seg;
  /* product pages keep "shop" lit, same as the original router */
  if (seg === 'shop' || seg === 'product') return 'shop';
  return 'home';
}

function SideApp() {
  const { side } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isSide(side)) return <Navigate to="/b" replace />;

  const brand = BRANDS[side];

  /* Switching sides holds your place — /b/shop becomes /g/shop. */
  const onSwitch = (next) => {
    const rest = location.pathname.replace(/^\/(b|g)/, '');
    navigate(`/${next}${rest}`);
  };

  return (
    <Layout brand={brand} activeNav={activeNavFor(location.pathname)} onSwitch={onSwitch}>
      <Routes>
        <Route index element={<Home brand={brand} onSwitch={onSwitch} />} />
        <Route path="shop" element={<Shop brand={brand} onSwitch={onSwitch} />} />
        <Route path="spotted" element={<Spotted brand={brand} onSwitch={onSwitch} />} />
        <Route path="faq" element={<FAQ brand={brand} onSwitch={onSwitch} />} />
        <Route path="about" element={<About brand={brand} onSwitch={onSwitch} />} />
        <Route path="product/:id" element={<ProductPage side={side} />} />
        <Route path="*" element={<Navigate to={`/${side}`} replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/b" replace />} />
      <Route path="/:side/*" element={<SideApp />} />
      <Route path="*" element={<Navigate to="/b" replace />} />
    </Routes>
  );
}
