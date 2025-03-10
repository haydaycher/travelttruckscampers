// favorites.selectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectFavorites = createSelector(
  (state) => state.favs.favorites, // ключ "favs" з store.js
  (favorites) => favorites || [],
);
