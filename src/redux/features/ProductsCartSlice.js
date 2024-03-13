// commonSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalCartItemsCount: 0,
  cartListsOfProducts: []
};

const ProductsCartSlice = createSlice({
  name: 'productsCart',
  initialState,
  reducers: {
    // Define common actions here
    totalCartItemsCount: (state, action) => {
      state.totalCartItemsCount += action.payload;
    },
    addtoCart: (state, action) => {
      state.cartListsOfProducts.push(action.payload);
      state.totalAmount += action.payload;
    },
    removeCartItem: (state, action) => {
      state.cartListsOfProducts = state.cartListsOfProducts.filter(item => item.id !== action.payload);
      state.totalCartItemsCount -= 1;
    },
    resetCartState : (state) => {
      // Reset to the initial state
      return { ...state, ...initialState };
    }
  },
});

export const {  totalCartItemsCount, 
                resetCartState, 
                addtoCart,
                removeCartItem,
                cartItemsTotalAmount } = ProductsCartSlice.actions;
export default ProductsCartSlice.reducer;
