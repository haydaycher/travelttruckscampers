// File: src/pages/CatalogPage/CatalogPage.jsx

// Додаємо імпорт React і необхідних хуків: useState та useEffect
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/operations';
import SearchBox from '../../components/SearchBox/SearchBox';
import CampersList from '../../components/CampersList/CampersList';
import Loader from '../../components/Loader/Loader';
// import Pagination from '../../components/Pagination/Pagination';
import FavoritesList from '../../components/FavoritesList/FavoritesList'; // Імпорт компоненту FavoritesList
import css from './CatalogPage.module.css';
import { Helmet } from 'react-helmet-async';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { status, items, totalPages } = useSelector((state) => state.campers);

  // Використовуємо useState для зберігання фільтрів, кількості видимих елементів,
  // стану завантаження та стану відображення улюблених
  const [filters, setFilters] = useState({
    location: '',
    form: '',
    amenities: [],
    page: 1,
    limit: 10,
  });
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false); // Стан для перемикання відображення FavoritesList

  // Виконуємо запит для отримання кемперів щоразу, коли змінюються фільтри
  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  // Обробник для пошуку за локацією
  const handleSearch = (location) => {
    setFilters((prev) => ({ ...prev, location, page: 1 }));
  };

  // Обробник для зміни фільтрів
  const handleFilterChange = (updatedFilters) => {
    setFilters((prev) => ({ ...prev, ...updatedFilters, page: 1 }));
  };

  // Обробник для зміни сторінки
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // Обробник для завантаження наступної порції елементів
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setVisibleCount((prevCount) => prevCount + filters.limit);
    setTimeout(() => {
      setIsLoadingMore(false);
    }, 1000);
  };

  // Відображаємо Loader, якщо дані завантажуються, або повідомлення про помилку, якщо завантаження не вдалося
  if (status === 'loading' && !isLoadingMore) return <Loader />;
  if (status === 'failed') return <NotFoundPage />;

  return (
    <div className={css.catalogContainer}>
      <Helmet>
        <title>Catalog of Campers</title>
      </Helmet>
      <div className={css.filterSection}>
        <SearchBox
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
      </div>
      {/* Кнопка для перемикання відображення списку улюблених кемперів */}
      <button onClick={() => setShowFavorites((prev) => !prev)}>
        {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
      </button>
      {/* Якщо showFavorites true, відображаємо компонент FavoritesList */}
      {showFavorites && <FavoritesList />}
      <div className={css.listSection}>
        {items && items.length > 0 ? (
          <>
            <CampersList
              filters={filters}
              onPageChange={handlePageChange}
              items={items.slice(0, visibleCount)}
            />
            {visibleCount < items.length && (
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className={isLoadingMore ? css.loadingButton : ''}
              >
                {isLoadingMore ? 'Завантаження...' : 'Завантажити ще'}
              </button>
            )}
            {/* Розкоментуйте Pagination, якщо потрібна пагінація */}
            {/* <Pagination
              currentPage={filters.page}
              totalPages={totalPages || 1}
              onPageChange={handlePageChange}
            /> */}
          </>
        ) : (
          <NotFoundPage />
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
