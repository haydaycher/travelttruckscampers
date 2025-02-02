import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./campers/campers.slice";
import filtersReducer from "./filters/filters.slice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    // favorites: favoritesReducer,
  },
});
