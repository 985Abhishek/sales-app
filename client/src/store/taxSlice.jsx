import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const initialState = {
  taxes: [],

  status: 'idle',
  error: null,

  taxData: {
    name: '',
    description: '',
    amount: '',
    taxType: '',
    TaxedAmount: ''
  }
};

export const fetchTaxes = createAsyncThunk('tax/fetchTaxes', async () => {
  const location = useLocation();
  const url = `${location.pathname}/api/taxes`;
  const response = await axios.get(url);
  return response.data;
});

export const taxSlice = createSlice({
  name: 'tax',
  initialState,
  reducers: {
    addTax: (state, action) => {
      state.taxes.push(action.payload);
    },

    deleteTax: (state, action) => {
      state.taxes = state.taxes.filter((tax) => tax.id !== action.payload.id);
    },

    editTax: (state, action) => {
      const { id } = action.payload;
      const index = state.taxes.findIndex((tax) => tax.id === id);
      if (index !== -1) {
        state.taxes[index] = action.payload;
      }
    },

    setTaxes: (state, action) => {
      state.taxes = action.payload;
    },

    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    resetForm: (state) => {
      state.name = '';
      state.description = '';
      state.taxType = '';
      state.amount = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaxes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTaxes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.taxes = action.payload;
      })
      .addCase(fetchTaxes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addTax, deleteTax, editTax, setTaxes, resetForm,updateField  } = taxSlice.actions;
export default taxSlice.reducer;
