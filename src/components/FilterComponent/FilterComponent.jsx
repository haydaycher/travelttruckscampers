import { useState } from 'react';
import css from './FilterComponent.module.css';

const FilterComponent = ({ onFilterChange }) => {
  const [type, setType] = useState('');
  const [features, setFeatures] = useState([]);

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setType(newType);
    onFilterChange((prevFilters) => ({
      ...prevFilters,
      type: newType,
    }));
  };

  const handleFeatureChange = (event) => {
    const { value, checked } = event.target;
    setFeatures((prev) => {
      const updatedFeatures = checked
        ? [...prev, value]
        : prev.filter((item) => item !== value);

      onFilterChange((prevFilters) => ({
        ...prevFilters,
        features: updatedFeatures,
      }));
      return updatedFeatures;
    });
  };

  return (
    <div className={css.filterContainer}>
      {/* <label>
        Type:
        <select value={type} onChange={handleTypeChange}>
          <option value="">All</option>
          <option value="van">Van</option>
          <option value="trailer">Trailer</option>
          <option value="motorhome">Motorhome</option>
        </select>
      </label> */}

      {/* <fieldset>
        <legend>Features:</legend>
        <label>
          <input
            type="checkbox"
            value="AC"
            checked={features.includes('AC')}
            onChange={handleFeatureChange}
          />
          Air Conditioning
        </label>
        <label>
          <input
            type="checkbox"
            value="kitchen"
            checked={features.includes('kitchen')}
            onChange={handleFeatureChange}
          />
          Kitchen
        </label>
        <label>
          <input
            type="checkbox"
            value="shower"
            checked={features.includes('shower')}
            onChange={handleFeatureChange}
          />
          Shower
        </label>
      </fieldset> */}
    </div>
  );
};

export default FilterComponent;
