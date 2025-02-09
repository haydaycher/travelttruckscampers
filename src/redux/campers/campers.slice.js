// File: src/redux/campers/campers.slice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers } from '../operations';

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    totalPages: 1, // Додаємо totalPages до початкового стану
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
        // Очікуємо, що thunk повертає { items, totalPages }
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default campersSlice.reducer;
