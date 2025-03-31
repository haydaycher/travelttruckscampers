import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCamperById } from '../../redux/operations';
import { selectStatus } from '../../redux/campers/campers.selectors';
import { motion, AnimatePresence } from 'framer-motion';
import css from './FavoritesList.module.css';

const heartVariants = {
  hidden: { opacity: 0, y: 0, scale: 0.8 },
  visible: { opacity: 1, y: -40, scale: 1.2, transition: { duration: 1 } },
  exit: { opacity: 0, y: -80, scale: 1.5, transition: { duration: 0.8 } },
};

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favs?.favorites || []);
  const campers = useSelector((state) => state.campers.items || []);
  const status = useSelector(selectStatus);
  const [isOpen, setIsOpen] = useState(true);
  const [showHearts, setShowHearts] = useState(false);

  const favoriteCampers = campers.filter((camper) =>
    favorites.includes(camper.id),
  );

  useEffect(() => {
    favorites.forEach((id) => {
      if (!campers.some((camper) => camper.id === id)) {
        dispatch(fetchCamperById(id));
      }
    });
  }, [dispatch, favorites, campers]);

  useEffect(() => {
    if (isOpen) {
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 1500);
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    isOpen && (
      <div className={css.modalOverlay} onClick={handleOverlayClick}>
        <motion.div
          className={css.favoritesList}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <button className={css.closeButton} onClick={closeModal}>
            ×
          </button>

          <AnimatePresence>
            {showHearts && (
              <div className={css.heartsContainer}>
                {[...Array(3)].map((_, i) => (
                  <motion.span
                    key={i}
                    className={css.heart}
                    variants={heartVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    ❤️
                  </motion.span>
                ))}
              </div>
            )}
          </AnimatePresence>

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
        </motion.div>
      </div>
    )
  );
};

export default FavoritesList;
