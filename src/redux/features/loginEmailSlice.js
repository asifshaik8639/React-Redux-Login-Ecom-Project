import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: false,
    token: null,
    status: null
}

export const loginEmailSlice = createSlice({
    name : 'loginEmail',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
            state.error = null;
            state.data = null;
        },
        loginEmailSuccess: (state, action) => {
            // console.log('state in loginEmailSuccess', state);
            // console.log('action in loginEmailSuccess', action);
            state.loading = false;
            state.error = false;
            state.data = action.payload;
            state.token = action.payload.token;
            state.status = "success"
        },
        loginEmailFailure: (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            state.status = "failure";
        },
        resetLoginEmailState: (state) => {
            // Reset to the initial state
            return { ...state, ...initialState };
        }
    }
});

export const {loading, 
              loginEmailSuccess, 
              loginEmailFailure,
              resetLoginEmailState
             } = loginEmailSlice.actions;

export default loginEmailSlice.reducer;