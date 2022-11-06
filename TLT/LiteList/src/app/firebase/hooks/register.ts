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
import {useLITELISTState} from '../../useLITELISTState';
import {useFirebase} from '../useFirebase';
import messaging from '@react-native-firebase/messaging';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-toast-message';

const {useGET} = useAPI();
const {handleStore, handleGet} = useAsyncStorage();

export const handleRegister = async ({TRXProfile}: any) => {
  const key = asyncStorageIndex.fcm_token;
  console.log(
    '🚀 ~ file: register.ts ~ line 22 ~ handleRegister ~ TRXProfile',
    TRXProfile,
  );

  const serialized_tuc_keys: any = await handleGet({
    key: 'fingerprint',
  }).then(async (data: any) => {
    console.log(
      '🚀 ~ file: register.ts ~ line 44 ~ handleRegister ~ data',
      data,
    );
    const keys = await JSON.parse(data);
    console.log(
      '🚀 ~ file: register.ts ~ line 46 ~ handleRegister ~ keys',
      keys,
    );

    // KEYCHAIN
    const username = '_trk_utl_cn_hash_';
    const password = keys;

    // Store the credentials
    await Keychain.setGenericPassword(username, password)
      .then((data: any) => {
        console.log(
          '🚀 ~ file: register.ts ~ line 45 ~ awaitKeychain.setGenericPassword ~ data',
          data,
        );
        Toast.show({
          type: 'success',
          text1: 'Welcome to CRYPTO!!',
          text2: 'Your keys on your fingertips.',
        });
      })
      .catch(err => {
        Toast.show({
          type: 'info',
          text1: 'Could not hash your details!',
          text2: 'Please remember your details.',
        });
      });

    return keys;
  });

  const keys = await JSON.parse(`${serialized_tuc_keys}`);

  const bitcoin = keys[0].bitcoin;
  const stacks = keys[1].stacks;
  const solana = keys[2].solana;
  const ethereum = keys[3].ethereum;

  const unwrapped_bitcoin = JSON.parse(bitcoin);
  const unwrapped_stacks = JSON.parse(stacks);

  const tuc_public_keys = {
    bitcoin: JSON.stringify(unwrapped_bitcoin.publicKey),
    stacks: unwrapped_stacks.public,
    solana: JSON.stringify(solana._keypair.publicKey),
    ethereum: ethereum.address,
  };

  console.log(
    '🚀 ~ file: register.ts ~ line 57 ~ handleRegister ~ public_keys',
    tuc_public_keys,
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
    spotifyRefreshToken = null,
    spotifyAccessToken = null,
    avatarURL,
    userCategory,
    // tuc_public_keys
  } = TRXProfile;

  const fcm_token = await messaging()
    .getToken()
    .then((token: string) => {
      handleStore({key, value: token});
      return token;
    })
    .catch(err => {
      alert('there was an error setting up notifications... ');
    });

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

      if (spotifyRefreshToken) {
        const spotifyServicesDocument = firestore().doc(
          `users/${id}/services/spotify`,
        );

        spotifyServicesDocument.set({
          refresh_token: spotifyRefreshToken,
        });
      }

      userDocument
        .set({
          id,
          userCategory,
          fcm_token,
          email_address,
          isAuthenticatedSpotify,
          spotifyRefreshToken: spotifyRefreshToken,
          spotifyAccessToken: spotifyAccessToken,
          location,
          password,
          phone_number,
          quotable,
          subscription,
          trak_name,
          trak_symbol,
          last_logged_in: new Date().toString(),
          streak: 1,
          wallet: {
            trak: [],
            nft: [],
            tuc: 0,
            btc: 0,
            stx: 0,
            sol: 0,
            ada: 0,
            eth: 0,
            dai: 0,
          },
          avatarURL,
          isPrivate: false,
          tuc_public_keys,
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
