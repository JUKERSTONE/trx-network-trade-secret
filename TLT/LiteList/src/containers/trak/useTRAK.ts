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
import {useLITELISTState} from '../../app';

export const useTRAK = ({navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const [userCategory, setUserCategory] = useState();

  const [TRAK, setTRAK] = useState();
  const {useGET} = useAPI();

  const profile = handleGetState({index: 'profile'});
  const player = handleGetState({index: 'player'});

  useEffect(() => {
    const TRXProfile = profile.TRX;

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

  const handleTRAKInteraction = async ({type, trak}: any) => {
    switch (type) {
      case 'save':
        const ids = trak.apple_music;
        console.log(
          '🚀 ~ file: useSwipe.ts ~ line 115 ~ handleTRAKInteraction ~ ids',
          ids,
        );
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
              Authorization: 'Bearer ' + 'accessToken',
            },
          })
          .then(() => {
            // alert(
            //   player.artist +
            //     " - '" +
            //     player.title +
            //     "'\n - saved to Spotify -",
            // );
            // setIsModalVisible(true);
            Toast.show({
              type: 'success',
              text1: 'Glad you like it!',
              text2: 'We saved this song to your Spotify Library...',
            });
          })
          .catch(err => {
            alert('- track not saved -');
            console.log(err, ' - track not saved');
            Toast.show({
              type: 'error',
              text1: 'Having fun?',
              text2: 'track not saved',
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

  return {
    // TRAK,
    // handleSeeMoreMeta,
    handleNFTNavigation,
    handleTRAKInteraction,
    userCategory,
    player,
    handleYouTube,
  };
};
