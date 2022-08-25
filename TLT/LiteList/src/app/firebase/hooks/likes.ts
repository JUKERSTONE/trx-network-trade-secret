import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setFirebaseProfile,
  storeKeysTRX,
  setLikes,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export const handleTRAKLIST = async () => {
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  const traklist = await firestore()
    .collection('likes')
    .where('userId', '==', userId)
    .get()
    .then((data: any) => {
      console.log('🚀 ~ file: likes.ts ~ line 31 ~ .then ~ data', data);
      let traklist: any[] = [];
      data.forEach((doc: any) => {
        const data = doc.data();
        traklist.push(data);
      });

      return traklist;
    });

  console.log(
    '🚀 ~ file: likes.ts ~ line 31 ~ handleTRAKLIST ~ traklist',
    traklist,
  );

  const action = setLikes({likes: traklist});
  store.dispatch(action);
};
