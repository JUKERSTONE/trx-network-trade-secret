import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setFirebaseProfile,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';

export const handleBuildProfile = async ({
  trakland: {spotify, apple_music},
  userCategory,
}: any) => {
  console.log(
    '🚀 ~ file: buildProfile.ts ~ line 22 ~ userCategory',
    userCategory,
  );
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  const recommendation = apple_music?.recommendations;
  const topTracks = spotify?.top_tracks;
  const topArtists = spotify?.top_artists;
  const spotifyPlaylists = spotify?.playlists;
  const appleMusicPlaylists = apple_music?.playlists;
  console.log(
    '🚀 ~ file: buildProfile.ts ~ line 38 ~ appleMusicPlaylists',
    appleMusicPlaylists,
  );
  const heavyRotation = apple_music?.heavyRotation;
  console.log(
    '🚀 ~ file: useProfile.ts ~ line 63 ~ handleStreaming ~ heavyRotation',
    heavyRotation,
  );
  const user = spotify?.user;
  switch (userCategory) {
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

      const favourites = [
        ...topTracksArrayPrimary,
        ...topArtistsArrayPrimary,
        ...heavyRotationPrimary,
      ];

      const playlists = [
        ...spotifyPlaylistsArrayPrimary,
        ...appleMusicPlaylistsArrayPrimary,
      ];

      firestore()
        .doc(`users/${userId}`)
        .update({
          favorites: JSON.stringify(favourites),
          playlists: JSON.stringify(playlists),
          userCategory,
        });
      break;
    case 'spotify':
      const topTracksArray = topTracks.map((track: any) => {
        return {
          info: 'topTracks',
          ...track,
        };
      });
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 123 ~ topTracksArray ~ topTracksArray',
        topTracksArray,
      );
      const topArtistsArray = topArtists.map((track: any) => {
        return {
          info: 'topArtists',
          ...track,
        };
      });
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 133 ~ topArtistsArray ~ topArtistsArray',
        topArtistsArray,
      );
      const playlistsArray = spotifyPlaylists.map((track: any) => {
        return {
          info: 'playlists:spotify',
          ...track,
        };
      });
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 140 ~ playlistsArray ~ playlistsArray',
        playlistsArray,
      );

      const favouritesSpotify = [...topTracksArray, ...topArtistsArray];
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 141 ~ heavyRotationPrimary ~ favouritesSpotify',
        favouritesSpotify,
      );

      const playlistsSpotify = [...playlistsArray];
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 155 ~ heavyRotationPrimary ~ playlistsSpotify',
        playlistsSpotify,
      );

      firestore()
        .doc(`users/${userId}`)
        .update({
          favorites: JSON.stringify(favouritesSpotify),
          playlists: JSON.stringify(playlistsSpotify),
          userCategory,
        });
      break;
    case 'apple_music':
      // console.log(
      //   '🚀 ~ file: buildProfile.ts ~ line 226 ~ heavyRotationAppleMusic ~ heavyRotation',
      //   heavyRotation,
      // );

      const heavyRotationAppleMusic = heavyRotation.map((track: any) => {
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
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 165 ~ heavyRotationAppleMusic ~ heavyRotationAppleMusic',
        heavyRotationAppleMusic,
      );
      // no artists - apple music (build please)

      const playlistsArrayAppleMusic = appleMusicPlaylists.map((track: any) => {
        return {
          info: 'playlists:apple_music',
          ...track,
        };
      });
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 140 ~ playlistsArray ~ playlistsArray',
        playlistsArray,
      );

      const favouritesAppleMusic = [...heavyRotationAppleMusic];
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 141 ~ heavyRotationPrimary ~ favouritesAppleMusic',
        favouritesAppleMusic,
      );

      const playlistsAppleMusic = [...playlistsArrayAppleMusic];
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 155 ~ heavyRotationPrimary ~ playlistsAppleMusic',
        playlistsAppleMusic,
      );

      firestore()
        .doc(`users/${userId}`)
        .update({
          favorites: JSON.stringify(favouritesAppleMusic),
          playlists: JSON.stringify(playlistsAppleMusic),
          userCategory,
        });

      break;
    default:
      break;
  }
};
