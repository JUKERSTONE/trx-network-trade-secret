import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {
  useLITELISTState,
  handleAppendTRAKLIST,
  handleLikeTRAK,
  handleUpdateTRAKLIST,
} from '../../app';
import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig,
} from 'react-native-spotify-remote';

export const useTRAK = ({navigation, route}: any) => {
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

  const {handleGetState} = useLITELISTState();
  const [userCategory, setUserCategory] = useState();

  const [comment, setComment] = useState(null);
  const {useGET} = useAPI();

  const profile = handleGetState({index: 'profile'});
  const player = handleGetState({index: 'player'});
  const keys = handleGetState({index: 'keys'});

  const TRXProfile = profile.TRX;

  useEffect(() => {
    const userCategory = TRXProfile.userCategory;

    setUserCategory(userCategory);
  }, []);

  // const getTRAK = async (trakID: string) => {
  //   const route = api.bernie({method: 'get_trak', payload: {trakID}});
  //   const response = await useGET({route});
  //   console.log(
  //     '🚀 ~ file: useTRAK.ts ~ line 17 ~ getTRAK ~ response',
  //     response,
  //   );
  //   const trak = response.data;
  //   console.log('🚀 ~ file: useTRAK.ts ~ line 18 ~ getTRAK ~ trak', trak);
  //   setTRAK(trak);
  // };

  // const handleSeeMoreMeta = (songRelationships: any) => {
  //   navigation.navigate('MODAL', {
  //     type: 'trak-relationships',
  //     exchange: {
  //       active: true,
  //       item: songRelationships,
  //     },
  //   });
  // };

  const handleNFTNavigation = (item: any) => {
    // const nftId = uuid.v4();

    // navigation.navigate('MODAL', {
    //   type: 'nft-view',
    //   exchange: {
    //     active: true,
    //     item: {
    //       status: 'purchase-whitelist',
    //       nft: {...item, nftId},
    //     },
    //   },
    // });

    alert('Passive Crypto Earning Coming Soon..');
  };

  const handleTRAKInteraction = async ({type, trak, item}: any) => {
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 71 ~ handleTRAKInteraction ~ trak',
      trak,
    );
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 71 ~ handleTRAKInteraction ~ item',
      item,
    );

    switch (type) {
      case 'save':
        const protocol = '00';

        const isLocal = item.isLocal;

        if (!isLocal) {
          const data = {
            protocol: `trx-${protocol}`,
            TRAK: {
              ...item,
              isLocal: true,
              likes: [
                ...item.likes,
                {
                  id: profile.TRX.trak_name,
                  avatar: profile.TRX.avatarURL,
                  likedAt: new Date().toString(),
                },
              ],
            },
          };
          await handleAppendTRAKLIST({trak: data});

          // alert(key);
        } else {
          //
          if (item.isrc)
            await handleLikeTRAK({standard: item?.isrc, protocol: '00'});

          const data = {
            protocol: `trx-${protocol}`,
            TRAK: {
              ...item,
              isLocal: true,
              likes: [
                ...item.likes,
                {
                  id: profile.TRX.trak_name,
                  avatar: profile.TRX.avatarURL,
                  likedAt: new Date().toString(),
                },
              ],
            },
          };

          await handleUpdateTRAKLIST({trak: data});
        }

        const ids = trak.TRAK.trak.spotify;
        console.log(
          '🚀 ~ file: useSwipe.ts ~ line 115 ~ handleTRAKInteraction ~ ids',
          ids,
        );
        const route = api.spotify({method: 'save-track', payload: {ids}});
        console.log(
          '🚀 ~ file: useSwipe.ts ~ line 83 ~ handleSwipedRight ~ route',
          route,
        );

        await axios
          .put(route, [ids], {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + 'accessToken',
            },
          })
          .then(() => {
            Toast.show({
              type: 'success',
              text1: 'Glad you like it!',
              text2: 'We saved this song to your Spotify Library...',
            });
          })
          .catch(err => {
            // alert('- track not saved -');
            console.log(err, ' - track not saved');
            Toast.show({
              type: 'error',
              text1: 'Track not saved?',
              text2: 'Sorry! Better luck next time',
            });
          });

        break;
      case 'share':
        const action = handleMediaPlayerAction({playbackState: 'share'});
        store.dispatch(action);
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
              title: trak.title,
              artist: trak.artist,
            },
          },
        });
        break;

      default:
        break;
    }
  };

  const handleYouTube = (event: string) => {
    switch (event) {
      case 'playing':
        setTimeout(() => {
          const action = handleMediaPlayerAction({
            playbackState: 'pause:force',
          });
          store.dispatch(action);
        }, 1000);
      default:
        const action1 = handleMediaPlayerAction({
          playbackState: 'pause:force:off',
        });
        store.dispatch(action1);
    }
    // event => alert(JSON.stringify(event))
  };

  const handleComment = (text: any) => {
    setComment(text);
  };

  const handleSubmitComment = (trak: any) => {
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 167 ~ handleSubmitComment ~ trak',
      trak,
    );

    const data = {
      identifiers: {
        isrc: '', // ultimate key

        genius: '', // the prize

        spotify: '', // utility1
        apple_music: '', // utility2
      },
      serialized_trak: JSON.stringify(trak),
      comments: [
        ...trak.comments,
        {
          id: profile.TRX.trak_name,
          avatar: profile.TRX.avatarURL,
          text: comment,
          sentAt: new Date().toString(),
        },
      ],
    };
    // needs to decide whether its putting into traklist for first time or just updating the comments
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 173 ~ handleSubmitComment ~ data',
      data,
    );

    if (trak.isTRX) {
      // UPDATE COMMENT ONLY
    } else {
      // POST TRAK TO TRX
    }
  };

  const handleGenius = (item: any) => {
    console.log('🚀 ~ file: useTRAK.ts ~ line 206 ~ handleGenius ~ item', item);
    navigation.navigate('GENIUS', {
      url: item.meta.genius_url,
    });
  };

  const handleSpotify = async (trak: any) => {
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 304 ~ handleSpotify ~ trak',
      trak,
    );
    const action = handleMediaPlayerAction({playbackState: 'pause:force'});
    store.dispatch(action);

    try {
      if (await SpotifyRemote.isConnectedAsync()) {
        // await SpotifyAuth.endSession();
        const session = await SpotifyAuth.authorize(config);
        console.log(
          '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
          session,
        );

        await SpotifyRemote.connect(session.accessToken);
        await SpotifyRemote.playUri(trak.spotify?.uri);
      } else {
        await SpotifyAuth.endSession();
        const session = await SpotifyAuth.authorize(config);
        console.log(
          '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
          session,
        );

        await SpotifyRemote.connect(session.accessToken);
        await SpotifyRemote.playUri(trak.spotify?.uri);
      }
    } catch (err) {
      alert(err);

      console.error("Couldn't authorize with or connect to Spotify", err);
      const session = await SpotifyAuth.authorize(config);
      await SpotifyRemote.connect(session.accessToken);
      await SpotifyRemote.playUri(trak.spotify?.uri);
    }
  };

  return {
    // TRAK,
    // handleSeeMoreMeta,
    handleNFTNavigation,
    handleTRAKInteraction,
    userCategory,
    player,
    handleYouTube,
    handleComment,
    handleSubmitComment,
    handleGenius,
    TRXProfile,
    handleSpotify,
  };
};
