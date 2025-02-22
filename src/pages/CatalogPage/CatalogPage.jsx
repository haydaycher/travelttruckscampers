// CatalogPage.jsx
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
  const { status, items } = useSelector((state) => state.campers);

  const [searchFilters, setSearchFilters] = useState({
    location: '',
    form: '',
    amenities: [],
    page: 1,
    limit: 10,
  });
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    dispatch(fetchCampers(searchFilters));
  }, [dispatch, searchFilters]);

  const handleFilterChange = (updatedFilters) => {
    setSearchFilters((prev) => ({
      ...prev,
      ...updatedFilters,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setSearchFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setVisibleCount((prevCount) => prevCount + searchFilters.limit);
    setTimeout(() => {
      setIsLoadingMore(false);
    }, 1000);
  };
  const handleResetFilters = () => {
    setSearchFilters({
      location: '',
      form: '',
      amenities: [],
      page: 1,
      limit: 10,
    });
  };

  if (status === 'loading' && !isLoadingMore) return <Loader />;
  // Якщо статус 'failed' – можна відобразити окреме повідомлення про помилку (але це окремий випадок)
  if (status === 'failed')
    return (
      <div className={css.errorMessage}>
        <h2>Упс! Щось пішло не так 😔</h2>
        <p>Не вдалося отримати дані з сервера.</p>
        <p>Можливі причини:</p>
        <ul>
          <li>Проблеми з інтернет-з'єднанням</li>
          <li>Сервер тимчасово недоступний</li>
          <li>Неправильні параметри пошуку</li>
        </ul>
        <p>Спробуйте перезавантажити сторінку або змінити фільтри.</p>
        <button
          onClick={() => window.location.reload()}
          className={css.retryButton}
        >
          🔄 Оновити сторінку
        </button>
      </div>
    );
  // Якщо результатів немає, показуємо NoResultsMessage
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
        {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
      </button>
      {showFavorites && <FavoritesList />}
      <div className={css.listSection}>
        {items && items.length > 0 ? (
          <>
            <CampersList
              filters={searchFilters}
              onPageChange={handlePageChange}
              items={items.slice(0, visibleCount)}
            />
            {visibleCount < items.length && (
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className={`${isLoadingMore ? css.loadingButton : ''}`}
              >
                {isLoadingMore ? 'Завантаження...' : 'Завантажити ще'}
              </button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CatalogPage;
