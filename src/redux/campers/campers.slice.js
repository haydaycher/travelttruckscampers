// File: src/redux/campers/campers.slice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById } from '../operations';

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    selectedCamper: null,
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
        // Завжди замінюємо список записів, тому що відображається лише поточна сторінка (4 записи)
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Якщо кемперу ще немає в списку, додаємо його (для деталей)
        if (!state.items.some((camper) => camper.id === action.payload.id)) {
          state.items.push(action.payload);
        }
        state.selectedCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default campersSlice.reducer;
