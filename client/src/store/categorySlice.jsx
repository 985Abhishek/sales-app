 import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],

  status: 'idle',
  error: null,

  formData: {
    name: '',
    description: ''
  },

  editingId: null,
  dropDownVisible: null,
  page: 1,
  rowsperpage: 10,
  dialogOpen: false,
  addDialogOpen: false,
  editDialogOpen: false,
  deleteDialogopen: false,
  deleteCategoryId: null
};

export const fetchCategories = createAsyncThunk('categories', async () => {
  const storedData = localStorage.getItem();
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    throw new Error('no data found in localStorage');
  }
});

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
    },
    editCategory: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.categories.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...updatedData
        };
      }
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = {
        name: '',
        description: ''
      };
    },

    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },
    setDropDownVisible: (state, action) => {
      state.dropDownVisible = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setrowsperpage: (state, action) => {
      state.rowsperpage = action.payload;
    },
    openAddDialog: (state) => {
      state.addDialogOpen = true;
    },

    closeAddDialog: (state) => {
      state.addDialogOpen = false;
    },
    openEditDialog: (state) => {
      state.editDialogOpen = true;
    },
    closeEditDialog: (state) => {
      state.editDialogOpen = false;
    },
    openDeleteDialog: (state) => {
      state.deleteDialogopen = true;
    },
    closeDeleteDialog: (state) => {
      state.deleteDialogopen = false;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const {
  addCategory,
  deleteCategory,
  editCategory,
  setCategories,
  updateFormData,
  resetFormData,
  setEditingId,
  setDropDownVisible,
  setPage,
  setrowsperpage,
  openAddDialog,
  closeAddDialog,
  openEditDialog,
  closeEditDialog,
  openDeleteDialog,
  closeDeleteDialog
} = categorySlice.actions;
export default categorySlice.reducer;
