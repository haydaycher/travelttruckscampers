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

// The action to fetch data
export const fetchFiltersData = () => async (dispatch) => {
  try {
    const response = await fetch(
      'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers',
    ); // Adjust API endpoint as needed
    const data = await response.json();
    dispatch(setFiltersData(data));
  } catch (error) {
    console.error('Error fetching filters:', error);
  }
};

export const { setFiltersData } = filtersSlice.actions;
export default filtersSlice.reducer;
