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

export const handleLikeTRAK = async ({trak, protocol}: any) => {
  console.log('🚀 ~ file: likeTRAK.ts:22 ~ handleLikeTRAK ~ trak:', trak);
  const {handleGetState} = useLITELISTState();

  const {serializedTrak, ...likeDocument} = trak;

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.spotify.accessToken;

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  // check for duplicates
  // if yes, isPreview = false, trakURI = trx:00:isrc

  const likeExists = await firestore()
    .collection('likes')
    .where('artist', '==', trak.trak.artist)
    .where('title', '==', trak.trak.title)
    .where('userId', '==', userId)
    .limit(1)
    .get()
    .then(data => {
      return !data.empty;
    });

  if (likeExists) {
    return alert('already liked');
  }

  switch (protocol) {
    case 'trx:00':
      return await firestore()
        .collection('likes')
        .doc(`like:${userId}:${trak.isrc}`)
        .set({...trak.trak, trakstar: `trx:00:${trak.isrc}`})
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Track not saved?',
            text2: 'Sorry! Better luck next time',
          });
        });
    case 'trx:04':
      return await firestore()
        .collection('likes')
        .doc(`like:${userId}:${trak.ytid}`)
        .set({...trak.trak, trakstar: `trx:04:${trak.ytid}`})
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Track not saved?',
            text2: 'Sorry! Better luck next time',
          });
        });
      break;
    case 'trx:isrc':
      return await firestore()
        .collection('likes')
        .doc(`like:${userId}:${trak.isrc}`)
        .set({...trak.trak, isISRCPreview: true})
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Track not saved?',
            text2: 'Sorry! Better luck next time',
          });
        });
      break;
    default:
      break;
  }
};
