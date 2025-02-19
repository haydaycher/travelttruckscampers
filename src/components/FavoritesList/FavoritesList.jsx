import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCamperById } from '../../redux/operations';
import {
  selectSelectedCamper,
  selectStatus,
} from '../../redux/campers/campers.selectors';
import css from './FavoritesList.module.css';

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favs?.favorites || []);
  const campers = useSelector((state) => state.campers.items || []);
  const status = useSelector(selectStatus);

  // Фільтруємо улюблені кемпери, які вже є у store
  const favoriteCampers = campers.filter((camper) =>
    favorites.includes(camper.id),
  );

  // Якщо якогось кемпера немає в `state.campers.items`, завантажуємо його
  useEffect(() => {
    favorites.forEach((id) => {
      if (!campers.some((camper) => camper.id === id)) {
        dispatch(fetchCamperById(id));
      }
    });
  }, [dispatch, favorites, campers]);

  return (
    <div className={css.favoritesList}>
      <h2 className={css.favListHeader}>Your Favorites</h2>
      {status === 'loading' ? (
        <p>Loading favorites...</p>
      ) : favoriteCampers.length > 0 ? (
        <ul>
          {favoriteCampers.map((camper) => (
            <li key={camper.id}>
              <Link to={`/catalog/${camper.id}`} className={css.favoriteLink}>
                {camper.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;
