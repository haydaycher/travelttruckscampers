import css from './SearchBox.module.css';
import { useDispatch } from 'react-redux';
import { fetchFiltersData } from '../../redux/filters/filters.slice';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { fetchCampers } from '../../redux/operations';

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

const SearchBox = ({ onSearch, onCategoryChange, selectedCategories = [] }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    if (!values.location.trim()) return;

    dispatch(fetchFiltersData(values));
    dispatch(fetchCampers(values)); // Переконайтесь, що тут використовуються правильні параметри
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    onSearch(value);
  };

  const initialValues = {
    location: '',
    amenities: selectedCategories, // Використовуємо amenities
    form: '',
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
                placeholder="Search location"
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
                        name="amenities" // Замінили на amenities
                        value={category}
                        checked={values.amenities.includes(category)}
                        onChange={() => {
                          const nextValue = values.amenities.includes(category)
                            ? values.amenities.filter(
                                (item) => item !== category,
                              )
                            : [...values.amenities, category];
                          setFieldValue('amenities', nextValue);
                          onCategoryChange(nextValue); // Call this function
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
                          />
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
                    <div className={css.filterLabelWrapper}>
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
                        />
                      </svg>
                      <p>{vehicleType}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button className={css.submitButton} type="submit">
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBox;
