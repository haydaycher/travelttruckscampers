// File: src/redux/favs/reducer.js
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './actions';

const initialState = {
  favorites: [], // Початковий стан для зберігання улюблених кемперів
};

const favsReducer = (state = initialState, action) => {
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

export default favsReducer;
