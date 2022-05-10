import auth from '@react-native-firebase/auth';
import {
  store,
  setTRAKLANDProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../../stores';
import {api, useAPI} from '../../../../api';
import firestore from '@react-native-firebase/firestore';
import {spotifyRefresh, spotifyProfileRefresh} from '../../../hooks';

export const handleSpotifyService = async ({user}: any) => {
  console.log(
    '🚀 ~ file: services.ts ~ line 14 ~ handleSpotifyService ~ user',
    user,
  );

  const id = user._user.uid;
  console.log(
    '🚀 ~ file: services.ts ~ line 15 ~ handleSpotifyService ~ id',
    id,
  );
  return await firestore()
    .doc(`users/${id}/services/spotify`)
    .get()
    .then(async (doc: any) => {
      const spotify = doc.data();

      const spotifyRefreshToken = spotify.refresh_token;
      console.log(
        '🚀 ~ file: spotify.ts ~ line 31 ~ .then ~ spotifyRefreshToken',
        spotifyRefreshToken,
      );
      const {accessToken, refreshToken}: any = await spotifyRefresh(
        spotifyRefreshToken,
      );

      console.log(
        '🚀 ~ file: spotify.ts ~ line 36 ~ .then ~ accessToken',
        accessToken,
        refreshToken,
      );
      await firestore()
        .doc(`users/${id}/services/spotify`)
        .update({refresh_token: refreshToken});

      const spotifyProfile: any = await spotifyProfileRefresh(accessToken);
      console.log(
        '🚀 ~ file: spotify.ts ~ line 44 ~ .then ~ spotifyProfile',
        spotifyProfile,
      );

      const traklandProfile = {
        refresh_token: refreshToken,
        top_tracks: spotifyProfile.topTracks,
        playlists: spotifyProfile.playlists,
        top_artists: spotifyProfile.topArtists,
        user: spotifyProfile.user,
      };
      console.log(
        '🚀 ~ file: spotify.ts ~ line 52 ~ .then ~ traklandProfile',
        traklandProfile,
      );

      return traklandProfile;
    });
};
