// src/features/apiDataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

// Define the async thunk for the API call
export const fetchDataFromLocalStorage = createAsyncThunk('apiData/fetchDataFromLocalSotrage', async () => {
    const storedData = localStorage.getItem('taxes'); // Replace 'myData' with your key
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      throw new Error('No data found in localStorage');
    }
  }
);
 

const apiDataSlice = createSlice({
  name: 'apiData',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFromLocalStorage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDataFromLocalStorage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDataFromLocalStorage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default apiDataSlice.reducer;
