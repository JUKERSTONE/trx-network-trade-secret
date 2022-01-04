import {createSlice} from '@reduxjs/toolkit';

export const keysSlice = createSlice({
  name: 'keys',
  initialState: {
    spotify: {
      bernie: {
        access_token: null,
        expires_in: null,
        token_type: null,
      },
    },
  },
  reducers: {
    storeKeysSpotifyClient: (state, action) => {
      const {access_token, expires_in, token_type} = action.payload;
      state.spotify.bernie = {
        access_token,
        expires_in,
        token_type,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeKeysSpotifyClient} = keysSlice.actions;

export const keysReducer = keysSlice.reducer;
