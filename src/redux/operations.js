// File: src/redux/operations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCampers = createAsyncThunk(
  'campers/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { location, form, page = 1, limit = 10 } = params;
      let url = `${BASE_URL}?page=${page}&limit=${limit}`;
      if (location) url += `&location=${encodeURIComponent(location)}`;
      if (form) url += `&form=${encodeURIComponent(form)}`;

      console.log('Fetching URL:', url);

      const response = await axios.get(url);
      console.log('Response data:', response.data);

      // Припускаємо, що API повертає дані у форматі:
      // { "total": 23, "items": [ ... ] }
      const { total, items } = response.data;
      const totalPages = Math.ceil(total / limit);

      return { items, totalPages };
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        if (error.response.status === 404) {
          // Якщо сервер повернув 404, повертаємо порожній масив
          return { items: [], totalPages: 1 };
        }
        return rejectWithValue(
          `Сервер відповів з помилкою: ${error.response.status}`,
        );
      } else if (error.request) {
        console.error('Error request:', error.request);
        return rejectWithValue('Запит надіслано, але відповідь не отримано');
      } else {
        console.error('Error message:', error.message);
        return rejectWithValue(`Помилка: ${error.message}`);
      }
    }
  },
);

export const fetchCamperById = createAsyncThunk(
  'campers/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          `Сервер відповів з помилкою: ${error.response.status}`,
        );
      } else if (error.request) {
        return rejectWithValue('Запит надіслано, але відповідь не отримано');
      } else {
        return rejectWithValue(`Помилка: ${error.message}`);
      }
    }
  },
);
