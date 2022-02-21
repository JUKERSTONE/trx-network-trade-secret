import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import {routes, useAPI, APIKeys} from '../api';
import {Base64} from '../core';
import {useBERNIEState} from './useBERNIEState';
import {storeKeysSpotifyClient, store} from '../stores';
import {BernieNavigation} from './internal';

export const BernieApp = () => {
  const {handleGetState} = useBERNIEState();

  useEffect(() => {
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
  }, []);
  return (
    <NavigationContainer>
      <BernieNavigation />
    </NavigationContainer>
  );
};
