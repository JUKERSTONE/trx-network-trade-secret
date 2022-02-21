import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import {routes, useAPI, APIKeys} from '../api';
import {Base64} from '../core';
import {useBERNIEState} from './useBERNIEState';
import {storeKeysSpotifyClient, store, setFirebaseProfile} from '../stores';
import {BernieNavigation} from './internal';
import auth from '@react-native-firebase/auth';

export const BernieApp = () => {
  const {handleGetState} = useBERNIEState();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const route = routes.spotify({method: 'token', payload: params});
    const token = Base64.btoa(APIKeys.spotify.accountsKey);
    const {POST} = useAPI();
    const response = POST({
      route,
      token,
      body: params,
    });

    Promise.resolve(response).then(res => {
      const data = res.data;
      const action = storeKeysSpotifyClient(data);
      store.dispatch(action);
    });

    return subscriber;
  }, []);

  const onAuthStateChanged = async (user: any) => {
    setUser(user);

    switch (user) {
      case null:
        // delete redux data
        break;
      default:
        const payload = user._user;
        // const userId = payload.uid;
        // const profile = await handleGetUserProfile({
        //   userId,
        // });
        // const TRXaction = setTRXProfile(profile);
        // store.dispatch(TRXaction);
        const FBaction = setFirebaseProfile(payload);
        store.dispatch(FBaction);
    }
    if (initializing) setInitializing(false);
  };

  return (
    <NavigationContainer>
      <BernieNavigation user={user} />
    </NavigationContainer>
  );
};
