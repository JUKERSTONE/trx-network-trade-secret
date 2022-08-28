import {createSlice} from '@reduxjs/toolkit';

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    transactions: [],
  },
  reducers: {
    setTransactions: (state, action) => {
      const {transactions} = action.payload;

      state.transactions = transactions;
    },
    appendTransaction: (state: any, action) => {
      const transaction = action.payload;

      state.transactions = [transaction, ...state.transactions];
    },
  },
});

// Action creators are generated for each case reducer function
export const {setTransactions, appendTransaction} = cryptoSlice.actions;

export const cryptoReducer = cryptoSlice.reducer;
