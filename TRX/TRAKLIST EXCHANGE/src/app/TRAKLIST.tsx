import React, {useEffect, useState} from 'react';
import {TRAKLIST} from './internal';
import {useTRAKLISTApp} from '.';
import {store} from '../stores';
import {Provider} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useFirebase} from './firebase';
import {api, useAPI} from '../api';
import {handleGetWallet} from './hooks';

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLISTApp();
  const {handleGetUserProfile} = useFirebase();
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
        await handleGetUserProfile(user);
        await handleGetWallet();
    }
    if (initializing) setInitializing(false);
  };

  // console.log = function () {};

  if (initializing) return null;
  return (
    <Provider store={store}>
      <TRAKLIST handleTheme={handleTheme} user={user} />
    </Provider>
  );
};
