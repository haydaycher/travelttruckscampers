import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "../operations"; // асинхронні операції

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    selectedCamper: null,
    status: "idle", // "loading", "succeeded", "failed"
    error: null,
  },
  reducers: {
    setCampers(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCampers } = campersSlice.actions;
export default campersSlice.reducer;
