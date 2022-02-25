import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  store,
  setFirebaseProfile,
  asyncStorageIndex,
  useAsyncStorage,
  setTRXProfile,
  storeKeysTRX,
} from '../stores';
import {Provider} from 'react-redux';
import {T4AView, T4A} from './internal';
import auth from '@react-native-firebase/auth';
import {useT4AApp} from '.';
import firestore from '@react-native-firebase/firestore';
import {useFirebase} from './firebase';

export const T4AApp = () => {
  const {handleTheme} = useT4AApp();
  const {handleGet} = useAsyncStorage();
  const {handleGetUserProfile} = useFirebase();
  const isDarkMode = useColorScheme() === 'dark';
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = async (user: any) => {
    setUser(user);
    console.log(
      '🚀 ~ file: T4A.tsx ~ line 52 ~ onAuthStateChanged ~ user',
      user,
    );
    const email = user._user.email;
    console.log(
      '🚀 ~ file: T4A.tsx ~ line 59 ~ onAuthStateChanged ~ email',
      email,
    );
    switch (user) {
      case null:
        // delete redux data
        break;
      default:
        handleGetUserProfile(user);
    }
    if (initializing) setInitializing(false);
  };

  return (
    <Provider store={store}>
      <T4AView isDarkMode={isDarkMode}>
        <T4A handleTheme={handleTheme} user={user} />
      </T4AView>
    </Provider>
  );
};
