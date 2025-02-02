import { createSlice } from "@reduxjs/toolkit";
const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    features: [],
    form: "",
  },
  reducers: {
    changeFilter: (state, action) => {
      state.location = action.payload.location || state.location;
      state.features = action.payload.features || state.features;
      state.form = action.payload.form || state.form;
    },
  },
});
export const { changeFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
