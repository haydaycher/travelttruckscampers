import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/operations';
import SearchBox from '../../components/SearchBox/SearchBox';
import CampersList from '../../components/CampersList/CampersList';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import css from './CatalogPage.module.css';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import Pagination from '../../components/Pagination/Pagination';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { status, error, items, totalPages } = useSelector((state) => state.campers);

  const [filters, setFilters] = useState({
    location: '',
    type: '',
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  const handleSearch = (location) => {
    setFilters((prev) => ({ ...prev, location }));
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <NotFoundPage />;

  return (
    <div className={css.catalogPage}>
      <SearchBox onSearch={handleSearch} />
      <FilterComponent onFilterChange={handleFilterChange} />
      <CampersList campers={items} />
      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CatalogPage;
