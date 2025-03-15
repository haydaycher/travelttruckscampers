import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/favs/actions';
import { Link } from 'react-router-dom';
import css from './CampersList.module.css';

const CampersList = ({ items, filters }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favs?.favorites || []);

  const handleFavoriteToggle = (camperId) => {
    if (favorites.includes(camperId)) {
      dispatch(removeFromFavorites(camperId));
    } else {
      dispatch(addToFavorites(camperId));
    }
  };

  // Amenity icons mapping
  const amenityIcons = {
    AC: 'icon-wind-blow',
    Automatic: 'icon-scheme',
    Kitchen: 'icon-tea',
    TV: 'icon-comp',
    Bathroom: 'icon-shower',
    Van: 'icon-three-squares',
    'Fully Integrated': 'icon-four-squares',
    Alcove: 'icon-nine-squares',
  };

  return (
    <div className={css.campers_list}>
      <ul>
        {items.map((camper) => {
          // Forming the amenities list
          const amenities = [];
          if (camper.AC) amenities.push('AC');
          if (camper.automatic) amenities.push('Automatic');
          if (camper.kitchen) amenities.push('Kitchen');
          if (camper.TV) amenities.push('TV');
          if (camper.bathroom) amenities.push('Bathroom');
          if (camper.van) amenities.push('Van');
          if (camper.fullyIntegrated) amenities.push('Fully Integrated');
          if (camper.alcove) amenities.push('Alcove');

          // Fallback for image if gallery is empty
          const camperImage =
            camper.gallery?.[0]?.thumb || '/default-image.jpg';

          return (
            <li key={camper.id} className={css.campers_item}>
              <img
                className={css.camper_image}
                src={camperImage}
                alt={camper.name}
              />
              <div className={css.camper_info}>
                <div className={css.camper_internal}>
                  <h3 className={css.camper_name}>{camper.name}</h3>
                  <p className={css.price}>€{camper.price}</p>
                  <div className={css.price_favorite}>
                    <svg
                      onClick={() => handleFavoriteToggle(camper.id)}
                      className={`${css.heart_icon} ${favorites.includes(camper.id) ? css.favorited : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 26 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </div>
                <div className={css.camper_rate_location}>
                  <p className={css.rating}>
                    <Link
                      to={`/catalog/${camper.id}#reviews`}
                      className={css.rating_link}
                    >
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use
                          href={`/icons-svg.svg#${camper.rating < 3 ? 'icon-star' : 'icon-star-gold'}`}
                        />
                      </svg>
                      <span className={css.rating_text}>
                        {camper.rating} (
                        {camper.reviews ? camper.reviews.length : 0} Reviews)
                      </span>
                    </Link>
                  </p>
                  <p className={css.location}>
                    <svg
                      className={css.icon}
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <use href="/icons-svg.svg#icon-map" />
                    </svg>
                    {camper.location}
                  </p>
                </div>
                <p className={css.static_text}>
                  The pictures shown here are example vehicles of the
                  respective...
                </p>
                {amenities.length > 0 && (
                  <ul className={css.amenities_list}>
                    {amenities.slice(0, 4).map((amenity, index) => (
                      <li key={index} className={css.amenity_item}>
                        <svg
                          className={css.icon}
                          aria-hidden="true"
                          focusable="false"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <use
                            href={`/icons-svg.svg#${amenityIcons[amenity]}`}
                          />
                        </svg>
                        {amenity}
                      </li>
                    ))}
                    {amenities.length > 4 && (
                      <li className={css.amenity_item}>...</li>
                    )}
                  </ul>
                )}
                <Link
                  to={`/catalog/${camper.id}`}
                  className={css.show_more_btn}
                >
                  Show More
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CampersList;
