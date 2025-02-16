// actions.js
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const addToFavorites = (camperId) => ({
  type: ADD_TO_FAVORITES,
  payload: camperId,
});

export const removeFromFavorites = (camperId) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: camperId,
});
