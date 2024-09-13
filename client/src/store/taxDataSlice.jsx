import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  amount: "",
  taxType: "",
  TaxedAmount: ""
};

export const taxDataSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      state.name = "";
      state.description = "";
      state.taxType = "";
      state.amount = "";
    },
  },
});



export const { updateField, resetForm } = taxDataSlice.actions;

export default taxDataSlice.reducer;