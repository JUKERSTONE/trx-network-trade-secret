import {createSlice} from '@reduxjs/toolkit';

export const keysSlice = createSlice({
  name: 'keys',
  initialState: {
    spotify: {
      accessToken: null,
      accessTokenExpirationDate: null,
      refreshToken: null,
    },
  },
  reducers: {
    storeKeysSpotify: (state, action) => {
      const {accessToken, accessTokenExpirationDate, refreshToken} =
        action.payload;
      state.spotify = {
        accessToken,
        accessTokenExpirationDate,
        refreshToken,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeKeysSpotify} = keysSlice.actions;

export const keysReducer = keysSlice.reducer;
