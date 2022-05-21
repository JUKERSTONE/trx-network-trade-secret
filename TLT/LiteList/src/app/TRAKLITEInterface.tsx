import React, {useEffect, useState, Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  ActivityIndicator,
} from 'react-native';
import {TRAKLIST} from './internal';
import {handleServices, handleChats} from '../app';
import {useLITELISTApp} from './useLITELISTApp';
import auth from '@react-native-firebase/auth';
import {store, setSpotifyClientToken, setAuthentication} from '../stores';
import {useFirebase} from './firebase';
import axios from 'axios';
import {api, useAPI} from '../api';
import {Base64} from '../core';
import {SPOTIFY_ACCOUNTS_KEY} from '../auth';
import {colors} from '../core';
import {Provider} from 'react-redux';
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
      };

      // const {handleTheme} = useLITELISTApp();
      const {
        handleListenUserProfile,
        handleStreakRewards,
        handleSpotifyService,
        handleAppleMusicService,
      } = useFirebase();
    }

    componentDidMount() {
      this.handleFirebaseListener();
      this.handleReduxListener();
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
      console.log(
        '🚀 ~ file: TRAKLITEInterface.tsx ~ line 64 ~ TRXInterfaceHOC ~ onAuthStateChanged ~ user',
        user,
      );
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
      }
      if (this.state.initializing) this.setState({initializing: false});
    }

    render() {
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
        <Provider store={store}>
          <InnerComponent
            handleTheme={this.state.theme}
            user={this.state.user}
          />
        </Provider>
      );
    }
  };
};
