import {createSlice} from '@reduxjs/toolkit';

export const messagingSlice = createSlice({
  name: 'messaging',
  initialState: {
    chats: {},
  },
  reducers: {
    setChats: (state: any, action) => {
      const {chatURI, lastMessage, messages} = action.payload;

      state.chats = {
        ...state.chats,
        [chatURI]: {
          lastMessage,
          messages,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {setChats} = messagingSlice.actions;

export const messagingReducer = messagingSlice.reducer;
