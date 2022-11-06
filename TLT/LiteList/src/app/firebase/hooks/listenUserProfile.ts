import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  setFirebaseProfile,
  storeKeysTRX,
  asyncStorageIndex,
  setAuthentication,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import {handleCrypto} from '../../../app';

export const handleListenUserProfile = async (user: any, idToken: string) => {
  const {handleGetState} = useLITELISTState();

  const keys = handleGetState({index: 'keys'});
  console.log(
    '🚀 ~ file: listenUserProfile.ts ~ line 20 ~ handleListenUserProfile ~ keys',
    keys,
  );

  const {useGET, usePOST} = useAPI();
  const {handleGet} = useAsyncStorage();
  const email = user._user.email;
  const id = user._user.uid;

  const serialized_tuc_keys: any = await handleGet({
    key: 'fingerprint',
  }).then((data: any) => {
    const tuc_keys = JSON.parse(data);
    console.log(
      '🚀 ~ file: listenUserProfile.ts ~ line 46 ~ handleListenUserProfile ~ tuc_keys',
      tuc_keys,
    );
    return tuc_keys;
  });
  console.log(
    '🚀 ~ file: listenUserProfile.ts ~ line 28 ~ handleListenUserProfile ~ serialized_stacks_keys',
    serialized_tuc_keys,
  );

  // let stacks_keys: any;
  if (!serialized_tuc_keys) {
    return {success: false, data: 'connect your wallet'};
  }

  const wallet = await handleCrypto({keys: serialized_tuc_keys, user});
  console.log(
    '🚀 ~ file: listenUserProfile.ts ~ line 42 ~ handleListenUserProfile ~ wallet',
    wallet,
  );

  firestore()
    .doc(`users/${id}`)
    .onSnapshot(async (snap: any) => {
      const profile = snap.data();
      // console.log(
      //   '🚀 ~ file: getUserProfile.ts ~ line 39 ~ .onSnapshot ~ profile',
      //   profile,
      // );

      const action_3 = setTRXProfile({
        ...profile,
        wallet,
      });
      store.dispatch(action_3);

      const payload = user._user;
      const FBaction = setFirebaseProfile(payload);
      store.dispatch(FBaction);

      const action = storeKeysTRX(idToken);
      store.dispatch(action);
    });

  return {
    success: true,
  };
};
