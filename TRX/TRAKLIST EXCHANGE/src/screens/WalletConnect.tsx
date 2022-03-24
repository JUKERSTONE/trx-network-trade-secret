import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  TextInput,
  Button,
} from 'react-native';
import {store, depositMoney} from '../stores';
import {WebView} from 'react-native-webview';
import {useAPI, api} from '../api';
import {useTRAKLISTState} from '..';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const WalletConnectScreen = ({state, navigation}: any) => {
  const {usePOST} = useAPI();
  const handleConnect = (event: any) => {
    console.log(event.nativeEvent.data);
    const publicKey = event.nativeEvent.data;
    if (publicKey === 'error') {
      alert('INVALID SECRET KEY');
      return;
    }

    const route: any = api.walter({
      method: 'connect_forchain',
    });

    const payload = {
      publicKey,
    };

    usePOST({route, payload, token: accessToken})
      .then(() => {
        alert('succesfully connected to forchain wallet');
        navigation.navigate('WALLET');
      })
      .catch(err => {
        alert('failed to connect to forchain wallet');
      });

    // send to walter
  };

  return (
    <View style={{flex: 1, width: '100%'}}>
      <Text style={{color: '#fff'}}>WEBVIEW</Text>
      <WebView
        source={{uri: 'http://localhost:3000/connect'}}
        onMessage={handleConnect}
        injectedJavaScript="window.rnWeb = (testnetAddress) => {
          window.ReactNativeWebView.postMessage(testnetAddress);
        };"
      />
    </View>
  );
};
