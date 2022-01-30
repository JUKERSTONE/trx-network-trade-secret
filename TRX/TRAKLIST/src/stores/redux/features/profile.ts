import {createSlice} from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    firebase: {},
    TRX: {
      money: 0,
      wallet: [],
    },
  },
  reducers: {
    setFirebaseProfile: (state, action) => {
      const firebase = action.payload;
      state.firebase = firebase;
    },
    setTRXProfile: (state, action) => {
      const TRX = action.payload;
      console.log('🚀 ~ file: profile.ts ~ line 16 ~ TRX', TRX);
      state.TRX = {...state.TRX, ...TRX};
    },
    depositMoney: (state, action) => {
      const money = action.payload;
      console.log('🚀 ~ file: profile.ts ~ line 16 ~ TRX', money);
      state.TRX = {
        ...state.TRX,
        money: state.TRX.money + money,
      };
    },
    spendMoney: (state, action) => {
      const money = action.payload;
      console.log('🚀 ~ file: profile.ts ~ line 16 ~ TRX', money);
      state.TRX = {
        ...state.TRX,
        money: state.TRX.money - money,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {setFirebaseProfile, setTRXProfile, depositMoney, spendMoney} =
  profileSlice.actions;

export const profileReducer = profileSlice.reducer;
