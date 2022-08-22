import React, {useState, Component} from 'react';
import {
  View,
  StatusBar,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import {TRXPlayer, TRXHeaderPlayer} from '../elements';
import {TRXModalContainer} from '../containers';
import {
  store,
  handleMediaPlayerAction,
  handleQueueControlsAction,
} from '../stores';
import {useLITELISTState} from '../app';
import {api} from '../api';
import axios from 'axios';
import {keys} from 'mobx';
import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig,
} from 'react-native-spotify-remote';

export const LITELISTInterfaceHOC = (InnerComponent: any, mode: string) => {
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
  // };

  return class TRXInterfaceHOC extends Component {
    constructor(props: any) {
      super(props);
      const {handleGetState} = useLITELISTState();
      const player = handleGetState({index: 'player'});
      const keys = handleGetState({index: 'keys'});
      console.log(
        '🚀 ~ file: LITELISTInterface.tsx ~ line 28 ~ TRXInterfaceHOC ~ constructor ~ keys',
        keys,
      );
      console.log(
        '🚀 ~ file: LITELISTInterface.tsx ~ line 21 ~ TRXInterfaceHOC ~ constructor ~ player',
        player,
      );
      this.state = {
        mode: player.mode,
        paused: player.paused,
        muted: player.muted,
        repeat: player.repeat,
        source: player.source,
        image: player.image,
        title: player.title,
        artist: player.artist,
        typing: false,
      };
    }

    handleMedia(type: string) {
      const action = handleMediaPlayerAction({playbackState: type});
      store.dispatch(action);
    }

    async handleControls({type, id, key, player, navigation}: any) {
      switch (type) {
        case 'save':
          const ids = id.spotify;
          const route = api.spotify({method: 'save-track', payload: {ids}});
          console.log(
            '🚀 ~ file: useSwipe.ts ~ line 83 ~ handleSwipedRight ~ route',
            route,
          );

          // alert(key);

          await axios
            .put(route, [ids], {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + key,
              },
            })
            .then(() => {
              alert(
                player.artist +
                  " - '" +
                  player.title +
                  "'\n - saved to Spotify -",
              );
            })
            .catch(err => {
              // console.log(err, ' - track not saved');
            });

          // setTimeout(() => setSpotifyModal(false), 1000);
          break;
        case 'send':
          navigation.navigate('MMS');
          break;
        case 'fanclub':
          navigation.navigate('MODAL', {
            type: 'match-trak',
            exchange: {
              active: true,
              item: {
                title: player.title,
                artist: player.artist,
              },
            },
          });
          break;
        case 'next':
          const action = handleQueueControlsAction({
            playbackState: 'next',
          });
          store.dispatch(action);
        default:
          break;
      }
    }

    handlePlayOnTRAKLIST = async ({type, id}: any) => {
      if (!id) return;
      const config: any = {
        // clientId: '29dec26a7f304507b4a9d9bcf0ef210b', // available on the app page
        // clientSecret: '1d27af3b5c4946c1a411657ca50490d0', // click "show client secret" to see this
        // redirectUrl: 'com.trxklist://oauthredirect/', // the redirect you defined after creating the app
        // scopes: [
        //   'user-read-private',
        //   'user-read-email',
        //   'user-read-playback-state',
        //   'user-library-modify',
        //   'user-library-read',
        //   'streaming',
        //   'user-read-recently-played',
        //   'user-follow-modify',
        //   'user-top-read',
        //   'playlist-modify-public',
        //   'playlist-modify-private',
        //   'user-follow-read',
        //   'user-modify-playback-state',
        // ], // the scopes you need to access
        // serviceConfiguration: {
        //   authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        //   tokenEndpoint: 'https://accounts.spotify.com/api/token',
        // },
        clientID: '29dec26a7f304507b4a9d9bcf0ef210b',
        redirectURL: 'com.trxklist://oauthredirect/',
        tokenRefreshURL:
          'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/spotify/refresh',
        tokenSwapURL:
          'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/spotify/swap',
        scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
      };

      switch (type) {
        case 'back':
          // action back index

          const action1 = handleQueueControlsAction({
            playbackState: 'index:down',
          });
          store.dispatch(action1);
          try {
            if (await SpotifyRemote.isConnectedAsync()) {
              // await SpotifyAuth.endSession();
              const session = await SpotifyAuth.authorize(config);
              console.log(
                '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
                session,
              );

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });
              store.dispatch(action1);

              await SpotifyRemote.playUri(`spotify:track:${id}`);
            } else {
              await SpotifyAuth.endSession();
              const session = await SpotifyAuth.authorize(config);
              console.log(
                '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
                session,
              );

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });
              store.dispatch(action1);

              await SpotifyRemote.playUri(`spotify:track:${id}`);
            }
          } catch (err) {
            alert(err);

            console.error("Couldn't authorize with or connect to Spotify", err);
            // const session = await SpotifyAuth.authorize(config);
            // await SpotifyRemote.connect(session.accessToken);
            // await SpotifyRemote.resume();
          }
          break;
        case 'play':
          try {
            if (await SpotifyRemote.isConnectedAsync()) {
              // await SpotifyAuth.endSession();
              const session = await SpotifyAuth.authorize(config);
              console.log(
                '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
                session,
              );

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });
              store.dispatch(action1);

              await SpotifyRemote.playUri(`spotify:track:${id}`);
            } else {
              await SpotifyAuth.endSession();
              const session = await SpotifyAuth.authorize(config);
              console.log(
                '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
                session,
              );

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });

              store.dispatch(action1);

              if (!nowPlaying) {
                await SpotifyRemote.playUri(`spotify:track:${id}`);
              } else SpotifyRemote.resume();
            }
          } catch (err) {
            alert(err);

            console.error("Couldn't authorize with or connect to Spotify", err);
            // const session = await SpotifyAuth.authorize(config);
            // await SpotifyRemote.connect(session.accessToken);
            // await SpotifyRemote.resume();
          }
          break;
        case 'forward':
          console.log(
            '🚀 ~ file: useHeader.ts ~ line 390 ~ handlePlayOnTRAKLIST ~ id',
            id,
          );
          // action forward index

          const action2 = handleQueueControlsAction({
            playbackState: 'index:up',
          });
          store.dispatch(action2);
          try {
            if (await SpotifyRemote.isConnectedAsync()) {
              // await SpotifyAuth.endSession();
              const session = await SpotifyAuth.authorize(config);
              console.log(
                '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
                session,
              );

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });
              store.dispatch(action1);

              await SpotifyRemote.playUri(`spotify:track:${id}`);
            } else {
              await SpotifyAuth.endSession();
              const session = await SpotifyAuth.authorize(config);
              console.log(
                '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
                session,
              );

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });
              store.dispatch(action1);

              await SpotifyRemote.playUri(`spotify:track:${id}`);
            }
          } catch (err) {
            alert(err);

            console.error("Couldn't authorize with or connect to Spotify", err);
            // const session = await SpotifyAuth.authorize(config);
            // await SpotifyRemote.connect(session.accessToken);
            // await SpotifyRemote.resume();
          }
          break;
        default:
          break;
      }
    };
    render() {
      return (
        <View style={[{flex: 1} /*backgroundStyle*/]}>
          <StatusBar barStyle={'dark-content'} />
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <InnerComponent {...this.props} />
            </View>

            <TRXPlayer
              {...this.state}
              {...this.props}
              handleControls={this.handleControls}
              handlePlayOnTRAKLIST={this.handlePlayOnTRAKLIST}
              handleMedia={this.handleMedia}
              mode={mode}
            />
          </View>
        </View>
      );
    }
  };
};
