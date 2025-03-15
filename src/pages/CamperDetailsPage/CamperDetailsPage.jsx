import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../../redux/operations';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { Helmet } from 'react-helmet-async';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import css from './CamperDetailsPage.module.css';

const CamperDetailsPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCamper, status } = useSelector((state) => state.campers);
  const [activeTab, setActiveTab] = useState('features');

  // Якщо в URL присутній хеш "#reviews", відкриваємо вкладку відгуків
  useEffect(() => {
    if (location.hash === '#reviews') {
      setActiveTab('reviews');
    }
  }, [location.hash]);

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

  // Нова функція бронювання, яка приймає значення форми від Formik
  const handleBookingSubmit = (values) => {
    // Можна додати логіку для відправки даних на сервер
    alert('Booking request sent successfully!');
    console.log('Submitted booking values:', values);
  };

  // Схема валідації з використанням Yup
  const BookingSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    date: Yup.date().required('Required'),
    comment: Yup.string(),
  });

  return (
    <>
      <Helmet>
        <title>{camper.name} - Camper Details</title>
      </Helmet>
      <div className={css.details_container}>
        {/* 📌 Основна інформація */}
        <div className={css.basic_info}>
          <h1>{camper.name}</h1>
          <p className={css.price}>Price: €{camper.price}</p>
          <p className={css.location}>Location: {camper.location}</p>
          {/* 📷 Галерея фото у вигляді сітки */}
          <div className={css.photo_section}>
            {images.length > 0 ? (
              <div className={css.photo_gallery}>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image.thumb}
                    alt={`${camper.name} ${index + 1}`}
                    className={css.gallery_photo}
                  />
                ))}
              </div>
            ) : (
              <p>No photos available</p>
            )}
          </div>
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

              {/* 🚐 Деталі транспортного засобу */}
              <h3>Vehicle Details</h3>
              <ul className={css.vehicle_details}>
                {camper.form && <li>Form {camper.form}</li>}
                {camper.length && <li>Length {camper.length}</li>}
                {camper.width && <li>Width: {camper.width}</li>}
                {camper.height && <li>Height {camper.height}</li>}
                {camper.tank && <li>Tank {camper.tank}</li>}
                {camper.consumption && (
                  <li>Consumption {camper.consumption}</li>
                )}
              </ul>
            </>
          ) : (
            <div className={css.reviews}>
              {camper.reviews && camper.reviews.length > 0 ? (
                camper.reviews.map((review, index) => (
                  <div key={index} className={css.review}>
                    {/* 🟢 Інформація про рецензента */}
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

        {/* 🛒 Форма бронювання через Formik */}
        <div className={css.booking}>
          <h2 className={css.booking_header}>Book your campervan now</h2>
          <p className={css.booking_paragraf}>
            Stay connected! We are always ready to help you.
          </p>
          <Formik
            initialValues={{
              name: '',
              email: '',
              date: '',
              comment: '',
            }}
            validationSchema={BookingSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleBookingSubmit(values);
              setSubmitting(false);
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form className={css.booking_form}>
                <Field type="text" name="name" placeholder="Name*" required />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                />
                {/* Використовуємо render props для date-поля */}
                <div className={css.dateInputWrapper}>
                  <Field name="date">
                    {({ field }) => (
                      <>
                        <input
                          type="date"
                          {...field}
                          id="date"
                          className={css.dateInput}
                          required
                        />
                        {/* Якщо поле порожнє – показуємо псевдо-placeholder */}
                        {!field.value && (
                          <label htmlFor="date" className={css.datePlaceholder}>
                            Booking Date*
                          </label>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <Field type="text" name="comment" placeholder="Comment" />
                <button
                  className={css.send_btn}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Send
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CamperDetailsPage;
