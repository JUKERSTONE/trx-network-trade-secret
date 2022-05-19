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
  const keys = handleGetState({index: 'keys'});
  const spotify = keys.spotify;
  const accessToken = spotify.accessToken;
  console.log(
    '🚀 ~ file: useSwipe.ts ~ line 17 ~ useSwipe ~ accessToken',
    accessToken,
  );
  const {handleRecommendations, recommendations, isUnavailable, handleReload} =
    useGenerate();
  console.log(
    '🚀 ~ file: useSwipe.ts ~ line 12 ~ useSwipe ~ recommendations',
    recommendations,
  );

  useEffect(() => {
    handleRecommendations();
  }, []);

  // const handleSetPlayer = ({web, cover_art, artist, title}: any) => {
  const handleSetPlayer = (recommendations: any, index: any) => {
    console.log(
      '🚀 ~ file: useSwipe.ts ~ line 24 ~ handleSetPlayer ~ recommendations',
      recommendations,
      index,
    );
    const {web, cover_art, artist, title} = recommendations[index];
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

  const handleSwipedRight = (recommendations: any, index: any) => {
    // alert(recommendations, index);
    console.log(recommendations[index], 'okjk');

    const card = recommendations[index];
    const ids = card.web.spotify.id;
    const route = api.spotify({method: 'save-track', payload: {ids}});
    console.log(
      '🚀 ~ file: useSwipe.ts ~ line 83 ~ handleSwipedRight ~ route',
      route,
    );

    const test = axios
      .put(route, [ids], {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .catch(err => {
        console.log(err, ' - track not saved');
      });
    console.log(
      '🚀 ~ file: useSwipe.ts ~ line 94 ~ handleSwipedRight ~ test',
      test,
    );
  };

  return {
    recommendations,
    handleSetPlayer,
    handleGenerateItems,
    handleLoadRecommendations,
    handleSwipedRight,
  };
};
