// reducer.js
const initialState = {
  campers: [],
  loading: false,
  error: null,
};

const campersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CAMPERS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_CAMPERS_SUCCESS':
      return { ...state, loading: false, campers: action.payload };
    case 'FETCH_CAMPERS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default campersReducer;
