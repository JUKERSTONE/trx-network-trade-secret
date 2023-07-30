import {createSlice} from '@reduxjs/toolkit';
import {asyncStorageIndex, useAsyncStorage} from '../../async';

const {handleStore} = useAsyncStorage();

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    firebase: {},
    TRX: {},
    trakland: {
      spotify: null,
      apple_music: null,
      genius: null,
      snapchat: null,
    },
  },
  reducers: {
    setFirebaseProfile: (state, action) => {
      const firebase = action.payload;
      state.firebase = firebase;
    },
    setTRXProfile: (state, action) => {
      const TRX = action.payload;
      state.TRX = {...state.TRX, ...TRX};
    },
    setTRAKLANDProfile: (state: any, action) => {
      const {apple_music, spotify} = action.payload;
      console.log(
        '🚀 ~ file: profile.ts ~ line 29 ~ action.payload',
        action.payload,
      );

      state.trakland = {
        apple_music,
        spotify,
      };
    },
    appendWallet: (state: any, action) => {
      const item = action.payload;
      state.TRX = {
        ...state.TRX,
        wallet: [...state.TRX.wallet, item],
      };

      const key = asyncStorageIndex.profile;
      handleStore({key, value: state.TRX});
    },
    tempAppendWallet: (state: any, action) => {
      const item = action.payload;
      state.TRX = {
        ...state.TRX,
        wallet: {
          ...state.TRX.wallet,
          nft: [...state.TRX.wallet.nft, item],
        },
      };

      const key = asyncStorageIndex.profile;
      handleStore({key, value: state.TRX});
    },
    setLikes: (state: any, action) => {
      const {likes} = action.payload;
      console.log('🚀 ~ file: profile.ts ~ line 64 ~ likes', likes);
      state.TRX = {
        ...state.TRX,
        likes,
      };
    },
    appendLike: (state: any, action) => {
      const trak = action.payload;
      console.log('🚀 ~ file: profile.ts:72 ~ trak:', trak);

      const isOriginal = trak.NFTFileName;

      const likeExists = isOriginal
        ? state.TRX.likes.some(
            (like: any) => like.NFTFileName === trak.NFTFileName,
          )
        : state.TRX.likes.some((like: any) => {
            console.log(
              '🚀 ~ file: profile.ts:83 ~ :state.TRX.likes.some ~ like:',
              like,
            );
            return trak.isrc
              ? like.isrc === trak.isrc
              : like.trx04 === trak.trx04;
          });
      console.log(
        '🚀 ~ file: profile.ts:83 ~ state.TRX.likes:',
        state.TRX.likes,
      );
      console.log('🚀 ~ file: profile.ts:75 ~ likeExists:', likeExists);

      if (!likeExists) {
        state.TRX = {
          ...state.TRX,
          likes: [trak, ...state.TRX.likes],
        };
      }
    },
    unLike: (state: any, action) => {
      const {updatedArray} = action.payload;

      state.TRX = {
        ...state.TRX,
        likes: updatedArray,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFirebaseProfile,
  setTRXProfile,
  appendWallet,
  tempAppendWallet,
  setTRAKLANDProfile,
  setLikes,
  appendLike,
  unLike,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
