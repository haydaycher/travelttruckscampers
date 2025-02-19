// File: src/components/CampersList/CampersList.jsx

import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/favs/actions';
import Pagination from '../Pagination/Pagination';
import css from './CampersList.module.css';

const CampersList = ({ items, filters, onPageChange }) => {
  const dispatch = useDispatch();
  // Отримуємо список улюблених кемперів з Redux store,
  // використовуючи optional chaining, щоб уникнути помилок, якщо favs не визначено
  const favorites = useSelector((state) => state.favs?.favorites || []);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Функція для додавання/видалення кемпера з улюблених
  const handleFavoriteToggle = (camperId) => {
    if (favorites.includes(camperId)) {
      dispatch(removeFromFavorites(camperId)); // Якщо кемпер вже є улюбленим, видаляємо його
    } else {
      dispatch(addToFavorites(camperId)); // Інакше, додаємо до улюблених
    }
  };

  return (
    <div className={css.campers_list}>
      <ul>
        {items
          .slice((filters.page - 1) * itemsPerPage, filters.page * itemsPerPage)
          .map((camper) => (
            <li key={camper.id} className={css.campers_item}>
              <h3 className={css.camper_name}>{camper.name}</h3>
              <img
                className={css.camper_image}
                src={camper.gallery[0].thumb}
                alt={camper.name}
              />
              <div className={css.camper_info}>
                <p>{camper.location}</p>
                <p>{camper.description}</p>
                {/* Блок з ціною та іконкою серця */}
                <div className={css.price_favorite}>
                  <p>Price: ${camper.price}</p>
                  {/* SVG-іконка серця з обробником кліку */}
                  <svg
                    onClick={() => handleFavoriteToggle(camper.id)}
                    className={`${css.heart_icon} ${
                      favorites.includes(camper.id) ? css.favorited : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <p>Rating: {camper.rating}</p>
                <p>Transmission: {camper.transmission}</p>
              </div>
            </li>
          ))}
      </ul>
      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default CampersList;
