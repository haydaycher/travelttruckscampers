import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/operations';
import SearchBox from '../../components/SearchBox/SearchBox';
import CampersList from '../../components/CampersList/CampersList';
import Loader from '../../components/Loader/Loader';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import Pagination from '../../components/Pagination/Pagination';
import css from './CatalogPage.module.css';
import { Helmet } from 'react-helmet-async';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { status, items, totalPages } = useSelector((state) => state.campers);

  const [filters, setFilters] = useState({
    location: '',
    form: '',
    features: [],
    page: 1,
    limit: 10,
  });
  const [visibleCount, setVisibleCount] = useState(10); // Початкове значення для кількості видимих елементів

  // Викликаємо запит тільки якщо filters змінюється
  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  const handleSearch = (location) => {
    setFilters((prev) => ({ ...prev, location, page: 1 }));
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + filters.limit); // Завантажуємо наступну порцію елементів
  };

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <div>Помилка завантаження даних</div>;

  return (
    <div className={css.catalogContainer}>
      <Helmet>
        <title>Catalog of Campers</title> {/* Додаємо заголовок */}
      </Helmet>
      <div className={css.filterSection}>
        <SearchBox onSearch={handleSearch} />
        <FilterComponent onFilterChange={handleFilterChange} />
      </div>
      <div className={css.listSection}>
        {items && items.length > 0 ? (
          <>
            <CampersList
              filters={filters}
              onPageChange={handlePageChange}
              items={items.slice(0, visibleCount)} // Відображаємо тільки частину елементів
            />
            {visibleCount < items.length && (
              <button onClick={handleLoadMore}>Load More</button> // Кнопка для завантаження більше
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
