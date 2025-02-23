// File: src/pages/CatalogPage/CatalogPage.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/operations';
import SearchBox from '../../components/SearchBox/SearchBox';
import CampersList from '../../components/CampersList/CampersList';
import Loader from '../../components/Loader/Loader';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import NoResultsMessage from '../../components/NoResultsMessage/NoResultsMessage';
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

  // Обробка кнопки "Load More" — збільшуємо номер сторінки
  const handleLoadMore = () => {
    if (searchFilters.page < totalPages) {
      setSearchFilters((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  // Обробка кнопки "Back to Start" — повертаємося на першу сторінку
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
      <div className={css.errorMessage}>
        <h2>Упс! Щось пішло не так 😔</h2>
        <p>Не вдалося отримати дані з сервера.</p>
        <button
          onClick={() => window.location.reload()}
          className={css.retryButton}
        >
          🔄 Оновити сторінку
        </button>
      </div>
    );
  if (items && items.length === 0)
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
        <SearchBox onCategoryChange={handleFilterChange} />
      </div>
      <button
        className={css.show_fav_btn}
        onClick={() => setShowFavorites((prev) => !prev)}
      >
        <span>{showFavorites ? 'Hide Favorites' : 'Show Favorites'}</span>
        <svg width="13px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </button>

      {showFavorites && <FavoritesList />}
      <div className={css.listSection}>
        <CampersList filters={searchFilters} items={items} />
        {searchFilters.page < totalPages ? (
          <button onClick={handleLoadMore} className={css.loadMoreButton}>
            Load More
          </button>
        ) : (
          <button onClick={handleBackToStart} className={css.loadMoreButton}>
            Back to Start
          </button>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
