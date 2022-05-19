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
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const username = TRXProfile.user_name;
  const avatar = TRXProfile.avatarURL;

  const chatId = uuidv4();
  const chatURI = `${type}:${chatId}`;

  function arraysContainSame(a: any, b: any) {
    a = Array.isArray(a) ? a : [];
    b = Array.isArray(b) ? b : [];
    return a.length === b.length && a.every((el: any) => b.includes(el));
  }

  if (users.length === 1) {
    return {
      success: false,
      data: "you didn't add anyone",
    };
  }

  if (type === 'group' && users.length < 3) {
    return {
      success: false,
      data: 'you need at least 3 users to create a group chat',
    };
  }

  return await firestore()
    .collection(`users/${userId}/chats`)
    .get()
    .then(async (data: any) => {
      console.log('🚀 ~ file: setChat.ts ~ line 49 ~ .then ~ data', data);
      let chats: any = [];

      data.forEach((doc: any) => {
        chats.push(doc.data());
      });

      const duplicateChat = chats.find((chat: any) => {
        const members: any = chat.users;
        return arraysContainSame(users, members);
      });
      console.log(
        '🚀 ~ file: setChat.ts ~ line 63 ~ isDuplicateChat ~ isDuplicateChat',
        duplicateChat,
      );

      switch (duplicateChat) {
        case undefined:
          await users.forEach((user: any) => {
            firestore()
              .doc(`users/${user}/chats/${chatId}`)
              .set({
                chatURI,
                lastMessage: {
                  chat: 'new chat',
                  avatar,
                  username,
                  sentAt: new Date().toISOString(),
                },
                users,
              });
          });
          return {
            success: true,
            data: chatURI,
          };

        default:
          return {
            success: true,
            data: duplicateChat.chatURI,
          };
      }
    });
};
