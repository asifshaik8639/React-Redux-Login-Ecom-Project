// commonSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  theme: 'light',
  selectedPage: null,
  userProfileData: null,
  userProfileError: false // user profile is common hence moved here
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
    setUserProfile: (state, action) => {
      state.userProfileData = action.payload;
      state.userProfileError = false;
    },
    setUserProfileError: (state, action) => {
      state.userProfileError = true;
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
              setUserProfile,
              setUserProfileError, 
              resetCommonState } = commonSlice.actions;
export const selectCommonState = (state) => state.common;
export default commonSlice.reducer;
