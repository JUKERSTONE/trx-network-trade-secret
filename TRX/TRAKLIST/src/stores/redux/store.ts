import {configureStore} from '@reduxjs/toolkit';
import {keysReducer} from './features';

export const store = configureStore({
  reducer: {
    keys: keysReducer,
  },
});
