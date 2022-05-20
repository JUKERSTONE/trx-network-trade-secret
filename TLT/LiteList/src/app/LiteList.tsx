import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  ActivityIndicator,
} from 'react-native';
import {TRAKLIST} from './internal';
import {useLITELISTApp, handleServices, handleChats} from '../app';
import auth from '@react-native-firebase/auth';
import {store, setSpotifyClientToken, setAuthentication} from '../stores';
import {useFirebase} from './firebase';
import axios from 'axios';
import {api, useAPI} from '../api';
import {Base64} from '../core';
import {SPOTIFY_ACCOUNTS_KEY} from '../auth';
import {Provider} from 'react-redux';

const queryString = require('query-string');

export const LiteListApp = () => {
  console.log = function () {};
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const {handleTheme} = useLITELISTApp();
  const {
    handleListenUserProfile,
    handleStreakRewards,
    handleSpotifyService,
    handleAppleMusicService,
  } = useFirebase();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      console.log('TRAKLIST APP STATE : ', state);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = async (user: any) => {
    setUser(user);

    const route: any = api.spotify({method: 'accounts'});

    await axios
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

    switch (user) {
      case null:
        // delete redux data
        const authAction1 = setAuthentication(false);
        store.dispatch(authAction1);
        break;
      default:
        if (initializing) setInitializing(true);
        const authAction = setAuthentication(true);
        store.dispatch(authAction);
        const token = await auth()
          .currentUser?.getIdToken(true)
          .then((token: any) => token);

        await handleListenUserProfile(user, token);
        const newTRAK = await handleStreakRewards(user, token);
        await handleServices({user});
        await handleChats();
    }
    if (initializing) setInitializing(false);
  };

  if (initializing)
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
        }}>
        <View style={{padding: 30}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'whitesmoke',
              paddingBottom: 10,
            }}>
            ONE MOMENT PLEASE...
          </Text>
          <ActivityIndicator color="green" size="large" />
        </View>

        <View>
          <Text style={{color: 'white'}}>Taking too long?</Text>
          <Button title="reload" onPress={() => onAuthStateChanged(user)} />
        </View>
      </SafeAreaView>
    );

  return (
    <Provider store={store}>
      <TRAKLIST handleTheme={handleTheme} user={user} />
    </Provider>
  );
};
