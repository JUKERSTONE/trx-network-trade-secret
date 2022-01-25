import {createSlice} from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    firebase: null,
    TRX: null,
  },
  reducers: {
    setFirebaseProfile: (state, action) => {
      const firebase = action.payload;
      state.firebase = firebase;
    },
    setTRXProfile: (state, action) => {
      const TRX = action.payload;
      console.log('🚀 ~ file: profile.ts ~ line 16 ~ TRX', TRX);
      state.TRX = TRX;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setFirebaseProfile, setTRXProfile} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
