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

  const {success: appleMusicSuccess, data: apple_music} =
    await handleAppleMusicService(); // on fail, redo with timeout 10 seconds until it gets it right

  let trak;
  console.log(
    '🚀 ~ file: handleServices.ts ~ line 28 ~ handleServices ~ spotifySuccess',
    spotifySuccess,
  );

  if (spotifySuccess) {
    if (appleMusicSuccess) {
      const trakland = {
        spotify,
        apple_music,
      };
      await handleBuildProfile({trakland, userCategory: 'primary'});

      trak = trakland;
    } else {
      const trakland1 = {
        spotify,
        apple_music: null,
      };

      await handleBuildProfile({
        trakland: trakland1,
        userCategory: 'spotify',
      });

      trak = trakland1;
    }
  } else {
    if (appleMusicSuccess) {
      const trakland = {
        spotify: null,
        apple_music,
      };
      await handleBuildProfile({
        trakland,
        userCategory: 'apple_music',
      });

      trak = trakland;
    } else {
      const trakland1 = {
        spotify: null,
        apple_music: null,
      };

      await handleBuildProfile({
        trakland: trakland1,
        userCategory: 'offline',
      });
      trak = trakland1;
    }
  }

  console.log('🚀 ~ file: handleServices.ts:80 ~ handleServices ~ trak:', trak);
  const action1 = setTRAKLANDProfile(trak);
  store.dispatch(action1);
};
