import {createSlice} from '@reduxjs/toolkit';
import Share from 'react-native-share';
import {Alert} from 'react-native';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    paused: true,
    muted: false,
    repeat: true,
    source: {},
    image: {},
    artist: '',
    title: '',
    chatURI: '',
    hidden: true,
    id: {
      spotify: '',
      apple_music: '',
    },
  },
  reducers: {
    handleMediaPlayerAction: (state, action) => {
      const {playbackState, uri, url, artist, title, chatURI, id} =
        action.payload;

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
        case 'toggle-view':
          state.hidden = !state.hidden;
        case 'chat-uri':
          state.chatURI = chatURI;
          break;
        case 'source':
          state.source = {uri};
          state.paused = false;
          state.image = {uri: url};
          state.artist = artist;
          state.title = title;
          state.id = id;

          break;
        case 'share':
          // alert('share');
          const options = {
            title: 'TRAKLIST',
            message:
              "TRAKLIST | Have you heard '" +
              state.title +
              "' by " +
              state.artist +
              '? Discover this and much more on TRAKLIST.',
            url: 'www.example.com',
          };

          Share.open(options)
            .then((res: any) => {
              console.log('🚀 ~ file: player.ts ~ line 90 ~ .then ~ res', res);
            })
            .catch((err: any) => {
              err && console.log(err);
            });

          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {handleMediaPlayerAction} = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
