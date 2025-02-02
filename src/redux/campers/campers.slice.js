import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ filters, page, pageSize }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.location) queryParams.append("location", filters.location);
      if (filters.form) queryParams.append("form", filters.form);
      filters.features.forEach((feature) => {
        if (feature) queryParams.append(feature, true);
      });
      queryParams.append("page", page);
      queryParams.append("pageSize", pageSize);

      const response = await axios.get(`${BASE_URL}?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    page: 1,
    pageSize: 10,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
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
      });
  },
});

export const { setPage, setPageSize } = campersSlice.actions;
export default campersSlice.reducer;
