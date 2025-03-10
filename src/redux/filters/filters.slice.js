// filters.slice.js
import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    locations: [],
    forms: [],
    availableFeatures: [],
  },
  reducers: {
    setFiltersData: (state, action) => {
      // Update filters state
      const { locations, forms, availableFeatures } = action.payload;
      state.locations = locations;
      state.forms = forms;
      state.availableFeatures = availableFeatures;
    },
  },
});

export const fetchFiltersData = () => async (dispatch) => {
  try {
    const response = await fetch(
      'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers',
    );
    const data = await response.json();

    // Припустимо, що data – це масив кемперів.
    // Витягнемо унікальні локації та форми:
    const locations = [...new Set(data.map((camper) => camper.location))];
    const forms = [...new Set(data.map((camper) => camper.form))];

    // Приклад фіксованого списку можливих фіч, які може мати кемпер:
    const allFeatures = ['AC', 'Kitchen', 'Bathroom', 'TV'];
    const availableFeatures = allFeatures.filter((feature) =>
      data.some((camper) => camper[feature] === true),
    );

    dispatch(setFiltersData({ locations, forms, availableFeatures }));
  } catch (error) {
    console.error('Error fetching filters:', error);
  }
};

export const { setFiltersData } = filtersSlice.actions;
export default filtersSlice.reducer;
