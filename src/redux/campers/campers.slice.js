import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers } from '../operations';

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [], // Має бути масивом!
    totalPages: 1,
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items; // Тут було state.items = action.payload
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default campersSlice.reducer;
