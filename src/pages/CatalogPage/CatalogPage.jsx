import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/operations';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import CampersList from '../../components/CampersList/CampersList';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import css from './CatalogPage.module.css';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { status, items, totalPages, error } = useSelector(
    (state) => state.campers,
  );

  const [showFavorites, setShowFavorites] = useState(false);

  const [searchFilters, setSearchFilters] = useState({
    location: '',
    form: '',
    amenities: [],
    page: 1,
    limit: 4,
  });

  const errorHandled = useRef(false);

  useEffect(() => {
    dispatch(fetchCampers(searchFilters));
  }, [dispatch, searchFilters]);

  useEffect(() => {
    if (errorHandled.current) return;

    if (status === 'failed' && String(error).includes('404')) {
      toast.error('За вашим запитом результатів не знайдено.');

      errorHandled.current = true;

      setTimeout(() => {
        setSearchFilters({
          location: '',
          form: '',
          amenities: [],
          page: 1,
          limit: 4,
        });
        errorHandled.current = false;
      }, 1500);
    }
  }, [status, error]);

  const handleFilterChange = (updatedFilters) => {
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
      page: 1,
    }));
    errorHandled.current = false;
  };

  const handleFavoritesToggle = (value) => {
    setShowFavorites(value);
  };

  return (
    <div className={css.catalogContainer}>
      <Helmet>
        <title>Catalog of Campers</title>
      </Helmet>
      <SearchBox
        onCategoryChange={handleFilterChange}
        onFavoritesToggle={handleFavoritesToggle}
      />

      {/* ✅ Відображаємо улюблені кемпери, тільки якщо showFavorites === true */}
      {showFavorites && <FavoritesList />}

      <CampersList filters={searchFilters} items={items} />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default CatalogPage;
