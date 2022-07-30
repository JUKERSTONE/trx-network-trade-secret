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

export const handleListenUserProfile = async (user: any, idToken: string) => {
  const {handleGetState} = useLITELISTState();

  const keys = handleGetState({index: 'keys'});

  const {useGET, usePOST} = useAPI();
  const {handleGet} = useAsyncStorage();
  const email = user._user.email;
  const id = user._user.uid;

  const serialized_stacks_keys: any = await handleGet({
    key: asyncStorageIndex.stacks_keys,
  });
  console.log(
    '🚀 ~ file: listenUserProfile.ts ~ line 28 ~ handleListenUserProfile ~ serialized_stacks_keys',
    serialized_stacks_keys,
  );

  let stacks_keys: any;
  if (!serialized_stacks_keys) {
    return {success: false, data: 'connect your wallet'};
  } else {
    stacks_keys = JSON.parse(serialized_stacks_keys);
  }

  firestore()
    .doc(`users/${id}`)
    .onSnapshot(async (snap: any) => {
      const profile = snap.data();
      // console.log(
      //   '🚀 ~ file: getUserProfile.ts ~ line 39 ~ .onSnapshot ~ profile',
      //   profile,
      // );

      const action_3 = setTRXProfile({...profile, stacks_keys});
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
