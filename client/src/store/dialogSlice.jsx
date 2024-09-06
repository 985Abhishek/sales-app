import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  formData: null,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.open = true;
      state.formData = action.payload || null;
    },

    closeDialog: (state, action) => {
      (state.open = false), (state.formData = null);
    },

    updateDialogData: (state, action) => {
      const { field, value } = action.payload;
      state.formData = { ...state.formData, [field]: value };
    },
  },
});
export const { openDialog, closeDialog, updateDialogData } = dialogSlice.actions;

export default dialogSlice.reducer;
