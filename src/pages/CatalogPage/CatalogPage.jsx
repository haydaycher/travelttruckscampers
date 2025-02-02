import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import SearchBox from "../../components/SearchBox/SearchBox";
import CampersList from "../../components/CampersList/CampersList";
import Loader from "../../components/Loader/Loader";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import css from "./CatalogPage.module.css";
import FilterComponent from "../../components/FilterComponent/FilterComponent";
import { debounce } from "lodash";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.campers);

  // Ініціалізація фільтрів
  const [filters, setFilters] = useState({
    location: "",
    form: "",
    features: [],
  });

  useEffect(() => {
    const delayedFetch = debounce(() => {
      dispatch(fetchCampers(filters));
    }, 500);
    delayedFetch();
    return () => delayedFetch.cancel();
  }, [dispatch, filters]);

  const handleSearch = (location) => {
    setFilters((prev) => ({ ...prev, location }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (status === "loading") return <Loader />;
  if (status === "failed") return <NotFoundPage />;

  return (
    <div className={css.catalogPage}>
      <SearchBox onSearch={handleSearch} />
      <FilterComponent onFilterChange={handleFilterChange} />
      <CampersList />
    </div>
  );
};

export default CatalogPage;

