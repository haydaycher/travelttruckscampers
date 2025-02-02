import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    form: "",
    features: [],
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setFeatures: (state, action) => {
      state.features = action.payload;
    },
  },
});

export const { setLocation, setForm, setFeatures } = filtersSlice.actions;

export default filtersSlice.reducer;
