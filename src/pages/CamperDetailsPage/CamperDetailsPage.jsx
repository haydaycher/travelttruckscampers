import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../../redux/operations';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { Helmet } from 'react-helmet-async';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

  // Функція для обробки бронювання
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
        {/* Основна інформація */}
        <div className={css.basic_info}>
          <h1 className={css.camperName}>{camper.name}</h1>
          {/* <p className={css.camperLocation}>{camper.location}</p> */}

          <div className={css.camper_rate_location}>
            <div className={css.rating_location_container}>
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
                  viewBox="0 0 16 16"
                >
                  <use href="/icons-svg.svg#icon-map" />
                </svg>
                {camper.location}
              </p>
            </div>

            <p className={css.camperPrice}>€{camper.price}</p>
          </div>

          {/* Галерея фото */}
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
        {/* Навігація між "Features" та "Reviews" */}
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
        <div className={css.bottomContainer}>
          {/* Вміст табів */}
          <div className={css.tab_content}>
            {activeTab === 'features' ? (
              <>
                <ul className={css.features_list}>
                  {camper.AC && (
                    <li className={css.features_item}>
                      <svg className={css.features_icon} aria-hidden="true">
                        <use href={`/icons-svg.svg#icon-wind-blow`} />
                      </svg>
                      AC
                    </li>
                  )}
                  {camper.kitchen && (
                    <li className={css.features_item}>
                      <svg className={css.features_icon} aria-hidden="true">
                        <use href={`/icons-svg.svg#icon-tea`} />
                      </svg>
                      Kitchen
                    </li>
                  )}
                  {camper.bathroom && (
                    <li className={css.features_item}>
                      <svg className={css.features_icon} aria-hidden="true">
                        <use href={`/icons-svg.svg#icon-shower`} />
                      </svg>
                      Bathroom
                    </li>
                  )}
                  {camper.TV && (
                    <li className={css.features_item}>
                      <svg className={css.features_icon} aria-hidden="true">
                        <use href={`/icons-svg.svg#icon-comp`} />
                      </svg>
                      TV
                    </li>
                  )}
                  {camper.radio && (
                    <li className={css.features_item}>
                      <svg className={css.features_icon} aria-hidden="true">
                        <use href={`/icons-svg.svg#icon-radio`} />
                      </svg>
                      Radio
                    </li>
                  )}
                  {camper.refrigerator && (
                    <li className={css.features_item}>
                      <svg className={css.features_icon} aria-hidden="true">
                        <use href={`/icons-svg.svg#icon-frige`} />
                      </svg>
                      Refrigerator
                    </li>
                  )}
                  {camper.microwave && (
                    <li className={css.features_item}>
                      <svg className={css.features_icon} aria-hidden="true">
                        <use href={`/icons-svg.svg#lucide--microwave`} />
                      </svg>
                      Microwave
                    </li>
                  )}
                  {camper.gas && (
                    <li className={css.features_item}>
                      <svg className={css.features_icon} aria-hidden="true">
                        <use href={`/icons-svg.svg#icon-gas`} />
                      </svg>
                      Gas
                    </li>
                  )}
                  {camper.water && (
                    <li className={css.features_item}>
                      <svg className={css.features_icon} aria-hidden="true">
                        <use href={`/icons-svg.svg#icon-water`} />
                      </svg>
                      Water
                    </li>
                  )}
                </ul>

                <h3 className={css.vehicle_header}>Vehicle Details</h3>
                <ul className={css.vehicle_details}>
                  {camper.form && (
                    <li>
                      <span className="left">Form</span>
                      <span className="right">{camper.form}</span>
                    </li>
                  )}
                  {camper.length && (
                    <li>
                      <span className="left">Length</span>
                      <span className="right">{camper.length}</span>
                    </li>
                  )}
                  {camper.width && (
                    <li>
                      <span className="left">Width</span>
                      <span className="right">{camper.width}</span>
                    </li>
                  )}
                  {camper.height && (
                    <li>
                      <span className="left">Height</span>
                      <span className="right">{camper.height}</span>
                    </li>
                  )}
                  {camper.tank && (
                    <li>
                      <span className="left">Tank</span>
                      <span className="right">{camper.tank}</span>
                    </li>
                  )}
                  {camper.consumption && (
                    <li>
                      <span className="left">Consumption</span>
                      <span className="right">{camper.consumption}</span>
                    </li>
                  )}
                </ul>
              </>
            ) : (
              <div className={css.reviews}>
                {camper.reviews && camper.reviews.length > 0 ? (
                  camper.reviews.map((review, index) => (
                    <div key={index} className={css.review}>
                      <div className={css.reviewer_info}>
                        <div className={css.reviewer_icon}>
                          {review.reviewer_name.charAt(0).toUpperCase()}
                        </div>
                        <p className={css.reviewer_name}>
                          {review.reviewer_name}
                        </p>
                      </div>
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
                      <p className={css.comment}>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews available</p>
                )}
              </div>
            )}
          </div>

          {/* Форма бронювання */}
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

                  <Field name="date">
                    {({ field, form }) => (
                      <DatePicker
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date) =>
                          form.setFieldValue(field.name, date)
                        }
                        placeholderText="Booking Date*"
                        className={css.dateInput}
                        calendarClassName={css.customCalendar}
                        popperClassName={css.customPopper}
                        dateFormat="dd/MM/yyyy"
                        renderCustomHeader={({
                          date,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div className={css.header}>
                            <button
                              type="button"
                              onClick={decreaseMonth}
                              disabled={prevMonthButtonDisabled}
                              className={css.navButton}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
                                  fill="#475467"
                                />
                              </svg>
                            </button>

                            <span className={css.monthYear}>
                              {date.toLocaleString('en-US', { month: 'long' })}{' '}
                              {date.getFullYear()}
                            </span>

                            <button
                              type="button"
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                              className={css.navButton}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8.29289 4.29289C7.90237 4.68342 7.90237 5.31658 8.29289 5.70711L14.5858 12L8.29289 18.2929C7.90237 18.6834 7.90237 19.3166 8.29289 19.7071C8.68342 20.0976 9.31658 20.0976 9.70711 19.7071L16.7071 12.7071C17.0976 12.3166 17.0976 11.6834 16.7071 11.2929L9.70711 4.29289C9.31658 3.90237 8.68342 3.90237 8.29289 4.29289Z"
                                  fill="#475467"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                        dayClassName={(date) => {
                          const isSameMonth =
                            date.getMonth() === new Date().getMonth();
                          return isSameMonth
                            ? css.currentMonthDay
                            : css.otherMonthDay;
                        }}
                      />
                    )}
                  </Field>

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
      </div>
    </>
  );
};

export default CamperDetailsPage;
