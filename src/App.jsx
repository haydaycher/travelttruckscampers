// import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage/HomePage";
// import CatalogPage from "./pages/CatalogPage/CatalogPage";
// import "./App.css";
// import CamperDetailsPage from "./pages/CamperDetailsPage/CamperDetailsPage";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/catalog" element={<CatalogPage />} />
//       <Route path="/catalog/:id" element={<CamperDetailsPage />} />
//     </Routes>
//   );
// };

// export default App;

import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const CamperDetailsPage = lazy(
  () => import("./pages/CamperDetailsPage/CamperDetailsPage")
);
const NotFoundPage = lazy(
  () => import("./pages/NotFoundPage/NotFoundPage.jsx")
);

const App = () => {
  return (
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
  );
};

export default App;
