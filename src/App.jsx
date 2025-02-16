import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import Loader from './components/Loader/Loader';
import { HelmetProvider } from 'react-helmet-async';

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
          <Route
            path="catalog/:id"
            element={<Navigate to="features" replace />}
          />
          <Route path="catalog/:id/*" element={<CamperDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  </HelmetProvider>
);

export default App;
