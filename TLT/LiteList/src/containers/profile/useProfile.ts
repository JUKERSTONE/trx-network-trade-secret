import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {toggleTRAKRelationshipsView, store} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';

export const useProfile = ({navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const {handleToggleProfileVisibility, handleToggleFollowUser} = useFirebase();
  const [profile, setProfile] = useState();
  const [favorites, setFavorites] = useState();
  const [playlists, setPlaylists] = useState();
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
    const spotifyPlaylists = spotify?.playlists;
    const appleMusicPlaylists = apple_music?.playlists;
    const heavyRotation = apple_music?.heavyRotation;
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 63 ~ handleStreaming ~ heavyRotation',
      heavyRotation,
    );
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
      case 'primary':
        const topTracksArrayPrimary = topTracks.map((track: any) => {
          return {
            info: 'topTracks',
            ...track,
          };
        });
        const topArtistsArrayPrimary = topArtists.map((track: any) => {
          return {
            info: 'topArtists',
            ...track,
          };
        });
        const heavyRotationPrimary = heavyRotation.map((track: any) => {
          console.log(
            '🚀 ~ file: useProfile.ts ~ line 98 ~ heavyRotationPrimary ~ track',
            track,
          );

          const art = track.attributes.artwork.url;

          const split = art.split('{')[0];

          const artwork = `${split}200x200bb.jpg`;

          // url
          return {
            info: 'heavyRotation',
            artwork,
            ...track,
          };
        });
        const spotifyPlaylistsArrayPrimary = spotifyPlaylists.map(
          (track: any) => {
            return {
              info: 'playlists:spotify',
              ...track,
            };
          },
        );
        const appleMusicPlaylistsArrayPrimary = appleMusicPlaylists.map(
          (track: any) => {
            return {
              info: 'playlists:apple_music',
              ...track,
            };
          },
        );

        setFavorites(
          shuffle([
            ...topTracksArrayPrimary,
            ...topArtistsArrayPrimary,
            ...heavyRotationPrimary,
          ]),
        );
        setPlaylists(
          shuffle([
            ...spotifyPlaylistsArrayPrimary,
            ...appleMusicPlaylistsArrayPrimary,
          ]),
        );
        break;
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
        const playlistsArray = spotifyPlaylists.map((track: any) => {
          return {
            info: 'playlists',
            ...track,
          };
        });

        setFavorites(shuffle([...topTracksArray, ...topArtistsArray]));
        setPlaylists(shuffle([...playlistsArray]));
        break;
    }
  };

  return {
    profile,
    favorites,
    playlists,
    handleToggleProfileVisibility,
    handleToggleFollowUser,
  };
};
