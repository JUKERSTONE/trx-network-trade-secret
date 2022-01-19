import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {TRAKLISTView, TRAKLISTMainTab} from './internal';
import {useTRAKLISTApp} from './';
import {store, setFirebaseProfile} from '../stores';
import {Provider} from 'react-redux';
import auth from '@react-native-firebase/auth';

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLISTApp();
  const isDarkMode = handleTheme().dark;
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(
      '🚀 ~ file: TRAKLIST.tsx ~ line 15 ~ useEffect ~ subscriber',
      subscriber,
    );
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user: any) {
    console.log(
      '🚀 ~ file: TRAKLIST.tsx ~ line 25 ~ onAuthStateChanged ~ user',
      user,
    );
    setUser(user);

    switch (user) {
      case null:
        // delete redux data
        break;
      default:
        // alert('yes');
        // action here
        const payload = user._user;
        console.log(
          '🚀 ~ file: TRAKLIST.tsx ~ line 39 ~ onAuthStateChanged ~ payload',
          payload,
        );
        const action = setFirebaseProfile(payload);
        store.dispatch(action);
    }
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;
  return (
    <Provider store={store}>
      {/* AuthenticationState */}
      <TRAKLISTView isDarkMode={isDarkMode}>
        <TRAKLISTMainTab handleTheme={handleTheme} user={user} />
      </TRAKLISTView>
    </Provider>
  );
};
