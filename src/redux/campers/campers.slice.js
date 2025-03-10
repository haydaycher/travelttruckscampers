// campers/campers.slice.js
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById } from '../operations';

const initialState = {
  items: [],
  selectedCamper: null,
  totalPages: 1,
  status: 'idle',
  error: null,
  notFound: false, // Додано прапорець для 404
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notFound = false;
        state.items = [...action.payload.items]; // Завжди оновлюємо `items`
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notFound = false;
        state.selectedCamper = action.payload;
        if (!state.items.find((item) => item.id === action.payload.id)) {
          state.items.push(action.payload);
        }
      })
      .addMatcher(
        isAnyOf(fetchCampers.pending, fetchCamperById.pending),
        (state) => {
          state.status = 'loading';
          state.error = null;
          state.notFound = false;
        },
      )
      .addMatcher(
        isAnyOf(fetchCampers.rejected, fetchCamperById.rejected),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
          // Якщо це помилка від fetchCampers та містить '404'
          if (
            action.type === fetchCampers.rejected.toString() &&
            action.payload &&
            action.payload.includes('404')
          ) {
            state.notFound = true;
          }
        },
      );
  },
});

export default campersSlice.reducer;
