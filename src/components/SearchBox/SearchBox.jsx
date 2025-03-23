import { useState } from 'react';
import css from './SearchBox.module.css';
import { useDispatch } from 'react-redux';
import { fetchFiltersData, fetchCampers } from '../../redux/operations';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  location: Yup.string(), // робимо необов’язковим, щоб шукати без локації
  amenities: Yup.array().of(Yup.string()),
  form: Yup.string(),
  rating: Yup.number()
    .min(0, 'Рейтинг не може бути менше 0')
    .max(5, 'Рейтинг не може бути більше 5')
    .nullable(),
  engine: Yup.string(),
  transmission: Yup.string(),
});

const amenityIcons = {
  AC: '#icon-wind-blow',
  Kitchen: '#icon-tea',
  Bathroom: '#icon-shower',
  TV: '#icon-comp',
  Radio: '#icon-radio',
  Refrigerator: '#icon-frige',
  Microwave: '#lucide--microwave',
  Gas: '#icon-gas',
  Water: '#icon-water',
};

const vehicleTypeIcons = {
  Van: '#icon-three-squares',
  'Fully Integrated': '#icon-four-squares',
  Alcove: '#icon-nine-squares',
};
// Іконки для типу двигуна
const engineTypeIcons = {
  petrol: '#bi--fuel-pump',
  diesel: '#bi--fuel-pump-diesel',
  electric: '#material-symbols--electric-car-outline',
  hybrid: '#carbon--hybrid-networking',
};

// Іконки для трансмісії
const transmissionIcons = {
  manual: '#icon-park-outline--manual-gear',
  automatic: '#icon-scheme',
};

const SearchBox = ({
  onCategoryChange,
  selectedCategories = [],
  onFavoritesToggle,
}) => {
  const dispatch = useDispatch();
  const [showFavorites, setShowFavorites] = useState(false);

  const handleSubmit = (values) => {
    const searchParams = {
      ...values,
      location: values.location.trim() || undefined,
    };

    dispatch(fetchFiltersData(searchParams));
    dispatch(fetchCampers(searchParams));
    onCategoryChange(searchParams);
  };

  const initialValues = {
    location: '',
    amenities: selectedCategories,
    form: '',
    rating: '',
    engine: '',
    transmission: '',
  };

  const toggleFavorites = () => {
    const newState = !showFavorites;
    setShowFavorites(newState);
    onFavoritesToggle(newState);
  };

  // Розширений список обладнання
  const amenitiesList = [
    'AC',
    'Kitchen',
    'Bathroom',
    'TV',
    'Radio',
    'Refrigerator',
    'Microwave',
    'Gas',
    'Water',
  ];

  return (
    <div className={css.wrapperSearch}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <label className={css.labelSearch} htmlFor="location">
              Location:
            </label>
            <div className={css.inputWrapper}>
              <svg
                className={css.icon}
                aria-hidden="true"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <use href="/icons-svg.svg#icon-map"></use>
              </svg>
              <Field
                className={css.inputSearch}
                type="text"
                name="location"
                placeholder="Наприклад, Kyiv або Lviv"
              />
            </div>

            <div className={css.filters}>
              <h3 className={css.filtersTitle}>Filters</h3>
              {/* Фільтр за обладнанням */}
              <h4 className={css.filtersCategory}>Vehicle equipment</h4>
              <div className={css.filterOptions}>
                {amenitiesList.map((category) => (
                  <label key={category} className={css.checkboxWrapper}>
                    <Field
                      type="checkbox"
                      name="amenities"
                      value={category}
                      checked={values.amenities.includes(category)}
                      onChange={() => {
                        const nextValue = values.amenities.includes(category)
                          ? values.amenities.filter((item) => item !== category)
                          : [...values.amenities, category];
                        setFieldValue('amenities', nextValue);
                      }}
                    />
                    <div className={css.iconWrapper}>
                      <svg
                        className={css.icon}
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <use
                          href={`/icons-svg.svg${amenityIcons[category] || ''}`}
                        ></use>
                      </svg>
                      <p>{category}</p>
                    </div>
                  </label>
                ))}
              </div>
              {/* Фільтр за типом транспортного засобу */}
              <h4 className={css.filtersCategory}>Vehicle type</h4>
              <div className={css.filterOptions}>
                {['Van', 'Fully Integrated', 'Alcove'].map((vehicleType) => (
                  <label key={vehicleType} className={css.checkboxWrapper}>
                    <Field
                      type="radio"
                      name="form"
                      value={vehicleType}
                      checked={values.form === vehicleType}
                      onChange={() => setFieldValue('form', vehicleType)}
                    />
                    <div className={css.iconWrapper}>
                      <svg
                        className={css.icon}
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <use
                          href={`/icons-svg.svg${vehicleTypeIcons[vehicleType] || ''}`}
                        ></use>
                      </svg>
                      <p>{vehicleType}</p>
                    </div>
                  </label>
                ))}
              </div>
              {/* // Фільтр за типом двигуна */}
              <h4 className={css.filtersCategory}>Engine Type</h4>
              <div className={css.filterOptions}>
                {Object.keys(engineTypeIcons).map((engineType) => (
                  <label key={engineType} className={css.checkboxWrapper}>
                    <Field
                      type="radio"
                      name="engine"
                      value={engineType}
                      checked={values.engine === engineType}
                      onChange={() => setFieldValue('engine', engineType)}
                    />
                    <div className={css.iconWrapper}>
                      <svg
                        className={css.icon}
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use
                          href={`/icons-svg.svg${engineTypeIcons[engineType]}`}
                        ></use>
                      </svg>
                      <p>
                        {engineType.charAt(0).toUpperCase() +
                          engineType.slice(1)}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
              {/* // Фільтр за трансмісією */}
              <h4 className={css.filtersCategory}>Transmission</h4>
              <div className={css.filterOptions}>
                {Object.keys(transmissionIcons).map((transmissionType) => (
                  <label key={transmissionType} className={css.checkboxWrapper}>
                    <Field
                      type="radio"
                      name="transmission"
                      value={transmissionType}
                      checked={values.transmission === transmissionType}
                      onChange={() =>
                        setFieldValue('transmission', transmissionType)
                      }
                    />
                    <div className={css.iconWrapper}>
                      <svg
                        className={css.icon}
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use
                          href={`/icons-svg.svg${transmissionIcons[transmissionType]}`}
                        ></use>
                      </svg>
                      <p>
                        {transmissionType.charAt(0).toUpperCase() +
                          transmissionType.slice(1)}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
              <div className={css.btnSearchWrap}>
                <button className={css.submitButton} type="submit">
                  Search
                </button>
                {(values.form ||
                  values.amenities.length > 0 ||
                  values.rating ||
                  values.engine ||
                  values.transmission) && (
                  <button
                    className={css.resetBtn}
                    type="button"
                    onClick={() => {
                      setFieldValue('amenities', []);
                      setFieldValue('form', '');
                      setFieldValue('rating', '');
                      setFieldValue('engine', '');
                      setFieldValue('transmission', '');
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <button
        type="button"
        className={css.favoritesToggleButton}
        onClick={toggleFavorites}
      >
        <span>Show Favorites</span>
        <svg width="13px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default SearchBox;
