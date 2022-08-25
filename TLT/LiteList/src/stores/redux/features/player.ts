import {createSlice} from '@reduxjs/toolkit';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    queue: [],
    index: 0,
    paused: true,
    muted: false,
    repeat: false,
    source: {},
    image: {},
    artist: '',
    title: '',
    chatURI: '',
    hidden: true, //isTRAKLIST
    id: {
      spotify: '',
      apple_music: '',
    },
    isMMS: false,
    service: 'traklist',
    device: null,
    players: {
      spotify: null,
      apple_music: null,
    },
  },
  reducers: {
    handleMediaPlayerAction: (state: any, action) => {
      const {
        playbackState,
        uri,
        url,
        artist,
        title,
        chatURI,
        id,
        isMMS,
        repeat,
      } = action.payload;

      switch (playbackState) {
        case 'pause':
          state.paused = !state.paused;
          break;
        case 'pause:force':
          state.paused = true;
          break;
        case 'pause:force:off':
          state.paused = false;
          break;
        case 'mute':
          state.muted = !state.muted;
          break;
        case 'repeat':
          state.repeat = !state.repeat;
          Toast.show({
            type: 'info',
            text1: state.repeat
              ? 'TRAKLIST is looping...'
              : 'TRAKLIST in queue...',
            text2: state.repeat
              ? 'UP NEXT : ' + state.artist + ' - ' + state.title
              : 'UP NEXT : ' +
                state.queue[state.index + 1].artist +
                ' - ' +
                state.queue[state.index + 1].title,
          });
          break;
        case 'repeat:force':
          state.repeat = true;
          break;
        case 'repeat:force:off':
          state.repeat = false;

          break;
        case 'toggle-view':
          state.hidden = !state.hidden;
        case 'chat-uri':
          state.chatURI = chatURI;
          state.isMMS = isMMS;
          break;
        case 'sent':
          state.isMMS = isMMS;
          state.repeat = false;
          break;
        case 'source':
          state.source = {uri};
          state.paused = false;
          state.image = {uri: url};
          state.artist = artist;
          state.title = title;
          state.id = id;
          state.service = 'traklist';
          break;
        case 'share':
          // alert('share');

          if (state.hidden) {
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
                console.log(
                  '🚀 ~ file: player.ts ~ line 90 ~ .then ~ res',
                  res,
                );

                state.repeat = false;
              })
              .catch((err: any) => {
                err && console.log(err);
              });

            state.repeat = false;
          } else {
            const options = {
              title: 'TRAKLIST',
              message:
                "TRAKLIST | Have you heard '" +
                state.players.spotify.item.name +
                "' by " +
                state.players.spotify.item.artists[0].name +
                '? Discover this and much more on TRAKLIST.',
              url: 'www.example.com',
            };

            Share.open(options)
              .then((res: any) => {
                console.log(
                  '🚀 ~ file: player.ts ~ line 90 ~ .then ~ res',
                  res,
                );

                state.repeat = false;
              })
              .catch((err: any) => {
                err && console.log(err);
              });

            state.repeat = false;
          }
          break;
      }
    },
    handleQueueControlsAction: (state, action) => {
      const {playbackState, uri, url, artist, title, chatURI, id, isMMS} =
        action.payload;

      const traklist = state.queue;

      switch (playbackState) {
        case 'next':
          const nextIndex = state.index + 1;
          console.log('🚀 ~ file: player.ts ~ line 90 ~ newIndex', nextIndex);
          const nextTrak = traklist[nextIndex];
          console.log('🚀 ~ file: player.ts ~ line 91 ~ traklist', traklist);

          state.source = {uri: nextTrak.web.spotify.preview};
          // state.paused = false;
          state.image = {uri: nextTrak.cover_art};
          state.artist = nextTrak.artist;
          state.title = nextTrak.title;
          state.id = nextTrak.web.spotify.id;
          state.index = nextIndex;
          state.service = 'traklist';
          state.device = null;
          break;
        case 'back':
          const previousIndex = state.index - 1;
          console.log(
            '🚀 ~ file: player.ts ~ line 90 ~ newIndex',
            previousIndex,
          );
          const previousTrak = traklist[previousIndex];
          console.log('🚀 ~ file: player.ts ~ line 91 ~ traklist', traklist);

          state.paused = false;
          state.source = {uri: previousTrak.web.spotify.preview};
          state.paused = false;
          state.image = {uri: previousTrak.cover_art};
          state.artist = previousTrak.artist;
          state.title = previousTrak.title;
          state.id = previousTrak.web.spotify.id;
          state.index = previousIndex;

          break;
        case 'repeat':
          state.repeat = !state.repeat;
          break;
        case 'toggle-view':
          state.hidden = !state.hidden;
        case 'chat-uri':
          state.chatURI = chatURI;
          state.isMMS = isMMS;
          break;
        case 'sent':
          state.isMMS = isMMS;
          break;
        case 'index:down':
          state.index = state.index - 1 !== -1 ? state.index - 1 : state.index;
        case 'index:up':
          state.index =
            state.index + 1 !== state.queue.length
              ? state.index + 1
              : state.index;
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
    setTRAKLIST: (state, action) => {
      const {traklist} = action.payload;

      const trak001 = traklist[state.index];
      const playerType = trak001.player;
      console.log('🚀 ~ file: player.ts ~ line 84 ~ trak001', trak001);

      switch (playerType) {
        case 'primary':
          state.queue = state.queue.concat(traklist);
          state.source = {uri: trak001.web.spotify.preview};
          state.image = {uri: trak001.cover_art};
          state.artist = trak001.artist;
          state.title = trak001.title;
          state.id = trak001.web.spotify.id;
          break;
        case 'secondary:spotify':
          state.queue = state.queue.concat(traklist);
          state.source = {uri: trak001.web.spotify.preview};
          state.image = {uri: trak001.cover_art};
          state.artist = trak001.artist;
          state.title = trak001.title;
          state.id = trak001.web.spotify.id;
          break;
        case 'secondary:apple_music':
          state.queue = state.queue.concat(traklist);
          state.source = {uri: trak001.web.spotify.preview};
          state.image = {uri: trak001.cover_art};
          state.artist = trak001.artist;
          state.title = trak001.title;
          state.id = trak001.web.spotify.id;
          break;
        default:
          console.log('1');
      }
    },
    setSpotifyPlayer: (state, action) => {
      const {title, artist, image, device} = action.payload;

      state.title = title;
      state.artist = artist;
      state.image = image;
      state.device = device;
      state.service = 'spotify';
    },
    setPlayers: (state, action) => {
      const {spotify, apple_music} = action.payload;

      state.players.spotify = spotify === '' ? null : spotify;
      state.players.apple_music = apple_music;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  handleMediaPlayerAction,
  setTRAKLIST,
  handleQueueControlsAction,
  setSpotifyPlayer,
  setPlayers,
} = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
