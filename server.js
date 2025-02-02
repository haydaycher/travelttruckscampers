import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

export const fetchCampers = createAsyncThunk('fetchCampers', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/campers');
        return response.data.items;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getCamperById = async (id) => {
    const response = await axios.get(`/campers/${id}`);
    return response.data;
};