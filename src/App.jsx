import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import Loader from './components/Loader/Loader';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));
const CamperDetailsPage = lazy(
  () => import('./pages/CamperDetailsPage/CamperDetailsPage'),
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => (
  <HelmetProvider>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HeaderMenu />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<CamperDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
    {/* ✅ Єдиний ToastContainer у всьому додатку */}
    {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> */}
  </HelmetProvider>
);

export default App;
