import { createSlice } from "@reduxjs/toolkit";

const filtersInitialState = {
  location: "",
  features: [],
  form: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersInitialState,
  reducers: {
    changeFilter: (state, action) => {
      state.location = action.payload.location || state.location;
      state.features = action.payload.features || state.features;
      state.form = action.payload.form || state.form;
      // Persist the updated filters to localStorage
      localStorage.setItem("filters", JSON.stringify(state));
    },
    resetFilters: (state) => {
      // Clear filters from localStorage
      localStorage.removeItem("filters");
      return filtersInitialState;
    },
    loadFilters: (state) => {
      const savedFilters = localStorage.getItem("filters");
      if (savedFilters) {
        return JSON.parse(savedFilters);
      }
      return state;
    },
  },
});

export const { changeFilter, resetFilters, loadFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
