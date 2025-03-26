// File: src/redux/campers/campers.selectors.js

export const selectCampers = (state) => state.campers.items || [];

export const selectStatus = (state) => state.campers.status;
export const selectLoading = (state) => state.campers.loading;
export const selectError = (state) => state.campers.error;
export const selectTotalPages = (state) => state.campers.totalPages;
export const selectSelectedCamper = (state) => state.campers.selectedCamper;
