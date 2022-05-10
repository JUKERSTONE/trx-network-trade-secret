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
  const {handleSpotifyService, handleAppleMusicService} = useFirebase();

  const spotify = await handleSpotifyService({user});
  console.log(
    '🚀 ~ file: handleServices.ts ~ line 16 ~ handleServices ~ spotify',
    spotify,
  );
  const apple_music = await handleAppleMusicService();
  console.log(
    '🚀 ~ file: handleServices.ts ~ line 18 ~ handleServices ~ apple_music',
    apple_music,
  );

  const trakland = {
    spotify,
    apple_music,
  };
  console.log(
    '🚀 ~ file: handleServices.ts ~ line 13 ~ handleServices ~ trakland',
    trakland,
  );

  const action = setTRAKLANDProfile(trakland);
  store.dispatch(action);
};
