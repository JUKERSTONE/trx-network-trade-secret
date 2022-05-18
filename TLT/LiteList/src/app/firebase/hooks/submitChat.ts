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
import {useLITELISTState} from '../../useLITELISTState';
import {v4 as uuidv4} from 'uuid';

export const handleSubmitChat = async ({chat, chatURI}: any) => {
  console.log(
    '🚀 ~ file: submitChat.ts ~ line 14 ~ handleSubmitChat ~ chat, chatURI',
    chat,
    chatURI,
  );
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const username = TRXProfile.user_name;

  const messageId = uuidv4();

  const chatId = chatURI.split(':')[1];

  const users = await firestore()
    .doc(`users/${userId}/chats/${chatId}`)
    .get()
    .then((doc: any) => {
      return doc.data().users;
    });

  await firestore().doc(`messaging/${messageId}`).set({
    messageId,
    message: chat,
    chatURI,
    userId,
    username,
    sentAt: new Date().toISOString(),
  });
  users.forEach((user: any) => {
    firestore().doc(`users/${user}/chats/${chatId}`).update({
      lastMessage: chat,
    });
  });
};
