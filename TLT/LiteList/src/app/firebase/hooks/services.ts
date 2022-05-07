import auth from '@react-native-firebase/auth';
import {
  store,
  setTRAKLANDProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {spotifyRefresh, spotifyProfileRefresh} from '../../hooks';

export const handleSpotifyService = ({user}: any) => {
  console.log(
    '🚀 ~ file: services.ts ~ line 14 ~ handleSpotifyService ~ user',
    user,
  );

  const id = user._user.uid;
  console.log(
    '🚀 ~ file: services.ts ~ line 15 ~ handleSpotifyService ~ id',
    id,
  );
  alert(2);
  firestore()
    .doc(`users/${id}/services/spotify`)
    .get()
    .then(async (doc: any) => {
      const spotify = doc.data();

      const spotifyRefreshToken = spotify.refresh_token;
      const {accessToken, refreshToken}: any = await spotifyRefresh(
        spotifyRefreshToken,
      );

      const spotifyProfile: any = await spotifyProfileRefresh(accessToken);

      const traklandProfile = {
        refresh_token: refreshToken,
        top_tracks: spotifyProfile.topTracks,
        playlists: spotifyProfile.playlists,
        top_artists: spotifyProfile.topArtists,
        user: spotifyProfile.user,
      };

      firestore().doc(`users/${id}/services/spotify`).update(traklandProfile);

      const action = setTRAKLANDProfile({
        type: 'spotify',
        profile: traklandProfile,
      });
      store.dispatch(action);
    });
};
