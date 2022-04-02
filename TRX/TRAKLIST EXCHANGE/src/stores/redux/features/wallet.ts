import {createSlice} from '@reduxjs/toolkit';
import {asyncStorageIndex, useAsyncStorage} from '../../async';

const {handleStore} = useAsyncStorage();

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    nft: {},
  },
  reducers: {
    setTRXWallet: (state, action) => {
      const wallet = action.payload;
      console.log('🚀 ~ file: wallet.ts ~ line 12 ~ wallet', wallet);
      state.nft = wallet;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setTRXWallet} = walletSlice.actions;

export const walletReducer = walletSlice.reducer;
