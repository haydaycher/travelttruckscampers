
import css from "./SearchBox.module.css";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/filters.slice";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { fetchCampers } from "../../redux/operations";

// Схема валідації за допомогою Yup
const validationSchema = Yup.object({
  location: Yup.string().required("Location is required"),
  features: Yup.array().of(Yup.string()),
  form: Yup.string(),
});

// Об'єкт для категорій та відповідних іконок
const featureIcons = {
  AC: "#icon-wind-blow",
  Automatic: "#icon-scheme",
  Kitchen: "#icon-tea",
  TV: "#icon-comp",
  Bathroom: "#icon-shower",
};

const vehicleTypeIcons = {
  Van: "#icon-three-squares", // Replace with actual icon ID
  "Fully Integrated": "#icon-four-squares", // Replace with actual icon ID
  Alcove: "#icon-nine-squares", // Replace with actual icon ID
};

const SearchBox = ({ onSearch, onCategoryChange, selectedCategories = [] }) => {
  const dispatch = useDispatch();

// SearchBox.js (частина handleSubmit)
const handleSubmit = (values) => {
  if (!values.location.trim()) {
    // Можна показати повідомлення користувачу або просто не робити запит
    return;
  }
  dispatch(changeFilter(values));
  dispatch(fetchCampers(values));
};

  const handleSearchChange = (event) => {
    const { value } = event.target;
    onSearch(value); // Pass the search term to the parent component
  };
  // Початкові значення фільтрів
  const initialValues = {
    location: "",
    features: selectedCategories,
    form: "",
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
            {/* Поле для введення локації */}
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
                placeholder="Kyiv, Ukraine"
              />
            </div>

            {/* Секція фільтрів для обладнання транспортного засобу */}
            <div className={css.filters}>
              <h3 className={css.filtersTitle}>Filters</h3>
              <h4 className={css.filtersCategory}>Vehicle equipment</h4>
              <div className={css.filterOptions}>
                {["AC", "Automatic", "Kitchen", "TV", "Bathroom"].map(
                  (category) => (
                    <label key={category} className={css.checkboxWrapper}>
                      <Field
                        type="checkbox"
                        name="features"
                        value={category}
                        checked={values.features.includes(category)}
                        onChange={() => {
                          const nextValue = values.features.includes(category)
                            ? values.features.filter(
                                (item) => item !== category
                              )
                            : [...values.features, category];
                          setFieldValue("features", nextValue);
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
                            href={`/icons-svg.svg${featureIcons[category]}`}
                          />
                        </svg>
                        <p>{category}</p>
                      </div>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Секція фільтрів для типу транспортного засобу */}
            <div className={css.filters}>
              <h4 className={css.filtersCategory}>Vehicle type</h4>
              <div className={css.filterOptions}>
                {["Van", "Fully Integrated", "Alcove"].map((vehicleType) => (
                  <label key={vehicleType} className={css.checkboxWrapper}>
                    <Field
                      type="radio"
                      name="form"
                      value={vehicleType}
                      checked={values.form === vehicleType}
                      onChange={() => setFieldValue("form", vehicleType)}
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
                          href={`/icons-svg.svg${vehicleTypeIcons[vehicleType]}`}
                        />
                      </svg>
                      <p>{vehicleType}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Кнопка застосування фільтрів */}
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
