import {createSlice} from '@reduxjs/toolkit';
import {asyncStorageIndex, useAsyncStorage} from '../../async';

const {handleStore} = useAsyncStorage();

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    nft: [],
    trak: [],
  },
  reducers: {
    setTRXWallet: (state, action) => {
      const {items, type} = action.payload;
      // console.log('🚀 ~ file: wallet.ts ~ line 12 ~ wallet', wallet);

      switch (type) {
        case 'nft':
          state.nft = items;
          break;
        case 'trak':
          state.trak = items;
          break;
        default:
          break;
      }
    },
    handleExchangeTRAK: (state: any, action) => {
      const item = action.payload;
      console.log('🚀 ~ file: wallet.ts ~ line 30 ~ item', item);
      state.trak = item;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setTRXWallet, handleExchangeTRAK} = walletSlice.actions;

export const walletReducer = walletSlice.reducer;
