import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: false,
    status: null
}

export const loginOTPSlice = createSlice({
    name : 'loginOTP',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
            state.error = null;
            state.data = null;
        },
        loginOTPSuccess: (state, action) => {
            console.log('state in loginOTPSuccess', state);
            console.log('action in loginOTPSuccess', action);
            state.loading = false;
            state.error = false;
            state.data = action.payload;
            state.status = "success";
        },
        loginOTPFailure: (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;//true
            state.status = "failure"
        },
        resetLoginOTPState: (state) => {
            // Reset to the initial state
            return { ...state, ...initialState };
        }
    }
});

export const {
              loading, 
              loginOTPSuccess, 
              loginOTPFailure,
              resetLoginOTPState
             } = loginOTPSlice.actions;

export default loginOTPSlice.reducer;