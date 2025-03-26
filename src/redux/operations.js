// operations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCampers = createAsyncThunk(
  'campers/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const {
        location,
        form,
        amenities = [],
        rating,
        engine,
        transmission,
        page = 1,
        limit = 4,
      } = params;
      let url = `${BASE_URL}?page=${page}&limit=${limit}`;

      if (location && location.trim() !== '') {
        url += `&location=${encodeURIComponent(location)}`;
      }

      if (form && typeof form === 'string')
        url += `&form=${encodeURIComponent(form.toLowerCase())}`;

      if (amenities.length > 0) {
        amenities.forEach((amenity) => {
          const param =
            amenity === 'AC' || amenity === 'TV'
              ? amenity
              : amenity.toLowerCase();
          url += `&${param}=true`;
        });
      }

      if (rating && !isNaN(rating)) {
        url += `&rating_gte=${rating}`;
      }

      if (engine && engine.trim() !== '') {
        url += `&engine=${encodeURIComponent(engine.toLowerCase())}`;
      }

      if (transmission && transmission.trim() !== '') {
        url += `&transmission=${encodeURIComponent(
          transmission.toLowerCase(),
        )}`;
      }

      console.log('Fetching URL:', url);
      const response = await axios.get(url);
      if (!response || response.status !== 200) {
        throw new Error('Data fetch failed');
      }
      const { items, total } = response.data;
      const totalPages = Math.ceil(total / limit);
      return { items, totalPages, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchFiltersData = createAsyncThunk(
  'campers/fetchFiltersData',
  async (_, { rejectWithValue }) => {
    try {
      // console.log('Fetching campers with params:', params);
      // console.log('Fetching URL:', url);

      const response = await axios.get(BASE_URL);
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
