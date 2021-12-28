import {configureStore} from '@reduxjs/toolkit';
import {keysReducer, searchReducer} from './features';

export const store = configureStore({
  reducer: {
    keys: keysReducer,
    search: searchReducer,
  },
});
