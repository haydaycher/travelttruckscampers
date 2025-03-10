// // File: src/redux/campers/selectFilteredCampers.js
// import { createSelector } from '@reduxjs/toolkit';
// import { selectCampers } from './campers.selectors';
// import {
//   selectLocationFilter,
//   selectFormFilter,
//   selectFeaturesFilter,
// } from '../filters/filters.selectors';

// export const selectFilteredCampers = createSelector(
//   [selectCampers, selectLocationFilter, selectFormFilter, selectFeaturesFilter],
//   (campers, locationFilter, formFilter, featuresFilter) => {
//     return campers.filter((camper) => {
//       const matchesLocation =
//         !locationFilter ||
//         camper.location.toLowerCase().includes(locationFilter.toLowerCase());

//       const matchesForm = !formFilter || camper.form === formFilter;

//       const matchesFeatures =
//         featuresFilter.length === 0 ||
//         featuresFilter.every((feature) =>
//           (camper.features || []).includes(feature),
//         );

//       return matchesLocation && matchesForm && matchesFeatures;
//     });
//   },
// );
