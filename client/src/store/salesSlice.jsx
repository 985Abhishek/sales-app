import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableData: [],
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setInitialData: (state, action)=>{
state.tableData =[action.payload]
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.tableData.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
        item.totalTax = item.price * quantity * 0.05; 
        item.totalPrice = item.price * quantity + item.totalTax;
      } else {
        state.tableData.push(action.payload);
      }
    },
    calculateTotals: (state) => {
      state.tableData.forEach(() => {
        state.totalTax = state.tableData.reduce((acc, item) => acc + item.totalTax, 0);
        state.totalPrice = state.tableData.reduce((acc, item) => acc + item.totalPrice, 0);
      });
    },
    setSales : (state, action)=> {
      state.tableData = [action.payload]
      //state.tableData = [...state.tableData, ...action.payload]
    },
    saveSale : (state, action)=> {
      state.tableData =  [...state.tableData, ...action.payload]
    },
    clearSales: (state)=> {
      state.tableData = []
    },
  },
});

export const {setInitialData, updateQuantity, calculateTotals, setSales, clearSales, saveSale} = salesSlice.actions;
export default salesSlice.reducer;
