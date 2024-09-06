import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableData: [],  
  totalTax: 0,
  totalPrice:0,
};

export const salesDataSlice = createSlice({
  name: "salesData",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.tableData.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        const item = state.tableData[itemIndex];
        item.quantity = quantity;
        item.totalTax = item.tax * quantity;  
        item.totalPrice = item.price * quantity + item.totalTax;  
      } else {
        state.tableData.push(action.payload);
      }
    },
    calculateTotals: (state) => {
      state.totalTax = state.tableData.reduce((acc, item) => acc + item.totalTax, 0);
      state.totalPrice = state.tableData.reduce((acc, item) => acc + item.totalPrice, 0);
    },
   
  },
});

export const { updateQuantity, calculateTotals } = salesDataSlice.actions;
export default salesDataSlice.reducer;
