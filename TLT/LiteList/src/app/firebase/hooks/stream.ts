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

export const handleStream = async ({
  uri,
  title,
  artist,
  cover_art,
  geniusId,
}: {
  uri: string;
  title: string;
  artist: string;
  cover_art: string;
  geniusId: string;
}) => {
  console.log('🚀 ~ file: stream.ts:15 ~ handleStream ~ uri:', uri);
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log(
    '🚀 ~ file: retrieveStory.ts ~ line 18 ~ handleRetrieveStory ~ userId',
    userId,
  );

  const sessionId = uuid.v4();

  const session = {
    id: sessionId,
    userId,
    trakUri: uri,
    title,
    artist,
    cover_art,
    geniusId,
    streamingAt: new Date().toString(),
  };

  const streamDoc = await firestore()
    .doc('fundamentals/TRAKSTAR/streaming/' + uri)
    .get()
    .then(async doc => {
      const data = doc.data();
      console.log('🚀 ~ file: stream.ts:39 ~ handleStream ~ data:', data);
      if (doc.exists) {
        await firestore()
          .doc('fundamentals/TRAKSTAR/streaming/' + uri)
          .update({
            count: data?.count + 1,
            sessions: [...data?.sessions, session],
          });
      } else {
        await firestore()
          .doc('fundamentals/TRAKSTAR/streaming/' + uri)
          .set({
            count: 1,
            sessions: [session],
          })
          .catch(err => {
            alert('stream err');
            console.log('🚀 ~ file: stream.ts:52 ~ handleStream ~ err:', err);
          });
      }

      console.log('🚀 ~ file: getTrending.ts:29 ~ .then ~ data:', doc.data());
    })
    .then(async () => {
      //
      // update user playback

      await firestore()
        .doc(`users/${userId}/playback/` + sessionId)
        .set({
          session,
        });
    })
    .catch(err => {
      alert('err stream 1');
      console.log('🚀 ~ file: stream.ts:70 ~ .then ~ err:', err);
    });

  console.log('🚀 ~ file: stream.ts:24 ~ handleStream ~ streamDoc:', streamDoc);
};
