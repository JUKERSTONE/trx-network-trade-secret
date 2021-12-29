import {createSlice} from '@reduxjs/toolkit';

export const authenticateSlice = createSlice({
  name: 'authenticate',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    signIn: state => {
      state.isAuthenticated = true;
    },
    signOut: state => {
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {signIn, signOut} = authenticateSlice.actions;

export const authenticateReducer = authenticateSlice.reducer;
