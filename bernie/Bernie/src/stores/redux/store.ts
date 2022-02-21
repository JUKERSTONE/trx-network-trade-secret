import {configureStore} from '@reduxjs/toolkit';
import {keysReducer, profileReducer} from './features';

export const store = configureStore({
  reducer: {
    keys: keysReducer,
    profile: profileReducer,
  },
});
