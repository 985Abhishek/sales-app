import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selects: [],
  selectedProduct: null, // Initially, no product is selected
};

export const selectionSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    selectProduct: (state, action) => {
      state.selectedProduct = state.products.find(
        (product) => product.id === action.payload
      );
    },
    // Other reducers can go here
  },
});

export const { setProducts, selectProduct } = selectionSlice.actions;
export default selectionSlice.reducer;
