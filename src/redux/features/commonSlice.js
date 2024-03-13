// commonSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  theme: 'light',
  selectedPage: null
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    // Define common actions here
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setSelectedPage: (state, action) => {
      state.selectedPage = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    resetCommonState: (state) => {
      // Reset to the initial state
      return { ...state, ...initialState };
    } 
  },
});

export const { setLoggedIn, 
              setTheme, 
              setSelectedPage, 
              resetCommonState } = commonSlice.actions;
export const selectCommonState = (state) => state.common;
export default commonSlice.reducer;
