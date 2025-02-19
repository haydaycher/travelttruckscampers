// File: src/components/FavoritesList/FavoritesList.jsx

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Імпортуємо Link для навігації
import css from './FavoritesList.module.css';

const FavoritesList = () => {
  // Отримуємо список id улюблених кемперів з Redux store з використанням optional chaining
  const favorites = useSelector((state) => state.favs?.favorites || []);
  // Отримуємо загальний список кемперів, який вже завантажено з бекенду
  const campers = useSelector((state) => state.campers.items || []);

  // Фільтруємо список кемперів, залишаючи лише ті, які є в улюблених
  const favoriteCampers = campers.filter((camper) =>
    favorites.includes(camper.id),
  );

  return (
    <div className={css.favoritesList}>
      <h2>Your Favorites</h2>
      {favoriteCampers.length > 0 ? (
        <ul>
          {favoriteCampers.map((camper) => (
            <li key={camper.id}>
              {/* Кожен елемент у списку є посиланням на сторінку деталей цього кемпера.
                  Припускаємо, що маршрут для деталей виглядає так: /campers/:id */}
              <Link to={`/campers/${camper.id}`} className={css.favoriteLink}>
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
