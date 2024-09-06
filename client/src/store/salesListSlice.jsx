import { createSlice } from "@reduxjs/toolkit"
import { loadSalesList, saveSaleList } from "../utils/localSotrage"

const initialState = {
    salesList : loadSalesList()
}
const salesListSlice = createSlice({
    name: "SalesList",
    initialState,
    reducers: {
        setSalesList : (state, action)=>{
            state.salesList= action.payload
        },
        addSalesList : (state, action)=>{
            state.salesList.push(action.payload)
            saveSaleList(state.salesList)
        },
        clearSalesList : (state)=>{
            state.salesList = []
            saveSaleList(state.salesList)
        }
    }
})
export const { setSalesList, addSalesList, clearSalesList } = salesListSlice.actions;

export default salesListSlice.reducer;