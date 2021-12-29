import {configureStore} from '@reduxjs/toolkit';
import {keysReducer, searchReducer, authenticateReducer} from './features';

export const store = configureStore({
  reducer: {
    keys: keysReducer,
    search: searchReducer,
    authenticate: authenticateReducer,
  },
});
