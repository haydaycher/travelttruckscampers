import { useState } from 'react';
import css from './SearchBox.module.css';
import { useDispatch } from 'react-redux';
import { fetchFiltersData, fetchCampers } from '../../redux/operations';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  location: Yup.string().required('Location is required'),
  amenities: Yup.array().of(Yup.string()),
  form: Yup.string(),
});

const amenityIcons = {
  AC: '#icon-wind-blow',
  Automatic: '#icon-scheme',
  Kitchen: '#icon-tea',
  TV: '#icon-comp',
  Bathroom: '#icon-shower',
};

const vehicleTypeIcons = {
  Van: '#icon-three-squares',
  'Fully Integrated': '#icon-four-squares',
  Alcove: '#icon-nine-squares',
};

const SearchBox = ({
  onCategoryChange,
  selectedCategories = [],
  onFavoritesToggle,
}) => {
  const dispatch = useDispatch();
  const [showFavorites, setShowFavorites] = useState(false);

  const handleSubmit = (values) => {
    dispatch(fetchFiltersData(values));
    dispatch(fetchCampers(values));
    onCategoryChange(values);
  };

  const initialValues = {
    location: '',
    amenities: selectedCategories,
    form: '',
  };

  const toggleFavorites = () => {
    const newState = !showFavorites;
    setShowFavorites(newState);
    onFavoritesToggle(newState); // Notify parent component
  };

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
              <h4 className={css.filtersCategory}>Vehicle equipment</h4>
              <div className={css.filterOptions}>
                {['AC', 'Automatic', 'Kitchen', 'TV', 'Bathroom'].map(
                  (category) => (
                    <label key={category} className={css.checkboxWrapper}>
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={category}
                        checked={values.amenities.includes(category)}
                        onChange={() => {
                          const nextValue = values.amenities.includes(category)
                            ? values.amenities.filter(
                                (item) => item !== category,
                              )
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
                  ),
                )}
              </div>
            </div>

            <div className={css.filters}>
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
            </div>

            <div className={css.btnSearchWrap}>
              <button className={css.submitButton} type="submit">
                Search
              </button>
              {values.form && (
                <button
                  className={css.resetBtn}
                  type="button"
                  onClick={() => setFieldValue('form', '')}
                >
                  Reset
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {/* Show Favorites Button */}
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
