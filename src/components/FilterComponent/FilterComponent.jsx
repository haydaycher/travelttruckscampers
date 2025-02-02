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
      
    </div>
  );
};

export default FilterComponent;
