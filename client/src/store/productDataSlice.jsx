import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  description: '',
  productId: '',
  stockQuantity: '',
  price: '',
  category: [], // For multi-select, storing selected categories
  tax: [], // For multi-select, storing selected taxes
};

const productDataSlice = createSlice({
  name: 'productForm',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      // Reset the form back to initial state
      return initialState;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setTax: (state, action) => {
      state.tax = action.payload;
    },
  },
});

export const { updateField, resetForm, setCategory, setTax } = productDataSlice.actions;

export default productDataSlice.reducer;
