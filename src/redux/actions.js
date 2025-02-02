// actions.js
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
