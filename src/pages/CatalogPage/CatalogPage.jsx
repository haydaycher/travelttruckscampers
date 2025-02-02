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

  // Ініціалізація фільтрів (location, type, amenities)
  const [filters, setFilters] = useState({
    location: "", // локація
    form: "", // тип кузова (alcove, semi-integrated, etc.)
    amenities: [], // масив ознак (наприклад, кондиціонер, кухня, і т.д.)
  });

  // Викликаємо fetchCampers з затримкою
  useEffect(() => {
    const delayedFetch = debounce(() => {
      dispatch(fetchCampers(filters));
    }, 500);

    delayedFetch();

    return () => delayedFetch.cancel();
  }, [dispatch, filters]);

  // Обробник зміни пошукового запиту (локація)
  const handleSearch = (location) => {
    setFilters((prev) => ({ ...prev, location }));
  };

  // Обробник зміни фільтрів (наприклад, тип кузова, ознаки)
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (status === "loading") return <Loader />;
  if (status === "failed") return <NotFoundPage />;

  return (
    <div className={css.catalogPage}>
      {/* Пошуковий інпут для локації */}
      <SearchBox onSearch={handleSearch} />

      {/* Фільтри для типу кузова та ознак */}
      <FilterComponent onFilterChange={handleFilterChange} />

      {/* Відображення списку кемперів */}
      <CampersList />
    </div>
  );
};

export default CatalogPage;
