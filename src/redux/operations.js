import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

// Отримати всі кемпери (з урахуванням фільтрів)
export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async (params = "", { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}${params}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Отримати деталі кемпера
export const fetchCamperById = createAsyncThunk(
  "campers/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
