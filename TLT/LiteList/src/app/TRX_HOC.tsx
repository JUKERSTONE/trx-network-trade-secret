import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Linking,
  Alert,
} from 'react-native';

import {Provider} from 'react-redux';
import crashlytics from '@react-native-firebase/crashlytics';
import LottieView from 'lottie-react-native';
import {ProgressBar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

import {
  handleServices,
  handleChats,
  handleFCMToken,
  handleStreakRewards,
  handleListenUserProfile,
  handleInitializeInAppPurchases,
  onAuthStateChanged,
  handleReduxListener,
  handleTRAKLIST,
} from '.';

import {
  store,
  setSpotifyClientToken,
  setAuthentication,
  useAsyncStorage,
  asyncStorageIndex,
} from '../stores';

import {api} from '../api';
import {colors, Base64} from '../core';
import {SPOTIFY_ACCOUNTS_KEY} from '../auth';
import {WalletConnectContainer} from '../containers';
import {VHeader, Body} from '../elements';

const {handleStore} = useAsyncStorage();
const queryString = require('query-string');

export const TRX_HOC = (InnerComponent: any) => {
  return class TRX_HOC extends Component {
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
            background: colors.dark.primary,
            card: colors.dark.primary,
            text: '#fff',
            border: 'whitesmoke',
            notification: 'purple',
          },
        },
        progress: 0,
        deepLink: null,
        error: null,
      };

      console.log = function () {};
    }

    componentDidMount() {
      // handleClear();

      handleReduxListener();
      this.handleInitializeNotifications();
      handleInitializeInAppPurchases();
      this.handleFirebaseListener();

      return;
    }

    componentDidCatch(error: any) {
      this.setState({error});
      crashlytics().recordError(error);
    }

    handleInitializeNotifications = async () => {
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

      messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        // alert('type : ' + remoteMessage.data.type);

        const type = remoteMessage.data.type;

        const path = `traklist://app/${type}`;

        const supported = await Linking.canOpenURL(path);

        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(path);
        } else {
          Alert.alert(`Don't know how to open this URL: ${path}`);
        }
        // navigation.navigate(remoteMessage.data.type);
      });

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage: any) => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );

            const type = remoteMessage.data.type;

            const deepLink = `traklist://app/${type}`;

            this.setState({deepLink});

            // const supported = await Linking.canOpenURL(path);

            // if (supported) {
            //   // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            //   // by some browser in the mobile
            //   setTimeout(async () => {
            //     await Linking.openURL(path);
            //   }, 1000);
            // } else {
            //   Alert.alert(`Don't know how to open this URL: ${path}`);
            // }

            // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
          }
          // setLoading(false);
        });

      return unsubscribe;
    };

    handleFirebaseListener() {
      const subscriber = auth().onAuthStateChanged(
        this.onAuthStateChanged.bind(this),
      );
      return subscriber;
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
          /** TODO :delete redux data */
          const authAction1 = setAuthentication(false);
          store.dispatch(authAction1);
          if (this.state.initializing) this.setState({initializing: false});
          break;
        default:
          this.setState({initializing: true, progress: 1 / 8});

          if (!!this.state.deepLink) {
            const supported = await Linking.canOpenURL(this.state.deepLink);

            if (supported) {
              // Opening the link with some app, if the URL scheme is "http" the web link should be opened
              // by some browser in the mobile
              setTimeout(async () => {
                await Linking.openURL(this.state.deepLink);
              }, 1000);
            } else {
              Alert.alert(
                `Don't know how to open this URL: ${this.state.deepLink}`,
              );
            }
            if (this.state.initializing) this.setState({initializing: false});
            return;
          }

          const token = await auth()
            .currentUser?.getIdToken(true)
            .then((token: any) => token);
          this.setState({token});

          console.log(
            '🚀 ~ file: TRX_HOC.tsx ~ line 256 ~ TRX_HOC ~ onAuthStateChanged ~ token',
            token,
          );

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
          return;
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
                onPress={() => onAuthStateChanged(this.state.user)}
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
