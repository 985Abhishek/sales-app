import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    itemList: [],
};

const randomItemSlice = createSlice({
    name: "randomitemSlice",
    initialState,
reducers:{
     setRandomItems : (state, action) => {
        state.itemList = action.payload;
     },
     toggleEditMode: (state) => {
        state.editMode = !state.editMode;
      },
      toggleDeleteMode: (state) => {
        state.deleteMode = !state.deleteMode;
      },
     calculateAmount: (state, action) => {
        const { id, taxType, amount} = action.payload;
        const item = state.itemList.find((item) => item.id === id);
        if(item) {
            if(taxType === 'Fixed') {
                item.taxedAmount = amount * 0.05;
            } else if (taxType === 'Percentage'){
                item.taxedAmount === amount + (amount* 0.05)
            }
        }
     }
     }
});
export const {setRandomItems, calculateAmount, toggleEditMode, toggleDeleteMode} = randomItemSlice.actions;
export default randomItemSlice.reducer;
