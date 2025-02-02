// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

// // Функція для формування параметрів запиту
// const createQueryParams = (filters) => {
//   const params = new URLSearchParams();

//   if (filters.location) params.append("location", filters.location);
//   if (filters.form) params.append("form", filters.form);
//   if (filters.features && filters.features.length > 0) {
//     filters.features.forEach((feature) => params.append(feature, true));
//   }

//   return params.toString();
// };

// // Оновлена функція для отримання оголошень
// export const fetchCampers = createAsyncThunk(
//   "campers/fetchCampers",
//   async (filters, { rejectWithValue }) => {
//     try {
//       const query = createQueryParams(filters); // формуємо параметри запиту
//       const response = await axios.get(`${BASE_URL}?${query}`);

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Отримати деталі кемпера
// export const fetchCamperById = createAsyncThunk(
//   "campers/fetchById",
//   async (id, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(`${BASE_URL}/${id}`);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCampers = createAsyncThunk(
  'campers/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryString = qs.stringify(params);
      const response = await axios.get(`${BASE_URL}${queryString ? `?${queryString}` : ''}`);
      return response.data;
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

