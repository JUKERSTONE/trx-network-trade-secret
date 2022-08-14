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

export const handleLikeTRAK = async ({standard, protocol}: any) => {
  console.log(
    '🚀 ~ file: liketRAK.ts ~ line 22 ~ handleLikeTRAK ~ standard',
    standard,
  );
  const {handleGetState} = useLITELISTState();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.spotify.accessToken;

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;

  const proto = protocol.split('-')[1];

  await firestore()
    .collection('likes')
    .add({
      userId: TRXProfile.id,
      trakURI: `trx:${proto}:${standard}`,
      likedAt: new Date().toString(),
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Track not saved?',
        text2: 'Sorry! Better luck next time',
      });
    });
};
