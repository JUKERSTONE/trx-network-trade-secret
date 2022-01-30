import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';

const {useGET} = useAPI();
const {handleStore} = useAsyncStorage();

export const handleRegister = async ({TRXProfile}: any) => {
  console.log(
    '🚀 ~ file: register.ts ~ line 6 ~ handleRegister ~ TRXProfile',
    TRXProfile,
  );

  const {
    email_address,
    isAuthenticatedSpotify,
    location,
    password,
    phone_number,
    quotable,
    subscription,
    trak_name,
    trak_symbol,
    user_name,
  } = TRXProfile;

  auth()
    .createUserWithEmailAndPassword(email_address, password)
    .then(async data => {
      const id = data.user.uid;
      console.log('User account created & signed in!', email_address, password);

      firestore()
        .collection('users')
        .add({
          id,
          email_address,
          isAuthenticatedSpotify,
          location,
          password,
          phone_number,
          quotable,
          subscription,
          trak_name,
          trak_symbol,
          user_name,
        })
        .then(() => {
          const route = api.bernie({
            method: 'raffle',
            payload: {
              subscription,
              user_name,
            },
          });
          const response: any = useGET({route});
          console.log(
            '🚀 ~ file: register.ts ~ line 58 ~ .then ~ response',
            response,
          );
          const trak = response;

          return trak;
        })
        .then(userTRAK => {
          console.log(
            '🚀 ~ file: register.ts ~ line 75 ~ handleRegister ~ userTRAK',
            userTRAK,
          );
          const trak = userTRAK.data;
          TRXProfile.wallet = trak;
          const payload = TRXProfile;
          const action = setTRXProfile(payload);
          store.dispatch(action);
          const key = asyncStorageIndex.profile;
          handleStore({key, value: payload});
        });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        return 'That email address is already in use!';
      }

      if (error.code === 'auth/invalid-email') {
        return 'That email address is invalid!';
      }

      console.error(error);
    });
};
