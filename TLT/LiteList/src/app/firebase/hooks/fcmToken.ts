import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setFirebaseProfile,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';

export const handleFCMToken = async () => {
  const {handleGet, handleStore} = useAsyncStorage();

  const key = asyncStorageIndex.fcm_token;
  console.log('🚀 ~ file: fcmToken.ts ~ line 22 ~ handleFCMToken ~ key', key);
  alert(key);
  console.log('🚀 ~ file: fcmToken.ts ~ line 22 ~ handleFCMToken ~ key', key);

  const serializedFCMToken: string = (await handleGet({key})) as string;
  console.log(
    '🚀 ~ file: fcmToken.ts ~ line 24 ~ handleFCMToken ~ serializedFCMToken',
    serializedFCMToken,
  );

  switch (serializedFCMToken) {
    case undefined:
      const fcmToken = JSON.parse(serializedFCMToken);
      console.log(
        '🚀 ~ file: fcmToken.ts ~ line 32 ~ handleFCMToken ~ fcmToken',
        fcmToken,
      );
      messaging()
        .getToken()
        .then((token: any) => {
          console.log(
            '🚀 ~ file: fcmToken.ts ~ line 32 ~ .then ~ token',
            token,
          );
          handleStore({key, value: token});
          return;
        })
        .catch(err => {
          alert('there was an error setting up notifications... ');
        });
      return;
    default:
      return;
  }
  // check for fcm in async storage
  // if has, then ignore.. if dowsnt have themn add
};
