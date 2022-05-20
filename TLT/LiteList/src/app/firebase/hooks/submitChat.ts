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
import uuid from 'react-native-uuid';

export const handleSubmitChat = async ({chat, chatURI}: any) => {
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const username = TRXProfile.user_name;
  const avatar = TRXProfile.avatarURL;

  const messageId = uuid.v4();

  const chatId = chatURI.split(':')[1];

  const sentAt = new Date().toISOString();

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
    sentAt,
    avatar,
  });

  users.forEach((user: any) => {
    firestore()
      .doc(`users/${user}/chats/${chatId}`)
      .update({
        lastMessage: JSON.stringify({
          chat,
          avatar,
          username,
          sentAt,
        }),
      });
  });
};
