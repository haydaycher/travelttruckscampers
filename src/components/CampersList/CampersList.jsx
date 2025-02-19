// File: src/components/CampersList/CampersList.jsx

import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/favs/actions';
import { Link } from 'react-router-dom';
import css from './CampersList.module.css';

const CampersList = ({ items, filters, onPageChange }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favs?.favorites || []);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleFavoriteToggle = (camperId) => {
    if (favorites.includes(camperId)) {
      dispatch(removeFromFavorites(camperId));
    } else {
      dispatch(addToFavorites(camperId));
    }
  };

  return (
    <div className={css.campers_list}>
      <ul>
        {items
          .slice((filters.page - 1) * itemsPerPage, filters.page * itemsPerPage)
          .map((camper) => {
            // Формуємо список amenities, які є в кемпері
            const amenities = [];
            if (camper.AC) amenities.push('AC');
            if (camper.kitchen) amenities.push('Kitchen');
            if (camper.bathroom) amenities.push('Bathroom');
            if (camper.TV) amenities.push('TV');
            if (camper.radio) amenities.push('Radio');
            if (camper.refrigerator) amenities.push('Refrigerator');
            if (camper.microwave) amenities.push('Microwave');
            if (camper.gas) amenities.push('Gas');
            if (camper.water) amenities.push('Water');

            return (
              <li key={camper.id} className={css.campers_item}>
                {/* Фотографія зліва */}
                <img
                  className={css.camper_image}
                  src={camper.gallery[0].thumb}
                  alt={camper.name}
                />

                <div className={css.camper_info}>
                  {/* Назва */}
                  <h3 className={css.camper_name}>{camper.name}</h3>
                  {/* Локація */}
                  <p className={css.location}>{camper.location}</p>
                  {/* Ціна з євро */}
                  <p className={css.price}>Price: €{camper.price}</p>

                  {/* Рейтинг з іконкою перед числовим значенням та кількістю Reviews у дужках */}
                  <p className={css.rating}>
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <use
                        href={`/icons-svg.svg#${
                          camper.rating < 3 ? 'icon-star' : 'icon-star-gold'
                        }`}
                      />
                    </svg>
                    <span className={css.rating_text}>
                      {camper.rating} (
                      {camper.reviews ? camper.reviews.length : 0} Reviews)
                    </span>
                  </p>

                  {/* Статичний текст */}
                  <p className={css.static_text}>
                    The pictures shown here are example vehicles of the
                    respective...
                  </p>

                  {/* Список amenities */}
                  {amenities.length > 0 && (
                    <ul className={css.amenities_list}>
                      {amenities.map((amenity, index) => (
                        <li key={index} className={css.amenity_item}>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Кнопка "Show More" */}
                  <Link
                    to={`/catalog/${camper.id}`}
                    className={css.show_more_btn}
                  >
                    Show More
                  </Link>

                  {/* Блок з кнопкою Favorite */}
                  <div className={css.price_favorite}>
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

                  {/* Трансмісія */}
                  {/* <p className={css.transmission}>
                    Transmission: {camper.transmission}
                  </p> */}
                </div>
              </li>
            );
          })}
      </ul>
      {/* Pagination можна додати за потреби */}
    </div>
  );
};

export default CampersList;
