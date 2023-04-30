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

export const handleLikeTRAK = async ({trak}: any) => {
  console.log('🚀 ~ file: likeTRAK.ts:22 ~ handleLikeTRAK ~ trak:', trak);
  const {handleGetState} = useLITELISTState();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.spotify.accessToken;

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  // check for duplicates
  // if yes, isPreview = false, trakURI = trx:00:isrc

  const likeExists = await firestore()
    .collection('likes')
    .where('artist', '==', trak.artist)
    .where('title', '==', trak.title)
    .where('userId', '==', userId)
    .limit(1)
    .get()
    .then(data => {
      return !data.empty;
    });
  console.log(
    '🚀 ~ file: likeTRAK.ts:35 ~ handleLikeTRAK ~ likeExists:',
    likeExists,
  );

  const trxExists = (await firestore().doc(`TRX/trx:00:${trak.isrc}`).get())
    .exists;
  console.log(
    '🚀 ~ file: likeTRAK.ts:36 ~ handleLikeTRAK ~ exists:',
    trxExists,
  );

  if (trak.isrc && !likeExists) {
    await firestore()
      .collection('likes')
      .add(
        trxExists
          ? {
              ...trak,
              userId: TRXProfile.id,
              likedAt: new Date().toString(),
              isPreview: false,
              trakURI: `trx:00:${trak.isrc}`,
            }
          : {
              userId: TRXProfile.id,
              likedAt: new Date().toString(),
              ...trak,
            },
      )
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Track not saved?',
          text2: 'Sorry! Better luck next time',
        });
      });
  }
};
