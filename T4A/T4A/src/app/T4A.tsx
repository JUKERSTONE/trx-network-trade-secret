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
import {store, setFirebaseProfile} from '../stores';
import {Provider} from 'react-redux';
import {T4AView, T4A} from './internal';
import auth from '@react-native-firebase/auth';
import {useT4AApp} from './';

export const T4AApp = () => {
  const {handleTheme} = useT4AApp();
  const isDarkMode = useColorScheme() === 'dark';
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // const cachedProfile = handleGet({key: asyncStorageIndex.profile});
    // console.log(
    //   '🚀 ~ file: TRAKLIST.tsx ~ line 25 ~ useEffect ~ profile',
    //   cachedProfile,
    // );

    // Promise.resolve(cachedProfile).then((serializedProfile: any) => {
    //   // switch statement
    //   const profile = JSON.parse(serializedProfile);
    //   const action = setTRXProfile(profile);
    //   store.dispatch(action);
    // });

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

  return (
    <Provider store={store}>
      <T4AView isDarkMode={isDarkMode}>
        <T4A handleTheme={handleTheme} user={user} />
      </T4AView>
    </Provider>
  );
};
