// File: src/redux/campers/reducer.js
const initialState = {
  campers: [],
  loading: false,
  error: null,
  favorites: [], // Містить список ID улюблених кемперів
};

const campersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CAMPERS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_CAMPERS_SUCCESS':
      return { ...state, loading: false, campers: action.payload };
    case 'FETCH_CAMPERS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload),
      };
    default:
      return state;
  }
};

export default campersReducer;
