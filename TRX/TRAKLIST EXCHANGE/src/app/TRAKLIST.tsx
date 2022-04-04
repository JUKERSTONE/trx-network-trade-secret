import React, {useEffect, useState} from 'react';
import {TRAKLIST} from './internal';
import {useTRAKLISTApp} from '.';
import {store} from '../stores';
import {Provider} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useFirebase} from './firebase';
import {api, useAPI} from '../api';
import {handleGetWallet} from './hooks';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLISTApp();
  const {handleGetUserProfile, handleStreakRewards} = useFirebase();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = async (user: any) => {
    setUser(user);
    switch (user) {
      case null:
        // delete redux data
        break;
      default:
        const token = await auth()
          .currentUser?.getIdToken(true)
          .then((token: any) => token);
        await handleGetUserProfile(user, token)
          .then(token => {
            const newTRAK = handleStreakRewards(user, token);
            return newTRAK;
          })
          .then(newTRAK => {
            console.log(
              '🚀 ~ file: TRAKLIST.tsx ~ line 45 ~ onAuthStateChanged ~ newTRAK',
              newTRAK,
            );
            handleGetWallet(token);
            // pop modal showing new trak
          });
    }
    if (initializing) setInitializing(false);
  };

  // console.log = function () {};

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
