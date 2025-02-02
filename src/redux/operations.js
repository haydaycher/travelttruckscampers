// operations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCampers = createAsyncThunk(
  'campers/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { location, type, page = 1, limit = 10 } = params;
      let url = `${BASE_URL}?page=${page}&limit=${limit}`;

      if (location) url += `&location=${location}`;
      if (type) url += `&type=${type}`;

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(`Server responded with status ${error.response.status}`);
      } else if (error.request) {
        return rejectWithValue('No response received from server');
      } else {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  }
);


// Отримати деталі кемпера
export const fetchCamperById = createAsyncThunk(
  'campers/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      return data;
    } catch (error) {
      if (error.response) {
        // Сервер відповів з помилкою
        return rejectWithValue(`Server responded with status ${error.response.status}`);
      } else if (error.request) {
        // Запит був надісланий, але відповідь не отримана
        return rejectWithValue('No response received from server');
      } else {
        // Інші помилки
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  }
);
