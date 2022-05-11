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

  const spotify = await handleSpotifyService({user}); // on fail, redo with timeout 10 seconds until it gets it right

  const {success, data} = await handleAppleMusicService(); // on fail, redo with timeout 10 seconds until it gets it right

  switch (success) {
    case true:
      const trakland = {
        spotify,
        apple_music: data,
      };

      const action = setTRAKLANDProfile(trakland);
      store.dispatch(action);
      break;
    case false:
      alert(data);
      break;
    default:
      break;
  }
};
