import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCamperById } from '../../redux/operations';
import { selectStatus } from '../../redux/campers/campers.selectors';
import css from './FavoritesList.module.css';

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favs?.favorites || []);
  const campers = useSelector((state) => state.campers.items || []);
  const status = useSelector(selectStatus);
  const [isOpen, setIsOpen] = useState(true); // Стейт для відкриття/закриття модального вікна

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

  const closeModal = () => {
    setIsOpen(false); // Закриваємо модальне вікно
  };

  // Закриваємо модальне вікно при кліку на overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal(); // Закриваємо вікно тільки якщо клік на сам фон
    }
  };

  return (
    isOpen && (
      <div className={css.modalOverlay} onClick={handleOverlayClick}>
        <div className={css.favoritesList}>
          <button className={css.closeButton} onClick={closeModal}>
            ×
          </button>
          {status === 'loading' ? (
            <p>Loading favorites...</p>
          ) : favoriteCampers.length > 0 ? (
            <ul>
              {favoriteCampers.map((camper) => (
                <li key={camper.id}>
                  <Link
                    to={`/catalog/${camper.id}`}
                    className={css.favoriteLink}
                  >
                    {camper.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No favorites added yet.</p>
          )}
        </div>
      </div>
    )
  );
};

export default FavoritesList;
