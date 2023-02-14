import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';

export const handleAppendTRAK = async (payload: any) => {
  console.log(
    '🚀 ~ file: appendTRAK.ts:13 ~ handleAppendTRAK ~ payload',
    payload,
  );
  return await firestore()
    .doc(`TRX/trx:01:${payload.NFTFileName}`)
    .set({
      isOriginal: true,
      title: payload.title,
      artist: payload.artist,
      serialized_trak: JSON.stringify(payload),
    })
    .then(res => {
      return {
        success: true,
      };
    })
    .catch(() => {
      alert('d');
      return {
        success: false,
      };
    });
};
