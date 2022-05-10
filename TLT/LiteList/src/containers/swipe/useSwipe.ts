import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useGenerate} from '../../app';

export const useSwipe = ({navigation, route}: any) => {
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
  return {
    recommendations,
    handleSetPlayer,
  };
};
