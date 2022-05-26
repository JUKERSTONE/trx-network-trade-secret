import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
  setChats,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';

export const handleRetrieveChats1 = () => {
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log(
    '🚀 ~ file: retrieveChats.ts ~ line 18 ~ handleRetrieveChats ~ userId',
    userId,
  );

  return firestore()
    .collection(`users/${userId}/chats`)
    .onSnapshot(snap => {
      const changedDocuments = snap.docChanges();
      console.log(
        '🚀 ~ file: retrieveChats1.ts ~ line 29 ~ handleRetrieveChats1 ~ changedDocuments',
        changedDocuments,
      );
      let chats: any = [];
      changedDocuments.forEach(async chat => {
        const {chatURI, lastMessage, thumbnail} = chat.doc.data();

        const messages = await firestore()
          .collection(`messaging`)
          .where('chatURI', '==', chatURI)
          .get()
          .then((data: any) => {
            let messages: any = [];

            data.forEach((doc: any) => {
              messages.push(doc.data());
            });

            console.log(
              '🚀 ~ file: retrieveChat.ts ~ line 26 ~ .then ~ messages',
              messages,
            );
            return messages;
          });

        const payload = {
          chatURI,
          lastMessage,
          messages,
          thumbnail,
        };

        const FBaction = setChats(payload);
        store.dispatch(FBaction);
      });

      return chats;
    });
};
