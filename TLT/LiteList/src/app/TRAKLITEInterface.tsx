import React, {useEffect, useState, Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  ActivityIndicator,
} from 'react-native';
import {TRAKLIST} from './internal';
import {handleServices, handleChats, handleFCMToken} from '../app';
import {useLITELISTApp} from './useLITELISTApp';
import auth from '@react-native-firebase/auth';
import {
  store,
  setSpotifyClientToken,
  setAuthentication,
  useAsyncStorage,
} from '../stores';
import {useFirebase} from './firebase';
import axios from 'axios';
import {api, useAPI} from '../api';
import {Base64} from '../core';
import {SPOTIFY_ACCOUNTS_KEY} from '../auth';
import {colors} from '../core';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import crashlytics from '@react-native-firebase/crashlytics';

const queryString = require('query-string');

export const TRAKLITEInterfaceHOC = (InnerComponent: any) => {
  return class TRXInterfaceHOC extends Component {
    constructor(props: any) {
      super(props);
      this.state = {
        user: null,
        initializing: true,
        theme: {
          dark: false,
          colors: {
            primary: colors.dark.primary,
            background: true ? colors.dark.primary : colors.light.primary,
            card: colors.dark.primary,
            text: '#fff',
            border: 'whitesmoke',
            notification: 'purple',
          },
        },
        handleListenUserProfile: (user: any, token: any) =>
          handleListenUserProfile(user, token),
        handleStreakRewards: (user: any, token: any) =>
          handleStreakRewards(user, token),
        error: null,
      };

      // console.log = function () {};

      const {
        handleListenUserProfile,
        handleStreakRewards,
        handleFCMToken,
        handleSpotifyService,
        handleAppleMusicService,
      } = useFirebase();
    }

    componentDidCatch(error: any) {
      this.setState({error});
      crashlytics().recordError(error);
    }

    componentDidMount() {
      // const {handleClear} = useAsyncStorage();
      // handleClear();
      this.handleFirebaseListener();
      this.handleReduxListener();
      this.handleInitializeNotifications();
    }

    async handleInitializeNotifications() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log(
          '🚀 ~ file: TRAKLITEInterface.tsx ~ line 85 ~ TRXInterfaceHOC ~ unsubscribe ~ remoteMessage',
          remoteMessage,
        );

        const data = remoteMessage.data;
        const type = data?.type;

        switch (type) {
          case 'chat':
            Toast.show({
              type: 'success',
              text1: data!.title,
              text2: data!.body,
            });

            // entry point to deeplinking application
            break;
          default:
            break;
        }
      });

      return unsubscribe;
    }

    handleFirebaseListener() {
      const subscriber = auth().onAuthStateChanged(
        this.onAuthStateChanged.bind(this),
      );
      return subscriber;
    }

    handleReduxListener() {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        console.log('TRAKLIST APP STATE : ', state);
      });
      return unsubscribe;
    }

    async onAuthStateChanged(user: any) {
      this.setState({user});

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
          const clientCredentials = response.data.access_token;

          const action = setSpotifyClientToken(clientCredentials);
          store.dispatch(action);
        })
        .catch(err => {
          console.log(
            '🚀 ~ file: TRAKLIST.tsx ~ line 62 ~ useEffect ~ err',
            err,
          );
          alert(err);
        });

      switch (user) {
        case null:
          // delete redux data
          const authAction1 = setAuthentication(false);
          store.dispatch(authAction1);
          if (this.state.initializing) this.setState({initializing: false});
          break;
        default:
          this.setState({initializing: true});
          const authAction = setAuthentication(true);
          store.dispatch(authAction);
          const token = await auth()
            .currentUser?.getIdToken(true)
            .then((token: any) => token);
          await this.state.handleListenUserProfile(user, token);
          const newTRAK = await this.state.handleStreakRewards(user, token);
          await handleServices({user});
          await handleChats();
          await handleFCMToken();
          if (this.state.initializing) this.setState({initializing: false});
      }
    }

    render() {
      if (this.state.error !== null)
        return (
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#1a1a1a',
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              SUMN WENT WRONG
            </Text>
            <Text style={{color: '#fff'}}>{this.state.error}</Text>
          </SafeAreaView>
        );

      if (this.state.initializing)
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
              <Button
                title="reload"
                onPress={() => this.onAuthStateChanged(this.state.user)}
              />
            </View>
          </SafeAreaView>
        );

      return (
        <>
          <Provider store={store}>
            <InnerComponent
              handleTheme={this.state.theme}
              user={this.state.user}
            />
          </Provider>
          <Toast />
        </>
      );
    }
  };
};
