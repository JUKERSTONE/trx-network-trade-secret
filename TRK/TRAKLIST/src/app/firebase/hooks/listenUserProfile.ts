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
import {useTRAKLISTState} from '../../useTRAKLISTState';
import axios from 'axios';
import {Base64} from '../../../core';

export const handleListenUserProfile = async (user: any, idToken: string) => {
  const {useGET, usePOST} = useAPI();
  const {handleGet} = useAsyncStorage();
  const email = user._user.email;
  const id = user._user.uid;

  // const serialized_stacks_keys: any = await handleGet({
  //   key: asyncStorageIndex.stacks_keys,
  // });
  // const stacks_keys = JSON.parse(serialized_stacks_keys);

  firestore()
    .doc(`users/${id}`)
    .onSnapshot(async (snap: any) => {
      const profile = snap.data();
      console.log(
        '🚀 ~ file: getUserProfile.ts ~ line 39 ~ .onSnapshot ~ profile',
        profile,
      );

      // const route = 'https://accounts.spotify.com/api/token';

      // const body = new URLSearchParams({
      //   grant_type: 'refresh_token',
      //   refresh_token:
      //     'AQCwmMCtW2lRfrVJndP0VvfR7a_0Sj7yPOd0fztLKSwvUTBwkw9I5xb5ShAG8ji5Pj_DZ2xWrILYwqA-RXWK7o4x43SHoqG_GnWbbWo0AiPMdGQd-oVaPdJkMD2ZPyiMbbAdYg',
      //   client_id: '29dec26a7f304507b4a9d9bcf0ef210b',
      //   client_secret: '1d27af3b5c4946c1a411657ca50490d0',
      // });
      // console.log(
      //   '🚀 ~ file: listenUserProfile.ts ~ line 46 ~ .onSnapshot ~ body',
      //   body,
      // );

      // const response = await axios({
      //   url: route,
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'x-www-form-urlencoded',
      //   },
      //   // This will urlencode the data correctly:
      //   data: new URLSearchParams({
      //     grant_type: 'refresh_token',
      //     refresh_token:
      //       'AQC6BM2eohFiI4namy2zd8xiI2FpIo3UIu6R6hD_Yd35c0KyFq-5Fevi00cNs8oArLkPO6pR6mBuSRHyeTKQp1vMumwc8-NoP0JJIQzbxsXGAwKXE7wNXHOSp_iL7twk8hIkuA',
      //     client_id: '29dec26a7f304507b4a9d9bcf0ef210b',
      //     client_secret: '1d27af3b5c4946c1a411657ca50490d0',
      //   }),
      // })
      //   .then(response => {
      //     console.log(
      //       '🚀 ~ file: listenUserProfile.ts ~ line 66 ~ .onSnapshot ~ response',
      //       response,
      //     );
      //     alert(2);
      //   })
      //   .catch(error => {
      //     console.log(
      //       '🚀 ~ file: listenUserProfile.ts ~ line 73 ~ .onSnapshot ~ error',
      //       error,
      //       error.message,
      //       alert(1),
      //     );
      //   });
      // console.log(
      //   '🚀 ~ file: listenUserProfile.ts ~ line 66 ~ .onSnapshot ~ response',
      //   response,
      // );

      // axios
      //   .post(route, body, {
      //     headers: {
      //       // Authorization:
      //       //   'Basic ' + profile.spotifyRefreshToken.toString('base64'),
      //       // Buffer.from(
      //       //   '29dec26a7f304507b4a9d9bcf0ef210b' +
      //       //     ':' +
      //       //     '1d27af3b5c4946c1a411657ca50490d0',
      //       // ).toString('base64'),
      //       'Content-Type': 'application/x-www-form-urlencoded',
      //     },
      //   })
      // .then(res => {
      //   console.log(
      //     '🚀 ~ file: listenUserProfile.ts ~ line 51 ~ .then ~ res',
      //     res,
      //   );
      //   alert('lk');
      // })
      // .catch(err => {
      //   alert('2');
      //   console.log(
      //     '🚀 ~ file: listenUserProfile.ts ~ line 56 ~ .onSnapshot ~ err',
      //     err,
      //     err.message,
      //   );
      // });

      const action_3 = setTRXProfile({...profile});
      store.dispatch(action_3);

      const payload = user._user;
      const FBaction = setFirebaseProfile(payload);
      store.dispatch(FBaction);

      const action = storeKeysTRX(idToken);
      store.dispatch(action);
    });
  return idToken;
};
