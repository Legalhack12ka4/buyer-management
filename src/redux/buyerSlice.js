import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/buyers';

export const fetchBuyers = createAsyncThunk('buyers/fetchBuyers', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addBuyer = createAsyncThunk('buyers/addBuyer', async (buyer) => {
  const response = await axios.post(API_URL, buyer);
  return response.data;
});

export const buyerSlice = createSlice({
  name: 'buyers',
  initialState: { data: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuyers.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addBuyer.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export default buyerSlice.reducer;
