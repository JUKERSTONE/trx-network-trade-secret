import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
import firestore from '@react-native-firebase/firestore';
import {useBERNIEState} from '../../useBERNIEState';

export const handleGetPreviews = () => {
  return firestore()
    .collection(`likes`)
    .where('isPreview', '==', true)
    .get()
    .then((data: any) => {
      let previews: any = [];
      data.forEach((doc: any) => {
        previews.push(doc.data());
      });
      return previews;
    });
};
