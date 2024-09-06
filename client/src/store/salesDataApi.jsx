import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDataFromLocalStorageSales = createAsyncThunk ('salesDataApi/fetchDataFromLocalStorageSales', async ()=>{
    const storedData = localStorage.getItem('sales');
    if(storedData){
        return JSON.parse(storedData);
    }else{
        throw new Error('No data found in localStorage');
    }
})

const salesDataApi = createSlice({
    name: 'SalesData',
    initialState: {
        showSale : [],
        status : 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error : null,
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchDataFromLocalStorageSales.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(fetchDataFromLocalStorageSales.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.showSale = action.payload;
        })
        .addCase(fetchDataFromLocalStorageSales.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export default salesDataApi.reducer;