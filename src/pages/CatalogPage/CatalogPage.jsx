import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/operations';
import SearchBox from '../../components/SearchBox/SearchBox';
import CampersList from '../../components/CampersList/CampersList';
import Loader from '../../components/Loader/Loader';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import NoResultsMessage from '../../components/NoResultsMessage/NoResultsMessage';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import css from './CatalogPage.module.css';
import { Helmet } from 'react-helmet-async';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { status, items, totalPages } = useSelector((state) => state.campers);

  // Початкові фільтри: 4 записи на запит
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    form: '',
    amenities: [],
    page: 1,
    limit: 4,
  });
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    dispatch(fetchCampers(searchFilters));
  }, [dispatch, searchFilters]);

  const handleFilterChange = (updatedFilters) => {
    setSearchFilters({
      ...updatedFilters,
      page: 1, // при зміні фільтрів починаємо з першої сторінки
      limit: 4,
    });
  };

  // Обробка кнопки "Load More"
  const handleLoadMore = () => {
    if (searchFilters.page < totalPages) {
      setSearchFilters((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  // Обробка кнопки "Back to Start"
  const handleBackToStart = () => {
    setSearchFilters((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleResetFilters = () => {
    setSearchFilters({
      location: '',
      form: '',
      amenities: [],
      page: 1,
      limit: 4,
    });
  };

  if (status === 'loading') return <Loader />;
  if (status === 'failed')
    return (
      <NoResultsMessage errorMessage="Не вдалося отримати дані з сервера." />
    );
  if (items.length === 0)
    return (
      <NoResultsMessage
        filters={searchFilters}
        onResetFilters={handleResetFilters}
      />
    );

  return (
    <div className={css.catalogContainer}>
      <Helmet>
        <title>Catalog of Campers</title>
      </Helmet>
      <div className={css.filterSection}>
        <SearchBox
          onCategoryChange={handleFilterChange}
          showFavorites={showFavorites}
          onToggleFavorites={() => setShowFavorites((prev) => !prev)}
        />
      </div>

      {showFavorites && <FavoritesList />}

      <div className={css.listSection}>
        <CampersList filters={searchFilters} items={items} />
        {searchFilters.page < totalPages ? (
          <LoadMoreBtn onClick={handleLoadMore} />
        ) : (
          <LoadMoreBtn onClick={handleBackToStart} />
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
