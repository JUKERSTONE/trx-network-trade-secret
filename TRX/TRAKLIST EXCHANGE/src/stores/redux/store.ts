import {configureStore} from '@reduxjs/toolkit';
import {
  keysReducer,
  searchReducer,
  profileReducer,
  modalReducer,
  playerReducer,
} from './features';

export const store = configureStore({
  reducer: {
    keys: keysReducer,
    search: searchReducer,
    profile: profileReducer,
    modal: modalReducer,
    player: playerReducer,
  },
});
