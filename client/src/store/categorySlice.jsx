import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useLocation } from "react-router-dom";

const initialState = {
  categories: [],
  status: "idle", 
  error: null,
};


export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const location = useLocation();
    const url =`${location.pathname}/api/categories`
    const response = await axios.get(url); 
    return response.data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {    
      console.log('action---',action);
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    editCategory: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.categories.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...updatedData,
        };
      }
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addCategory, deleteCategory, editCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;
