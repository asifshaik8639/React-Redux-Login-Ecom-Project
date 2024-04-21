import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    razorPaymentID: null,
    orderedProductsList: [],
    loading: false,
    error: false,
    status: null
}

export const PaymentProcessSlice = createSlice({
    name : 'paymentProcess',
    initialState,
    reducers: {
        createOrderSuccess: (state, action) => {
            // console.log('state in createOrderSuccess', state);
            // console.log('action in createOrderSuccess', action);
            state.error = false;
            state.razorPaymentID = action.payload.data;
           // state.orderedProductsList = action.payload.products;
            state.status = "success"
        },
        createOrderFailure: (state, action) => {
            state.loading = false;
            state.razorPaymentID = null;
            state.orderedProductsList = [];
            state.error = action.payload;
            state.status = "failure";
        },
        setOrderedProductAfterPaymentSuccess: (state, action) => {
            state.orderedProductsList = state.orderedProductsList.concat(action.payload);
        },
        resetPaymentProcessState: (state) => {
            // Reset to the initial state
            state.razorPaymentID = null; // temp solution
            // return { ...state, ...initialState,  };
        }
    }
});

export const {
              createOrderSuccess, 
              createOrderFailure,
              setOrderedProductAfterPaymentSuccess,
              resetPaymentProcessState
             } = PaymentProcessSlice.actions;

export default PaymentProcessSlice.reducer;