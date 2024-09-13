import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../store/categorySlice";
import taxReducer from "../store/taxSlice";
import dialogReducer from "../store/dialogSlice";
import productReducer from "../store/productSlice";
import productDataReducer from "../store/productDataSlice";
import apiDataReducer from "../store/apiDataSlice";
import salesSliceReducer from "../store/salesDataSlice";
import selectionSliceReducer from "../store/selectionSlice";
import salesDataReducer from "../store/salesDataApi";
import salesListReducer from "../store/salesListSlice";
 import taxDataReducer from "../store/taxDataSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    tax: taxReducer,
      form: taxDataReducer,
    dialog: dialogReducer,
    product: productReducer,
    productData: productDataReducer,
    // fetchTaxes : fetchTaxes
    apiData: apiDataReducer,
    sales: salesSliceReducer,
    select: selectionSliceReducer,
    middleWare: [thunk],
    salesData : salesDataReducer,
    salesList : salesListReducer
  },
});

export default store;
