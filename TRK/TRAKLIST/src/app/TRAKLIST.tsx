import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TRAKLISTNavigation} from './internal';
import {useTRAKLIST} from './useTRAKLISTApp';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {store, setSpotifyClientToken, setAuthentication} from '../stores';
import {useFirebase} from '../app';
import {handleRefreshWallet} from './hooks';
import {api} from '../api';
import {Base64} from '../core';
import {SPOTIFY_ACCOUNTS_KEY} from '../auth';

const queryString = require('query-string');

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLIST();
  const {handleListenUserProfile, handleStreakRewards, handleListenTUC} =
    useFirebase();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const route: any = api.spotify({method: 'accounts'});
    console.log('🚀 ~ file: TRAKLIST.tsx ~ line 38 ~ useEffect ~ route', route);

    console.log(
      '🚀 ~ file: TRAKLIST.tsx ~ line 45 ~ useEffect ~ SPOTIFY_ACCOUNTS_KEY',
      SPOTIFY_ACCOUNTS_KEY,
    );
    axios
      .post(
        route,
        queryString.stringify({
          grant_type: 'client_credentials',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Base64.btoa(SPOTIFY_ACCOUNTS_KEY),
          },
        },
      )
      .then(response => {
        console.log(
          '🚀 ~ file: TRAKLIST.tsx ~ line 47 ~ useEffect ~ response',
          response,
        );
        const clientCredentials = response.data.access_token;
        console.log(
          '🚀 ~ file: TRAKLIST.tsx ~ line 48 ~ useEffect ~ clientCredentials',
          clientCredentials,
        );

        const action = setSpotifyClientToken(clientCredentials);
        store.dispatch(action);
      })
      .catch(err => {
        console.log('🚀 ~ file: TRAKLIST.tsx ~ line 62 ~ useEffect ~ err', err);
        alert(err);
      });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = async (user: any) => {
    setUser(user);
    switch (user) {
      case null:
        // delete redux data
        const authAction1 = setAuthentication(false);
        store.dispatch(authAction1);
        break;
      default:
        const authAction = setAuthentication(true);
        store.dispatch(authAction);
        const token = await auth()
          .currentUser?.getIdToken(true)
          .then((token: any) => token);

        await handleListenUserProfile(user, token)
          .then((token: any) => {
            const newTRAK = handleStreakRewards(user, token);
            return newTRAK;
          })
          .then((newTRAK: any) => {
            handleRefreshWallet(token);
            // pop modal showing new trak and append not existing new trak
          })
          .then(() => {
            handleListenTUC();
          })
          .catch((error: any) => {
            alert('non breaking error caught');
          });
    }
    if (initializing) setInitializing(false);
  };

  if (initializing) return null;

  return <TRAKLISTNavigation handleTheme={handleTheme} user={user} />;
};
