import {configureStore} from '@reduxjs/toolkit';
import {keysReducer, searchReducer, profileReducer} from './features';

export const store = configureStore({
  reducer: {
    keys: keysReducer,
    search: searchReducer,
    profile: profileReducer,
  },
});
