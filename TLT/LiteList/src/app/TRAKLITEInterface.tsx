import React, {useEffect, useState, Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import {TRAKLIST} from './internal';
import {
  handleServices,
  handleChats,
  handleFCMToken,
  handleCrypto,
  handleStreakRewards,
  handleListenUserProfile,
  handleInAppPurchases,
} from '../app';
import {useLITELISTApp} from './useLITELISTApp';
import auth from '@react-native-firebase/auth';
import {
  store,
  setSpotifyClientToken,
  setAuthentication,
  useAsyncStorage,
  asyncStorageIndex,
  setSubscriptions,
} from '../stores';
import {useFirebase, handleTRAKLIST} from './firebase';
import axios from 'axios';
import {api, useAPI} from '../api';
import {Base64} from '../core';
import {SPOTIFY_ACCOUNTS_KEY} from '../auth';
import {colors} from '../core';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import crashlytics from '@react-native-firebase/crashlytics';
import LottieView from 'lottie-react-native';
import {VHeader, Body} from '../elements';
import {ProgressBar, Colors} from 'react-native-paper';
import {WalletConnectContainer} from '../containers';
import Purchases from 'react-native-purchases';

const queryString = require('query-string');
const {handleClear, handleStore} = useAsyncStorage();

export const TRAKLITEInterfaceHOC = (InnerComponent: any) => {
  return class TRXInterfaceHOC extends Component {
    constructor(props: any) {
      super(props);
      this.state = {
        user: null,
        token: null,
        initializing: true,
        hasCrypto: true,
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
        progress: 0,
        error: null,
      };

      console.log = function () {};
    }

    componentDidCatch(error: any) {
      this.setState({error});
      crashlytics().recordError(error);
    }

    componentDidMount() {
      // handleClear();

      this.handleInitializeInAppPurchases();
      this.handleFirebaseListener();
      this.handleReduxListener();
      this.handleInitializeNotifications();

      return;
    }

    async handleInitializeInAppPurchases() {
      Purchases.setDebugLogsEnabled(true);

      Purchases.configure('appl_pepUHYcBPwCrCbAvwzPqCWBjJTA');
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

      // await handleInAppPurchases();
      switch (user) {
        case null:
          // delete redux data
          const authAction1 = setAuthentication(false);
          store.dispatch(authAction1);
          if (this.state.initializing) this.setState({initializing: false});
          break;
        default:
          this.setState({initializing: true, progress: 1 / 8});

          const token = await auth()
            .currentUser?.getIdToken(true)
            .then((token: any) => token);
          this.setState({token});

          const response = await handleListenUserProfile(user, token);
          console.log(
            '🚀 ~ file: TRAKLITEInterface.tsx ~ line 184 ~ TRXInterfaceHOC ~ onAuthStateChanged ~ response',
            response,
          );
          const isSuccess = response?.success;

          if (!isSuccess && response?.data === 'connect your wallet') {
            this.setState({hasCrypto: false});
          } else if (isSuccess) {
            this.setState({hasCrypto: true});
            const profile = await handleStreakRewards(user, token);
            console.log(
              '🚀 ~ file: TRAKLITEInterface.tsx ~ line 191 ~ TRXInterfaceHOC ~ onAuthStateChanged ~ profile',
              profile,
            );
            this.setState({progress: 2 / 8});
            await handleServices({user});
            await handleChats();
            await handleFCMToken();
            await handleTRAKLIST();

            const authAction = setAuthentication(true);
            store.dispatch(authAction);
          }
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

      if (!this.state.initializing && !this.state.hasCrypto) {
        return (
          <WalletConnectContainer
            user={this.state.user}
            handleClaimSecretKey={async (stacks: any) => {
              console.log(
                '🚀 ~ file: TRAKLITEInterface.tsx ~ line 233 ~ TRXInterfaceHOC ~ handleClaimSecretKey={ ~ stacks',
                stacks,
              );
              const key = asyncStorageIndex.stacks_keys;
              await handleStore({key: key, value: stacks});
              // alert(this.state.token);

              // const wallet = await handleCrypto();

              const response = await handleListenUserProfile(
                this.state.user,
                this.state.token,
              );
              console.log(
                '🚀 ~ file: TRAKLITEInterface.tsx ~ line 236 ~ TRXInterfaceHOC ~ handleClaimSecretKey={ ~ response',
                response,
              );

              this.setState({hasCrypto: true});
              const profile = await handleStreakRewards(
                this.state.user,
                this.state.token,
              );
              console.log(
                '🚀 ~ file: TRAKLITEInterface.tsx ~ line 191 ~ TRXInterfaceHOC ~ onAuthStateChanged ~ profile',
                profile,
              );
              this.setState({progress: 2 / 8});
              await handleServices({user: this.state.user});
              await handleChats();
              await handleFCMToken();

              if (this.state.initializing) this.setState({initializing: false});
            }}
          />
        );
      }

      if (this.state.initializing && this.state.hasCrypto)
        return (
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#1a1a1a',
            }}>
            <LottieView
              source={require('../core/57276-astronaut-and-music.json')}
              autoPlay
              loop
            />

            <View style={{position: 'absolute', top: 100}}>
              <VHeader
                numberOfLines={1}
                type="four"
                color={'#fff'}
                text={'TAKING TOO LONG?'}
              />
              <Pressable
                onPress={() => this.onAuthStateChanged(this.state.user)}
                style={{marginTop: 5}}>
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'blue'}
                  text={'RELOAD'}
                  textAlign="center"
                />
              </Pressable>

              <ProgressBar
                progress={this.state.progress}
                color={'#cecece'}
                style={{
                  marginTop: 3,
                  backgroundColor: 'grey',
                  height: 10,
                  borderRadius: 10,
                }}
              />
              {/* <Button
                title="RELOAD"
                onPress={() => this.onAuthStateChanged(this.state.user)}
              /> */}
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
