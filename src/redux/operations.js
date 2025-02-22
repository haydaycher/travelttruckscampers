import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCampers = createAsyncThunk(
  'campers/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { location, form, amenities = [], page = 1, limit = 10 } = params;

      let url = `${BASE_URL}?page=${page}&limit=${limit}`;

      // Додаємо фільтрацію по локації
      if (location) url += `&location=${encodeURIComponent(location)}`;

      // Додаємо фільтрацію по типу кемпера (якщо є)
      if (form) url += `&form=${encodeURIComponent(form.toLowerCase())}`;

      // Якщо обрані amenities, додаємо їх у запит
      if (amenities.length > 0) {
        amenities.forEach((amenity) => {
          // Якщо ключ є "AC" або "TV", залишаємо без змін, інакше переводимо в нижній регістр
          const param =
            amenity === 'AC' || amenity === 'TV'
              ? amenity
              : amenity.toLowerCase();
          url += `&${param}=true`;
        });
      }

      console.log('Fetching URL:', url); // Перевірка формування URL

      const response = await axios.get(url);
      if (!response || response.status !== 200) {
        console.error('Error fetching data:', response);
        throw new Error('Data fetch failed');
      }

      const { items, total } = response.data;
      const totalPages = Math.ceil(total / limit);

      return { items, totalPages };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Фетчинг унікальних значень location, form, amenities
export const fetchFiltersData = createAsyncThunk(
  'campers/fetchFiltersData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL);
      console.log('Response Data:', response.data);

      const campers = response.data;

      const locations = [...new Set(campers.map((camper) => camper.location))];
      const forms = [
        ...new Set(campers.map((camper) => camper.form.toLowerCase())),
      ];

      const allAmenities = [
        'AC',
        'kitchen',
        'bathroom',
        'TV',
        'radio',
        'refrigerator',
        'microwave',
        'gas',
        'water',
      ];
      const availableAmenities = allAmenities.filter((amenity) =>
        campers.some((camper) => camper[amenity] === true),
      );

      return { locations, forms, availableAmenities };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Фетчинг конкретного кемпера за ID
export const fetchCamperById = createAsyncThunk(
  'campers/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      if (!response || response.status !== 200) {
        throw new Error('Failed to fetch camper details');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
