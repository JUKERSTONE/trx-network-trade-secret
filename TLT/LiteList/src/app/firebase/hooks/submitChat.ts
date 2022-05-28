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
import axios from 'axios';

export const handleSubmitChat = async ({chat, chatURI}: any) => {
  console.log(
    '🚀 ~ file: submitChat.ts ~ line 16 ~ handleSubmitChat ~ chat, chatURI',
    chat,
    chatURI,
  );
  const {usePOST} = useAPI();
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

  const registration_ids = await Promise.all(
    users.map(async (user: any) => {
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

      return await firestore()
        .doc(`users/${user}`)
        .get()
        .then((doc: any) => {
          console.log(
            '🚀 ~ file: submitChat.ts ~ line 63 ~ .then ~ doc',
            doc.data(),
          );
          return doc.data().fcm_token;
        });
    }),
  );

  console.log(
    '🚀 ~ file: submitChat.ts ~ line 66 ~ constregistration_ids=awaitusers.forEach ~ registration_ids',
    registration_ids,
  );

  const route = 'https://fcm.googleapis.com/fcm/send';
  const payload = {
    registration_ids,
    data: {
      type: 'chat',
      chatURI,
      body: username + ' sent you a message! reply now?',
      title: 'you just got mail 📬',
    },
    notification: {
      body: username + ' sent you a message! reply now?',
      title: 'you just got mail 📬',
    },
  };

  return axios
    .post(route, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAYMB6JVM:APA91bH_ZcWYHY7HO-SwjaCku7UuBCeZwSX-ZzUbEOhab1WMisT1toHX_vC0c18zbMSeTSjpogBcIu8N5sRTFsmoa72SL47rqU7BLvcKBHRojy_r1wOWFD4mHQ0dtTYTAl3A15Iczsrn',
      },
    })
    .catch((err: any) => {
      console.log('🚀 ~ file: submitChat.ts ~ line 75 ~ .then ~ err', err);
      //
      //
    });
};
