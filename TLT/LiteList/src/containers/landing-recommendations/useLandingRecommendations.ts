import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import axios from 'axios';
import {store, handleMediaPlayerAction} from '../../stores';
// import {
//   SPOTIFY_NEW_RELEASES,
//   SPOTIFY_GET_ALBUM,
//   SPOTIFY_GET_TRACK,
//   MUSIXMATCH_GET_LYRICS,
//   SPOTIFY_GET_ARTIST,
// } from '../../../1.api';

import {useGenerate} from '../../app';

export const useLandingRecommendations = ({navigation}: any) => {
  console.log(
    '🚀 ~ file: useLandingRecommendations.ts ~ line 16 ~ useLandingRecommendations ~ navigation',
    navigation,
  );
  const {
    handleRecommendations,
    recommendations,
    setRecommendations,
    isUnavailable,
    handleReload,
  } = useGenerate();

  useEffect(() => {
    handleRecommendations();
  }, []);

  const onPress = (item: any) => {
    const track_id = item.track.id;
    const artist_id = item.artist.id;

    // axios
    //   .get(SPOTIFY_GET_ARTIST(artist_id), {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
    //     },
    //   })
    //   .then(response => {
    //     axios
    //       .get(SPOTIFY_GET_TRACK(track_id), {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
    //         },
    //       })
    //       .then(response2 => {
    //         const images = response.data.images;

    //         const isrc = response2.data.external_ids.isrc;

    //         axios.get(MUSIXMATCH_GET_LYRICS(isrc)).then(response3 => {
    //           const lyrics_body = response3.data.message.body
    //             ? response3.data.message.body.lyrics?.lyrics_body
    //             : null;
    //           const track = {
    //             ...response2.data,
    //             lyrics: lyrics_body,
    //             artistImage: images,
    //           };

    //           navigation.navigate('TrackView', {track});
    //         });
    //       });
    //   })
    //   .catch(error => {
    //     console.error(error, 'sumn went wrong');
    //   });
  };

  const handleTRAKNavigation = (item: any) => {
    console.log(
      '🚀 ~ file: useLandingRecommendations.ts ~ line 72 ~ handleTRAKNavigation ~ item',
      item,
    );
    Alert.alert(
      `${item.artist} - ${item.title}`,
      `What would you like to do?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Preview',
          onPress: async () => {
            if (item.web.spotify.preview) {
              const action = handleMediaPlayerAction({
                playbackState: 'source',
                uri: item.web.spotify.preview,
                url: item.cover_art,
                artist: item.artist,
                title: item.title,
              });
              store.dispatch(action);
            } else
              alert(
                `Sorry. ${item.artist} didn't upload a preview for '${item.title}'`,
              );
          },
        },
        {
          text: 'FANCLUB',
          onPress: async () => {
            navigation.navigate('MODAL', {
              type: 'match-trak',
              exchange: {
                active: true,
                item: {
                  title: item.title,
                  artist: item.artist,
                },
              },
            });
          },
        },
      ],
    );
  };

  return {
    onPress,
    recommendations,
    handleReload,
    handleTRAKNavigation,
  };
};
