import {
  toggleExchangeView,
  store,
  setAuthentication,
  useAsyncStorage,
  setSpotifyPlayer,
  handleMediaPlayerAction,
} from '../../stores';
import {useLITELISTState} from '../../app';
import {useAPI, api} from '../../api';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig,
} from 'react-native-spotify-remote';

export const useHeader = ({navigation}: any) => {
  const {handleGetState} = useLITELISTState();
  const {useGET} = useAPI();
  const [nowPlaying, setNowPlaying] = useState(null);

  const isLoggedIn = handleGetState({index: 'authentication'}).isLoggedIn;
  const profile = handleGetState({index: 'profile'});
  const player = handleGetState({index: 'player'});
  const keys = handleGetState({index: 'keys'});
  const TRXProfile = profile.TRX;
  const {handleClear, handleStore} = useAsyncStorage();

  useEffect(() => {
    handleHeaderPlayer();
  }, []);

  const handleHeaderPlayer = async () => {
    const route = api.spotify({method: 'get-playback'});

    const response = await useGET({route, token: keys.spotify.accessToken});
    const nowPlaying =
      response.data === null || response.data === '' ? null : response.data;

    console.log(
      '🚀 ~ file: useHeader.ts ~ line 34 ~ handleHeaderPlayer ~ nowPlaying',
      nowPlaying,
    );

    setNowPlaying(nowPlaying);
    // const action = setSpotifyPlayer({
    //   title: nowPlaying.item.name,
    //   artist: nowPlaying.item.artists[0].name,
    //   image: {uri: nowPlaying.item.album.images[0].url},
    //   device: nowPlaying.device.name,
    // });
    // store.dispatch(action);
  };

  const handleDeposit = () => {
    navigation.navigate('MODAL', {
      type: 'deposit',
      exchange: {
        active: true,
      },
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAuthentication = (isModal: any) => {
    // remove state when logging out

    switch (isLoggedIn) {
      case true:
        Alert.alert(
          'YOU WILL NEED YOUR SECRET KEY!',
          `${TRXProfile.stacks_keys.secret}`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Noted. Sign me out',
              onPress: async () => {
                if (isModal) {
                  navigation.goBack();
                }
                return auth()
                  .signOut()
                  .then(async () => {
                    handleClear();
                    const authAction = setAuthentication(false);
                    store.dispatch(authAction);
                    console.log('User signed out!');
                  });
              },
            },
          ],
        );

      default:
        navigation.navigate('AUTHENTICATION');
    }
  };

  const handleProfile = () => {
    navigation.navigate('SOCIAL', {
      screen: 'MESSAGING',
    });
  };

  const handleResumeOnTRAKLIST = async (isPlaying: boolean) => {
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

    try {
      if (await SpotifyRemote.isConnectedAsync()) {
        // await SpotifyAuth.endSession();
        const session = await SpotifyAuth.authorize(config);
        console.log(
          '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
          session,
        );

        await SpotifyRemote.connect(session.accessToken);

        if (isPlaying) {
          await SpotifyRemote.pause();
        } else await SpotifyRemote.resume();
      } else {
        await SpotifyAuth.endSession();
        const session = await SpotifyAuth.authorize(config);
        console.log(
          '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
          session,
        );

        await SpotifyRemote.connect(session.accessToken);
        if (isPlaying) {
          await SpotifyRemote.pause();
        } else await SpotifyRemote.resume();
      }
    } catch (err) {
      alert(err);

      console.error("Couldn't authorize with or connect to Spotify", err);
      // const session = await SpotifyAuth.authorize(config);
      // await SpotifyRemote.connect(session.accessToken);
      // await SpotifyRemote.resume();
    }
  };

  const handleSkipOnTRAKLIST = async (isForward: any) => {
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

    try {
      if (await SpotifyRemote.isConnectedAsync()) {
        // await SpotifyAuth.endSession();
        const session = await SpotifyAuth.authorize(config);
        console.log(
          '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
          session,
        );

        await SpotifyRemote.connect(session.accessToken);

        if (isForward) {
          await SpotifyRemote.skipToNext();
        } else await SpotifyRemote.skipToPrevious();
      } else {
        await SpotifyAuth.endSession();
        const session = await SpotifyAuth.authorize(config);
        console.log(
          '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
          session,
        );

        await SpotifyRemote.connect(session.accessToken);
        if (isForward) {
          await SpotifyRemote.skipToNext();
        } else await SpotifyRemote.skipToPrevious();
      }
    } catch (err) {
      alert(err);

      console.error("Couldn't authorize with or connect to Spotify", err);
      // const session = await SpotifyAuth.authorize(config);
      // await SpotifyRemote.connect(session.accessToken);
      // await SpotifyRemote.resume();
    }
  };

  const handlePlayOnTRAKLIST = async ({type, id}: any) => {
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

            await SpotifyRemote.skipToPrevious();
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

            await SpotifyRemote.skipToPrevious();
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

            await SpotifyRemote.skipToNext();
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

            await SpotifyRemote.skipToNext();
          }
        } catch (err) {
          alert(err);

          console.error("Couldn't authorize with or connect to Spotify", err);
          // const session = await SpotifyAuth.authorize(config);
          // await SpotifyRemote.connect(session.accessToken);
          // await SpotifyRemote.resume();
        }
        break;
        break;
    }
  };
  return {
    handleDeposit,
    handleGoBack,
    isLoggedIn,
    handleAuthentication,
    handleProfile,
    TRXProfile,
    nowPlaying,
    handleResumeOnTRAKLIST,
    handleSkipOnTRAKLIST,
    handlePlayOnTRAKLIST,
  };
};
