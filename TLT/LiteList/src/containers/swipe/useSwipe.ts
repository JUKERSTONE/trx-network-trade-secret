import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useGenerate} from '../../app';
import axios from 'axios';
import {useLITELISTState} from '../../app';
import Toast from 'react-native-toast-message';
import {requestSubscription} from 'react-native-iap';
import Purchases from 'react-native-purchases';

export const useSwipe = ({navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const keys = handleGetState({index: 'keys'});
  const player = handleGetState({index: 'player'});
  const subscriptions = handleGetState({index: 'subscriptions'});
  const packages = subscriptions.packages;
  console.log(
    '🚀 ~ file: useSwipe.ts ~ line 21 ~ useSwipe ~ packages',
    packages,
  );
  console.log('🚀 ~ file: useSwipe.ts ~ line 17 ~ useSwipe ~ player', player);
  const spotify = keys.spotify;
  const accessToken = spotify.accessToken;
  console.log(
    '🚀 ~ file: useSwipe.ts ~ line 17 ~ useSwipe ~ accessToken',
    accessToken,
  );
  const {
    handleRecommendations,
    // recommendations,
    progress,
    isUnavailable,
    // handleReload,
  } = useGenerate();
  console.log(
    '🚀 ~ file: useSwipe.ts ~ line 32 ~ useSwipe ~ progress',
    progress,
  );

  // const handleSetPlayer = ({web, cover_art, artist, title}: any) => {
  const handleSetPlayer = (card: any) => {
    const {web, cover_art, artist, title} = card;
    console.log(
      '🚀 ~ file: useSwipe.ts ~ line 25 ~ handleSetPlayer ~ web, cover_art, artist, title',
      web,
      cover_art,
      artist,
      title,
    );

    const action = handleMediaPlayerAction({
      playbackState: 'source',
      uri: web.spotify.preview,
      url: cover_art,
      artist,
      title,
      mode: 'header',
      id: {
        spotify: web.spotify.id,
        apple_music: web.apple_music?.id,
      },
    });
    store.dispatch(action);
  };

  const handleGenerateItems = (index: any) => {
    alert('handle generate items');
    // if (index == recommendations.length - 8) {
    //   alert(
    //     'Generating new recommendations based on your listening history...',
    //   );
    //   handleRecommendations();
    // }
  };

  const handleLoadRecommendations = () => {
    Toast.show({
      type: 'success',
      text1: 'Having fun?',
      text2: 'Generating new recommendations for you...',
    });
    //
    handleRecommendations();
  };

  const handleSwipedRight = async (recommendations: any, index: any) => {
    // alert(recommendations, index);
    console.log(recommendations[index], 'okjk');

    const card = recommendations[index];
    console.log(
      '🚀 ~ file: useSwipe.ts ~ line 76 ~ handleSwipedRight ~ card',
      card,
    );
    const ids = card.web.spotify.id;
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
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then(() => {
        setSpotifyModal(true);
      })
      .catch(err => {
        // console.log(err, ' - track not saved');
      });

    setTimeout(() => setSpotifyModal(false), 1000);
  };

  const handleTRAKInteraction = async ({type, player}: any) => {
    console.log(
      '🚀 ~ file: useSwipe.ts ~ line 112 ~ handleTRAKInteraction ~ player',
      player,
    );
    switch (type) {
      case 'save':
        const ids = player.id;
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
              Authorization: 'Bearer ' + accessToken,
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
            // alert('- track not saved -');
            console.log(err, ' - track not saved');
            Toast.show({
              type: 'error',
              text1: "Error saving '" + player.artist + ' - ' + player.title,
              text2: 'track not saved',
            });
          });

        setTimeout(() => setIsModalVisible(false), 1000);
        break;
      case 'share':
        const action = handleMediaPlayerAction({playbackState: 'share'});
        store.dispatch(action);
        break;
      case 'send':
        navigation.navigate('MMS');
        break;
      case 'sync':
        alert('sumc');
        break;
      case 'fanclub':
        console.log(
          '🚀 ~ file: useSwipe.ts ~ line 159 ~ handleTRAKInteraction ~ player',
          player,
        );
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

      default:
        break;
    }
  };

  return {
    handleSetPlayer,
    handleGenerateItems,
    handleLoadRecommendations,
    handleSwipedRight,
    isModalVisible,
    progress,
    handleTRAKInteraction,
  };
};
