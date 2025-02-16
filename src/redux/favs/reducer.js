// reducer.js
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './actions';

const initialState = {
  campers: [], // Список всіх кемперів
  favorites: [], // Список улюблених кемперів
};

const camperReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload], // Додаємо кемпера до улюблених
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload), // Видаляємо кемпера з улюблених
      };
    default:
      return state;
  }
};

export default camperReducer;
