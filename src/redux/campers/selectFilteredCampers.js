// File: src/redux/campers/selectFilteredCampers.js
import { createSelector } from '@reduxjs/toolkit';
import { selectCampers } from './campers.selectors';
import {
  selectLocationFilter,
  selectFormFilter,
  selectFeaturesFilter,
} from '../filters/filters.selectors';

export const selectFilteredCampers = createSelector(
  [selectCampers, selectLocationFilter, selectFormFilter, selectFeaturesFilter],
  (campers, locationFilter, formFilter, featuresFilter) => {
    return campers.filter((camper) => {
      const matchesLocation = camper.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase());
      const matchesForm = formFilter ? camper.form === formFilter : true;
      const matchesFeatures = featuresFilter.every((feature) =>
        camper.features.includes(feature),
      );
      return matchesLocation && matchesForm && matchesFeatures;
    });
  },
);
