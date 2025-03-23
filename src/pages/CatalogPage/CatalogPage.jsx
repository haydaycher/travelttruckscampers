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
    page: 1, // Початкова сторінка
    limit: 4, // Кількість елементів на сторінку
  });

  useEffect(() => {
    dispatch(fetchCampers(searchFilters));
  }, [dispatch, searchFilters]);

  useEffect(() => {
    if (status === 'failed' && String(error).includes('404')) {
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
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
      page: 1, // Скидаємо сторінку на 1 при зміні фільтрів
    }));
  };

  const handleFavoritesToggle = (value) => {
    setShowFavorites(value);
  };

  const handleLoadMore = () => {
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1,
    }));
  };

  // Кнопка відображається, якщо є ще сторінки для завантаження
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
        <div className={css.listSection}>
          <CampersList filters={searchFilters} items={items} />
        </div>
        {isLoadMoreVisible && (
          <div className={css.loadMoreWrapper}>
            <LoadMoreBtn
              onClick={handleLoadMore}
              disabled={status === 'loading'}
            />
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default CatalogPage;
