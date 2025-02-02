import { useState } from "react";
import css from "./FilterComponent.module.css";

const FilterComponent = ({ onFilterChange }) => {
  const [type, setType] = useState("");
  const [features, setAmenities] = useState([]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
    onFilterChange({ type: event.target.value });
  };

  const handleAmenityChange = (event) => {
    const { value, checked } = event.target;
    setAmenities((prev) => {
      const updatedAmenities = checked
        ? [...prev, value]
        : prev.filter((item) => item !== value);

      onFilterChange({ features: updatedAmenities });
      return updatedAmenities;
    });
  };

  return (
    <div className={css.filterContainer}>
      {/* <label>
        Тип кузова:
        <select value={type} onChange={handleTypeChange}>
          <option value="">Всі</option>
          <option value="van">Фургон</option>
          <option value="motorhome">Будинок на колесах</option>
          <option value="trailer">Причіп</option>
        </select>
      </label>

      <fieldset>
        <legend>Зручності:</legend>
        <label>
          <input
            type="checkbox"
            value="airConditioning"
            checked={amenities.includes("airConditioning")}
            onChange={handleAmenityChange}
          />
          Кондиціонер
        </label>

        <label>
          <input
            type="checkbox"
            value="kitchen"
            checked={amenities.includes("kitchen")}
            onChange={handleAmenityChange}
          />
          Кухня
        </label>

        <label>
          <input
            type="checkbox"
            value="bathroom"
            checked={amenities.includes("bathroom")}
            onChange={handleAmenityChange}
          />
          Ванна кімната
        </label>
      </fieldset> */}
    </div>
  );
};

export default FilterComponent;
