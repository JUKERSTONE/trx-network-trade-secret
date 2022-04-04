import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  setFirebaseProfile,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useTRAKLISTState} from '../../useTRAKLISTState';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;
console.log(
  '🚀 ~ file: getUserProfile.ts ~ line 17 ~ accessToken',
  accessToken,
);

export const handleGetUserProfile = async (user: any, idToken: string) => {
  const {useGET, usePOST} = useAPI();

  const email = user._user.email;
  const id = user._user.uid;

  firestore()
    .doc(`users/${id}`)
    .onSnapshot(async (snap: any) => {
      const profile = snap.data();

      const action_3 = setTRXProfile(profile);
      store.dispatch(action_3);

      const payload = user._user;
      const FBaction = setFirebaseProfile(payload);
      store.dispatch(FBaction);

      const action = storeKeysTRX(idToken);
      store.dispatch(action);
    });
  return idToken;
};
