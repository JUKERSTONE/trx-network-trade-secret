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
import {useSelector} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {handleLikeTRAK} from '../hooks';

export const handleAppendTRAKLIST = async ({trak}: any) => {
  const {useGET} = useAPI();
  console.log(
    '🚀 ~ file: appendTRAKLIST.ts ~ line 18 ~ handleAppendTRAKLIST ~ trak',
    trak,
  );
  // trak - trx-00 pools
  // artist - trx-33

  const {handleGetState} = useLITELISTState();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.spotify.accessToken;

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  console.log(
    '🚀 ~ file: appendTRAKLIST.ts ~ line 37 ~ handleAppendTRAKLIST ~ TRXProfile',
    TRXProfile,
  );

  const userCategory = TRXProfile.userCategory;
  console.log(
    '🚀 ~ file: appendTRAKLIST.ts ~ line 33 ~ handleAppendTRAKLIST ~ userCategory',
    userCategory,
  );

  const trakId = uuid.v4() as string;

  const {protocol, TRAK} = trak;
  console.log(
    "🚀 ~ file: appendTRAKLIST.ts ~ line 55 ~ handleAppendTRAKLIST ~ TRAK?.trak?.spotify?.uri.split(':')[2]",
    TRAK?.trak?.spotify?.uri.split(':')[2],
  );

  const route = api.spotify({
    method: 'song',
    payload: {trakId: TRAK?.trak?.spotify?.uri.split(':')[2]},
  });

  const isrc = await useGET({route, token: accessToken})
    .then(response => {
      console.log(
        '🚀 ~ file: appendTRAKLIST.ts ~ line 55 ~ handleAppendTRAKLIST ~ response',
        response,
      );

      return response.data.external_ids.isrc;
    })
    .catch((err: any) => {
      Toast.show({
        type: 'error',
        text1: 'Track not saved? [NO ISRC]',
        text2: 'Sorry! Better luck next time',
      });
    });

  const trakURI = `trx:00:${isrc}`;

  if (!isrc) return;

  await handleLikeTRAK({standard: isrc, protocol});

  await firestore()
    .doc(`TRX/${trakURI}`)
    .set({
      title: TRAK?.trak?.title,
      artist: TRAK?.trak?.artist,
      isrc: isrc,
      serialized_trak: JSON.stringify(trak),
    })
    .then(async () => {
      // alert('You just made history by appending the TRAKLIST!');
      setTimeout(() => {
        Toast.show({
          type: 'info',
          text1: 'You just made history!',
          text2: 'Keep liking to optimize the TRAKLIST',
        });
      }, 1000);
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Track not saved?',
        text2: 'Sorry! Better luck next time',
      });
      console.log(
        '🚀 ~ file: appendTRAKLIST.ts ~ line 33 ~ handleAppendTRAKLIST ~ err',
        err,
      );
      alert('err');
    });
};
