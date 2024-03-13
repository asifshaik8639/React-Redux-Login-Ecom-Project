import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedProduct : null
}

export const ProductDetailsSlice = createSlice({
    name : 'productDetails',
    initialState,
    reducers: {
        setSelectedProduct : (state, action) => {
            // to set the parent node
            console.log('in setSelectedProduct => ', action.payload);
            state.selectedProduct = action.payload;
        },
        resetProductDetailsState: (state) => {
            // Reset to the initial state
            return { ...state, ...initialState };
        } 
    }
});

export const {
                setSelectedProduct, 
                resetProductDetailsState, 
             } = ProductDetailsSlice.actions;

export default ProductDetailsSlice.reducer;