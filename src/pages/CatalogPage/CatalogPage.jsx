import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/operations';
import SearchBox from '../../components/SearchBox/SearchBox';
import CampersList from '../../components/CampersList/CampersList';
import Loader from '../../components/Loader/Loader';

import Pagination from '../../components/Pagination/Pagination';
import css from './CatalogPage.module.css';
import { Helmet } from 'react-helmet-async';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { status, items, totalPages } = useSelector((state) => state.campers);

  const [filters, setFilters] = useState({
    location: '',
    form: '',
    amenities: [],
    page: 1,
    limit: 10,
  });

  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Додано для контролю кнопки Load More

  // Викликаємо запит тільки якщо filters змінюється
  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  // Обробка пошуку за локацією
  const handleSearch = (location) => {
    setFilters((prev) => ({ ...prev, location, page: 1 }));
  };

  // Обробка змін фільтрів
  const handleFilterChange = (updatedFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
      page: 1, // Обнуляємо сторінку при зміні фільтрів
    }));
  };

  // Обробка зміни сторінки
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // Завантаження наступної порції елементів
  const handleLoadMore = () => {
    setIsLoadingMore(true); // Заблокувати кнопку
    setVisibleCount((prevCount) => prevCount + filters.limit);

    // Затримка для асинхронного запиту
    setTimeout(() => {
      setIsLoadingMore(false); // Розблокувати після завантаження
    }, 1000); // Імітація часу завантаження
  };

  // Логіка для відображення стану завантаження
  if (status === 'loading' && !isLoadingMore) return <Loader />;
  if (status === 'failed') return <div>Помилка завантаження даних</div>;

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
      <div className={css.listSection}>
        {items && items.length > 0 ? (
          <>
            <CampersList
              filters={filters}
              onPageChange={handlePageChange}
              items={items.slice(0, visibleCount)} // Відображаємо лише частину елементів
            />
            {visibleCount < items.length && (
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore} // Додаємо блокування кнопки під час завантаження
                className={isLoadingMore ? css.loadingButton : ''} // Стиль для кнопки під час завантаження
              >
                {isLoadingMore ? 'Завантаження...' : 'Завантажити ще'}
              </button>
            )}
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages || 1}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div>Немає результатів за заданими критеріями.</div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
