import { createSelector } from "@reduxjs/toolkit";
import { selectCampers } from "../campers/campers.selectors"; // або коректний шлях до селектора кемперів
import {
  selectLocationFilter,
  selectFormFilter,
  selectFeaturesFilter,
} from "../filters/filters.selectors"; // селектори фільтрів

export const selectFilteredCampers = createSelector(
  [selectCampers, selectLocationFilter, selectFormFilter, selectFeaturesFilter],
  (campers, locationFilter, formFilter, featuresFilter) => {
    if (!Array.isArray(campers)) {
      return []; // Повертаємо порожній масив, якщо campers не є масивом
    }

    return campers.filter((camper) => {
      const matchesLocation = camper.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase());
      const matchesForm = formFilter ? camper.form === formFilter : true;
      const matchesFeatures = featuresFilter.every((feature) =>
        camper.features.includes(feature)
      );

      return matchesLocation && matchesForm && matchesFeatures;
    });
  }
);
