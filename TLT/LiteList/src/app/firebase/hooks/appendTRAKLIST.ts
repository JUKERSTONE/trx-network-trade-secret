import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  setFirebaseProfile,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const handleAppendTRAKLIST = async ({trak}: any) => {
  const {useGET} = useAPI();
  console.log(
    '🚀 ~ file: appendTRAKLIST.ts ~ line 18 ~ handleAppendTRAKLIST ~ trak',
    trak,
  );
  // trak - trx-00 pools
  // artist - trx-33

  const {handleGetState} = useLITELISTState();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.spotify.accessToken;

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  console.log(
    '🚀 ~ file: appendTRAKLIST.ts ~ line 37 ~ handleAppendTRAKLIST ~ TRXProfile',
    TRXProfile,
  );

  const userCategory = TRXProfile.userCategory;
  console.log(
    '🚀 ~ file: appendTRAKLIST.ts ~ line 33 ~ handleAppendTRAKLIST ~ userCategory',
    userCategory,
  );

  const trakId = uuid.v4() as string;

  const {protocol, TRAK} = trak;

  const route = api.spotify({
    method: 'song',
    payload: {trakId: TRAK?.trak?.spotify?.uri.split(':')[2]},
  });

  const isrc = await useGET({route, token: accessToken})
    .then(response => {
      console.log(
        '🚀 ~ file: appendTRAKLIST.ts ~ line 55 ~ handleAppendTRAKLIST ~ response',
        response,
      );

      return response.data.external_ids.isrc;
    })
    .catch((err: any) => {
      Toast.show({
        type: 'error',
        text1: 'Track not saved?',
        text2: 'Sorry! Better luck next time',
      });
    });

  const trakURI = `trx:00:${isrc}`;

  if (!isrc) return;

  await firestore()
    .doc(`TRX/${trakURI}`)
    .set({
      title: TRAK?.trak?.title,
      artist: TRAK?.trak?.artist,
      isrc: isrc, // ultimate key

      // genius: TRAK?.trak?.genius?.id, // the prize

      // spotify: TRAK?.trak?.spotify?.uri, // the utility1
      // apple_music: TRAK?.trak?.apple_music?.id, // the utility2
      // youtube: TRAK?.trak?.youtube?.url,
      // soundcloud: TRAK?.trak?.soundcloud?.url,
      // trakURI,
      serialized_trak: JSON.stringify(trak),
    })
    .then(async () => {
      alert('You just made history by appending the TRAKLIST!');

      await firestore()
        .collection('likes')
        .add({
          userId: TRXProfile.userId,
          trakURI: `trx:00:${isrc}`,
          likedAt: new Date().toString(),
        })
        .then(async () => {
          // save to spotify
          const ids = trak.apple_music;
          console.log(
            '🚀 ~ file: useSwipe.ts ~ line 115 ~ handleTRAKInteraction ~ ids',
            ids,
          );
          const route = api.spotify({method: 'save-track', payload: {ids}});
          console.log(
            '🚀 ~ file: useSwipe.ts ~ line 83 ~ handleSwipedRight ~ route',
            route,
          );

          // alert(key);

          await axios
            .put(route, [ids], {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + 'accessToken',
              },
            })
            .then(() => {
              // alert(
              //   player.artist +
              //     " - '" +
              //     player.title +
              //     "'\n - saved to Spotify -",
              // );
              // setIsModalVisible(true);
              Toast.show({
                type: 'success',
                text1: 'Glad you like it!',
                text2: 'We saved this song to your Spotify Library...',
              });
            })
            .catch(err => {
              // alert('- track not saved -');
              console.log(err, ' - track not saved');
              Toast.show({
                type: 'error',
                text1: 'Track not saved?',
                text2: 'Sorry! Better luck next time',
              });
            });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Track not saved?',
            text2: 'Sorry! Better luck next time',
          });
        });
    })
    .catch(err => {
      console.log(
        '🚀 ~ file: appendTRAKLIST.ts ~ line 33 ~ handleAppendTRAKLIST ~ err',
        err,
      );
      alert('err');
    });
};
