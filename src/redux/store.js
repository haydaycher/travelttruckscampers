// store.js
import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campers/campers.slice';
import filtersReducer from './filters/filters.slice';
import favoritesReducer from './favs/reducer';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favs: favoritesReducer,
  },
});
