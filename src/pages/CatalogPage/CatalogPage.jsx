import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/operations';
import SearchBox from '../../components/SearchBox/SearchBox';
import CampersList from '../../components/CampersList/CampersList';
import Loader from '../../components/Loader/Loader';
import css from './CatalogPage.module.css';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import Pagination from '../../components/Pagination/Pagination';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { status, items, totalPages } = useSelector((state) => state.campers);

  const [filters, setFilters] = useState({
    location: '',
    type: '',
    page: 1,
    limit: 10,
  });

  // При кожній зміні фільтрів робимо запит
  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  const handleSearch = (location) => {
    // При новому пошуку скидаємо сторінку на 1
    setFilters((prev) => ({ ...prev, location, page: 1 }));
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      page: 1, // скидання сторінки при зміні фільтра
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <div>Помилка завантаження даних</div>;

  return (
    <div className={css.catalogPage}>
      <SearchBox onSearch={handleSearch} />
      <FilterComponent onFilterChange={handleFilterChange} />
      {items && items.length > 0 ? (
        <>
          <CampersList campers={items} />
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
  );
};

export default CatalogPage;
