import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  setFirebaseProfile,
  storeKeysTRX,
  asyncStorageIndex,
  setAuthentication,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import {v4 as uuidv4} from 'uuid';

export const handleSetChat = async (users: any, type: any) => {
  const chatId = uuidv4();
  const chatURI = `${type}:${chatId}`;
  await users.forEach((user: any) => {
    firestore().doc(`users/${user}/chats/${chatId}`).set({
      chatURI,
      lastMessage: null,
      users,
    });
  });
  return chatURI;
};
