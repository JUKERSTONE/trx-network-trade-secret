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
  console.log(
    '🚀 ~ file: handleServices.ts ~ line 12 ~ handleServices ~ user',
    user,
  );
  const {handleSpotifyService, handleAppleMusicService, handleBuildProfile} =
    useFirebase();

  const {success: spotifySuccess, data: spotify} = await handleSpotifyService({
    user,
  }); // on fail, redo with timeout 10 seconds until it gets it right
  console.log(
    '🚀 ~ file: handleServices.ts ~ line 18 ~ handleServices ~ spotify',
    spotify,
  );
  console.log(
    '🚀 ~ file: handleServices.ts ~ line 18 ~ handleServices ~ spotifySuccess',
    spotifySuccess,
  );
  const {success: appleMusicSuccess, data: apple_music} =
    await handleAppleMusicService(); // on fail, redo with timeout 10 seconds until it gets it right

  let trak;
  switch (spotifySuccess) {
    case true:
      switch (appleMusicSuccess) {
        case true:
          const trakland = {
            spotify,
            apple_music,
          };

          await handleBuildProfile({trakland, userCategory: 'primary'});

          trak = trakland;
          break;
        case false:
          const trakland1 = {
            spotify,
            apple_music: null,
          };

          await handleBuildProfile({
            trakland: trakland1,
            userCategory: 'spotify',
          });

          trak = trakland1;

          break;
        default:
          break;
      }
    case false:
      switch (appleMusicSuccess) {
        case true:
          const trakland = {
            spotify: null,
            apple_music,
          };
          await handleBuildProfile({
            trakland,
            userCategory: 'apple_music',
          });

          trak = trakland;
          break;
        case false:
          const trakland1 = {
            spotify: null,
            apple_music: null,
          };

          await handleBuildProfile({
            trakland: trakland1,
            userCategory: 'offline',
          });

          break;
        default:
          break;
      }
    default:
      break;
  }

  const action1 = setTRAKLANDProfile(trak);
  store.dispatch(action1);
};
