import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setTRXWallet,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useTRAKLISTState} from '../../useTRAKLISTState';

const {useGET} = useAPI();
const {handleStore} = useAsyncStorage();

export const handleRegister = async ({TRXProfile}: any) => {
  console.log(
    '🚀 ~ file: register.ts ~ line 22 ~ handleRegister ~ TRXProfile',
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
    stacks_public_key,
  } = TRXProfile;

  auth()
    .createUserWithEmailAndPassword(email_address, password)
    .then(async data => {
      console.log(
        '🚀 ~ file: register.ts ~ line 37 ~ handleRegister ~ data',
        data,
      );

      const user = data.user;
      const accessToken = await user.getIdToken(true);

      const id = data.user.uid;

      const userDocument = firestore().doc(`users/${id}`);

      userDocument
        .set({
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
          last_logged_in: new Date().toString(),
          streak: 1,
          stacks_public_key,
        })
        .then(async () => {
          const route = api.bernie({
            method: 'raffle',
            payload: {subscription},
          });

          const raffleResponse = await useGET({
            route,
            token: accessToken,
          });

          const newTRAK = raffleResponse.data;
          console.log(
            '🚀 ~ file: register.ts ~ line 78 ~ .then ~ newTRAK',
            newTRAK,
          );

          const action_1 = setTRXWallet({trak: newTRAK, nft: []});
          store.dispatch(action_1);

          const payload = TRXProfile;
          console.log(
            '🚀 ~ file: register.ts ~ line 84 ~ .then ~ payload',
            payload,
          );
          const action = setTRXProfile(payload);
          store.dispatch(action);
          const key = asyncStorageIndex.profile;
          console.log('🚀 ~ file: register.ts ~ line 88 ~ .then ~ key', key);
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

      console.error(error, 'poo');
    });
};
