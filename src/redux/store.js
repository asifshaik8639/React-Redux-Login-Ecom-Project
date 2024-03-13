import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import shoppingReducer from './features/shoppingSlice';

import loginEmailReducer, { resetLoginEmailState }  from './features/loginEmailSlice';

import loginOTPReducer, { resetLoginOTPState } from './features/loginOTPSlice';

import verifyOTPReducer, { resetVerifyOTPState } from './features/verifyOTPSlice';

import productsCartReducer, { resetCartState } from './features/ProductsCartSlice';

import commonReducer, {resetCommonState} from './features/commonSlice';

import ProductDetailsSliceReducer, {resetProductDetailsState} from './features/ProductDetailsSlice';

import loggingMiddleware from './middleware/loggingMiddleware';

import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';

// const middleware = [
//   loggingMiddleware,
//   thunk
// ];

export const store = configureStore({
  reducer: {
    shopping: shoppingReducer,
    loginEmail: loginEmailReducer,
    loginOTP: loginOTPReducer,
    verifyOTP: verifyOTPReducer,
    common: commonReducer,
    productsCart: productsCartReducer,
    productDetails: ProductDetailsSliceReducer
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, 
                                                                      loggingMiddleware,
                                                                      errorHandlingMiddleware)
});

export const resetAllSliceStates = () => (dispatch) => {
  dispatch(resetCommonState());
  dispatch(resetLoginEmailState());
  dispatch(resetLoginOTPState());
  dispatch(resetVerifyOTPState());
  dispatch(resetCartState());
  dispatch(resetProductDetailsState());
  // ... dispatch reset actions for other slices
};