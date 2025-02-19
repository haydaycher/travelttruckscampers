// File: src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campers/campers.slice';
import filtersReducer from './filters/filters.slice';
import favsReducer from './favs/reducer';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favs: favsReducer,
  },
});
