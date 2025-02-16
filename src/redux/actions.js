// File: src/redux/actions.js
export const fetchCampersRequest = () => ({
  type: 'FETCH_CAMPERS_REQUEST',
});

export const fetchCampersSuccess = (campers) => ({
  type: 'FETCH_CAMPERS_SUCCESS',
  payload: campers,
});

export const fetchCampersFailure = (error) => ({
  type: 'FETCH_CAMPERS_FAILURE',
  payload: error,
});

export const addFavorite = (camperId) => ({
  type: 'ADD_FAVORITE',
  payload: camperId,
});

export const removeFavorite = (camperId) => ({
  type: 'REMOVE_FAVORITE',
  payload: camperId,
});

export const setPage = (page) => ({
  type: 'SET_PAGE',
  payload: page,
});
