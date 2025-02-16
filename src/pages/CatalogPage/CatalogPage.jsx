import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/operations';
import SearchBox from '../../components/SearchBox/SearchBox';
import CampersList from '../../components/CampersList/CampersList';
import Loader from '../../components/Loader/Loader';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import Pagination from '../../components/Pagination/Pagination';
import css from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { status, items, totalPages } = useSelector((state) => state.campers);
  const [filters, setFilters] = useState({
    location: '',
    form: '',
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  const handleSearch = (location) => {
    setFilters((prev) => ({ ...prev, location, page: 1 }));
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters((prev) => ({ ...prev, ...updatedFilters, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <div>Помилка завантаження даних</div>;

  return (
    <div className={css.catalogContainer}>
      <div className={css.filterSection}>
        <SearchBox onSearch={handleSearch} />
        <FilterComponent onFilterChange={handleFilterChange} />
      </div>
      <div className={css.listSection}>
        {items && items.length > 0 ? (
          <>
            <CampersList filters={filters} onPageChange={handlePageChange} />

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
