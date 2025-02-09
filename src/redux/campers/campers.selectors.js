// File: src/redux/campers/campers.selectors.js
export const selectCampers = (state) => state.campers.items;
export const selectStatus = (state) => state.campers.status;
export const selectTotalPages = (state) => state.campers.totalPages;
