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

export const handleSetTransaction = async ({
  id,
  recipient,
  userId,
  createdAt,
}: any) => {
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  return firestore()
    .collection('transactions')
    .doc(id)
    .set({
      id,
      recipent: recipient.name,
      stacks_public_key: recipient.publicKey,
      userId,
      createdAt,
    })
    .then(() => {
      return {
        success: true,
      };
    })
    .catch((err: any) => {
      return {
        success: false,
      };
    });
};
