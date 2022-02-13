import {createSlice} from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    paused: true,
    muted: false,
    repeat: true,
  },
  reducers: {
    handleMediaPlayerAction: (state, action) => {
      const {playbackState} = action.payload;
      console.log(
        '🚀 ~ file: player.ts ~ line 11 ~ playbackState',
        playbackState,
      );

      switch (playbackState) {
        case 'pause':
          state.paused = !state.paused;
          break;
        case 'mute':
          state.muted = !state.muted;
          break;
        case 'repeat':
          state.repeat = !state.repeat;
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {handleMediaPlayerAction} = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
