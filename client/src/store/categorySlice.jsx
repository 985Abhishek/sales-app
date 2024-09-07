// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const initialState = {
//   categories: [],

//   status: "idle",
//   error: null,
// };

// export const fetchCategories = createAsyncThunk(
//   "category/fetchCategories",
//   async () => {
//     const location = useLocation();
//     const url = `${location.pathname}/api/categories`;
//     const response = await axios.get(url);
//     return response.data;
//   }
// );

// export const categorySlice = createSlice({
//   name: "category",
//   initialState,
//   reducers: {
//     addCategory: (state, action) => {
//       console.log("action---", action);
//       state.categories.push(action.payload);
//     },
//     deleteCategory: (state, action) => {
//       state.categories = state.categories.filter(
//         (category) => category.id !== action.payload
//       );
//     },
//     editCategory: (state, action) => {
//       const { id, updatedData } = action.payload;
//       const index = state.categories.findIndex((cat) => cat.id === id);
//       if (index !== -1) {
//         state.categories[index] = {
//           ...state.categories[index],
//           ...updatedData,
//         };
//       }
//     },
//     setCategories: (state, action) => {
//       state.categories = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.categories = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { addCategory, deleteCategory, editCategory, setCategories } =
//   categorySlice.actions;
// export default categorySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useLocation } from "react-router-dom";

const initialState = {
  categories: [],
  status: "idle",
  error: null,

  form: {
    name: "",
    description: "",
  },

  dialog: {
    type: null,
    visible: false,
    confirmActionType: null,
  },
};
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const location = useLocation();
    const url = `${location.pathname}/api/categories`;
    const response = await axios.get(url);
    return response.data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.form.push(action.payload);
    },

    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      ); // when this condition is false then the obj would be deleted
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
      state.form.name = '';
      state.form.description = '';
      
    },

    setFormValues: (state, action) => {
      const { name, description } = action.payload;
      state.form.name = name ?? state.form.name;
      state.form.description = description ?? state.form.description;
    },

    resetForm: (state) => {
      state.form.name = "";
      state.form.description = "";
    },

    // dialog reducer methods
    showDialog: (state, action) => {
      state.dialog = {
        ...state.dialog,
        visible: true,
        type: action.payload.type,
        confirmAction: action.payload.confirmActionType,
      };
    },

    hideDialog: (state) => {
      state.dialog.visible = false;
      state.dialog.type = null;
      state.dialog.confirmActionType = null;
    },

    confirmDialog: (state) => {
      if (state.dialog.confirmActionType) {
        state.dialog.confirmActionType();
      }
      state.dialog.visible = false;
      state.dialog.type = null;
      state.dialog.confirmActionType = null;
    },
  },

  //extra reducers
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

export const {
  addCategory,
  deleteCategory,
  editCategory,
  setCategories,
  setFormValues,
  setEditingId,
  resetForm,
  showDialog,
  hideDialog,
  confirmDialog,
} = categorySlice.actions;

export default categorySlice.reducer;
