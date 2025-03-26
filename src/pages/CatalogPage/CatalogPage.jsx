import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/operations';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import CampersList from '../../components/CampersList/CampersList';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
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
    limit: 4, // завжди 4 елементи на сторінку
  });

  // Завантажуємо кемперів щоразу, коли змінюється searchFilters
  useEffect(() => {
    dispatch(fetchCampers(searchFilters));
  }, [dispatch, searchFilters]);

  useEffect(() => {
    if (status === 'failed' && error && String(error).includes('404')) {
      toast.error('За вашим запитом результатів не знайдено.');
      setTimeout(() => {
        setSearchFilters({
          location: '',
          form: '',
          amenities: [],
          page: 1,
          limit: 4,
        });
      }, 1500);
    }
  }, [status, error]);

  const handleFilterChange = (updatedFilters) => {
    // При зміні фільтрів повертаємося до першої сторінки
    setSearchFilters((prev) => ({
      ...prev,
      ...updatedFilters,
      page: 1,
    }));
  };

  const handleFavoritesToggle = (value) => {
    setShowFavorites(value);
  };

  const handleLoadMore = () => {
    // Завантажуємо наступну сторінку, замінюючи попередні 4 кемпери
    setSearchFilters((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handleBack = () => {
    // Повертаємося на попередню сторінку
    setSearchFilters((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  // Якщо ми не на першій сторінці, показуємо кнопку Back
  const isBackVisible = searchFilters.page > 1;
  // Якщо є наступна сторінка, показуємо кнопку Load More
  const isLoadMoreVisible = searchFilters.page < totalPages;

  return (
    <div className={css.catalogContainer}>
      <Helmet>
        <title>Catalog of Campers</title>
      </Helmet>
      <div className={css.filterSection}>
        <SearchBox
          onCategoryChange={handleFilterChange}
          onFavoritesToggle={handleFavoritesToggle}
        />
        {showFavorites && <FavoritesList />}
      </div>
      <div className={css.contentSection}>
        <CampersList filters={searchFilters} items={items} />
        <div className={css.paginationButtons}>
          {isBackVisible && (
            <button type="button" onClick={handleBack} className={css.backBtn}>
              Back
            </button>
          )}
          {isLoadMoreVisible && (
            <LoadMoreBtn
              onClick={handleLoadMore}
              disabled={status === 'loading'}
            />
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default CatalogPage;
