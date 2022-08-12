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
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import {Alert} from 'react-native';

export const handleAppendTRAKLIST = async ({trak}: any) => {
  console.log(
    '🚀 ~ file: appendTRAKLIST.ts ~ line 18 ~ handleAppendTRAKLIST ~ trak',
    trak,
  );
  // trak - trx-00 pools
  // artist - trx-33

  const trakId = uuid.v4() as string;

  const trakURI = `trx:00:${trakId}`;

  const {protocol, TRAK} = trak;

  // const identifiers = {
  //   isrc: null, // ultimate key

  //   genius: TRAK.trak.genius.id, // the prize

  //   spotify: TRAK.trak.spotify?.uri, // the utility1
  //   apple_music: TRAK.trak.apple_music?.id, // the utility2
  //   youtube: TRAK.trak.youtube?.url,
  //   soundcloud: TRAK.trak.soundcloud?.url,
  //   trakURI,
  // };

  await firestore()
    .doc(`TRX/${trakURI}`)
    .set({
      title: TRAK?.trak?.title,
      artist: TRAK?.trak?.artist,
      // isrc: null, // ultimate key

      genius: TRAK?.trak?.genius?.id, // the prize

      // spotify: TRAK?.trak?.spotify?.uri, // the utility1
      // apple_music: TRAK?.trak?.apple_music?.id, // the utility2
      // youtube: TRAK?.trak?.youtube?.url,
      // soundcloud: TRAK?.trak?.soundcloud?.url,
      // trakURI,
      serialized_trak: JSON.stringify(trak),
    })
    .then(() => {
      alert('You just made history!');
    })
    .catch(err => {
      console.log(
        '🚀 ~ file: appendTRAKLIST.ts ~ line 33 ~ handleAppendTRAKLIST ~ err',
        err,
      );
      alert('err');
    });
};
