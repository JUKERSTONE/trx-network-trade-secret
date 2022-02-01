import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {TRAKLIST} from './internal';
import {useTRAKLISTApp} from './';
import {
  store,
  setFirebaseProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setTRXProfile,
} from '../stores';
import {Provider} from 'react-redux';
import auth from '@react-native-firebase/auth';

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLISTApp();
  const {handleGet} = useAsyncStorage();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    const cachedProfile = handleGet({key: asyncStorageIndex.profile});

    Promise.resolve(cachedProfile).then((serializedProfile: any) => {
      // switch statement
      const profile = JSON.parse(serializedProfile);
      const action = setTRXProfile(profile);
      store.dispatch(action);
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user: any) {
    setUser(user);

    switch (user) {
      case null:
        // delete redux data
        break;
      default:
        const payload = user._user;
        const action = setFirebaseProfile(payload);
        store.dispatch(action);
    }
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;
  return (
    <Provider store={store}>
      <TRAKLIST handleTheme={handleTheme} user={user} />
    </Provider>
  );
};
