import {createSlice} from '@reduxjs/toolkit';

export const rssSlice = createSlice({
  name: 'rss',
  initialState: {
    complex: null,
  },
  reducers: {
    setRSSComplex: (state, action) => {
      const rss = action.payload;
      state.complex = rss;
      console.log('🚀 ~ file: rss.ts ~ line 11 ~ rss', rss);
    },
  },
});

// Action creators are generated for each case reducer function
export const {setRSSComplex} = rssSlice.actions;

export const rssReducer = rssSlice.reducer;
