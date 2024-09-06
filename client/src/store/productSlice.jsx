import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const productIndex = state.products.findIndex((p) => p.id === id);
      if (productIndex !== -1) {
        state.products[productIndex] = updatedProduct;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    setProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addProduct, editProduct, deleteProduct, setProduct } = productSlice.actions;

//fetchproducts method to get products value 

export const fetchproducts = () => async (dispatch) => {
try {
  const response = await fetch('/products')
  console.log('response response ----',response )
  // dispatch(setProduct(response.data))
  return response
} catch (error) {
  console.error("failed to fetch products: ", error )
}
};

export default productSlice.reducer;
