import axios from 'axios';
import {
  store,
  setTRAKLANDProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
// @ts-ignore
import {useFirebase} from '../../firebase';
export const handleServices = async ({user}: any) => {
  const {handleSpotifyService, handleAppleMusicService, handleBuildProfile} =
    useFirebase();

  const {success: spotifySuccess, data: spotify} = await handleSpotifyService({
    user,
  }); // on fail, redo with timeout 10 seconds until it gets it right
  console.log(
    '🚀 ~ file: handleServices.ts ~ line 18 ~ handleServices ~ spotifySuccess',
    spotifySuccess,
  );
  const {success: appleMusicSuccess, data: apple_music} =
    await handleAppleMusicService(); // on fail, redo with timeout 10 seconds until it gets it right

  switch (spotifySuccess) {
    case true:
      switch (appleMusicSuccess) {
        case true:
          const trakland = {
            spotify,
            apple_music,
          };

          const action = setTRAKLANDProfile(trakland);
          store.dispatch(action);
          await handleBuildProfile({trakland, userCategory: 'primary'});
          break;
        case false:
          const trakland1 = {
            spotify,
            apple_music: null,
          };

          const action1 = setTRAKLANDProfile(trakland1);
          store.dispatch(action1);
          await handleBuildProfile({
            trakland1,
            userCategory: 'secondary:spotify',
          });
          break;
      }
    case false:
      switch (appleMusicSuccess) {
        case true:
          const trakland = {
            spotify: null,
            apple_music,
          };
          const action = setTRAKLANDProfile(trakland);
          store.dispatch(action);
          await handleBuildProfile({
            trakland,
            userCategory: 'secondary:apple_music',
          });
          break;
        case false:
          const trakland1 = {
            spotify: null,
            apple_music: null,
          };

          const action1 = setTRAKLANDProfile(trakland1);
          store.dispatch(action1);
          await handleBuildProfile({trakland1, userCategory: 'offline'});
          break;
        default:
          break;
      }
    default:
      break;
  }
};
