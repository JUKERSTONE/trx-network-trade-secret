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
import * as Keychain from 'react-native-keychain';

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
  // const serialized_tuc_keys: any = await handleGet({
  //   key: 'fingerprint',
  // }).then((data: any) => {
  //   const tuc_keys = JSON.parse(data);
  //   console.log(
  //     '🚀 ~ file: listenUserProfile.ts ~ line 46 ~ handleListenUserProfile ~ tuc_keys',
  //     tuc_keys,
  //   );
  //   return tuc_keys;
  // });
  // console.log(
  //   '🚀 ~ file: listenUserProfile.ts ~ line 28 ~ handleListenUserProfile ~ serialized_stacks_keys',
  //   serialized_tuc_keys,
  // );

  // Retrieve the credentials
  const tuc_keys = await Keychain.getGenericPassword({
    authenticationType:
      Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
    authenticationPrompt: {
      title: 'YOUR CRYPTO PASS',
      subtitle: "You'll need this for NFTs",
      description: '',
      cancel: 'BACK',
    },
    accessible: Keychain.ACCESSIBLE.ALWAYS,
    service: 'com.bernie.trk',
    accessControl: Keychain.ACCESS_CONTROL.DEVICE_PASSCODE,
  }).then((credentials: any) => {
    const serialized_tuc_keys = credentials.password;
    const tuc_keys = JSON.parse(serialized_tuc_keys);

    return tuc_keys;
  });

  console.log(
    '🚀 ~ file: listenUserProfile.ts ~ line 71 ~ handleListenUserProfile ~ tuc_keys',
    tuc_keys,
  );

  firestore()
    .doc(`users/${id}`)
    .onSnapshot(async (snap: any) => {
      const profile = snap.data();

      /** REPRODUCE NETWORK TRANSACTIONS */ const wallet = await handleCrypto({
        keys: profile.tuc_public_keys,
        user,
      });

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
