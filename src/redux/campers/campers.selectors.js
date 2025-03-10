// File: src/redux/campers/campers.selectors.js
// import { createSelector } from '@reduxjs/toolkit';

// export const selectCampers = createSelector(
//   (state) => state.campers.items,
//   (items) => items,
// );

export const selectCampers = (state) => state.campers.items || [];

export const selectStatus = (state) => state.campers.status;
export const selectLoading = (state) => state.campers.loading;
export const selectError = (state) => state.campers.error;
export const selectTotalPages = (state) => state.campers.totalPages;
export const selectSelectedCamper = (state) => state.campers.selectedCamper;
