import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../../redux/operations';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { Helmet } from 'react-helmet-async';
import css from './CamperDetailsPage.module.css';

const CamperDetailsPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#reviews') {
      setActiveTab('reviews'); // відкриваємо вкладку відгуків
    }
  }, [location.hash]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCamper, status } = useSelector((state) => state.campers);

  const [activeTab, setActiveTab] = useState('features');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchCamperById(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <NotFoundPage />;
  if (!selectedCamper) return <p>No data available</p>;

  const camper = selectedCamper;
  const images = camper.gallery || [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    alert('Booking request sent successfully!');
  };

  return (
    <>
      <Helmet>
        <title>{camper.name} - Camper Details</title>
      </Helmet>
      <div className={css.details_container}>
        {/* 📷 Галерея фото */}
        <div className={css.photo_section}>
          {images.length > 0 ? (
            <>
              <button className={css.prev_btn} onClick={handlePrevImage}>
                ◀
              </button>
              <img
                src={images[currentImageIndex].thumb}
                alt={`${camper.name} ${currentImageIndex + 1}`}
                className={css.detail_photo}
              />
              <button className={css.next_btn} onClick={handleNextImage}>
                ▶
              </button>
            </>
          ) : (
            <p>No photos available</p>
          )}
        </div>

        {/* 📌 Основна інформація */}
        <div className={css.basic_info}>
          <h1>{camper.name}</h1>
          <p className={css.price}>Price: €{camper.price}</p>
          <p className={css.location}>Location: {camper.location}</p>
          <p className={css.description}>{camper.description}</p>
        </div>

        {/* 🟢 Навігація між "Features" та "Reviews" */}
        <div className={css.tabs}>
          <button
            className={`${css.tab} ${activeTab === 'features' ? css.active : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button
            className={`${css.tab} ${activeTab === 'reviews' ? css.active : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        {/* 🔁 Вміст табів */}
        <div className={css.tab_content}>
          {activeTab === 'features' ? (
            <>
              {/* 🔹 Особливості (Amenities) */}
              <h3>Amenities</h3>
              <ul className={css.features_list}>
                {camper.AC && <li>Air Conditioning</li>}
                {camper.kitchen && <li>Kitchen</li>}
                {camper.bathroom && <li>Bathroom</li>}
                {camper.TV && <li>TV</li>}
                {camper.radio && <li>Radio</li>}
                {camper.refrigerator && <li>Refrigerator</li>}
                {camper.microwave && <li>Microwave</li>}
                {camper.gas && <li>Gas</li>}
                {camper.water && <li>Water</li>}
              </ul>

              {/* 🚐 Vehicle Details */}
              <h3>Vehicle Details</h3>
              <ul className={css.vehicle_details}>
                {camper.form && <li>Type: {camper.form}</li>}
                {camper.length && <li>Length: {camper.length}</li>}
                {camper.width && <li>Width: {camper.width}</li>}
                {camper.height && <li>Height: {camper.height}</li>}
                {camper.tank && <li>Tank: {camper.tank}</li>}
                {camper.consumption && (
                  <li>Consumption: {camper.consumption}</li>
                )}
              </ul>
            </>
          ) : (
            <div className={css.reviews}>
              {camper.reviews && camper.reviews.length > 0 ? (
                camper.reviews.map((review, index) => (
                  <div key={index} className={css.review}>
                    {/* 🟢 Користувач */}
                    <div className={css.reviewer_info}>
                      <div className={css.reviewer_icon}>
                        {review.reviewer_name.charAt(0).toUpperCase()}
                      </div>
                      <p className={css.reviewer_name}>
                        {review.reviewer_name}
                      </p>
                    </div>

                    {/* ⭐ Зірковий рейтинг */}
                    <div className={css.star_rating}>
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="16"
                          height="15"
                          viewBox="0 0 16 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use
                            href={`/icons-svg.svg#${
                              i < review.reviewer_rating
                                ? 'icon-star-gold'
                                : 'icon-star'
                            }`}
                          />
                        </svg>
                      ))}
                    </div>

                    {/* 💬 Коментар */}
                    <p className={css.comment}>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </div>
          )}
        </div>

        {/* 🛒 Форма бронювання */}
        <div className={css.booking}>
          <h2>Book your campervan now</h2>
          <p>Stay connected! We are always ready to help you.</p>
          <form className={css.booking_form} onSubmit={handleBookingSubmit}>
            <label>
              Name*:
              <input type="text" name="name" required />
            </label>
            <label>
              Email*:
              <input type="email" name="email" required />
            </label>
            <label>
              Booking date*:
              <input type="date" name="date" required />
            </label>
            <label>
              Comment:
              <input type="text" name="comment" />
            </label>

            <button className={css.send_btn} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CamperDetailsPage;
