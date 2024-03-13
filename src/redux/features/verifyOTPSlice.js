import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: false,
    status: null
}

export const verifyOTPSlice = createSlice({
    name : 'verifyOTP',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
            state.error = null;
            state.data = null;
        },
        verifyOTPSuccess: (state, action) => {
            console.log('state in verifyOTPSuccess', state);
            console.log('action in verifyOTPSuccess', action);
            state.loading = false;
            state.error = false;
            state.data = action.payload;
            state.status = "success";
        },
        verifyOTPFailure: (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;//true
            state.status = "failure";
        },
        resetVerifyOTPState: (state) => {
            // Reset to the initial state
            return { ...state, ...initialState };
        }
    }
});

export const {
              loading, 
              verifyOTPSuccess, 
              verifyOTPFailure,
              resetVerifyOTPState
             } = verifyOTPSlice.actions;

export default verifyOTPSlice.reducer;