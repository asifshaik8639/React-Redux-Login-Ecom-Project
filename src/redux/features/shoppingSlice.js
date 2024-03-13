import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : 0
}

export const shoppingSlice = createSlice({
    name : 'shopping',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        getApiResponse: (state, action) => {
            state.value += action.payload;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }
});

export const {increment, 
              decrement, 
              getApiResponse,
              incrementByAmount} = shoppingSlice.actions;

export default shoppingSlice.reducer;