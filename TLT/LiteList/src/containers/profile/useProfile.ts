import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {toggleTRAKRelationshipsView, store} from '../../stores';
import {useLITELISTState} from '../../app';

export const useProfile = ({navigation, route}: any) => {
  const [profile, setProfile] = useState();
  const [streaming, setStreaming] = useState<any>([]);
  const {useGET} = useAPI();

  function shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const {handleGetState} = useLITELISTState();

  useEffect(() => {
    const profile = handleGetState({index: 'profile'});

    handleProfile(profile);
    handleStreaming(profile);
  }, []);

  const handleProfile = (profile: any) => {
    const TRXProfile = profile.TRX;
    setProfile(TRXProfile);
  };

  const handleStreaming = (profile: any) => {
    const traklandProfile = profile.trakland;
    const spotify = traklandProfile.spotify;
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 28 ~ handleStreaming ~ spotify',
      spotify,
    );
    const apple_music = traklandProfile.apple_music;

    const recommendation = apple_music?.recommendations;

    const topTracks = spotify?.top_tracks;
    const topArtists = spotify?.top_artists;
    const playlists = spotify?.playlists;
    const user = spotify?.user;

    const profileType =
      recommendation != null && topTracks.length != 0
        ? 'primary'
        : recommendation != null && topTracks.length == 0
        ? 'apple_music'
        : topTracks.length != 0 && recommendation == null
        ? 'spotify'
        : 'offline';

    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 44 ~ handleRecommendations ~ profiefeeeleType',
      profileType,
    );

    switch (profileType) {
      case 'spotify':
        const topTracksArray = topTracks.map((track: any) => {
          return {
            info: 'topTracks',
            ...track,
          };
        });
        const topArtistsArray = topArtists.map((track: any) => {
          return {
            info: 'topArtists',
            ...track,
          };
        });
        const playlistsArray = playlists.map((track: any) => {
          return {
            info: 'playlists',
            ...track,
          };
        });

        const streaming = shuffle([
          ...topTracksArray,
          ...topArtistsArray,
          ...playlistsArray,
        ]);

        setStreaming(streaming);
    }
  };

  return {
    profile,
    streaming,
  };
};
