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

export const useSwipe = ({navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const [spotifyModal, setSpotifyModal] = useState(false);
  const keys = handleGetState({index: 'keys'});
  const spotify = keys.spotify;
  const accessToken = spotify.accessToken;
  console.log(
    '🚀 ~ file: useSwipe.ts ~ line 17 ~ useSwipe ~ accessToken',
    accessToken,
  );
  const {
    handleRecommendations,
    recommendations,
    progress,
    isUnavailable,
    handleReload,
  } = useGenerate();

  console.log(
    '🚀 ~ file: useSwipe.ts ~ line 12 ~ useSwipe ~ recommendations',
    recommendations,
  );

  useEffect(() => {
    handleRecommendations();
  }, []);

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
    // console.log(
    //   '🚀 ~ file: useSwipe.ts ~ line 23 ~ handleSetPlayer ~ title',
    //   title,
    // );
    const action = handleMediaPlayerAction({
      playbackState: 'source',
      uri: web.spotify.preview,
      url: cover_art,
      artist,
      title,
      mode: 'header',
    });
    store.dispatch(action);
  };

  const handleGenerateItems = (index: any) => {
    if (index == recommendations.length - 8) {
      alert(
        'Generating new recommendations based on your listening history...',
      );
      handleRecommendations();
    }
  };

  const handleLoadRecommendations = () => {
    alert('Generating new recommendations based on your listening history...');
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
        console.log(err, ' - track not saved');
      });

    setTimeout(() => setSpotifyModal(false), 1000);
  };

  return {
    recommendations,
    handleSetPlayer,
    handleGenerateItems,
    handleLoadRecommendations,
    handleSwipedRight,
    spotifyModal,
    progress,
  };
};
